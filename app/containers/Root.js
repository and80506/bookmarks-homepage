import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';

export default class Root extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { store, children } = this.props;
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }
}
