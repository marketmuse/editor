import { ReactEditor } from 'slate-react';

export default editor => {
  return ReactEditor.isFocused(editor);
}
