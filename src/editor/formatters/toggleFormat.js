import { Transforms, Text } from 'slate';
import isNil from 'lodash/isNil';
import isFormatActive from '@editor/formatters/isFormatActive';
import { defaultElement, listTypes } from '@components/editor/core/elements';
import * as listItem from '@components/editor/core/elements/ListItem';

export default (editor, type, format, { status } = {}) => {

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
    const listTypeTypes = listTypes.map(t => t.type);
    const isListType = listTypeTypes.includes(format);

    // if toggling on, set to desired format otherwise
    // turn block into the default format (ie. paragraph)
    const setToFormat = toggleOn ? format : defaultElement.type;

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
        ? defaultElement.type
        : (isListType ? listItem.type : format)
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
}
