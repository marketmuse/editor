import { type } from '@components/editor/core/elements/Paragraph';

export default [{
  type,
  children: [{ text: '' }]
}];

/*
export default [
  {
    type: 'paragraph',
    children: [
      { text: 'This is a ' },
      { type: 'link', href: 'https://marketmuse.com', children: [{ text: 'hyperlink' }] },
      { text: '.' }
    ]
  },
  {
    type: 'paragraph',
    children: [{
      type: 'bulleted-list',
      children: [
        { type: 'list-item', children: [{ text: 'Bullet 1' }] },
        { type: 'list-item', children: [{ text: 'Bullet 2', bold: true }] },
        { type: 'list-item', children: [{ text: 'Bullet 3', italic: true, underline: true }] },
      ]
    }]
  },
  {
    type: 'paragraph',
    children: [{
      type: 'numbered-list',
      children: [
        { type: 'list-item', children: [{ text: 'Number 1', strikethrough: true }] },
        { type: 'list-item', children: [{ text: 'Number 2', italic: true }] },
        { type: 'list-item', children: [{ text: 'Number 3', bold: true }] },
      ]
    }]
  },
  {
    type: 'paragraph',
    children: [
      { type: 'heading', level: 1, children: [{ text: 'heading 1' }] },
      { type: 'heading', level: 2, children: [{ text: 'heading 2' }] },
      { type: 'heading', level: 3, children: [{ text: 'heading 3' }] },
      { type: 'heading', level: 4, children: [{ text: 'heading 4' }] },
      { type: 'heading', level: 5, children: [{ text: 'heading 5' }] },
      { type: 'heading', level: 6, children: [{ text: 'heading 6' }] },
    ]
  },
  {
    type: 'paragraph',
    children: [{ text: 'normal text' }]
  },
  {
    type: 'paragraph',
    children: [{ text: 'bold text', bold: true }]
  },
  {
    type: 'paragraph',
    children: [{ text: 'italic text', italic: true }]
  },
  {
    type: 'paragraph',
    children: [{ text: 'underlined text', underline: true }]
  },
  {
    type: 'paragraph',
    children: [{ text: 'strike through text', strikethrough: true }]
  },
  {
    type: 'paragraph',
    children: [{ text: 'bold and italic text', bold: true, italic: true }]
  },
  {
    type: 'paragraph',
    children: [{ text: 'italic and underlined text', italic: true, underline: true }]
  }
];
*/
