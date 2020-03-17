import { Transforms } from 'slate';
import getDocumentEdgePoint from '@editor/contents/getDocumentEdgePoint';

export default editor => {

  // get start and end
  const startPoint = getDocumentEdgePoint(editor, { edge: 'start' });
  const endPoint = getDocumentEdgePoint(editor);

  // select
  Transforms.select(editor, {
    anchor: startPoint,
    focus: endPoint,
  })
}
