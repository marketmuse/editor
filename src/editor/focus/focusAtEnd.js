import moveCursorToEnd from '@editor/cursor/moveCursorToEnd';
import ensureFocus from '@editor/focus/ensureFocus';

export default editor => {
  ensureFocus(editor);
  moveCursorToEnd(editor);
}
