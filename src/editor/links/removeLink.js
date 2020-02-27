import { Transforms } from 'slate';
import { types } from '@config/common';

export default editor => {
  Transforms.unwrapNodes(editor, {
    match: n => n.type === types.a
  })
}
