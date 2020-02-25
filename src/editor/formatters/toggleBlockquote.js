import { type } from '@components/editor/core/elements/Blockquote';
import toggleFormat from '@editor/formatters/toggleFormat';

export default (editor, status) => {
  toggleFormat(editor, 'block', type, { status });
}
