import { Transforms } from 'slate';
import { types } from '@config/common';

export default {
  normalizerOptions: {
    normalize: (editor, [ node, path ]) => {

      // top-level nodes cannot be text nodes,
      // they have to be a block-level node
      if (path.length === 1 && node.hasOwnProperty('text')) {

        // wrap node within a paragraph
        Transforms.wrapNodes(editor, { children: [], type: types.p }, { at: path })

        // change occured
        return true;
      }

      // no change occured
      return false;
    }
  }
}
