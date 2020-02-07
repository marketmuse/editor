import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
	background-color: black;
	color: white;
	border-radius: 3px;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 4px 8px;
`;

const Toolbar = React.forwardRef((props, ref) => {

	// calculate the location for the inline toolbar
	useEffect(() => {
		// calculations are only needed for inline toolbars
		if (!props.inline) return;
	})

	const styleClass = props.inline
		? 'mms--toolbar-inline'
		: 'mms--toolbar-embedded';

	return (
		<Wrapper
			ref={ref}
			style={style}
			inline={props.inline}
			className={`mms--toolbar ${styleClass} ${props.className || ''}`}
		>
		  Toolbar!
		</Wrapper>
	)
});

export const toolbarPropTypes = {

	// inline styles to wrapper
	style: PropTypes.object,

	// custom class name
	className: PropTypes.string,
	
	// make this an inline toolbar
	inline: PropTypes.bool,
}

Toolbar.propTypes = toolbarPropTypes;

Toolbar.defaultProps = {
	inline: true,
}

export default Toolbar;