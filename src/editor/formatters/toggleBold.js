import { key } from '@components/editor/core/leafs/Bold';
import toggleFormat from '@editor/formatters/toggleFormat';

export default (editor, status) => {
  toggleFormat(editor, 'mark', key, { status });
}
