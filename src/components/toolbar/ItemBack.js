import React from 'react';
import PropTypes from 'prop-types';
import ToolbarButton from '@components/toolbar/ToolbarButton';

const ItemBack = props => (
  <ToolbarButton
  	className="mms--toolbar-back"
  	style={props.style}
  	callback={props.callback}
    onClick={props.onClick}
  >
  	←
	</ToolbarButton>
);

ItemBack.propTypes = {
	style: PropTypes.object,
};

export default ItemBack;
