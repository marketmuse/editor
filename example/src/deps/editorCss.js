if (process.env.NODE_ENV === 'production') {
  module.exports = require('@marketmuse/editor/dist/mms-editor.css');
} else {
  module.exports = require('editor-linked/dist/mms-editor.css');
}
