import { types } from '@config/common';
import deserializeHtml, {
  SKIP,
  CONTINUE,
  TEXT,
} from '@editor/deserializer/deserializeHtml/deserializeHtml';

describe('deserialize html: a', () => {

  // ****
  test('deserialize works for links', () => {
    const html = '<a href="https://marketmuse.com">marketmuse</a>';
    expect(deserializeHtml()(html)).toEqual([{
      type: types.a,
      href: 'https://marketmuse.com',
      children: [{ text: 'marketmuse' }]
    }]);
  });

  // ****
  test('deserialize works for multiple links', () => {
    let html = '';
    html += '<div>';
    html += '<a href="https://marketmuse.com">marketmuse1</a>';
    html += '<a href="https://marketmuse.com">marketmuse2</a>';
    html += '<a href="https://marketmuse.com">marketmuse3</a>';
    html += '</div>';

    expect(deserializeHtml()(html)).toEqual([
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
    const html = '<a href="https://marketmuse.com"></a>';
    expect(deserializeHtml()(html)).toEqual([]);
  });

  // ****
  test('links with no href gets treated as text node', () => {
    const html = '<a href="">marketmuse</a>';
    expect(deserializeHtml()(html)).toEqual([
      { type: types.p, children: [{ text: 'marketmuse' }] }
    ]);
  });

  // ****
  test('parse as test should work', () => {
    const html = '<a href="https://marketmuse.com">marketmuse</a>';
    expect(
      deserializeHtml([{
        strategies: [
          { tag: 'a', strategy: TEXT }
        ]
      }])(html)
    ).toEqual([{
      type: types.p,
      children: [{ text: 'marketmuse' }]
    }]);
  });

  // ****
  test('skip link should ignore it', () => {
    const html = '<a href="https://marketmuse.com">marketmuse</a>';
    expect(
      deserializeHtml([{
        strategies: [
          { tag: 'a', strategy: SKIP }
        ]
      }])(html)
    ).toEqual([
    ]);
  });

  // ****
  test('continue link should render its children', () => {
    const html = '<a href="https://marketmuse.com"><div>marketmuse</div></a>';
    expect(
      deserializeHtml([{
        strategies: [
          { tag: 'a', strategy: CONTINUE }
        ]
      }])(html)
    ).toEqual([{
      type: types.p,
      children: [{ text: 'marketmuse' }]
    }]);
  });

});
