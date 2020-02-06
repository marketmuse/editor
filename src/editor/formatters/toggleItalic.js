import { Transforms, Editor, Text } from 'slate';
import { key } from '@components/editor/core/leafs/Italic';
import toggleFormat from '@editor/utils/toggleFormat';

export default (editor, status) => {
  toggleFormat(editor, key, status);
}
