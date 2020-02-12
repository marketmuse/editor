import React from 'react';
import PropTypes from 'prop-types';

const ItemSpacer = props => (
  <div
  	className="mms--toolbar-spacer"
  	style={props.style}
  />
);

ItemSpacer.propTypes = {
	style: PropTypes.object,
};

export default ItemSpacer;