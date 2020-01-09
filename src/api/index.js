import focus from './focus/focus';
import hasFocus from './focus/hasFocus';
import focusAtEnd from './focus/focusAtEnd';
import focusAtStart from './focus/focusAtStart';
import moveCursorToStart from './moveCursor/moveCursorToStart';
import moveCursorToEnd from './moveCursor/moveCursorToEnd';
import insertText from './insertText/insertText';

import populateWindow from '../test-utils/populateWindow';

export default editor => ({
  focus: () => focus(editor),
  hasFocus: () => hasFocus(editor),
  focusAtEnd: () => focusAtEnd(editor),
  focusAtStart: () => focusAtStart(editor),
  moveCursorToStart: () => moveCursorToStart(editor),
  moveCursorToEnd: () => moveCursorToEnd(editor),
  insertText: text => insertText(editor, text),

  // internals
  _getEditor: () => editor,
  _populateWindow: () => populateWindow(editor),
});
