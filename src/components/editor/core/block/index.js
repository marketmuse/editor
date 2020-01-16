import combineComponents from '../../../../utils/combineComponents';

import * as h1 from './Heading1';
import * as h2 from './Heading2';
import * as h3 from './Heading3';
import * as h4 from './Heading4';
import * as h5 from './Heading5';
import * as h6 from './Heading6';
import * as a from './Link';
import * as p from './Paragraph';
import * as li from './ListItem';
import * as ol from './ListNumbered';
import * as ul from './ListBulleted';
import * as quote from './Blockquote';

export default combineComponents([
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  p,
  li,
  ol,
  ul,
  quote,
]);
