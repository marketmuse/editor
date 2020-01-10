import { Editor, Transforms } from 'slate';
import getDocumentEndPoint from '../utils/getDocumentEndPoint';
import ensureFocus from '../utils/ensureFocus';

export default editor => {
  ensureFocus(editor);
  Transforms.select(editor, getDocumentEndPoint(editor));
}
