import { withReact } from 'slate-react';
import { withHistory } from 'slate-history'
import withLinks from '@editor/enhancer/withLinks';
import withPersistedSelection from '@editor/enhancer/withPersistedSelection';

export default (editor, { test } = {}) => {

  let useEditor = editor;

  if (!test) useEditor = withReact(useEditor);
  useEditor = withPersistedSelection(useEditor);
  useEditor = withHistory(useEditor);
  useEditor = withLinks(useEditor);

  return useEditor;
}
