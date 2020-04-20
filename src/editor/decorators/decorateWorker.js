// mock self for tests
const _self = (this && this.self) ? this.self : {};

const GENERATE_DEBOUNCE = 200;

const walkAcc = (node, path, fn) => {
  fn(node, path);
  (node.children || []).map((child, i) => {
    walkAcc(child, path.concat(i), fn)
  })
}

const walk = (children, fn) => {
  children.map((child, i) => {
    walkAcc(child, [i], fn);
  })
}

// ridiculous workaround for web worker
// "_defineProperty$1 not defined" issue
const defineProp = (object, key, value) => {
  Object.defineProperty(object, key, {
    value,
    writable: true,
    enumerable: true,
    configurable: true,
  });
}

// generate ranges from editor children
const generateRanges = ({ children, decorators = [] }) => {
  let total = 0;
  const matches = {};
  const aggregates = {};
  const ranges = [];

  walk(children, (node, path) => {

    // only run for text nodes
    if (!node.text) return;

    // loop through decorators
    decorators.filter(d => d.regex).forEach(d => {

      // initiate matches and aggregates
      if (!matches[d.id]) defineProp(matches, d.id, {})
      if (!aggregates[d.id]) defineProp(aggregates, d.id, 0)

      // match here
      let terms = [];
      while ((terms = d.regex.exec(node.text)) !== null) {

        // matched term
        const term = (terms[0] || '');
        const termSafe = term.toLowerCase();

        // keep stats of matches
        if (!matches[d.id][termSafe]) defineProp(matches[d.id], termSafe, 0);
        defineProp(matches[d.id], termSafe, (matches[d.id][termSafe] || 0) + 1);
        defineProp(aggregates, d.id, aggregates[d.id] + 1);
        total += 1;

        // create range object
        const range = {
          anchor: { path, offset: terms.index },
          focus: { path, offset: terms.index + term.length },
        };

        // insert decorator key
        defineProp(range, d.key, true);
        ranges.push(range);
      }
    })
  })

  // sort ranges by area they're covering, so longer
  // decorations are printed at the bottom and shorter
  // ones are printed on top of them
  ranges.sort((r1, r2) => {
    const d1 = Math.abs(r1.anchor.offset - r1.focus.offset);
    const d2 = Math.abs(r2.anchor.offset - r2.focus.offset);
    return d2 - d1;
  })

  // organize ranges in a dictionary for
  // better performance in decorate function
  const rangesDict = ranges.reduce((acc, r) => {
    // anchor and focus paths are the same for decorators
    // so we can pick up path from either of them
    const path = r.anchor.path.join('');
    defineProp(acc, path, (acc[path] || []).concat(r));
    return acc;
  }, {});

  return {
    ranges,
    rangesDict,
    matches,
    aggregates,
    total,
  };
}

// worker is invoked
_self.onmessage = function(e) {
  const data = e.data || {};
  const commands = data.commands || {};
  const command = data.command;
  const echo = data.echo;

  // base response to all messaging
  const base = { command, echo };

  // generate ranges command
  if (command === commands.generate) {
    const children = data.children;
    const decorators = data.decorators || [];

    // wait for some time for debounce effect
    setTimeout(() => {
      const res = generateRanges({ children, decorators });
      _self.postMessage(Object.assign({}, base, res));
    }, GENERATE_DEBOUNCE)
  }
};
