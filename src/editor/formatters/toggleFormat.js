import { Editor, Transforms, Text } from 'slate';
import isNil from 'lodash/isNil';
import { types } from '@config/common';
import isFormatActive from '@editor/formatters/isFormatActive';
import normalizeSelection from '@editor/selection/normalizeSelection';

export default (editor, type, format, { status } = {}) => {
  Editor.withoutNormalizing(editor, () => {

    // fix selection anormalities
    normalizeSelection(editor);

    // toggle to opposite state
    const isActive = isFormatActive(editor, type, format)
    let toggleOn = !isActive;

    // if status specified, toggle to that
    if (!isNil(status)) toggleOn = status;

    // mark type. split if text
    if (type === 'mark') {
      Transforms.setNodes(
        editor,
        { [format]: toggleOn || null },
        { match: Text.isText, split: true }
      );
    } else {
      // block type

      // are we toggling a list type ?
      const listTypeTypes = [types.ol, types.ul];
      const isListType = listTypeTypes.includes(format);

      // if toggling list node, unwrap it first
      Transforms.unwrapNodes(editor, {
        match: n => listTypeTypes.includes(n.type),
        split: true,
      })

      // if toggling off, set block to the default block type (ie. paragraph)
      // otherwise, set to the desired format it is a non-list format. if it is
      // a list format, set block to list-item format (and wrap it around the list
      // format later on)
      Transforms.setNodes(editor, {
        type: !toggleOn
          ? types.p
          : (isListType ? types.li : format)
      })

      // if toggling on a list type, wrap the list
      // item children around parent list format
      if (toggleOn && isListType) {
        Transforms.wrapNodes(editor, {
          type: format,
          children: []
        })
      }
    }
  });
}
