import { types } from '@config/common';
import focus from '@editor/focus/focus';
import hasFocus from '@editor/focus/hasFocus';
import moveCursorToStart from '@editor/cursor/moveCursorToStart';
import moveCursorToEnd from '@editor/cursor/moveCursorToEnd';
import getLink from '@editor/links/getLink';
import replaceLink from '@editor/links/replaceLink';
import insertLink from '@editor/links/insertLink';
import removeLink from '@editor/links/removeLink';
import selectAll from '@editor/contents/selectAll';
import clear from '@editor/contents/clear';
import isEmpty from '@editor/contents/isEmpty';
import getPlainText from '@editor/contents/getPlainText';
import toggleFormat from '@editor/formatters/toggleFormat';
import exportFn from '@editor/data/export';
import importFn from '@editor/data/import';
import insertHtml from '@editor/data/insertHtml';
import insertText from '@editor/data/insertText';
import toggleHeading from '@editor/formatters/toggleHeading';
import populateWindow from '@utils/test/populateWindow';

export default (editor, {
  setValue,
  setState,
  htmlDeserializerOptionsList } = {}
) => ({

  // focus
  focus: () => focus(editor),
  hasFocus: () => hasFocus(editor),

  // cursor
  moveCursorToStart: () => moveCursorToStart(editor),
  moveCursorToEnd: () => moveCursorToEnd(editor),

  // content
  selectAll: () => selectAll(editor),
  isEmpty: () => isEmpty(editor),
  clear: () => clear(editor, setValue),
  getPlainText: () => getPlainText(editor),

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
  insertHtml: (html, options) => insertHtml(editor, setValue, html, options || htmlDeserializerOptionsList),
  insertText: text => insertText(editor, setValue, text),

  // state
  setState,

  // internals
  _setValue: setValue,
  _getEditor: () => editor,
  _populateWindow: () => populateWindow(editor),
});
