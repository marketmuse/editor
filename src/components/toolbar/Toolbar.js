import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import ToolbarWrapper, { toolbarWrapperPropTypes } from '@components/toolbar/ToolbarWrapper';
import defaultLayout from '@components/toolbar/defaultLayout';

const ToolbarComponent = ({ api, formats, layout = {}, ...wrapperProps }) => {

	// toolbar screen state
	const [screen, setScreen] = useState(null);

	// get current screen component from layout
	const screenElements = get(layout, screen, get(layout, 'default'));
	if (!screenElements) return null;

	return (
	  <ToolbarWrapper {...wrapperProps}>
	    {screenElements.map(ScreenItem => (
	    	<ScreenItem
	    		api={api}
	    		formats={formats}
	    		setScreen={setScreen}
	    	/>
	    ))}
	  </ToolbarWrapper>
	)
};

export const toolbarPropTypes = {
	...toolbarWrapperPropTypes,

	// pass down api with editor instance in closure
	api: PropTypes.func.isRequired,

	// layout of the toolbar
	layout: PropTypes.object,

	// formats
	formats: PropTypes.object,
}

ToolbarComponent.propTypes = toolbarPropTypes;
ToolbarComponent.defaultProps = { layout: defaultLayout }

export default ToolbarComponent;
