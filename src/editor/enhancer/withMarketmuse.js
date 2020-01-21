import { withHistory } from 'slate-history'
import { withReact } from 'slate-react';
import withLinks from './withLinks';

export default editor => {

  let useEditor = editor;

  useEditor = withReact(useEditor);
  useEditor = withHistory(useEditor);
  useEditor = withLinks(useEditor);

  return useEditor;
}
