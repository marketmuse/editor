import { Transforms } from 'slate';

/**
 * This fixes the issue where double clicking on a block extends the selection to
 * the beginning of the next block; and Transformations that includes wrapping, such
 * as making a block a list item, effects the next block.
 * ---
 * When a selection starts from the a block and extends until the offset 0 of the next
 * block, move selection up to the end of the block.
 *
 * Input:
 * {
 *   anchor: { offset: x, path: [ n, _, _, ... ] },
 *   focus: { offset: 0, path: [ n + 1, _, _, ... ] }
 * }
* Output:
 * {
 *   anchor: { offset: x, path: [ n, _, _, ... ] },
 *   focus: { offset: <block_end>, path: [ n, _, _, ... ] }
 * }
 */

export default editor => {
  if (!editor.selection) return;

  const anchor = editor.selection.anchor;
  const focus = editor.selection.focus;

  if (!anchor || !anchor.path) return;
  if (!focus || !focus.path) return;

  const extendsToNextBlock = anchor.path[0] + 1 === focus.path[0];
  const focusAtOffsetZero = focus.offset === 0;

  if (extendsToNextBlock && focusAtOffsetZero) {
    Transforms.move(editor, {
      distance: 1,
      unit: 'offset',
      reverse: true,
    })
  }
}
