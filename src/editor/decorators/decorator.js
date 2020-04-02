/* eslint-disable import/no-webpack-loader-syntax */
import DecorateWorker from 'worker!./decorateWorker.js';
import { Text, Editor, Transforms } from 'slate';

// commands dict
const commands = {
  generate: 'generage-ranges',
}

// decorator class
class Decorator {

  // instantiate worker
  constructor() {
    this.initiate();
  }

  // start web worker
  initiate() {
    this.worker = new DecorateWorker();
    this.worker.onmessage = e => {
      this.onResponse(e.data);
    }
  }

  // terminate worker
  terminate() {
    this.worker.terminate();
  }

  // when worker gets invoked rapidly, it will unlikely
  // have enough time to finish the last process, and
  // eventually stack up and crash. to avoid this,
  // terminate the current running process and start a new
  // one, so only the last invocation will take effect
  restart() {
    this.terminate();
    this.initiate();
  }

  // response received from webworker
  onResponse(res = {}) {

    // generate callback
    if (res.command === commands.generate) {
      if (typeof this.rangesCallback === 'function') {
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

    // kill old process and start a new one
    this.restart();

    const children = editor.children;
    this.worker.postMessage({
      command: commands.generate,
      commands,
      children,
    });
  }

  // apply
  applyRanges(editor, ranges) {
    Editor.withoutNormalizing(editor, () => {

      // remove previous decorations
      // this is a bit slow for very long articles
      Transforms.setNodes(editor, { decorations: null }, {
        match: Text.isText,
        mode: 'all',
        split: true,
      });

      // remove previous decorations
      ranges.forEach(({ anchor, focus, decorations }) => {
        try {
          Transforms.setNodes(editor, { decorations }, {
            match: Text.isText,
            at: { anchor, focus },
            split: true,
          })
        } catch (e) {
          // since the decorations are running async
          // within web workers, the editor contents
          // might have changed and previously calculated
          // ranges might be irrelevant. in this situation,
          // it is okay to ignore errors and let the ranges
          // be recalculated on the next decoration cycle
        }
      })
    })
  }
}

// export singleton since we only need one worker
export default new Decorator();
