import PropTypes from 'prop-types';
import isFormatActive from '@editor/formatters/isFormatActive';

// marks
import { key as keyBold } from '@components/editor/core/leafs/Bold';
import { key as keyItalic } from '@components/editor/core/leafs/Italic';
import { key as keyUnderline } from '@components/editor/core/leafs/Underline';
import { key as keyStrikethrough } from '@components/editor/core/leafs/Strikethrough';

// blocks
import { type as typeP } from '@components/editor/core/elements/Paragraph';
import { type as typeH1 } from '@components/editor/core/elements/HeadingOne';
import { type as typeH2 } from '@components/editor/core/elements/HeadingTwo';
import { type as typeH3 } from '@components/editor/core/elements/HeadingThree';
import { type as typeBlockquote } from '@components/editor/core/elements/Blockquote';
import { type as typeListNumbered } from '@components/editor/core/elements/ListNumbered';
import { type as typeListBulleted } from '@components/editor/core/elements/ListBulleted';

export default editor => {

	// marks
	const isBold = isFormatActive(editor, 'mark', keyBold);
	const isItalic = isFormatActive(editor, 'mark', keyItalic);
	const isUnderline = isFormatActive(editor, 'mark', keyUnderline);
	const isStrikethrough = isFormatActive(editor, 'mark', keyStrikethrough);

	// blocks
	const isH1 = isFormatActive(editor, 'block', typeH1);
	const isH2 = isFormatActive(editor, 'block', typeH2);
	const isH3 = isFormatActive(editor, 'block', typeH3);
	const isHeading = (isH1 || isH2 || isH3);
	const isParagraph = isFormatActive(editor, 'block', typeP);
	const isBlockquote = isFormatActive(editor, 'block', typeBlockquote);
	const isListNumbered = isFormatActive(editor, 'block', typeListNumbered);
	const isListBulleted = isFormatActive(editor, 'block', typeListBulleted);

	return {
		isBold,
		isItalic,
		isUnderline,
		isStrikethrough,
		isH1,
		isH2,
		isH3,
		isHeading,
		isParagraph,
		isBlockquote,
		isListNumbered,
		isListBulleted,
	}
};
