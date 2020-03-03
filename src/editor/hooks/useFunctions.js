import functions from '@editor/functions';
import useEditor from '@editor/hooks/useEditor';

export default () => {
  const editor = useEditor();
  return functions(editor);
};
