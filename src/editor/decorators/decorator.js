/* eslint-disable import/no-webpack-loader-syntax */
import DecorateWorker from 'worker!./decorateWorker.js';

// commands dict
const commands = {
  generate: 'generage-ranges',
  apply: 'apply-ranges',
}

// decorator class
class Decorator {

  // instantiate worker
  constructor() {
    this.worker = new DecorateWorker();
    this.worker.onmessage = e => {
      this.onResponse(e.data);
    }
  }

  // response received from webworker
  onResponse(res = {}) {

    // generate callback
    if (res.command === commands.generate) {
      if (typeof this.rangesCallback === 'function') {
        console.log('res.ranges', res.ranges);
        this.rangesCallback({ ranges: res.ranges });
      }
    }

    // apply callback
    if (res.command === commands.apply) {
      if (typeof this.applyCallback === 'function') {
        this.applyCallback();
      }
    }
  }

  // register callbacks
  onGenerateRanges(fn) { this.rangesCallback = fn; }
  onApplyRanges(fn) { this.applyCallback = fn; }

  // start the worker
  generateRanges(editor) {
    if (!this.worker) return;
    const children = editor.children;
    this.worker.postMessage({
      command: commands.generate,
      commands,
      children,
    });
  }

  // apply
  applyRanges(editor, ranges) {
    if (!this.worker) return;
    const children = editor.children;
    this.worker.postMessage({
      command: commands.apply,
      commands,
      children,
      ranges,
    });
  }

  // terminate decorator process
  terminate() {
    this.worker.terminate();
  }
}

// export singleton since we only need one worker
export default new Decorator();
