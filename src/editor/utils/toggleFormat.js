import { Transforms, Editor, Text } from 'slate';
import isFormatActive from '@editor/utils/isFormatActive';

export default (editor, format) => {
  const isActive = isFormatActive(editor, format)
  
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  );
}
