import { Transforms, Editor, Text } from 'slate';
import { key } from '@components/editor/core/leafs/Underline';
import toggleFormat from '@editor/utils/toggleFormat';

export default (editor, status) => {
  toggleFormat(editor, 'mark', key, { status });
}
