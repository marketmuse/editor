/**
 * This is a normalizer that's meant to be run only after
 * deserialization, it is destructive and should not be run
 * as the regular normalizer as it'll change the contents of
 * the document
 */

import { Node } from 'slate';
import { types } from '@config/common';

export default (fragments = []) => fragments

  // wrap lonely text nodes
  .map(f => (
    (!f.type && f.text)
      ? { children: [f], type: types.p }
      : f
  ))

  // filter out empty paragraph nodes
  .filter(node => {
    if (node.type === types.p) {
      return Node.string(node).trim() !== ''
    }

    return true;
  })
