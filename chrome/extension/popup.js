import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';
import Popup from '../../app/containers/Popup';

chrome.storage.local.get('state', (obj) => {
  const { state } = obj;
  const initialState = JSON.parse(state || '{"newTab": {"switchOn": true}}');

  const createStore = require('../../app/store/configureStore');

  ReactDOM.render(
    <Root store={createStore(initialState)} ><Popup/></Root>,
    document.querySelector('#root')
  );
});
