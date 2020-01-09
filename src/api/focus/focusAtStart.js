import moveCursorToStart from '../moveCursorToStart/moveCursorToStart';
import hasFocus from '../hasFocus/hasFocus';
import focus from '../focus/focus';

export default editor => {

  // focus first
  if (!hasFocus(editor)) focus(editor);

  // move cursor to the start
  moveCursorToStart(editor);
}
