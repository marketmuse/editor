const regex = /toyota|honda|cat|dog|bird/gi;

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

// generate ranges from editor children
const generateRanges = children => {
  const ranges = [];

  walk(children, (node, path) => {

    // only run for text nodes
    if (!node.text) return;

    // match here
    let terms = [];
    while ((terms = regex.exec(node.text)) !== null) {

      // matched term
      const term = (terms[0] || '');

      // add decorators here
      ranges.push({
        anchor: { path, offset: terms.index },
        focus: { path, offset: terms.index + term.length },
        decorated: true,
        bold: true,
      })
    }
  })

  return ranges;
}

const unhighlight = children => {
  console.log('unhighlight', children);
};

const highlight = (children, ranges) => {
};

const applyRanges = (children, ranges) => {
  unhighlight(children);
  highlight(children, ranges);
};

// worker is invoked
this.self.onmessage = function(e) {
  const data = e.data || {};
  const commands = data.commands || {};
  const command = data.command;

  // generate ranges command
  if (command === commands.generate) {
    const children = data.children;
    const ranges = generateRanges(children);
    this.self.postMessage({ command, ranges });
  }

  // apply ranges command
  if (command === commands.apply) {
    const children = data.children;
    const ranges = data.ranges;
    const newChildren = applyRanges(children, ranges);
    this.self.postMessage({ command, children: newChildren });
  }
};
