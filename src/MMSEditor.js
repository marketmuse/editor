import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Editable, useSlate } from 'slate-react';

import Leaf from '@components/editor/Leaf';
import Element from '@components/editor/Element';
import Toolbar from '@components/toolbar/Toolbar';

import getFormats from '@editor/formats';
import getFunctions from '@editor/functions';

const MMSEditor = props => {

  const editor = useSlate();
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  const functions = getFunctions(editor);
  const formats = getFormats(editor);

  const toolbar = (options = {}) => (
    <Toolbar
      {...options}
      functions={functions}
      formats={formats}
    />
  );

  let editorClassName = 'mms--editor';
  if (props.className) editorClassName += ` ${props.className}`;
  if (props.readOnly) editorClassName += ' mms--disabled';

  return (
    props.children({

      // pass active state of formats
      formats,

      // pass api functions with editor instance in closure
      functions,

      // pass the editor instance
      editor,

      // pass toolbar as a component
      toolbar,

      // pass editor as a component for children to render manually:
      // 1. gives the ability to easily add sidebars / toolbars to the editor
      // 2. blocks direct consumer access to slate's Editable props
      component: (
        <Editable
          id={props.id}
          className={editorClassName}
          style={props.style}
          autoFocus={props.autoFocus}
          readOnly={props.readOnly}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      )
    })
  )
};

MMSEditor.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,

  // a function that receives a set of attributes managed
  // by the editor component, including the editor itself
  children: PropTypes.func,

  // focus at the beginning of the document on mount
  autoFocus: PropTypes.bool,

  // make the editor read only
  readOnly: PropTypes.bool,

};

export default MMSEditor;
