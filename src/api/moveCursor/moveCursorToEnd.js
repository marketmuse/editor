import { Editor, Transforms } from 'slate';
import getDocumentEdgePoint from '../../editor/getDocumentEdgePoint';
import ensureFocus from '../../editor/ensureFocus';

export default editor => {
  ensureFocus(editor);
  Transforms.select(editor, getDocumentEdgePoint(editor));
}
