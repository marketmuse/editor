import formats from '@editor/formats';
import useEditor from '@editor/hooks/useEditor';

export default () => {
  const editor = useEditor();
  return formats(editor);
};
