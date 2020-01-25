import { Transforms } from 'slate';
import * as link from '@components/editor/core/elements/Link';

export default editor => {
  Transforms.unwrapNodes(editor, {
    match: n => n.type === link.type
  })
}
