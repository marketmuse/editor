import { Range, Transforms } from 'slate';
import isLinkActive from './isLinkActive';
import unwrapLink from './unwrapLink';
import * as l from '../../components/editor/core/elements/Link';

export default (editor, href) => {

  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)

  const link = Object.assign(l.get({ href }), {
    children: isCollapsed ? [{ text: href }] : [],
  })

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}
