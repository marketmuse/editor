import React, { useState } from 'react';

import ToolbarButton from '@components/toolbar/ToolbarButton';
import ItemBack from '@components/toolbar/ItemBack';
import ItemSpacer from '@components/toolbar/ItemSpacer';

const SCREEN_DEFAULT = 'default';
const SCREEN_HEADINGS = 'headings';

// Utils

export const BackToDefaultScreen = props => (
	<ItemBack
		onClick={() => props.setScreen(SCREEN_DEFAULT)}
	/>
);

// Headings

export const HeadingsButton = props => (
	<ToolbarButton
		active={props.formats.isHeading}
		onClick={() => props.setScreen(SCREEN_HEADINGS)}
		children={props.children || "H"}
	/>
);

export const HeadingOneButton = props => (
	<ToolbarButton
		active={props.formats.isH1}
		onClick={() => props.api().toggleHeading(1)}
		children={props.children || "H1"}
	/>
);

export const HeadingTwoButton = props => (
	<ToolbarButton
		active={props.formats.isH2}
		onClick={() => props.api().toggleHeading(2)}
		children={props.children || "H2"}
	/>
);

export const HeadingThreeButton = props => (
	<ToolbarButton
		active={props.formats.isH3}
		onClick={() => props.api().toggleHeading(3)}
		children={props.children || "H3"}
	/>
);

// marks

export const BoldButton = props => (
	<ToolbarButton
		active={props.formats.isBold}
		onClick={() => props.api().toggleBold()}
		children={props.children || <b>b</b>}
	/>
);

export const ItalicButton = props => (
	<ToolbarButton
		active={props.formats.isItalic}
		onClick={() => props.api().toggleItalic()}
		children={props.children || <i>i</i>}
	/>
);

export const UnderlineButton = props => (
	<ToolbarButton
		active={props.formats.isUnderline}
		onClick={() => props.api().toggleUnderline()}
		children={props.children || <u>u</u>}
	/>
);

export const StrikeButton = props => (
	<ToolbarButton
		active={props.formats.isStrikethrough}
		onClick={() => props.api().toggleStrikethrough()}
		children={props.children || <s>s</s>}
	/>
);

export default {
	
	// default screen
	default: [
		HeadingsButton,
		ItemSpacer,
		BoldButton,
		ItalicButton,
		UnderlineButton,
		StrikeButton,
	],

	// headings screen
	headings: [
		BackToDefaultScreen,
		HeadingOneButton,
		HeadingTwoButton,
		HeadingThreeButton,
	]
}