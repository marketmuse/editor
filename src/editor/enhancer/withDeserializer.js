import { types } from '@config/common';
import { Transforms } from 'slate';
import deserializeHtml from '@editor/deserializer/deserializeHtml/deserializeHtml';
import deserializeText from '@editor/deserializer/deserializeText/deserializeText';

export default (editor, options = []) => {

  editor.insertData = data => {
    const htmlString = data.getData('text/html');
    const textString = data.getData('text/plain');

    if (htmlString) {
      const fragment = deserializeHtml(options)(htmlString);

      // TODO: for some reason slate always inserts the first node as
      // type paragraph. For now as a workaround, insert an empty paragraph
      // manually to the beginning
      Transforms.insertFragment(editor, [{
        type: types.p,
        children: [],
      }, ...fragment])

      return;
    }

    // when pasting plain text, deserialize it
    // and insert it as fragment
    if (textString) {
      const fragment = deserializeText(textString);
      Transforms.insertFragment(editor, fragment);
      return;
    }

    editor.insertData(data);
  }

  return editor;
}
