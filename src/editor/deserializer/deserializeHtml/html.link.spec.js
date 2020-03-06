import { types } from '@config/common';
import deserializeHtml, {
  SKIP,
  CONTINUE,
  TEXT,
} from '@editor/deserializer/deserializeHtml';

describe('deserialize html: a', () => {

  // ****
  test('deserialize works for links', () => {
    expect(
      deserializeHtml()`
        <a href="https://marketmuse.com">marketmuse</a>
      `
    ).toEqual([{
      type: types.a,
      href: 'https://marketmuse.com',
      children: [{ text: 'marketmuse' }]
    }]);
  });

  // ****
  test('deserialize works for multiple links', () => {
    expect(
      deserializeHtml()`
        <div>
          <a href="https://marketmuse.com">marketmuse1</a>
          <a href="https://marketmuse.com">marketmuse2</a>
          <a href="https://marketmuse.com">marketmuse3</a>
        </div>
      `
    ).toEqual([
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
    expect(
      deserializeHtml()`
        <a href="https://marketmuse.com"></a>
      `
    ).toEqual([
    ]);
  });

  // ****
  test('links with no href gets treated as text node', () => {
    expect(
      deserializeHtml()`
        <a href="">marketmuse</a>
      `
    ).toEqual([
      { text: 'marketmuse' }
    ]);
  });

  // ****
  test('parse as test should work', () => {
    expect(
      deserializeHtml([{
        strategies: [
          { tag: 'a', strategy: TEXT }
        ]
      }])`
        <a href="https://marketmuse.com">marketmuse</a>
      `
    ).toEqual([
      { text: 'marketmuse' }
    ]);
  });

  // ****
  test('skip link should ignore it', () => {
    expect(
      deserializeHtml([{
        strategies: [
          { tag: 'a', strategy: SKIP }
        ]
      }])`
        <a href="https://marketmuse.com">marketmuse</a>
      `
    ).toEqual([
    ]);
  });

  // ****
  test('continue link should render its children', () => {
    expect(
      deserializeHtml([{
        strategies: [
          { tag: 'a', strategy: CONTINUE }
        ]
      }])`
        <a href="https://marketmuse.com">
          <div>marketmuse</div>
        </a>
      `
    ).toEqual([
      { text: 'marketmuse' }
    ]);
  });

});
