import { Transforms } from 'slate';
import isNil from 'lodash/isNil';
import hasFocus from '@editor/focus/hasFocus';
import deserializeHtml from '@editor/deserializer/deserializeHtml/deserializeHtml';

export default (editor, setValue, html, htmlDeserializerOptions) => {
  const fragment = deserializeHtml([htmlDeserializerOptions])(html);

  if (isNil(fragment)) {
    throw new Error('Failed to insert: cannot deserialize');
  }

  if (!hasFocus(editor)) {
    // TODO: if editor empty, disregard children
    setValue([].concat(editor.children || []).concat(fragment))
    return;
  }

  Transforms.insertFragment(editor, fragment)
};
