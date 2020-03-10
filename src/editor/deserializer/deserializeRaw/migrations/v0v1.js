// this is to serve as an example migration script for a hypothetical
// data format change from version zero to one

// 1 ---
// change: mark level type `boldAndItalic` removed
// interpretation: marks `bold` and `italic` should be applied

// 2 ---
// change: block level type `double-paragraph` removed
// interpretation: type `paragraph` block should be used instead

// 3 ---
// change: block level type `hyperlink` renamed to `link`
// change: its attribute `src` renamed `href`

import { types } from '@config/common';
import walk from '@editor/deserializer/deserializeRaw/utils/walk'

export default editorData => {

  // walk on every node on the editor data and
  // run the transformation function
  return walk(editorData, node => {

    // if node has mark boldAndItalic, remove it and apply bold and italic separately
    if (node.boldAndItalic) {
      delete node.boldAndItalic;
      node[types.b] = true;
      node[types.i] = true;
    }

    // if node is of type `double-paragraph`, change its type to `paragraph`
    if (node.type === 'double-paragraph') {
      node.type = types.p;
    }

    // if node is of type `hyperlink`, correct the type and attribute
    if (node.type === 'hyperlink') {
      node.type = types.a;
      node.href = node.src;
      delete node.src;
    }

    return node;
  })
};
