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
	const isCollapsed = hasSelection ? Range.isCollapsed(editor.selection) : null;
	const isSelectionEmpty = hasSelection ? Editor.string(editor, editor.selection) === '' : null;

	
	if (props.inline) {

		// set default values for inline styles
		inlineProps.opacity = 0;
		inlineProps.top = -1000000;
		inlineProps.left = -1000000;

		// calculations are only needed for inline toolbars
		if (hasSelection && hasFocus && !isCollapsed && !isSelectionEmpty) {

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

	const styleClass = props.inline
		? 'mms--toolbar-inline'
		: 'mms--toolbar-embedded';

	const toolbar = (
		<div
			inline={props.inline}
			className={`mms--toolbar ${styleClass} ${props.className || ''}`}
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

export const toolbarWrapperPropTypes = {

	// inline styles to wrapper
	style: PropTypes.object,

	// custom class name
	className: PropTypes.string,
	
	// make this an inline toolbar
	inline: PropTypes.bool,
}

TooolbarWrapper.propTypes = toolbarWrapperPropTypes;

TooolbarWrapper.defaultProps = {
	inline: true,
}

export default TooolbarWrapper;