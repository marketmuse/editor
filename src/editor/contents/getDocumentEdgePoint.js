import { Editor } from 'slate';

export default (editor, { edge = 'end' } = {}) => {

  // generator for all available points that cursor
  // could be placed in the document, in reverse order
  const positionsGen = Editor.positions(editor, {
    at: [],
    reverse: edge === 'end', // reverse order for end
  });

  try {
    // yield and get the first item
    return positionsGen.next().value || null;
  } catch (e) {
    // it will fail to yield when editor children
    // is [] and there is nowhere to place the cursor
    // in which case, return null
    return null;
  }
}
