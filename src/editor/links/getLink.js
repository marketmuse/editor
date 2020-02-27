import { Editor } from 'slate';
import { types } from '@config/common';

export default editor => {

  // find link nodes within selection
  const [link] = Editor.nodes(editor, {
    match: n => n.type === types.a
  });

  // if no links within selection, (or no selection), return null
  if (!link || !Array.isArray(link) || !link[0]) return null;

  // return link data
  return link[0];
}
