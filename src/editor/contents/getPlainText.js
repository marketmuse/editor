import { Node } from 'slate';

export default editor => {
  if (!editor || !editor.children || !Array.isArray(editor.children)) {
    return null;
  }

  return editor.children.map(n => Node.string(n)).join('\n')
}
