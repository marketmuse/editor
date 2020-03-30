import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Slate, Editable, ReactEditor, withReact, useSlate } from 'slate-react'
import { Range, Editor, Transforms, Text, createEditor } from 'slate'

import Portal from '@components/Portal';
import classHasFocus from '@utils/classHasFocus';

const TooolbarWrapper = props => {

  const inlineTop = useRef(-1000000);
  const inlineLeft = useRef(-1000000);

  // grab editor instance
  const editor = useSlate();

  const inlineProps = {
    position: 'absolute',
    transform: 'translateX(-50%) translateY(-100%)',
    marginTop: -12,
    zIndex: 1,
  };

  const hasFocus = !!editor.selection && ReactEditor.isFocused(editor);
  const hasFocusWithin = classHasFocus('mms--toolbar-ignore-focus');
  const isVisible = (hasFocus || hasFocusWithin) && props.isOpen;

  if (props.inline) {

    // set default values for inline styles
    inlineProps.opacity = 0;
    inlineProps.top = -1000000;
    inlineProps.left = -1000000;

    // calculations are only needed for inline toolbars
    if (isVisible) {

      // set visible flag
      inlineProps.opacity = 1;

      // only calculate position if the text editor has focus
      // use the last known location if focused within
      if (classHasFocus('mms--editor')) {

        const domSelection = window.getSelection();
        const domRange = domSelection.getRangeAt(0);
        const rect = domRange.getBoundingClientRect();

        // calculate top and left location of toolbar
        const newTop = rect.top + window.pageYOffset;
        const newLeft = rect.left + window.pageXOffset + rect.width / 2;

        // set styles
        inlineProps.top = newTop;
        inlineProps.left = newLeft;

        // update state
        inlineTop.current = newTop;
        inlineLeft.current = newLeft;

      } else {

        // update styles with last calculated coordinates
        inlineProps.top = inlineTop.current;
        inlineProps.left = inlineLeft.current;
      }
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
  inline: PropTypes.number,
  isOpen: PropTypes.bool,
};

TooolbarWrapper.defaultProps = {
  inline: 1,
}

export default TooolbarWrapper;
