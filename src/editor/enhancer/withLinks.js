import isValidUrl from '@utils/isValidUrl';
import insertLink from '@editor/links/insertLink';
import * as l from '@components/editor/core/elements/Link';

export default editor => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = element => {
    return element.type === l.type ? true : isInline(element)
  }

  editor.insertText = text => {
    if (text && isValidUrl(text)) insertLink(editor, text);
    else insertText(text);
  }

  editor.insertData = data => {
    const text = data.getData('text/plain');

    if (text && isValidUrl(text)) insertLink(editor, text);
    else insertData(data);
  }

  return editor;
}
