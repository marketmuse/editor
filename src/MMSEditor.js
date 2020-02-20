import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Editable, useSlate } from 'slate-react';

import Leaf from '@components/editor/Leaf';
import Element from '@components/editor/Element';
import Toolbar from '@components/toolbar/Toolbar';

import getFormats from '@editor/formats';
import getFunctions from '@editor/functions';
import getDecorate from '@editor/decorators/getDecorate';
import getDecors from '@editor/decorators/getDecors';
// import getDecorateTriggers from '@editor/decorators/getDecorateTriggers';

const MMSEditor = props => {

  const editor = useSlate();

  // decorators
  const decorators = props.decorators || [];
  const decors = getDecors(decorators);
  // const decTriggers = getDecorateTriggers(decorators);
  const decorate = useCallback(getDecorate(decorators), [editor, decorators]);

  // element / leaf renderers
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf decors={decors} {...props} />, []);

  // functions and formats
  const functions = getFunctions(editor);
  const formats = getFormats(editor);

  // construct class name
  let editorClassName = 'mms--editor';
  if (props.className) editorClassName += ` ${props.className || ''}`;
  if (props.readOnly) editorClassName += ' mms--disabled';

  /* eslint-disable react/prop-types */

  return (
    props.children({

      // pass active state of formats
      formats,

      // pass api functions with editor instance in closure
      functions,

      // pass down toolbar component
      toolbar: (options = {}) => (
        <Toolbar
          {...options}
          functions={functions}
          formats={formats}
        />
      ),

      // pass down editor component
      editor: (options = {}) => (
        <Editable
          id={props.id}
          className={editorClassName}
          style={props.style}
          autoFocus={props.autoFocus}
          readOnly={props.readOnly}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          decorate={decorate}
        />
      ),
    })
  )
};

/* eslint-enable */

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

  // decorator configuration
  decorators: PropTypes.array,
};

export default MMSEditor;
