/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import { useSlate } from 'slate-react'

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
import { ReactComponent as IconTick } from '@assets/tick.svg';
import { ReactComponent as IconLink } from '@assets/link.svg';

import cleanUrl from '@utils/cleanUrl';
import isValidUrl from '@utils/isValidUrl';
import classHasFocus from '@utils/classHasFocus';

import ToolbarButton from '@components/toolbar/ToolbarButton';
import ToolbarInput from '@components/toolbar/ToolbarInput';
import ItemSpacer from '@components/toolbar/ItemSpacer';

const SCREEN_DEFAULT = 'default';
const SCREEN_HEADINGS = 'headings';
const SCREEN_LINK = 'link';
const SCREEN_LINK_POPUP = 'link-popup';

// Utils

export const BackToDefaultScreen = props => (
  <ToolbarButton
    onClick={() => props.setScreen(SCREEN_DEFAULT)}
    children={props.children || '←'}
  />
);

// Headings

export const HeadingsButton = props => (
  <ToolbarButton
    active={props.formats.isHeading}
    onClick={() => props.setScreen(SCREEN_HEADINGS)}
    children={props.children || <IconHeadings />}
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

export const LinkButton = props => (
  <ToolbarButton
    active={props.formats.isLink}
    onClick={() => props.setScreen(SCREEN_LINK)}
    children={props.children || <IconLink />}
  />
)

export const RemoveLinkButton = props => (
  <ToolbarButton
    onClick={() => props.functions.removeLink()}
    children={props.children || <IconTrash />}
  />
);

export const OpenLinkButton = props => {
  const link = props.functions.getLink() || {};
  const clean = cleanUrl(link.href, { addHttps: true });
  const isValid = isValidUrl(clean);
  return (
    <ToolbarButton
      disabled={!isValid}
      onClick={() => window.open(clean)}
      children={props.children || <IconShare />}
    />
  )
};

export const LinkInput = props => {
  const [url, setUrl] = useState('');

  // TODO: don't use `useSlate` here, this is the configuration.
  // wrap it into something like `useMMSEditor` and expose it to users,
  // and use that here instead
  const editor = useSlate();

  // if selection is on an existing link, set the
  // set the input value to the existing link,
  // so insert link input functions as updater
  useEffect(() => {
    const existing = props.functions.getLink() || {};
    if (existing && existing.href) setUrl(existing.href);
  }, [editor.selection]);

  const isPopupScreen = props.screen === SCREEN_LINK_POPUP;
  const classname = isPopupScreen
    ? 'mms--link-popup-input'
    : 'mms--link-input';

  const clean = cleanUrl(url);
  const isValid = isValidUrl(clean);

  return (
    <form
      style={{ display: 'flex' }}
      onSubmit={e => {
        e.preventDefault();
        props.functions.replaceLink(clean);
        // TODO (BUG2): after replacing a link, because of the
        // appended classname, it keeps stuck at the link
        // screen until focusing out of the text input
        if (!isPopupScreen) props.setScreen(SCREEN_DEFAULT);
      }}
    >
      <ToolbarInput
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder='Insert URL'
        className={classname}
      />
      <ToolbarButton
        disabled={!isValid}
        type='submit'
        children={<IconTick />}
      />
    </form>
  )
}

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
  // if focused on the link input, keep the relevant screen open
  if (classHasFocus('mms--link-input')) return SCREEN_LINK;
  if (classHasFocus('mms--link-popup-input')) return SCREEN_LINK_POPUP;
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
      LinkButton,
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
      LinkInput,
      RemoveLinkButton,
      OpenLinkButton,
    ],
    [SCREEN_LINK_POPUP]: [
      LinkInput,
      RemoveLinkButton,
      OpenLinkButton,
    ],
  }
}
