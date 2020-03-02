import React from 'react';
import PropTypes from 'prop-types';

import Editor from '@/MMSEditor';
import Provider from '@/MMSEditorProvider';

// bundler will pick up the style import below and
// turn it into an autoprefixed standalone css file
import '@config/defaultStyles';

const MMSEditor = ({ editor, htmlDeserializerOptions, ...props }) => {
  return (
    <Provider
      editor={editor}
      htmlDeserializerOptions={htmlDeserializerOptions}
    >
      <Editor {...props} />
    </Provider>
  )
};

MMSEditor.propTypes = {
  editor: PropTypes.object,
  children: PropTypes.func,
  plugins: PropTypes.array,
  htmlDeserializerOptions: PropTypes.object,
};

export default MMSEditor;
