import { Editor, Transforms } from 'slate';
import hasFocus from '@editor/focus/hasFocus';
import isEmpty from '@editor/contents/isEmpty';
import deserializeText from '@editor/deserializer/deserializeText/deserializeText';

const normalize = editor => {
  // execute on the next event loop tick
  setTimeout(() => {
    Editor.normalize(editor, { force: true })
  })
};

export default (editor, setValue, text) => {
  const fragment = deserializeText(text);

  if (!hasFocus(editor)) {
    const newChildren = isEmpty(editor)
      ? [].concat(fragment)
      : [].concat(editor.children || []).concat(fragment);

    setValue(newChildren)
    editor.children = newChildren;
    normalize(editor);
    return;
  }

  Transforms.insertFragment(editor, fragment);
  normalize(editor);
};
