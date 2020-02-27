import { Range, Transforms } from 'slate';
import { attrs } from '@config/common';
import removeLink from '@editor/links/removeLink';
import isLinkActive from '@editor/links/isLinkActive';

export default (editor, href) => {
  if (!editor || !editor.selection) return;

  // if there is an active link within selection,
  // remove the link first
  if (isLinkActive(editor)) removeLink(editor);

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection)

  const linkConfig = attrs.a({ href });
  const link = Object.assign(linkConfig, {
    children: isCollapsed ? [{ text: href }] : [],
  })

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}
