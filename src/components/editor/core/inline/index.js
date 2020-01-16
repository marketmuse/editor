import combineComponents from '../../../../utils/combineComponents';

import * as b from './Bold';
import * as i from './Italic';
import * as s from './Strikethrough';
import * as u from './Underlined';

export default combineComponents([
  b,
  i,
  s,
  u,
]);
