import { Transforms, Editor, Text } from 'slate';
import { type } from '@components/editor/core/elements/ListBulleted';
import toggleFormat from '@editor/formatters/toggleFormat';

export default (editor, status) => {
  toggleFormat(editor, 'block', type, { status });
}
