import { Editor } from 'slate';
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
