import { Transforms } from 'slate';
import hasFocus from '@editor/focus/hasFocus';
import deserializeText from '@editor/deserializer/deserializeText/deserializeText';

export default (editor, setValue, text) => {
  const fragment = deserializeText(text);

  if (!hasFocus(editor)) {
    // TODO: if editor empty, disregard children
    setValue([].concat(editor.children || []).concat(fragment))
    return;
  }

  Transforms.insertFragment(editor, fragment);
};
