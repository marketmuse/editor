import { Editor } from 'slate';
import * as l from '../../components/editor/core/elements/Link';

export default editor => {
  const [link] = Editor.nodes(editor, {
    match: n => n.type === l.type
  });

  return !!link
}
