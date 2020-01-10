import moveCursorToEnd from '../moveCursor/moveCursorToEnd';
import ensureFocus from '../utils/ensureFocus';

export default editor => {
  ensureFocus(editor);
  moveCursorToEnd(editor);
}
