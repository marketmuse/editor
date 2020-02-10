import * as blockquote from '@components/editor/core/elements/Blockquote';
import * as paragraph from '@components/editor/core/elements/Paragraph';
import * as headingOne from '@components/editor/core/elements/HeadingOne';
import * as headingTwo from '@components/editor/core/elements/HeadingTwo';
import * as headingThree from '@components/editor/core/elements/HeadingThree';
import * as link from '@components/editor/core/elements/Link';
import * as listBulleted from '@components/editor/core/elements/ListBulleted';
import * as listNumbered from '@components/editor/core/elements/ListNumbered';
import * as listItem from '@components/editor/core/elements/ListItem';

// add new elements below
const elements = [
	blockquote,
	paragraph,
	headingOne,
	headingTwo,
	headingThree,
	link,
	listBulleted,
	listNumbered,
	listItem,
];

export default elements;

export const defaultElement = paragraph;

// list elements
export const listTypes = elements.filter(el => el.listType);

// elements dict by type
export const elementsByType = elements.reduce((acc, el) => ({
	...acc,
	[el.type]: el
}), {});

// elements dict by tag
export const elementsByTag = elements.reduce((acc, el) => ({
  ...acc,
  ...(el.tags || []).reduce((acc2, tag) => ({
  	...acc2,
  	[tag]: el
  }), {})
}), {});

