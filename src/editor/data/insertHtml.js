import { Node, Editor, Transforms } from 'slate';
import isNil from 'lodash/isNil';
import hasFocus from '@editor/focus/hasFocus';
import deserializeHtml from '@editor/deserializer/deserializeHtml/deserializeHtml';

const normalize = editor => {
  // execute on the next event loop tick
  setTimeout(() => {
    Editor.normalize(editor, { force: true })
  })
};

export default (editor, html, htmlDeserializerOptions) => {
  const fragment = deserializeHtml(
    Array.isArray(htmlDeserializerOptions)
      ? htmlDeserializerOptions
      : [htmlDeserializerOptions]
  )(html);

  if (isNil(fragment)) {
    throw new Error('Failed to insert: cannot deserialize');
  }

  let at = null;
  if (editor.selection) {
    at = editor.selection
  } else if (editor.children.length > 0) {
    at = Editor.end(editor, [])
  } else {
    at = [0]
  }

  Transforms.insertNodes(editor, fragment);

  if (at && (!at.offset || at.offset === 0)) {
    Transforms.delete(editor, { at })
  }

  normalize(editor);
};
