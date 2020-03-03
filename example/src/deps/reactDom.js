if (process.env.NODE_ENV === 'production') {
  module.exports = require('react-dom');
} else {
  module.exports = require('editor-linked/node_modules/react-dom');
}
