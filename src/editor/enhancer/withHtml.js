import { Transforms } from 'slate';
import deserializeHtml from '@editor/deserializer/deserializeHtml/deserializeHtml';

export default editor => {

  editor.insertData = data => {
    const htmlString = data.getData('text/html');

    if (htmlString) {
      const fragment = deserializeHtml(htmlString)
      Transforms.insertFragment(editor, fragment)
      return;
    }

    editor.insertData(data);
  }

  return editor;
}
