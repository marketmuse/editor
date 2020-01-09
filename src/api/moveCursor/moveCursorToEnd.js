import { Editor, Transforms } from 'slate';

export default editor => {

  // generator for all available points that cursor
  // could be placed in the document, in reverse order
  const positions = Editor.positions(editor, { at: [], reverse: true })

  // yield the first (ie. last) item
  const endPoint = positions.next().value;

  // move cursor to beginning
  Transforms.select(editor, endPoint)
}
