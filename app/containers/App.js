import React, { Component, PropTypes } from 'react';
import MainSection from '../components/MainSection';
import style from './App.css';
import { getBookmarks, removeBookmark } from '../utils/bookmarks';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      treeNodes: []
    };
  }

  async componentDidMount() {
    const bookmarks = await getBookmarks('0');
    this.setState({
      treeNodes: bookmarks
    })
  }

  render() {
    const { treeNodes } = this.state;
    return (
      <div>
        {
          treeNodes.length ? <MainSection treeNodes={treeNodes}/> : null
        }
      </div>
    );
  }
}
