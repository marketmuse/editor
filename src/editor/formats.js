import * as types from '@config/types';
import isFormatActive from '@editor/formatters/isFormatActive';
import isCollapsed from '@editor/cursor/isCollapsed';

export default editor => {

  const isH1 = isFormatActive(editor, 'block', types.HEADING_ONE);
  const isH2 = isFormatActive(editor, 'block', types.HEADING_TWO);
  const isH3 = isFormatActive(editor, 'block', types.HEADING_THREE);
  const isHeading = isH1 || isH2 || isH3;

  return {

    // marks
    isBold: isFormatActive(editor, 'mark', types.BOLD),
    isItalic: isFormatActive(editor, 'mark', types.ITALIC),
    isUnderline: isFormatActive(editor, 'mark', types.UNDERLINE),
    isStrikethrough: isFormatActive(editor, 'mark', types.STRIKETHROUGH),

    // blocks
    isH1,
    isH2,
    isH3,
    isHeading,
    isLink: isFormatActive(editor, 'block', types.LINK),
    isParagraph: isFormatActive(editor, 'block', types.PARAGRAPH),
    isBlockquote: isFormatActive(editor, 'block', types.BLOCKQUOTE),
    isListNumbered: isFormatActive(editor, 'block', types.LIST_NUMBERED),
    isListBulleted: isFormatActive(editor, 'block', types.LIST_BULLETED),

    // misc
    isCollapsed: isCollapsed(editor),

    // TODO: Editor.marks won't return custom formats
    // isDecor: id => isFormatActive(editor, 'mark', getDecoratorKey(id)),
  }
};
