import isNil from 'lodash/isNil';
import initialState, { initialRange } from '@config/initialState';

export default (editor, setValue) => {

  // set editor children and selection
  editor.children = initialState;
  if (!isNil(editor.selection)) {
    editor.selection = initialRange;
  }

  // set editor state.
  setValue(initialState);
}
