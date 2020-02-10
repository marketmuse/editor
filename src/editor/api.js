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
import toggleBold from '@editor/formatters/toggleBold';
import toggleItalic from '@editor/formatters/toggleItalic';
import toggleUnderline from '@editor/formatters/toggleUnderline';
import toggleStrikethrough from '@editor/formatters/toggleStrikethrough';
import toggleHeading from '@editor/formatters/toggleHeading';
import toggleBlockquote from '@editor/formatters/toggleBlockquote';
import populateWindow from '@utils/test/populateWindow';

export default editor => ({

  // focus
  focus: () => focus(editor),
  hasFocus: () => hasFocus(editor),
  focusAtEnd: () => focusAtEnd(editor),
  focusAtStart: () => focusAtStart(editor),
  
  // cursor
  moveCursorToStart: () => moveCursorToStart(editor),
  moveCursorToEnd: () => moveCursorToEnd(editor),
  
  // content
  selectAll: () => selectAll(editor),
  clear: () => clear(editor),
  
  // links
  insertLink: url => insertLink(editor, url),
  removeLink: () => removeLink(editor),
  
  // formatters
  toggleBold: status => toggleBold(editor, status),
  toggleItalic: status => toggleItalic(editor, status),
  toggleUnderline: status => toggleUnderline(editor, status),
  toggleStrikethrough: status => toggleStrikethrough(editor, status),
  toggleHeading: (level, status) => toggleHeading(editor, level, status),
  toggleBlockquote: status => toggleBlockquote(editor, status),

  // internals
  _getEditor: () => editor,
  _populateWindow: () => populateWindow(editor),
});
