import React, { useState } from 'react';

import { ReactComponent as IconHeadings } from '@assets/heading.svg';
import { ReactComponent as IconHeadingOne } from '@assets/heading1.svg';
import { ReactComponent as IconHeadingTwo } from '@assets/heading2.svg';
import { ReactComponent as IconHeadingThree } from '@assets/heading3.svg';
import { ReactComponent as IconBold } from '@assets/bold.svg';
import { ReactComponent as IconItalic } from '@assets/italic.svg';
import { ReactComponent as IconUnderline } from '@assets/underline.svg';
import { ReactComponent as IconStrikethrough } from '@assets/strikethrough.svg';
import { ReactComponent as IconTrash } from '@assets/trash.svg';
import { ReactComponent as IconShare } from '@assets/share.svg';

import ToolbarButton from '@components/toolbar/ToolbarButton';
import ItemBack from '@components/toolbar/ItemBack';
import ItemSpacer from '@components/toolbar/ItemSpacer';

const SCREEN_DEFAULT = 'default';
const SCREEN_HEADINGS = 'headings';
const SCREEN_LINK = 'link';
const SCREEN_LINK_POPUP = 'link-popup';

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

// links

export const RemoveLinkButton = props => (
	<ToolbarButton
		onClick={() => props.functions.removeLink()}
		children={props.children || <IconTrash />}
	/>
);

export const OpenLinkButton = props => {
	const link = props.functions.getLink() || {};
	// lowercase
	let href = (link.href || '').toLowerCase();
	// add http(s)
	if (!href.match(/(http(s?)):\/\//gi)) href = `https://${href}`;
	// validate
	const isValid = !!href.match(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i);
	return (
		<ToolbarButton
			disabled={!isValid}
			onClick={() => window.open(href)}
			children={props.children || <IconShare />}
		/>
	)
};

// misc

export const isOpen = ({ formats }) => {
	// if selection on a link and it is collapsed,
	// force show the toolbar to allow link editing
	if (formats.isLink && formats.isCollapsed) return true;
	// return null for default behaviour
	return null;
}

export const forceScreen = ({ formats }) => {
	// if selection on a link and it is collapsed,
	// force render the link screen
	if (formats.isLink && formats.isCollapsed) return SCREEN_LINK_POPUP;
	// do not force a screen
	return null;
}

export default {

	isOpen,
	
	forceScreen,

	inline: true,

	defaultScreen: SCREEN_DEFAULT,
	
	screens: {
		
		// default screen layout
		[SCREEN_DEFAULT]: [
			HeadingsButton,
			ItemSpacer,
			BoldButton,
			ItalicButton,
			UnderlineButton,
			StrikeButton,
		],

		// headings screen layout
		[SCREEN_HEADINGS]: [
			BackToDefaultScreen,
			HeadingOneButton,
			HeadingTwoButton,
			HeadingThreeButton,
		],

		// link screen layout
		[SCREEN_LINK]: [
			BackToDefaultScreen,
			RemoveLinkButton,
			OpenLinkButton,
		],

		[SCREEN_LINK_POPUP]: [
			RemoveLinkButton,
			OpenLinkButton,
		]
	}
}