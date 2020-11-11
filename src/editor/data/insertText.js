import { Editor, Node, Transforms } from 'slate';
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

  let at = null;
  if (editor.selection) {
    at = editor.selection
  } else if (editor.children.length > 0) {
    at = Editor.end(editor, [])
  } else {
    at = [0]
  }
  
  Transforms.insertNodes(editor, fragment);
  
  Transforms.delete(editor, { at })

  normalize(editor);
};
