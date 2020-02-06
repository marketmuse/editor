import isFormatActive from '@editor/formatters/isFormatActive';

import { key as keyBold } from '@components/editor/core/leafs/Bold';
import { key as keyItalic } from '@components/editor/core/leafs/Italic';
import { key as keyUnderline } from '@components/editor/core/leafs/Underline';
import { key as keyStrikethrough } from '@components/editor/core/leafs/Strikethrough';

export default editor => ({

	// marks
	isBold: isFormatActive(editor, 'mark', keyBold),
	isItalic: isFormatActive(editor, 'mark', keyItalic),
	isUnderline: isFormatActive(editor, 'mark', keyUnderline),
	isStrikethrough: isFormatActive(editor, 'mark', keyStrikethrough),

	// blocks (todo)

});
