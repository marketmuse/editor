import hasFocus from '../api/focus/hasFocus';
import focus from '../api/focus/focus';

export default editor => {
  if (!hasFocus(editor)) focus(editor);
}
