import { Text, Transforms } from 'slate';
import get from 'lodash/get';
import isLinkActive from '@editor/links/isLinkActive';
import insertLink from '@editor/links/insertLink';
import removeLink from '@editor/links/removeLink';
import getLink from '@editor/links/getLink';
import * as l from '@components/editor/core/elements/Link';

export default (editor, href) => {

  // if no link exists, insert link
  if (!isLinkActive(editor)) insertLink(editor, href);

  // get current link
  const currentLink = getLink(editor);
  const currentLinkText = get(currentLink, 'children[0].text');
  const currentLinkHref = get(currentLink, 'href');

  // if current links anchor text is the same as its current
  // href, we should also replace the anchor text with the new href
  const newLinkText = (currentLinkText === currentLinkHref) ? href : currentLinkText;

  // update current nodes link
  Transforms.setNodes(editor, l.get({ href }), {
    match: n => n.type === l.type
  });

  // update anchor text
  const updatePath = get(editor, 'selection.anchor.path') || get(editor, 'selection.focus.path');
  if (updatePath) Transforms.insertText(editor, newLinkText, { at: updatePath });
}
