import classHasFocus from '@utils/classHasFocus';

export default editor => {
  const { onChange } = editor;

  let lastSelection = null;

  // enhance onChange method
  editor.onChange = e => {

    // when focused on the editor, update the selection
    if (classHasFocus('mms--editor')) {
      lastSelection = editor.selection;
    }

    // when focused on an ignore-focus type element
    // set the selection to its latest value
    if (classHasFocus('mms--toolbar-ignore-focus')) {
      if (lastSelection) {
        editor.selection = lastSelection;
      }
    }

    // if onChange provided, call it
    if (typeof onChange === 'function') {
      onChange(e);
    }
  }

  return editor;
}
