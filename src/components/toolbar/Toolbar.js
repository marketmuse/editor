import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Slate, Editable, ReactEditor, withReact, useSlate } from 'slate-react'
import { Range, Editor, Transforms, Text, createEditor } from 'slate'

import Portal from '@components/Portal';

const toolbarHeight = 28;

const baseStyles = {
	backgroundColor: 'black',
	color: 'white',
	borderRadius: 3,
	overflow: 'hidden',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: toolbarHeight,
};

const inlineStyles = {
		position: 'absolute',
		marginTop: -6,
		zIndex: 1,
		transform: 'translateX(-50%)',
		padding: '0 8px',
	}

const Toolbar = props => {

	// grab editor instance
	// TODO: is it better to grab it with useSlate() ?
	const editor = props._editor;

	const hasSelection = !!editor.selection;
	const hasFocus = ReactEditor.isFocused(editor);
	const isCollapsed = hasSelection ? Range.isCollapsed(editor.selection) : null;
	const isSelectionEmpty = hasSelection ? Editor.string(editor, editor.selection) === '' : null;

	
	if (props.inline) {

		// set default values for inline styles
		inlineStyles.opacity = 0;
		inlineStyles.top = -1000000;
		inlineStyles.left = -1000000;

		// calculations are only needed for inline toolbars
		if (hasSelection && hasFocus && !isCollapsed && !isSelectionEmpty) {

			// calculate position
			const domSelection = window.getSelection();
		  const domRange = domSelection.getRangeAt(0);
		  const rect = domRange.getBoundingClientRect();

		  // update styles
		  inlineStyles.opacity = 1;
		  inlineStyles.top = rect.top + window.pageYOffset - toolbarHeight;
		  inlineStyles.left = rect.left + window.pageXOffset + rect.width / 2;	
		}

		
	}

	const styleClass = props.inline
		? 'mms--toolbar-inline'
		: 'mms--toolbar-embedded';

	const toolbar = (
		<div
			inline={props.inline}
			className={`mms--toolbar ${styleClass} ${props.className || ''}`}
			style={Object.assign({}, baseStyles, props.style, props.inline ? inlineStyles : {})}
		>
		  Toolbar!
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

export const toolbarPropTypes = {

	// inline styles to wrapper
	style: PropTypes.object,

	// custom class name
	className: PropTypes.string,
	
	// make this an inline toolbar
	inline: PropTypes.bool,

	// internal ---

	// editor instance
	_editor: PropTypes.object,
}

Toolbar.propTypes = toolbarPropTypes;

Toolbar.defaultProps = {
	inline: true,
}

export default Toolbar;