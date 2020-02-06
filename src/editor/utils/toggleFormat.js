import { Transforms, Editor, Text } from 'slate';
import isNil from 'lodash/isNil';
import isFormatActive from '@editor/utils/isFormatActive';

export default (editor, format, status) => {
  
	// toggle to opposite state
  const isActive = isFormatActive(editor, format)
  let toggleTo = isActive ? null : true;

  // if status specified, toggle to that
  if (!isNil(status)) toggleTo = status;

  // transform, split if text
  Transforms.setNodes(
    editor,
    { [format]: toggleTo || null },
    { match: Text.isText, split: true }
  );
}
