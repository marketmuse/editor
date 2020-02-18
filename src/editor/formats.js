import PropTypes from 'prop-types';
import { Range } from 'slate';
import isFormatActive from '@editor/formatters/isFormatActive';
import isCollapsed from '@editor/utils/isCollapsed';
import { key as keyBold } from '@components/editor/core/leafs/Bold';
import { key as keyItalic } from '@components/editor/core/leafs/Italic';
import { key as keyUnderline } from '@components/editor/core/leafs/Underline';
import { key as keyStrikethrough } from '@components/editor/core/leafs/Strikethrough';
import { type as typeP } from '@components/editor/core/elements/Paragraph';
import { type as typeH1 } from '@components/editor/core/elements/HeadingOne';
import { type as typeH2 } from '@components/editor/core/elements/HeadingTwo';
import { type as typeH3 } from '@components/editor/core/elements/HeadingThree';
import { type as typeLink } from '@components/editor/core/elements/Link';
import { type as typeBlockquote } from '@components/editor/core/elements/Blockquote';
import { type as typeListNumbered } from '@components/editor/core/elements/ListNumbered';
import { type as typeListBulleted } from '@components/editor/core/elements/ListBulleted';

export default editor => {

	const isH1 = isFormatActive(editor, 'block', typeH1);
	const isH2 = isFormatActive(editor, 'block', typeH2);
	const isH3 = isFormatActive(editor, 'block', typeH3);
	const isHeading = isH1 || isH2 || isH3;

	return {

		// marks
		isBold: isFormatActive(editor, 'mark', keyBold),
		isItalic: isFormatActive(editor, 'mark', keyItalic),
		isUnderline: isFormatActive(editor, 'mark', keyUnderline),
		isStrikethrough: isFormatActive(editor, 'mark', keyStrikethrough),
		
		// blocks
		isH1,
		isH2,
		isH3,
		isHeading,
		isLink: isFormatActive(editor, 'block', typeLink),
		isParagraph: isFormatActive(editor, 'block', typeP),
		isBlockquote: isFormatActive(editor, 'block', typeBlockquote),
		isListNumbered: isFormatActive(editor, 'block', typeListNumbered),
		isListBulleted: isFormatActive(editor, 'block', typeListBulleted),
		
		// misc
		isCollapsed: isCollapsed(editor),
	}
};
