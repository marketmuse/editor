import { Transforms } from 'slate';

export default editor => {
  Transforms.unwrapNodes(editor, {
    match: n => n.type === 'link'
  })
}
