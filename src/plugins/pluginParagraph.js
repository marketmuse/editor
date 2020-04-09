import { Transforms } from 'slate';
import { types } from '@config/common';

export default {
  normalizerOptions: {
    normalize: (editor, [ node, path ]) => {

      // paragraphs cannot nest, has to be top level
      if (node.type === types.p && path.length !== 1) {

        // unwrap parent node. this will trigger a new normalization
        // thus this will recursively run until paragraph is at top level
        const parentPath = path.slice(0, -1);
        Transforms.unwrapNodes(editor, { at: parentPath })

        // change occured
        return true;
      }

      // no change occured
      return false;
    }
  }
}
