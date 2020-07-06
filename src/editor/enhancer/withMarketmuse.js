import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import withPersistedSelection from '@editor/enhancer/withPersistedSelection';
import withLinks from '@editor/enhancer/withLinks';
import withDeserializer from '@editor/enhancer/withDeserializer';
import withNormalizer from '@editor/enhancer/withNormalizer';
import withOnInsertData from '@editor/enhancer/withOnInsertData';
import getExecuteCallback from '@editor/events/getExecuteCallback';

export default (editor, {
  test,
  htmlDeserializerOptionsList = [],
  normalizerOptionsList = [],
  callbacks,
} = {}) => {

  // this is a function which will run callbacks before editor initialization
  // and act as an enhancer, so it will not have access to typical arguments
  const execCallback = getExecuteCallback(callbacks, null);

  let useEditor = editor;

  if (!test) useEditor = withReact(useEditor);
  useEditor = withPersistedSelection(useEditor);
  useEditor = withHistory(useEditor);
  useEditor = withLinks(useEditor);
  useEditor = withNormalizer(useEditor, normalizerOptionsList);
  useEditor = withDeserializer(useEditor, htmlDeserializerOptionsList);
  useEditor = withOnInsertData(useEditor, execCallback);

  return useEditor;
}
