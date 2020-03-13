import { Transforms } from 'slate';
import hasFocus from '@editor/focus/hasFocus';
import isEmpty from '@editor/contents/isEmpty';
import deserializeText from '@editor/deserializer/deserializeText/deserializeText';

export default (editor, setValue, text) => {
  const fragment = deserializeText(text);

  if (!hasFocus(editor)) {
    setValue(isEmpty(editor)
      ? [].concat(fragment)
      : [].concat(editor.children || []).concat(fragment))
    return;
  }

  Transforms.insertFragment(editor, fragment);
};
