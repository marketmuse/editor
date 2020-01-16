import moveCursorToEnd from '../moveCursor/moveCursorToEnd';
import ensureFocus from '../../editor/ensureFocus';

export default editor => {
  ensureFocus(editor);
  moveCursorToEnd(editor);
}
