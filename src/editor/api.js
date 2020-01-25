import focus from '@editor/focus/focus';
import hasFocus from '@editor/focus/hasFocus';
import focusAtEnd from '@editor/focus/focusAtEnd';
import focusAtStart from '@editor/focus/focusAtStart';
import moveCursorToStart from '@editor/cursor/moveCursorToStart';
import moveCursorToEnd from '@editor/cursor/moveCursorToEnd';
import insertLink from '@editor/links/insertLink';
import removeLink from '@editor/links/removeLink';
import selectAll from '@editor/contents/selectAll';
import clear from '@editor/contents/clear';
import populateWindow from '@utils/test/populateWindow';

export default editor => ({

  // actions
  focus: () => focus(editor),
  hasFocus: () => hasFocus(editor),
  focusAtEnd: () => focusAtEnd(editor),
  focusAtStart: () => focusAtStart(editor),
  moveCursorToStart: () => moveCursorToStart(editor),
  moveCursorToEnd: () => moveCursorToEnd(editor),
  selectAll: () => selectAll(editor),
  clear: options => clear(editor, options),
  insertLink: url => insertLink(editor, url),
  removeLink: () => removeLink(editor),

  // internals
  _getEditor: () => editor,
  _populateWindow: () => populateWindow(editor),
});
