import { Range } from 'slate';

export default editor => {
  // if editor is falsy or has no selection, return null
  if (!editor) return null;
  
  // if editor has no selection, return null
  if (!editor.selection) return null;

  // return collapsed state
  return Range.isCollapsed(editor.selection);
}
