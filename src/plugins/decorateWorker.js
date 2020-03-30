const regex = /toyota|honda|cat|dog|bird/gi;

const walk = (node, fn) => {
  fn(node);
  (node.children || []).map(child => walk(child, fn))
}

this.self.onmessage = function(e) {
  const children = e.data;
  const ranges = [];

  children.map(child => {
    walk(child, node => {

      // only run for text nodes
      if (!node.text) return;

      // match here
      let terms = [];
      while ((terms = regex.exec(node.text)) !== null) {

        // matched term
        const term = (terms[0] || '');

        // add decorators here
        ranges.push({
          anchor: { path: [], offset: terms.index },
          focus: { path: [], offset: terms.index + term.length },
        })
      }

    })
  })

  this.self.postMessage(ranges);
};
