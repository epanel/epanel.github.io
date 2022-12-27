import PropTypes from 'prop-types';
import classnames from 'classnames';
import isString from 'lodash/isString';
import React, { Component } from 'react';
import isBoolean from 'lodash/isBoolean';
import isFunction from 'lodash/isFunction';
import './index.scss';

class ToggleSwitch extends Component {

    // ...other class members here
  
    toggleSwitch = evt => {
      evt.persist();
      evt.preventDefault();
  
      const { onClick, onStateChanged } = this.props;
  
      this.setState({ enabled: !this.state.enabled }, () => {
        const state = this.state;
  
        // Augument the event object with SWITCH_STATE
        const switchEvent = Object.assign(evt, { SWITCH_STATE: state });
  
        // Execute the callback functions
        isFunction(onClick) && onClick(switchEvent);
        isFunction(onStateChanged) && onStateChanged(state);
      });
    }
  }

ToggleSwitch.propTypes = {
  theme: PropTypes.string,
  enabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ]),
  onStateChanged: PropTypes.func
}

export default ToggleSwitch;