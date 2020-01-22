import { withReact } from 'slate-react';
import { withHistory } from 'slate-history'
import withLinks from './withLinks';

export default (editor, { test } = {}) => {

  let useEditor = editor;

  if (!test) useEditor = withReact(useEditor);
  useEditor = withHistory(useEditor);
  useEditor = withLinks(useEditor);

  return useEditor;
}
