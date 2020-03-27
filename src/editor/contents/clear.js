import isNil from 'lodash/isNil';
import initialValue, { initialRange } from '@config/initialValue';

export default (editor, setValue) => {

  // set editor children and selection
  editor.children = initialValue;
  if (!isNil(editor.selection)) {
    editor.selection = initialRange;
  }

  // set editor state.
  setValue(initialValue);
}
