import { Editor, Transforms } from 'slate';

export default (editor, execCallback) => {
  const { insertData } = editor;

  editor.insertData = data => {

    execCallback('onInsertData', data);

    insertData(data);
  }

  return editor;
}
