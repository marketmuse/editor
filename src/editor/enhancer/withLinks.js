import isUrl from 'is-url'
import wrapLink from '../links/wrapLink';
import * as l from '../../components/editor/core/elements/Link';
export default editor => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = element => {
    return element.type === l.type ? true : isInline(element)
  }

  editor.insertText = text => {
    if (text && isUrl(text)) wrapLink(editor, text);
    else insertText(text);
  }

  editor.insertData = data => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) wrapLink(editor, text);
    else insertData(data);
  }

  return editor;
}
