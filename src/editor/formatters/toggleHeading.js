import { Transforms, Editor, Text } from 'slate';
import { type as typeH1 } from '@components/editor/core/elements/HeadingOne';
import { type as typeH2 } from '@components/editor/core/elements/HeadingTwo';
import { type as typeH3 } from '@components/editor/core/elements/HeadingThree';
import toggleFormat from '@editor/formatters/toggleFormat';

export default (editor, level, status) => {
	let useType = null;
	if (level === 1) useType = typeH1;
	if (level === 2) useType = typeH2;
	if (level === 3) useType = typeH3;

	if (useType) {
		toggleFormat(editor, 'block', useType, { status });
	}
}
