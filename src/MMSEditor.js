import React from 'react';
import PropTypes from 'prop-types';

import MMSEditorProvider from '@/MMSEditorProvider';
import MMSEditorConsumer from '@/MMSEditorConsumer';

// bundler will pick up the style import below and
// turn it into an autoprefixed standalone css file
import '@config/defaultStyles';

const MMSEditor = ({ editor, htmlDeserializerOptions, ...props }) => {
  return (
    <MMSEditorProvider
      editor={editor}
      htmlDeserializerOptions={htmlDeserializerOptions}
    >
      <MMSEditorConsumer {...props} />
    </MMSEditorProvider>
  )
};

MMSEditor.propTypes = {
  editor: PropTypes.object,
  children: PropTypes.func,
  plugins: PropTypes.array,
  htmlDeserializerOptions: PropTypes.object,
};

export default MMSEditor;
