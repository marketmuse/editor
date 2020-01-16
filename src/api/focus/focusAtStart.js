import moveCursorToStart from '../moveCursor/moveCursorToStart';
import ensureFocus from '../../editor/ensureFocus';

export default editor => {
  ensureFocus(editor);
  moveCursorToStart(editor);
}
