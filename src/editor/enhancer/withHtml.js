import { Transforms } from 'slate';
import deserializeHtml from '@editor/deserializer/deserializeHtml/deserializeHtml';

export default editor => {
  const { insertData, isInline, isVoid } = editor;

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element);
  }

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = data => {
    const html = data.getData('text/html');

    if (html) {
      const parsed = new window.DOMParser().parseFromString(html, 'text/html')
      const fragment = deserializeHtml(parsed.body)
      console.log('fragment', fragment);
      Transforms.insertFragment(editor, fragment)
      return;
    }

    insertData(data);
  }

  return editor;
}
