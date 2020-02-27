import { types } from '@config/common';

import Paragraph from '@components/editor/core/elements/Paragraph';
import Blockquote from '@components/editor/core/elements/Blockquote';
import HeadingOne from '@components/editor/core/elements/HeadingOne';
import HeadingTwo from '@components/editor/core/elements/HeadingTwo';
import HeadingThree from '@components/editor/core/elements/HeadingThree';
import Link from '@components/editor/core/elements/Link';
import ListBulleted from '@components/editor/core/elements/ListBulleted';
import ListNumbered from '@components/editor/core/elements/ListNumbered';
import ListItem from '@components/editor/core/elements/ListItem';

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
