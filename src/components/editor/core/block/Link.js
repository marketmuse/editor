export const tag = 'A';
export const type = 'link';

export default el => ({ tag, type, url: el.getAttribute('href') });
