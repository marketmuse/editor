import isNil from 'lodash/isNil';
import { Transforms } from 'slate';
import ensureFocus from '../../editor/ensureFocus';
import moveCursorToStart from '../moveCursor/moveCursorToStart';
import hasFocus from '../focus/hasFocus';
import initialState from '../../config/initialState';

export default (editor, { hard } = {}) => {
  // set document children to an empty paragraph with some text
  editor.children = initialState;
  // if document already has a selection
  if (!isNil(editor.selection)) {
    // if the editor has focus while clearing, just
    // move the cursor to the start
    if (hasFocus(editor)) moveCursorToStart(editor);
    // if the editor has no focus, set selection to null
    else editor.selection = null;
  }
  // call a transform to trigger an update
  Transforms.insertText(editor, '', { at: [] });
}
