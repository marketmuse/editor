import hasFocus from '@editor/focus/hasFocus';
import focus from '@editor/focus/focus';

export default editor => {
  if (!hasFocus(editor)) focus(editor);
}
