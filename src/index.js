import React from 'react';
import PropTypes from 'prop-types';

import Editor from '@/MMSEditor';
import Provider from '@/MMSEditorProvider';

const MMSEditor = ({ _editor, ...props }) => {
  return (
    <Provider _editor={_editor}>
      <Editor {...props} />
    </Provider>
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
