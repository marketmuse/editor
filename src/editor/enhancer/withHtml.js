import { types } from '@config/common';
import { Transforms } from 'slate';
import deserializeHtml from '@editor/deserializer/deserializeHtml/deserializeHtml';

export default (editor, options = []) => {

  editor.insertData = data => {
    const htmlString = data.getData('text/html');

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

    editor.insertData(data);
  }

  return editor;
}
