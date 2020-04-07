/* eslint-disable import/no-webpack-loader-syntax */
import DecorateWorker from 'worker!./decorateWorker.js';
import getDecorComponents from '@editor/decorators/getDecorComponents';
import getDecorTriggers from '@editor/decorators/getDecorTriggers';
import getDecoratorKey from '@editor/decorators/utils/getDecoratorKey';
import regexFromRegex from '@editor/decorators/utils/regexFromRegex';
import regexFromArray from '@editor/decorators/utils/regexFromArray';
import regexFromString from '@editor/decorators/utils/regexFromString';

// commands dict
const commands = {
  generate: 'generage-ranges',
}

// decorator class
class Decorator {

  // instantiate worker
  constructor() {
    this.initiate();
    this.editor = null;
    this.triggers = [];
    this.components = {};
    this.ranges = [];
    this.total = 0;
    this.matches = {};
    this.aggregates = {};
  }

  // set a ref to the editor object
  setEditor(editor) {
    this.editor = editor;
  }

  // return object to be passed as decors
  getDecors() {
    return {
      matches: this.matches,
      aggregates: this.aggregates,
      total: this.total,
    }
  }

  // extract values from decorator list
  applyPlugins(decorators = []) {

    // pre-calculate decorator values
    this.decoratorsSerializable = decorators.map(d => {

      // create regex
      let regex = d.match;
      if (regex instanceof RegExp) regex = regexFromRegex(regex);
      if (typeof regex === 'string') regex = regexFromString(regex);
      if (Array.isArray(regex)) regex = regexFromArray(regex);
      if (regex instanceof RegExp !== true) regex = null;

      const id = d.id;
      const key = getDecoratorKey(id);

      // return a serializable object
      // to pass on to the worker
      return { regex, id, key };
    });

    // extract components
    this.triggers = getDecorTriggers(decorators);
    this.components = getDecorComponents(decorators);

    // trigger generate ranges cycle with timeout
    this.generateRanges();
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

  // start the worker
  generateRanges() {
    if (!this.worker) return;
    if (!this.editor) return;

    // kill old process and start a new one
    this.restart();

    // send signal to worker
    this.worker.postMessage({
      command: commands.generate,
      children: this.editor.children,
      decorators: this.decoratorsSerializable,
      commands,
    });
  }

  // response received from webworker
  onResponse(res = {}) {

    // generate callback
    if (res.command === commands.generate) {
      this.ranges = res.ranges;
      this.matches = res.matches;
      this.aggregates = res.aggregates;
      this.total = res.total;
    }
  }

  // TODO: if we pass the entire ranges array from
  // the root, it'll be passed down to every single
  // node and will go through `Range.intersection`
  // unnecessarily.
  //
  // To optimize this, maybe classify ranges in the
  // worker in a dictionary where we can access ranges
  // by path instantly and return the ranges concerning
  // only the given path, so child nodes doesn't have to
  // process inherited ranges that doesn't concern them.
  decorate = ([ _, path ]) => {
    if (path.length === 0) return this.ranges
    else return [];
  }
}

// export singleton since we only need one worker
export default new Decorator();
