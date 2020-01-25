import { Range, Transforms } from 'slate';
import removeLink from '@api/links/removeLink.js';
import isLinkActive from '../../editor/links/isLinkActive';
import * as l from '../../components/editor/core/elements/Link';

export default (editor, href) => {
  if (!editor || !editor.selection) return;

  // if there is an active link within selection,
  // remove the link first
  if (isLinkActive(editor)) removeLink(editor);

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection)

  const linkConfig = l.get({ href });
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
