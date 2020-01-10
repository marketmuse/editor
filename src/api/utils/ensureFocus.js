import hasFocus from '../focus/hasFocus';
import focus from '../focus/focus';

export default editor => {
  if (!hasFocus(editor)) focus(editor);
}
