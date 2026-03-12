const bluebird = require('bluebird');

global.Promise = bluebird;

function promisifier(method) {
  // return a function
  return function promisified(...args) {
    // which returns a promise
    return new Promise((resolve) => {
      args.push(resolve);
      method.apply(this, args);
    });
  };
}

function promisifyAll(obj, list) {
  list.forEach(api => bluebird.promisifyAll(obj[api], { promisifier }));
}

// let chrome extension api support Promise
promisifyAll(chrome, [
  'tabs',
  'windows',
  'action',
  'bookmarks'
]);
promisifyAll(chrome.storage, [
  'local',
]);

// 监听新标签页创建和更新事件
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // 只处理 URL 变化的情况
  if (!changeInfo.url) {
    return;
  }

  try {
    const result = await chrome.storage.local.get('state');
    const { state } = result;
    const initialState = JSON.parse(state || '{"newTab": {"switchOn": true}}');
    const newTab = initialState.newTab;

    // 如果开关关闭，且当前标签页是扩展页面，则重定向到 Google
    if (newTab.switchOn === false) {
      const extensionUrl = chrome.runtime.getURL('');
      if (changeInfo.url.startsWith(extensionUrl)) {
        console.log('Switch is off, redirecting to Google...');
        // 使用 Google 首页作为替代
        await chrome.tabs.update(tabId, {
          url: 'https://www.google.com/webhp?igu=1'
        });
      }
    }
  } catch (error) {
    console.error('Error handling tab update:', error);
  }
});

