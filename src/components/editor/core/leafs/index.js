import { types } from '@config/common';

import Bold from '@components/editor/core/leafs/Bold';
import Italic from '@components/editor/core/leafs/Italic';
import Underline from '@components/editor/core/leafs/Underline';
import Strikethrough from '@components/editor/core/leafs/Strikethrough';

export default {
  [types.b]: Bold,
  [types.i]: Italic,
  [types.u]: Underline,
  [types.s]: Strikethrough,
};
