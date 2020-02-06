import * as blockquote from '@components/editor/core/elements/Blockquote';
import * as paragraph from '@components/editor/core/elements/Paragraph';
import * as heading from '@components/editor/core/elements/Heading';
import * as link from '@components/editor/core/elements/Link';
import * as listBulleted from '@components/editor/core/elements/ListBulleted';
import * as listNumbered from '@components/editor/core/elements/ListNumbered';
import * as listItem from '@components/editor/core/elements/ListItem';

export const listTypes = [
	listBulleted.type,
	listNumbered.type,
];

export default {
	[blockquote.type]: blockquote,
	[paragraph.type]: paragraph,
	[heading.type]: heading,
	[link.type]: link,
	[listBulleted.type]: listBulleted,
	[listNumbered.type]: listNumbered,
	[listItem.type]: listItem,
	default: paragraph,
}