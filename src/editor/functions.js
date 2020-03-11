import { types } from '@config/common';
import focus from '@editor/focus/focus';
import hasFocus from '@editor/focus/hasFocus';
import focusAtEnd from '@editor/focus/focusAtEnd';
import focusAtStart from '@editor/focus/focusAtStart';
import moveCursorToStart from '@editor/cursor/moveCursorToStart';
import moveCursorToEnd from '@editor/cursor/moveCursorToEnd';
import getLink from '@editor/links/getLink';
import replaceLink from '@editor/links/replaceLink';
import insertLink from '@editor/links/insertLink';
import removeLink from '@editor/links/removeLink';
import selectAll from '@editor/contents/selectAll';
import clear from '@editor/contents/clear';
import toggleFormat from '@editor/formatters/toggleFormat';
import exportFn from '@editor/data/export';
import importFn from '@editor/data/import';
import toggleHeading from '@editor/formatters/toggleHeading';
import populateWindow from '@utils/test/populateWindow';

export default (editor, setValue) => ({

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
  clear: () => clear(editor, setValue),

  // links
  getLink: () => getLink(editor),
  replaceLink: url => replaceLink(editor, url),
  insertLink: url => insertLink(editor, url),
  removeLink: () => removeLink(editor),

  // formatters
  toggleBold: status => toggleFormat(editor, 'mark', types.b, { status }),
  toggleItalic: status => toggleFormat(editor, 'mark', types.i, { status }),
  toggleUnderline: status => toggleFormat(editor, 'mark', types.u, { status }),
  toggleStrikethrough: status => toggleFormat(editor, 'mark', types.s, { status }),
  toggleBlockquote: status => toggleFormat(editor, 'block', types.q, { status }),
  toggleListBulleted: status => toggleFormat(editor, 'block', types.ul, { status }),
  toggleListNumbered: status => toggleFormat(editor, 'block', types.ol, { status }),
  toggleHeading: (level, status) => toggleHeading(editor, level, status),

  // data
  import: raw => importFn(editor, setValue, raw),
  export: options => exportFn(editor, options),

  // internals
  _getEditor: () => editor,
  _populateWindow: () => populateWindow(editor),
});
