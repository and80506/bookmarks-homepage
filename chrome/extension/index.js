import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';
import App from '../../app/containers/App';
import './index.css';

chrome.storage.local.get('state', (obj) => {
  const { state } = obj;
  const initialState = JSON.parse(state || '{"newTab": {"switchOn": true}}');
  const newTab = initialState.newTab;

  if ( newTab.switchOn  === false ) {
    chrome.tabs.update({ url: "chrome-search://local-ntp/local-ntp.html" });
    return;
  }

  const createStore = require('../../app/store/configureStore');

  ReactDOM.render(
    <Root store={createStore(initialState)} ><App/></Root>,
    document.querySelector('#root')
  );
});
