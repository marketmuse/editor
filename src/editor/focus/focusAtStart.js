import moveCursorToStart from '@editor/cursor/moveCursorToStart';
import ensureFocus from '@editor/focus/ensureFocus';

export default editor => {
  ensureFocus(editor);
  moveCursorToStart(editor);
}
