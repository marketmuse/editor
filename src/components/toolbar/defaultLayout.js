import React, { useState } from 'react';

import ToolbarButton from '@components/toolbar/ToolbarButton';
import ItemBack from '@components/toolbar/ItemBack';
import ItemSpacer from '@components/toolbar/ItemSpacer';

const SCREEN_DEFAULT = 'default';
const SCREEN_HEADINGS = 'headings';

// Utils

const BackToDefaultScreen = props => (
	<ItemBack
		onClick={() => props.setScreen(SCREEN_DEFAULT)}
	/>
);

// Headings

const HeadingsButton = props => (
	<ToolbarButton
		active={props.formats.isHeading}
		onClick={() => props.setScreen(SCREEN_HEADINGS)}
		children="H"
	/>
);

const HeadingOneButton = props => (
	<ToolbarButton
		active={props.formats.isH1}
		onClick={() => props.api().toggleHeading(1)}
		children="H1"
	/>
);

const HeadingTwoButton = props => (
	<ToolbarButton
		active={props.formats.isH2}
		onClick={() => props.api().toggleHeading(2)}
		children="H2"
	/>
);

const HeadingThreeButton = props => (
	<ToolbarButton
		active={props.formats.isH3}
		onClick={() => props.api().toggleHeading(3)}
		children="H3"
	/>
);

// marks

const BoldButton = props => (
	<ToolbarButton
		active={props.formats.isBold}
		onClick={() => props.api().toggleBold()}
		children={<b>b</b>}
	/>
);

const ItalicButton = props => (
	<ToolbarButton
		active={props.formats.isItalic}
		onClick={() => props.api().toggleItalic()}
		children={<i>i</i>}
	/>
);

const UnderlineButton = props => (
	<ToolbarButton
		active={props.formats.isUnderline}
		onClick={() => props.api().toggleUnderline()}
		children={<u>u</u>}
	/>
);

const StrikeButton = props => (
	<ToolbarButton
		active={props.formats.isStrikethrough}
		onClick={() => props.api().toggleStrikethrough()}
		children={<s>s</s>}
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