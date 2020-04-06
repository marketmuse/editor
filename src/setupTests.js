const configure = require('enzyme').configure;
const Adapter = require('enzyme-adapter-react-16');
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
  clearTimeout(id);
};
global.window.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});
global.window.getSelection = () => {
  return {
    addRange: () => {},
    removeAllRanges: () => {},
    getRangeAt: () => {
      return {
        startContainer: {},
      }
    },
  };
}

copyProps(window, global);

configure({ adapter: new Adapter() });
