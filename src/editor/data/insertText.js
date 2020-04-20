import { Editor, Transforms } from 'slate';
import hasFocus from '@editor/focus/hasFocus';
import deserializeText from '@editor/deserializer/deserializeText/deserializeText';

const normalize = editor => {
  // execute on the next event loop tick
  setTimeout(() => {
    Editor.normalize(editor, { force: true })
  })
};

export default (editor, text) => {
  const fragment = deserializeText(text);

  if (!hasFocus(editor)) {
    Transforms.insertFragment(editor, fragment, { at: [0] });
  } else {
    Transforms.insertFragment(editor, fragment);
  }

  normalize(editor);
};
