export const tag = 'A';
export const type = 'link';

export default ({ href } = {}) => ({ type, href });

// TODO: this isn't block level!! block / inline is
// wrong! rename block -> element, inline -> text
