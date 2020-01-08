import { createHyperscript } from 'slate-hyperscript'

export default createHyperscript({
  elements: {
    block: {},
    inline: { inline: true },
  },
});
