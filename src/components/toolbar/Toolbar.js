import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import ToolbarWrapper, { toolbarWrapperPropTypes } from '@components/toolbar/ToolbarWrapper';
import defaultLayout from '@components/toolbar/defaultLayout';

const ToolbarComponent = ({ functions, formats, layout = {}, ...wrapperProps }) => {

	// toolbar screen state
	const [screen, setScreen] = useState(null);

	// get current screen component from layout
	const screenElements = get(layout, screen, get(layout, 'default'));
	if (!screenElements) return null;

	return (
	  <ToolbarWrapper {...wrapperProps}>
	    {screenElements.map(ScreenItem => (
	    	<ScreenItem
	    		functions={functions}
	    		formats={formats}
	    		setScreen={setScreen}
	    	/>
	    ))}
	  </ToolbarWrapper>
	)
};

export const toolbarPropTypes = {
	...toolbarWrapperPropTypes,

	// layout of the toolbar
	layout: PropTypes.object,

	// formats object
	formats: PropTypes.object,

	// functions object
	functions: PropTypes.object.isRequired,
}

ToolbarComponent.propTypes = toolbarPropTypes;
ToolbarComponent.defaultProps = { layout: defaultLayout }

export default ToolbarComponent;
