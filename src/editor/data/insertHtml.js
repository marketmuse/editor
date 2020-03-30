import { Editor, Transforms } from 'slate';
import isNil from 'lodash/isNil';
import hasFocus from '@editor/focus/hasFocus';
import isEmpty from '@editor/contents/isEmpty';
import deserializeHtml from '@editor/deserializer/deserializeHtml/deserializeHtml';

const normalize = editor => {
  // execute on the next event loop tick
  setTimeout(() => {
    Editor.normalize(editor, { force: true })
  })
};

export default (editor, setValue, html, htmlDeserializerOptions) => {
  const fragment = deserializeHtml(
    Array.isArray(htmlDeserializerOptions)
      ? htmlDeserializerOptions
      : [htmlDeserializerOptions]
  )(html);

  if (isNil(fragment)) {
    throw new Error('Failed to insert: cannot deserialize');
  }

  if (!hasFocus(editor)) {
    const newChildren = isEmpty(editor)
      ? [].concat(fragment)
      : [].concat(editor.children || []).concat(fragment);

    setValue(newChildren);
    editor.children = newChildren;
    normalize(editor);
    return;
  }

  Transforms.insertFragment(editor, fragment);
  normalize(editor);
};
