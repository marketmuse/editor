import { types } from '@config/common';
import deserializeHtml from '@editor/deserializer/deserializeHtml';

describe('deserialize html: a', () => {

  // ****
  test('deserialize works for links', () => {

    const output = deserializeHtml()`
      <a href="https://marketmuse.com">marketmuse</a>
    `;

    expect(output).toEqual([{
      type: types.a,
      href: 'https://marketmuse.com',
      children: [{ text: 'marketmuse' }]
    }]);
  });

  // ****
  test('deserialize works for multiple links', () => {

    const output = deserializeHtml()`
      <div>
        <a href="https://marketmuse.com">marketmuse1</a>
        <a href="https://marketmuse.com">marketmuse2</a>
        <a href="https://marketmuse.com">marketmuse3</a>
      </div>
    `;

    expect(output).toEqual([
      {
        type: types.a,
        href: 'https://marketmuse.com',
        children: [{ text: 'marketmuse1' }]
      },
      {
        type: types.a,
        href: 'https://marketmuse.com',
        children: [{ text: 'marketmuse2' }]
      },
      {
        type: types.a,
        href: 'https://marketmuse.com',
        children: [{ text: 'marketmuse3' }]
      },
    ]);
  });

  // ****
  test('links with no anchor gets ignored', () => {

    const output = deserializeHtml()`
      <a href="https://marketmuse.com"></a>
    `;

    expect(output).toEqual([]);
  });

  // ****
  test('links with no href gets treated as text node', () => {

    const output = deserializeHtml()`
      <a href="">marketmuse</a>
    `;

    expect(output).toEqual([
      { text: 'marketmuse' }
    ]);
  });

  // ****
  test('ignore link option forces links to be treated as text nodes', () => {

    const output = deserializeHtml({ ignoreLinks: true })`
      <a href="https://marketmuse.com">marketmuse</a>
    `;

    expect(output).toEqual([
      { text: 'marketmuse' }
    ]);
  });

  // ****
  test('ignore link option works for multiple links', () => {

    const output = deserializeHtml({ ignoreLinks: true })`
      <div>
        <a href="https://marketmuse.com">marketmuse1</a>
        <a href="https://marketmuse.com">marketmuse2</a>
        <a href="https://marketmuse.com">marketmuse3</a>
      </div>
    `;

    expect(output).toEqual([
      { text: 'marketmuse1' },
      { text: 'marketmuse2' },
      { text: 'marketmuse3' },
    ]);
  });

});
