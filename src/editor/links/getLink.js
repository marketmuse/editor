import { Editor } from 'slate';
import * as l from '@components/editor/core/elements/Link';

export default editor => {
  
	// find link nodes within selection
  const [link] = Editor.nodes(editor, {
    match: n => n.type === l.type
  });

  // if no links within selection, (or no selection), return null
  if (!link || !Array.isArray(link) || !link[0]) return null;
  
  // return link data
  return link[0];
}
