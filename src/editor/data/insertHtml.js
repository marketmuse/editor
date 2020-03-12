import { Transforms } from 'slate';
import isNil from 'lodash/isNil';
import deserializeHtml from '@editor/deserializer/deserializeHtml/deserializeHtml';

export default (editor, html, htmlDeserializerOptions) => {
  const fragment = deserializeHtml([htmlDeserializerOptions])(html);

  if (isNil(fragment)) {
    throw new Error('Failed to insert: cannot deserialize');
  }

  Transforms.insertFragment(editor, fragment)
};
