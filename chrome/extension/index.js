import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';
import App from '../../app/containers/App';
import './index.css';
import { t } from '../../app/i18n';

chrome.storage.local.get('state', (obj) => {
  const { state } = obj;
  const initialState = JSON.parse(state || '{"newTab": {"switchOn": true}}');
  const newTab = initialState.newTab;

  if ( newTab.switchOn  === false ) {
    // 当开关关闭时，直接重定向到 Google 首页
    window.location.replace('https://www.google.com/webhp?igu=1');
    return;
  }

  const createStore = require('../../app/store/configureStore');

  ReactDOM.render(
    <Root store={createStore(initialState)} ><App/></Root>,
    document.querySelector('#root')
  );
});
