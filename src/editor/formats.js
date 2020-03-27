import { types } from '@config/common';
import isFormatActive from '@editor/formatters/isFormatActive';
import isCollapsed from '@editor/cursor/isCollapsed';
import isFocused from '@editor/focus/hasFocus';

export default (editor, { state }) => {

  const isH1 = isFormatActive(editor, 'block', types.h1);
  const isH2 = isFormatActive(editor, 'block', types.h2);
  const isH3 = isFormatActive(editor, 'block', types.h3);
  const isHeading = isH1 || isH2 || isH3;

  return {

    // marks
    isBold: isFormatActive(editor, 'mark', types.b),
    isItalic: isFormatActive(editor, 'mark', types.i),
    isUnderline: isFormatActive(editor, 'mark', types.u),
    isStrikethrough: isFormatActive(editor, 'mark', types.s),

    // blocks
    isH1,
    isH2,
    isH3,
    isHeading,
    isLink: isFormatActive(editor, 'block', types.a),
    isParagraph: isFormatActive(editor, 'block', types.p),
    isBlockquote: isFormatActive(editor, 'block', types.q),
    isListNumbered: isFormatActive(editor, 'block', types.ol),
    isListBulleted: isFormatActive(editor, 'block', types.ul),

    // misc
    isCollapsed: isCollapsed(editor),
    isFocused: isFocused(editor),

    // state
    state,

    // TODO: Editor.marks won't return custom formats
    // isDecor: id => isFormatActive(editor, 'mark', getDecoratorKey(id)),
  }
};
