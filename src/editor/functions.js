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
import toggleHeading from '@editor/formatters/toggleHeading';
import populateWindow from '@utils/test/populateWindow';

import { key as keyBold } from '@components/editor/core/leafs/Bold';
import { key as keyItalic } from '@components/editor/core/leafs/Italic';
import { key as keyUnderline } from '@components/editor/core/leafs/Underline';
import { key as keyStrikethrough } from '@components/editor/core/leafs/Strikethrough';
import { type as typeBlockquote } from '@components/editor/core/elements/Blockquote';
import { type as typeListBulleted } from '@components/editor/core/elements/ListBulleted';
import { type as typeListNumbered } from '@components/editor/core/elements/ListNumbered';

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
  getLink: () => getLink(editor),
  replaceLink: url => replaceLink(editor, url),
  insertLink: url => insertLink(editor, url),
  removeLink: () => removeLink(editor),

  // formatters
  toggleBold: status => toggleFormat(editor, 'mark', keyBold, { status }),
  toggleItalic: status => toggleFormat(editor, 'mark', keyItalic, { status }),
  toggleUnderline: status => toggleFormat(editor, 'mark', keyUnderline, { status }),
  toggleStrikethrough: status => toggleFormat(editor, 'mark', keyStrikethrough, { status }),
  toggleBlockquote: status => toggleFormat(editor, 'block', typeBlockquote, { status }),
  toggleListBulleted: status => toggleFormat(editor, 'block', typeListBulleted, { status }),
  toggleListNumbered: status => toggleFormat(editor, 'block', typeListNumbered, { status }),
  toggleHeading: (level, status) => toggleHeading(editor, level, status),

  // internals
  _getEditor: () => editor,
  _populateWindow: () => populateWindow(editor),
});
