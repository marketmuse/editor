import moveCursorToStart from '../moveCursor/moveCursorToStart';
import ensureFocus from '../utils/ensureFocus';

export default editor => {
  ensureFocus(editor);
  moveCursorToStart(editor);
}
