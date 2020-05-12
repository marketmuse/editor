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
      // TODO: a bug is causing the first node in a fragment to
      // merge with the existing first node, causing it to lose
      // its type to the first node. so insert an empty node for now.
      fragment.unshift({ text: '' });
      Transforms.insertFragment(editor, fragment);
      Editor.normalize(editor, { force: true });
      return;
    }

    // when pasting plain text, deserialize it
    // and insert it as fragment
    if (textString) {
      const fragment = deserializeText(textString);
      Transforms.insertFragment(editor, fragment);
      Editor.normalize(editor, { force: true });
      return;
    }

    insertData(data);
  }

  return editor;
}
