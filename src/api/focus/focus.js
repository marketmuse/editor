import { ReactEditor } from 'slate-react';

export default editor => {
  try {
    ReactEditor.focus(editor);
  } catch (e) {
    // if the editor isn't mounted, ReactEditor freaks out.
    // no need to make a fuss, just gracefully ignore.
  }
}
