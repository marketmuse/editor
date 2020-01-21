import React from 'react';
import PropTypes from 'prop-types';
import combineComponents from '../../../utils/combineComponents';

import * as bq from './elements/Blockquote';
import * as p from './elements/Paragraph';
import * as h from './elements/Heading';
import * as a from './elements/Link';
import * as ul from './elements/ListBulleted';
import * as ol from './elements/ListNumbered';
import * as li from './elements/ListItem';

const Element = props => (
  <span />
);

Element.propTypes = {
};

export const elements = combineComponents([
  bq,
  p,
  h,
  a,
  ul,
  ol,
  li,
]);

export default Element;
