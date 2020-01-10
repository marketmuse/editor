import { Editor, Transforms } from 'slate';
import getDocumentStartPoint from '../utils/getDocumentStartPoint';
import ensureFocus from '../utils/ensureFocus';

export default editor => {
  ensureFocus(editor);
  Transforms.select(editor, getDocumentStartPoint(editor))
}
