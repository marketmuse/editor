import { Editor, Transforms } from 'slate';
import getDocumentEdgePoint from '../utils/getDocumentEdgePoint';
import ensureFocus from '../utils/ensureFocus';

export default editor => {
  ensureFocus(editor);
  Transforms.select(editor, getDocumentEdgePoint(editor));
}
