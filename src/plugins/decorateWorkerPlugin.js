/* eslint-disable import/no-webpack-loader-syntax */
import DecorateWorker from 'worker!./decorateWorker.js';

const decorateWorker = new DecorateWorker();

decorateWorker.onmessage = function(e) {
  // console.log('ranges:', e.data);
}

export default {
  onValueChange: ({ functions, formats }) => {
    const editor = functions._getEditor();
    decorateWorker.postMessage(editor.children)
  }
};
