import { Transforms } from 'slate';
import getDocumentEdgePoint from '@editor/contents/getDocumentEdgePoint';

export default editor => {
  Transforms.select(editor, getDocumentEdgePoint(editor));
}
