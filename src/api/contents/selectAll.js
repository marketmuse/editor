import { Editor, Transforms } from 'slate';
import getDocumentEndPoint from '../utils/getDocumentEndPoint';
import getDocumentStartPoint from '../utils/getDocumentStartPoint';
import ensureFocus from '../utils/ensureFocus';

export default editor => {
  ensureFocus(editor);

  // get start and end
  const startPoint = getDocumentStartPoint(editor);
  const endPoint = getDocumentEndPoint(editor);

  // select
  Transforms.select(editor, {
    anchor: startPoint,
    focus: endPoint,
  })
}
