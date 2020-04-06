// TODO: tests that we mount components fails
// because of web workers

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
          decorations: {},
        };

        // insert range
        defineProp(range.decorations, d.key, true)
        ranges.push(range);
      }
    })
  })

  return {
    ranges,
    matches,
    aggregates,
    total,
  };
}

// worker is invoked
this.self.onmessage = function(e) {
  const data = e.data || {};
  const commands = data.commands || {};
  const command = data.command;

  // generate ranges command
  if (command === commands.generate) {
    const children = data.children;
    const decorators = data.decorators || [];

    // wait for some time for debounce effect
    setTimeout(() => {
      const res = generateRanges({ children, decorators });
      this.self.postMessage(Object.assign({}, { command }, res));
    }, GENERATE_DEBOUNCE)
  }
};
