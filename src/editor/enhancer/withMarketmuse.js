import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import withPersistedSelection from '@editor/enhancer/withPersistedSelection';
import withLinks from '@editor/enhancer/withLinks';
import withHtml from '@editor/enhancer/withHtml';

export default (editor, { htmlDeserializerOptions, test } = {}) => {

  let useEditor = editor;

  if (!test) useEditor = withReact(useEditor);
  useEditor = withPersistedSelection(useEditor);
  useEditor = withHistory(useEditor);
  useEditor = withLinks(useEditor);
  useEditor = withHtml(useEditor, { htmlDeserializerOptions });

  return useEditor;
}
