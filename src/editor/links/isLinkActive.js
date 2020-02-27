import { Editor } from 'slate';
import { types } from '@config/common';

export default editor => {
  const [link] = Editor.nodes(editor, {
    match: n => n.type === types.a
  });

  return !!link
}
