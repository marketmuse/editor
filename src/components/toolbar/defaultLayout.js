import React, { useState } from 'react';

import { ReactComponent as IconHeadings } from '@assets/heading.svg';
import { ReactComponent as IconHeadingOne } from '@assets/heading1.svg';
import { ReactComponent as IconHeadingTwo } from '@assets/heading2.svg';
import { ReactComponent as IconHeadingThree } from '@assets/heading3.svg';
import { ReactComponent as IconBold } from '@assets/bold.svg';
import { ReactComponent as IconItalic } from '@assets/italic.svg';
import { ReactComponent as IconUnderline } from '@assets/underline.svg';
import { ReactComponent as IconStrikethrough } from '@assets/strikethrough.svg';

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
		children={props.children || <IconHeadings  />}
	/>
);

export const HeadingOneButton = props => (
	<ToolbarButton
		active={props.formats.isH1}
		onClick={() => props.functions.toggleHeading(1)}
		children={props.children || <IconHeadingOne />}
	/>
);

export const HeadingTwoButton = props => (
	<ToolbarButton
		active={props.formats.isH2}
		onClick={() => props.functions.toggleHeading(2)}
		children={props.children || <IconHeadingTwo />}
	/>
);

export const HeadingThreeButton = props => (
	<ToolbarButton
		active={props.formats.isH3}
		onClick={() => props.functions.toggleHeading(3)}
		children={props.children || <IconHeadingThree />}
	/>
);

// marks

export const BoldButton = props => (
	<ToolbarButton
		active={props.formats.isBold}
		onClick={() => props.functions.toggleBold()}
		children={props.children || <IconBold />}
	/>
);

export const ItalicButton = props => (
	<ToolbarButton
		active={props.formats.isItalic}
		onClick={() => props.functions.toggleItalic()}
		children={props.children || <IconItalic />}
	/>
);

export const UnderlineButton = props => (
	<ToolbarButton
		active={props.formats.isUnderline}
		onClick={() => props.functions.toggleUnderline()}
		children={props.children || <IconUnderline />}
	/>
);

export const StrikeButton = props => (
	<ToolbarButton
		active={props.formats.isStrikethrough}
		onClick={() => props.functions.toggleStrikethrough()}
		children={props.children || <IconStrikethrough />}
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