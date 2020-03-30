import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import withPersistedSelection from '@editor/enhancer/withPersistedSelection';
import withLinks from '@editor/enhancer/withLinks';
import withDeserializer from '@editor/enhancer/withDeserializer';
import withNormalizer from '@editor/enhancer/withNormalizer';

export default (editor, {
  test,
  htmlDeserializerOptionsList = [],
  normalizerOptionsList = [],
} = {}) => {

  let useEditor = editor;

  if (!test) useEditor = withReact(useEditor);
  useEditor = withPersistedSelection(useEditor);
  useEditor = withHistory(useEditor);
  useEditor = withLinks(useEditor);
  useEditor = withNormalizer(useEditor, normalizerOptionsList);
  useEditor = withDeserializer(useEditor, htmlDeserializerOptionsList);

  return useEditor;
}
