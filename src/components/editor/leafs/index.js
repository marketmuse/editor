import { types } from '@config/common';

import Bold from '@components/editor/leafs/Bold';
import Italic from '@components/editor/leafs/Italic';
import Underline from '@components/editor/leafs/Underline';
import Strikethrough from '@components/editor/leafs/Strikethrough';

export default {
  [types.b]: Bold,
  [types.i]: Italic,
  [types.u]: Underline,
  [types.s]: Strikethrough,
};
