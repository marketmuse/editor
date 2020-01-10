import { Editor, Transforms } from 'slate';

export default (editor) => {

  // generator for all available points that cursor
  // could be placed in the document
  const positions = Editor.positions(editor, { at: [] })

  // yield the first item
  return positions.next().value;
}
