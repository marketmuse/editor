import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

const mainStyles = {
  minHeight: 120,
  backgroundColor: 'white',
  padding: '20px 22px',
};

const initialValue = [{
  type: 'paragraph',
  children: [{
    text: 'A line of text in a paragraph.'
  }],
}];

const MMSEditor = props => {
  const editor = useMemo(() => withReact(createEditor()), [])

  // Having the editor be uncontrolled seems to make more sense given that the
  // value will be slate-specific JSON syntax and won't mean much without further
  // processing / parsing. Editor component should take that responsibility, so
  // the data should be exposed through an api in a meaningful way, and it should
  // keep its own internal state.
  const [value, setValue] = useState(initialValue)

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={setValue}
    >
      <Editable
        id={props.id}
        className={`mms--editor ${props.className || ''}`}
        style={Object.assign(mainStyles, props.style)}
      />
    </Slate>
  );
};

MMSEditor.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default MMSEditor;
