import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Slate, Editable, ReactEditor, withReact, useSlate } from 'slate-react'
import { Range, Editor, Transforms, Text, createEditor } from 'slate'

import Portal from '@components/Portal';

const TooolbarWrapper = props => {

	// grab editor instance
	const editor = useSlate();

	const inlineProps = {
		position: 'absolute',
		transform: 'translateX(-50%) translateY(-100%)',
		marginTop: -12,
		zIndex: 1,
	};

	const hasSelection = !!editor.selection;
	const hasFocus = ReactEditor.isFocused(editor);
	const isVisible = hasSelection && hasFocus && props.isOpen;
	
	if (props.inline) {

		// set default values for inline styles
		inlineProps.opacity = 0;
		inlineProps.top = -1000000;
		inlineProps.left = -1000000;

		// calculations are only needed for inline toolbars
		if (isVisible) {

			// calculate position
			const domSelection = window.getSelection();
		  const domRange = domSelection.getRangeAt(0);
		  const rect = domRange.getBoundingClientRect();

		  // update styles
		  inlineProps.opacity = 1;
		  inlineProps.top = rect.top + window.pageYOffset;
		  inlineProps.left = rect.left + window.pageXOffset + rect.width / 2;	
		}
	}

	// construct class name
	let className = 'mms--toolbar';
	if (props.inline) className += ' mms--toolbar-inline';
	if (!props.inline) className += ' mms--toolbar-embedded';
	if (isVisible) className += ' mms--toolbar-visible';
	if (!isVisible) className += ' mms--toolbar-hidden';

	const toolbar = (
		<div
			inline={props.inline}
			className={className}
			style={Object.assign({}, props.style, props.inline ? inlineProps : {})}
		>
		  {props.children}
		</div>
	);

	// wrap in Portal if inline
	if (props.inline) {
		return (
			<Portal>
				{toolbar}
			</Portal>
		);
	}

	return toolbar;
};

TooolbarWrapper.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	inline: PropTypes.bool,
	isOpen: PropTypes.bool,
};

TooolbarWrapper.defaultProps = {
	inline: true,
}

export default TooolbarWrapper;