import React from 'react';
import PropTypes from 'prop-types';

const ToolbarButton = props => {

	// generate class name
	let className = 'mms--toolbar-button';
	if (props.disabled) className += ' mms--disabled';
	if (props.active) className += ' mms--active';
	if (props.className) className += ` ${props.className}`;
	
	return (
	  <button
	  	className={className}
	  	style={props.style}
	  	disabled={props.disabled}
	  	// use onMouseDown instead of onClick to prevent
	  	// the editor from losing focus on button click
	  	onMouseDown={e => {
	  		e.preventDefault();
	  		if (typeof props.onClick === 'function') props.onClick();
	  		if (typeof props.callback === 'function') props.callback();
	  	}}
	  >
	    {props.children}
	  </button>
	)
};

ToolbarButton.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
	style: PropTypes.object,
	active: PropTypes.bool,
	disabled: PropTypes.bool,
	// for the main function of the button
	onClick: PropTypes.func,
	// for side functions of the button
	callback: PropTypes.func,
};

export default ToolbarButton;