import { Editor, Transforms } from 'slate';
import getDocumentEdgePoint from '@editor/utils/getDocumentEdgePoint';
import ensureFocus from '@editor/focus/ensureFocus';

export default editor => {
  ensureFocus(editor);
  Transforms.select(editor, getDocumentEdgePoint(editor));
}
