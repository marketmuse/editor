import wrapLink from '../../editor/links/wrapLink';
import ensureFocus from '../../editor/ensureFocus';

export default (editor, url) => {
  ensureFocus(editor);
  wrapLink(editor, url);
}
