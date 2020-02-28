import React from 'react';
import PropTypes from 'prop-types';

import Editor from '@/MMSEditor';
import Provider from '@/MMSEditorProvider';

// bundler will pick up the style import below and
// turn it into an autoprefixed standalone css file
import '@config/defaultStyles';

const MMSEditor = ({ editor, htmlParserOptions, ...props }) => {
  return (
    <Provider
      editor={editor}
      htmlParserOptions={htmlParserOptions}
    >
      <Editor {...props} />
    </Provider>
  )
};

MMSEditor.propTypes = {
  editor: PropTypes.object,
  children: PropTypes.func,
  plugins: PropTypes.array,
  htmlParserOptions: PropTypes.object,
};

export default MMSEditor;
