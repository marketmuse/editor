import React from 'react';
import PropTypes from 'prop-types';

const ToolbarButton = props => {

  // generate class name
  let className = 'mms--toolbar-input mms--toolbar-ignore-focus';
  if (props.disabled) className += ' mms--disabled';
  if (props.className) className += ` ${props.className || ''}`;

  return (
    <input
      className={className}
      style={props.style}
      disabled={props.disabled}
      value={props.value}
      placeholder={props.placeholder}
      onChange={e => {
        e.preventDefault();
        if (typeof props.onChange === 'function') props.onChange(e);
        if (typeof props.callback === 'function') props.callback(e);
      }}
    >
      {props.children}
    </input>
  )
};

ToolbarButton.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  // for the main function of the button
  onChange: PropTypes.func,
  // for side functions of the button
  callback: PropTypes.func,
};

export default ToolbarButton;
