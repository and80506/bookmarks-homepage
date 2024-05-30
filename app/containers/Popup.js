import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as NewTabActions from '../actions/newTab';
import style from './popup.css';

@connect(
  state => ({
    newTab: state.newTab
  }),
  dispatch => ({
    actions: bindActionCreators(NewTabActions, dispatch)
  })
)
export default class Popup extends Component {

  static propTypes = {
    newTab: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  handleClick = (e) => {
    const { newTab, actions } = this.props;
    const { closeSwitch, openSwitch } = actions;
    const isOn = newTab.switchOn;
    if ( isOn ) {
      closeSwitch();
    } else {
      openSwitch();
    }
  }

  render() {
    const { newTab } = this.props;
    const isOn = newTab.switchOn;
    return (
      <div className={style.containerFluid}>
        <div className={style.toolTtem}>
          <span className={style.toolTtemTitle}>Toggle Bookmarks Homepage:</span>
          <span
            className={`${style.ipSupport} ${style.fishdSwitch}${isOn ? ' ' + style.fishdSwitchChecked : ''}`}
            onClick={this.handleClick}
            tabIndex="0"
          >
            <span className={style.fishdSwitchInner}>{isOn ? 'On' : 'Off'}</span>
          </span>
        </div>
      </div>
    );
  }
}
