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

export default editor => ({

	// marks
	isBold: isFormatActive(editor, 'mark', keyBold),
	isItalic: isFormatActive(editor, 'mark', keyItalic),
	isUnderline: isFormatActive(editor, 'mark', keyUnderline),
	isStrikethrough: isFormatActive(editor, 'mark', keyStrikethrough),

	// blocks
	isParagraph: isFormatActive(editor, 'block', typeP),
	isH1: isFormatActive(editor, 'block', typeH1),
	isH2: isFormatActive(editor, 'block', typeH2),
	isH3: isFormatActive(editor, 'block', typeH3),

});
