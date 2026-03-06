import React, { Component, PropTypes } from 'react';
import { getBookmarks } from '../utils/bookmarks';
import style from './MainSection.css';

const cacheIds = {};
const isChineseUser = () => {
  const lang = navigator.language || navigator.userLanguage || '';
  return lang.startsWith('zh');
};

export default class MainSection extends Component {

  static propTypes = {
    treeNodes: PropTypes.array.isRequired,
  };

  static cacheIds = cacheIds;

  constructor(props, context) {
    super(props, context);
    this.state = {
      treeNodes: [],
      searchKeyword: ''
    };
  }

  handleSearchChange = (e) => {
    this.setState({ searchKeyword: e.target.value });
  }

  translateToEnglish = async (text) => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=en&dt=t&q=${encodeURIComponent(text)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data[0] && data[0][0] && data[0][0][0]) {
        return data[0][0][0];
      }
      return text;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  }

  handleSearch = async () => {
    const { searchKeyword } = this.state;
    if (!searchKeyword.trim()) return;
    
    const englishKeyword = await this.translateToEnglish(searchKeyword);
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(englishKeyword)}`;
    window.location.href = searchUrl;
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  }

  renderSearchBox() {
    if (!isChineseUser()) {
      return null;
    }
    return (
      <div className={style.searchBox}>
        <input
          type="text"
          placeholder="自动翻译后再搜索"
          value={this.state.searchKeyword}
          onChange={this.handleSearchChange}
          onKeyPress={this.handleKeyPress}
          className={style.searchInput}
        />
        <button onClick={this.handleSearch} className={style.searchButton}>
          确定
        </button>
      </div>
    );
  }

  async fetchBookmarks(id, isLoop) {
    const bookmarks = await getBookmarks(id);
    if (isLoop && bookmarks.length) {
      const colectArray = bookmarks.slice();
      bookmarks.forEach(async ({ id }) => {
        const bookmarks = await this.fetchBookmarks(id, isLoop);
        colectArray.push(bookmarks);
      });
      this.setState({
        [`${id}`]: colectArray
      });
      return colectArray;
    } else {
      this.setState({
        [`${id}`]: bookmarks
      });
      return bookmarks;
    }
  }

  getFaviconURL(u) {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", u);
    url.searchParams.set("size", "32");
    return url.toString();
  }

  renderItem(url, title, id) {
    const urlDomain = url.replace(/https?:\/\//, '');
    const faviconURL = this.getFaviconURL(url);
    const style = { backgroundImage: `url("${faviconURL}")` };
    return (
      <a
        href={url}
        title={title}
      ><span style={style}></span>{title}</a>
    )
  }

  renderLevel4(treeNode) {
    const { id, title, url } = treeNode;
    if (!url) {
      const combineBookmarks = this.state[id] || [];
      if (!cacheIds[id]) {
        cacheIds[id] = true;
        this.fetchBookmarks(id, true);
      }
      return combineBookmarks.map(({ url, title }) => {
        if (url) {
          return <li>{this.renderItem(url, title, id)}</li>;
        }
      })
    }

    return <li>{this.renderItem(url, title, id)}</li>;
  }

  renderLevel3(treeNode) {
    const { id, title, url } = treeNode;
    const bookmarks = this.state[id] || [];
    if (!cacheIds[id]) {
      cacheIds[id] = true;
      this.fetchBookmarks(id);
    }
    return url ? <li>{this.renderItem(url, title, id)}</li>
      :
      bookmarks.map(treeNode => {
        return this.renderLevel4(treeNode);
      });
  }

  renderLevel2(treeNode) {
    const { id, title, url } = treeNode;
    const bookmarks = this.state[id] || [];
    if (!cacheIds[id]) {
      cacheIds[id] = true;
      this.fetchBookmarks(id);
    }
    return (
      url ? <span className={style.sectionItem}>{this.renderItem(url, title, id)}</span> :
        <div className={style.section} key={id}>
          <div className={style.field}><span>{title}</span></div>
          <ul className={style.clearfix}>
            {
              bookmarks.map(treeNode => {
                return this.renderLevel3(treeNode);
              })
            }
          </ul>
        </div>
    );
  }

  renderLevel1(treeNode, index) {
    const { id, title, url } = treeNode;
    const bookmarks = this.state[id] || [];
    if (!cacheIds[id]) {
      cacheIds[id] = true;
      this.fetchBookmarks(id);
    }
    return (
      url ?
        <h1 id={id}>{this.renderItem(url, title, id)}</h1>
        :
        <section key={id}>
          <div className={style.sectionHeader}>
            <h1 id={id}>{title}</h1>
            {index === 0 && this.renderSearchBox()}
          </div>
          {
            bookmarks.map(treeNode => {
              return this.renderLevel2(treeNode);
            })
          }
        </section>
    )
  }

  render() {
    const { treeNodes } = this.props;
    return (
      <div>
        {
          treeNodes ? treeNodes.map((treeNode, index) => {
            return this.renderLevel1(treeNode, index);
          }) : null
        }
      </div>
    );
  }
}
