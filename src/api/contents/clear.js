import { Transforms } from 'slate';
import selectAll from './selectAll';
import ensureFocus from '../utils/ensureFocus';

export default (editor, { hard } = {}) => {

  // Transform.delete preserves the block structure, only
  // clears textual content. That's also the default backspace
  // behaviour. If you want to make sure editor is in a clean state,
  // use hard clear, which removes all nodes and selection.
  if (hard) {
    // TODO: is it better to do this using Transforms ?
    editor.children = [];
    editor.selection = null;
  } else {
    ensureFocus(editor);
    selectAll(editor);
    Transforms.delete(editor);
  }
}
