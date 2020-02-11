import React from 'react';
import PropTypes from 'prop-types';

import ToolbarWrapper, { toolbarWrapperPropTypes } from '@components/toolbar/ToolbarWrapper';
import ToolbarButton from '@components/toolbar/ToolbarButton';

const Toolbar = ({ ...props }) => {
	return (
	  <ToolbarWrapper {...props}>
	    <ToolbarButton>b</ToolbarButton>
	    <ToolbarButton disabled>i</ToolbarButton>
	    <ToolbarButton active>u</ToolbarButton>
	  </ToolbarWrapper>
	)
};


export const toolbarPropTypes = {
	...toolbarWrapperPropTypes,
}

Toolbar.propTypes = toolbarPropTypes;

export default Toolbar;