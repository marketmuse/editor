if (process.env.NODE_ENV === 'production') {
  module.exports = require('@marketmuse/editor');
} else {
  module.exports = require('editor-linked');
}
