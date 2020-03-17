import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import withPersistedSelection from '@editor/enhancer/withPersistedSelection';
import withLinks from '@editor/enhancer/withLinks';
import withDeserializer from '@editor/enhancer/withDeserializer';

export default (editor, { htmlDeserializerOptionsList = [], test } = {}) => {

  let useEditor = editor;

  if (!test) useEditor = withReact(useEditor);
  useEditor = withPersistedSelection(useEditor);
  useEditor = withHistory(useEditor);
  useEditor = withLinks(useEditor);
  useEditor = withDeserializer(useEditor, htmlDeserializerOptionsList);

  return useEditor;
}
