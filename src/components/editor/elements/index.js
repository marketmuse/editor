import { types } from '@config/common';

import Paragraph from '@components/editor/elements/Paragraph';
import Blockquote from '@components/editor/elements/Blockquote';
import HeadingOne from '@components/editor/elements/HeadingOne';
import HeadingTwo from '@components/editor/elements/HeadingTwo';
import HeadingThree from '@components/editor/elements/HeadingThree';
import Link from '@components/editor/elements/Link';
import ListBulleted from '@components/editor/elements/ListBulleted';
import ListNumbered from '@components/editor/elements/ListNumbered';
import ListItem from '@components/editor/elements/ListItem';

export default {
  [types.p]: Paragraph,
  [types.q]: Blockquote,
  [types.h1]: HeadingOne,
  [types.h2]: HeadingTwo,
  [types.h3]: HeadingThree,
  [types.a]: Link,
  [types.ul]: ListBulleted,
  [types.ol]: ListNumbered,
  [types.li]: ListItem,
};
