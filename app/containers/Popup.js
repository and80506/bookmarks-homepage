import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as NewTabActions from '../actions/newTab';
import style from './popup.css';
import { t } from '../i18n';

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
        <div className={style.header}>
          <span className={style.icon}>🔖</span>
          <h3>{t('extensionName')}</h3>
        </div>
        <div className={style.toolItem}>
          <div className={style.titleWrapper}>
            <span className={`${style.statusIndicator} ${isOn ? style.active : ''}`}></span>
            <span className={style.toolTtemTitle}>{t('toggleLabel')}</span>
          </div>
          <label className={style.fishdSwitch}>
            <input
              type="checkbox"
              checked={isOn}
              onChange={this.handleClick}
            />
            <span className={style.fishdSwitchSlider}></span>
          </label>
        </div>
      </div>
    );
  }
}
