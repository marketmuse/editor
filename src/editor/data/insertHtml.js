import { Transforms } from 'slate';
import isNil from 'lodash/isNil';
import hasFocus from '@editor/focus/hasFocus';
import isEmpty from '@editor/contents/isEmpty';
import deserializeHtml from '@editor/deserializer/deserializeHtml/deserializeHtml';

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
    setValue(isEmpty(editor)
      ? [].concat(fragment)
      : [].concat(editor.children || []).concat(fragment))
    return;
  }

  Transforms.insertFragment(editor, fragment)
};
