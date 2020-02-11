import React from 'react';
import PropTypes from 'prop-types';

const ToolbarButton = props => {
	let className = 'mms--toolbar-button';
	if (props.disabled) className += ' mms--disabled';
	if (props.active) className += ' mms--active';
	if (props.className) className += ` ${props.className}`;
	
	return (
	  <button
	  	className={className}
	  	disabled={props.disabled}
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
};

export default ToolbarButton;