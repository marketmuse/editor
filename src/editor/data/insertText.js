import { Transforms } from 'slate';
import deserializeText from '@editor/deserializer/deserializeText/deserializeText';

export default (editor, text) => {
  const fragment = deserializeText(text);
  Transforms.insertFragment(editor, fragment);
};
