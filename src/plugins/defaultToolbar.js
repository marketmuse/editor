/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import useEditor from '@editor/hooks/useEditor';

// icons from -
// https://blueprintjs.com/docs/#icons
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
import { ReactComponent as IconListNumbered } from '@assets/listnum.svg';
import { ReactComponent as IconListBulleted } from '@assets/listbul.svg';
import { ReactComponent as IconQuote } from '@assets/quote.svg';

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
    id='mms--toolbar-button-back'
    onClick={() => props.setScreen(SCREEN_DEFAULT)}
    children={props.children || '←'}
  />
);

// Headings

export const HeadingsButton = props => (
  <ToolbarButton
    id='mms--toolbar-button-h'
    active={props.formats.isHeading}
    onClick={() => props.setScreen(SCREEN_HEADINGS)}
    children={props.children || <IconHeadings />}
  />
);

export const HeadingOneButton = props => (
  <ToolbarButton
    id='mms--toolbar-button-h1'
    active={props.formats.isH1}
    children={props.children || <IconHeadingOne />}
    onClick={() => {
      props.functions.toggleHeading(1);
      props.setScreen(SCREEN_DEFAULT);
    }}
  />
);

export const HeadingTwoButton = props => (
  <ToolbarButton
    id='mms--toolbar-button-h2'
    active={props.formats.isH2}
    children={props.children || <IconHeadingTwo />}
    onClick={() => {
      props.functions.toggleHeading(2);
      props.setScreen(SCREEN_DEFAULT);
    }}
  />
);

export const HeadingThreeButton = props => (
  <ToolbarButton
    id='mms--toolbar-button-h3'
    active={props.formats.isH3}
    children={props.children || <IconHeadingThree />}
    onClick={() => {
      props.functions.toggleHeading(3);
      props.setScreen(SCREEN_DEFAULT);
    }}
  />
);

// lists

export const ListNumberedButton = props => (
  <ToolbarButton
    id='mms--toolbar-button-ol'
    active={props.formats.isListNumbered}
    onClick={() => props.functions.toggleListNumbered()}
    children={props.children || <IconListNumbered />}
  />
);

export const ListBulletedButton = props => (
  <ToolbarButton
    id='mms--toolbar-button-ul'
    active={props.formats.isListBulleted}
    onClick={() => props.functions.toggleListBulleted()}
    children={props.children || <IconListBulleted />}
  />
);

// misc

export const BlockquoteButton = props => (
  <ToolbarButton
    id='mms--toolbar-button-blockquote'
    active={props.formats.isBlockquote}
    onClick={() => props.functions.toggleBlockquote()}
    children={props.children || <IconQuote />}
  />
);

// marks

export const BoldButton = props => (
  <ToolbarButton
    id='mms--toolbar-button-bold'
    active={props.formats.isBold}
    onClick={() => props.functions.toggleBold()}
    children={props.children || <IconBold />}
  />
);

export const ItalicButton = props => (
  <ToolbarButton
    id='mms--toolbar-button-italic'
    active={props.formats.isItalic}
    onClick={() => props.functions.toggleItalic()}
    children={props.children || <IconItalic />}
  />
);

export const UnderlineButton = props => (
  <ToolbarButton
    id='mms--toolbar-button-underline'
    active={props.formats.isUnderline}
    onClick={() => props.functions.toggleUnderline()}
    children={props.children || <IconUnderline />}
  />
);

export const StrikeButton = props => (
  <ToolbarButton
    id='mms--toolbar-button-strikethrough'
    active={props.formats.isStrikethrough}
    onClick={() => props.functions.toggleStrikethrough()}
    children={props.children || <IconStrikethrough />}
  />
);

// links

export const LinkButton = props => (
  <ToolbarButton
    id='mms--toolbar-button-addlink'
    active={props.formats.isLink}
    onClick={() => props.setScreen(SCREEN_LINK)}
    children={props.children || <IconLink />}
  />
);

export const RemoveLinkButton = props => (
  <ToolbarButton
    id='mms--toolbar-button-removelink'
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
      id='mms--toolbar-button-openlink'
      disabled={!isValid}
      onClick={() => window.open(clean)}
      children={props.children || <IconShare />}
    />
  )
};

export const LinkInput = props => {
  const [url, setUrl] = useState('');

  const editor = useEditor();

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
        id='mms--toolbar-input-link'
        onChange={e => setUrl(e.target.value)}
        placeholder='Insert URL'
        className={classname}
      />
      <ToolbarButton
        id='mms--toolbar-button-submitlink'
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

  toolbar: {

    isOpen,

    forceScreen,

    inline: true,

    defaultScreen: SCREEN_DEFAULT,

    screens: {

      // default screen layout
      [SCREEN_DEFAULT]: [
        HeadingsButton,
        ListNumberedButton,
        ListBulletedButton,
        LinkButton,
        BlockquoteButton,
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
}
