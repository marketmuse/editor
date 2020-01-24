import unwrapLink from '../../editor/links/unwrapLink';
import ensureFocus from '../../editor/ensureFocus';

export default editor => {
  ensureFocus(editor);
  unwrapLink(editor);
}
