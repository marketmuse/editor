import { Transforms, Editor } from 'slate';
import { types } from '@config/common';

export default {
  onKeyDown: (e, { formats, functions }) => {

    const isBackspace = e.key === 'Backspace';
    const isEnter = e.key === 'Enter';
    if (!isBackspace && !isEnter) return;

    // item should be in a list
    const isListNumbered = formats.isListNumbered;
    const isListBulleted = formats.isListBulleted;
    if (!(isListNumbered || isListBulleted)) return;

    // get current list item node
    const editor = functions._getEditor();
    const matcher = { match: n => n.type === types.li }
    const [item] = Editor.nodes(editor, matcher);
    if (!item) return;
    const [node, _] = item;

    // pressing enter or backspace on an empty list item
    // turns the list item block into a paragraph
    if (Editor.isEmpty(editor, node)) {
      e.preventDefault();
      if (isListBulleted) functions.toggleListBulleted();
      if (isListNumbered) functions.toggleListNumbered();
    }
  },
  normalizerOptions: {
    normalize: (editor, [ node, path ]) => {

      // list items cannot be top level, turn them into paragraphs
      if (node.type === types.li && path.length === 1) {
        Transforms.setNodes(editor, { type: types.p }, { at: path })
        return true;
      }

      // list items parents must either be bulleted list (ul)
      // or numbered list (ol). if neither is the case, unwrap
      // it from parent until it is. if it ends up being at the
      // top level (ie. has no list ul or ol in its subtree), the
      // normalizer above will pick up and turn it into a paragraph
      if (node.type === types.li && path.length > 1) {
        const parentPath = path.slice(0, -1);
        const [parentListNode] = Editor.nodes(editor, {
          at: parentPath,
          match: n => (n.type === types.ul || n.type === types.ol)
        });
        if (!parentListNode) {
          Transforms.unwrapNodes(editor, { at: parentPath })
          return true;
        }
      }

      return false;
    }
  },
  hotkeys: [
    {
      key: 'mod+shift+7',
      command: ({ functions }) => functions.toggleListNumbered(),
    },
    {
      key: 'mod+shift+8',
      command: ({ functions }) => functions.toggleListBulleted(),
    }
  ]
};
