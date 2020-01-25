import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Transforms, createEditor } from 'slate';
import { Slate, Editable, ReactEditor, withReact, useFocused } from 'slate-react';
import get from 'lodash/get';
import isNil from 'lodash/isNil';

import initApi from '@editor/api';
import initialState from '@config/initialState';
import withMarketmuse from '@editor/enhancer/withMarketmuse';

import Leaf from '@components/editor/Leaf';
import Element from '@components/editor/Element';

const mainStyles = {
  minHeight: 120,
  backgroundColor: 'white',
  padding: '20px 22px',
};

const MMSEditor = props => {

  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  const editor = isNil(props._editor)
    ? useMemo(() => withMarketmuse(createEditor()), [])
    : props._editor;

  // Having the editor be uncontrolled seems to make more sense given that the
  // value will be slate-specific JSON syntax and won't mean much without further
  // processing / parsing. Editor component should take that responsibility, so
  // the data should be exposed through an api in a meaningful way, and it should
  // keep its own internal state.
  const [value, setValue] = useState(isNil(props._editor)
    ? initialState
    : (get(props, '_editor.children') || [])
  );

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={setValue}
    >
      {props.children({
        api: e => initApi(e || editor),
        component: (
          <Editable
            id={props.id}
            className={`mms--editor ${props.className || ''}`}
            style={Object.assign(mainStyles, props.style)}
            autoFocus={props.autoFocus}
            readOnly={props.readOnly}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
        )
      })}
    </Slate>
  );
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

  // internal props:
  _editor: PropTypes.object,
};

export default MMSEditor;
