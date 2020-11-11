import { Editor, Transforms } from 'slate';
import deserializeHtml from '@editor/deserializer/deserializeHtml/deserializeHtml';
import deserializeText from '@editor/deserializer/deserializeText/deserializeText';

export default (editor, htmlDeserializerOptionsList = []) => {
  const { insertData } = editor;

  editor.insertData = data => {

    const htmlString = data.getData('text/html');
    const textString = data.getData('text/plain');

    if (htmlString) {
      const fragment = deserializeHtml(htmlDeserializerOptionsList)(htmlString);
      Transforms.insertNodes(editor, fragment);
      Editor.normalize(editor, { force: true });
      return;
    }

    // when pasting plain text, deserialize it
    // and insert it as fragment
    if (textString) {
      const fragment = deserializeText(textString);
      Transforms.insertNodes(editor, fragment);
      Editor.normalize(editor, { force: true });
      return;
    }

    insertData(data);
  }

  return editor;
}
