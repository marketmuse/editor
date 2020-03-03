import { types } from '@config/common';
import deserializeHtml, {
  SKIP,
  CONTINUE,
  CONTINUE_TEXT,
  TEXT,
  TEXT_CHILDREN,
} from '@editor/deserializer/deserializeHtml';

const CONFIG_TEXT = { strategies: [{ tag: 'h1', strategy: TEXT }] };
const CONFIG_TEXT_CHILDREN = { strategies: [{ tag: 'h1', strategy: TEXT_CHILDREN }] };
const CONFIG_CONTINUE = { strategies: [{ tag: 'h1', strategy: CONTINUE }] };
const CONFIG_CONTINUE_TEXT = { strategies: [{ tag: 'h1', strategy: CONTINUE_TEXT }] };
const CONFIG_SKIP = { strategies: [{ tag: 'h1', strategy: SKIP }] };

const html = `<h1>test <a href="marketmuse.com">marketmuse</a></h1>`;

describe('deserialize html: tag settings', () => {

  // ****
  test('default settings should parse normally', () => {
    expect(deserializeHtml()(html)).toEqual([{
      type: types.h1,
      children: [
        { text: 'test ' },
        {
          type: types.a,
          href: 'marketmuse.com',
          children: [{
            text: 'marketmuse'
          }]
        }
      ]
    }]);
  });

  // ****
  test('TEXT should parse node and children as text', () => {
    expect(deserializeHtml(CONFIG_TEXT)(html)).toEqual([{
      text: 'test marketmuse'
    }]);
  });

  // ****
  test('TEXT_CHILDREN should parse node normally and children as text', () => {
    expect(deserializeHtml(CONFIG_TEXT_CHILDREN)(html)).toEqual([{
      type: types.h1,
      children: [{
        text: 'test marketmuse'
      }]
    }]);
  });

  // ****
  test('CONTINUE should skip node and parse children normally', () => {
    expect(deserializeHtml(CONFIG_CONTINUE)(html)).toEqual([
      { text: 'test ' },
      {
        type: types.a,
        href: 'marketmuse.com',
        children: [{
          text: 'marketmuse'
        }]
      }
    ]);
  });

  // ****
  test('CONTINUE_TEXT should skip node and parse children as text (excl. text nodes)', () => {
    expect(deserializeHtml(CONFIG_CONTINUE_TEXT)(html)).toEqual([
      { text: 'marketmuse' }
    ]);
  });

  // ****
  test('SKIP should skip node and its children', () => {
    expect(deserializeHtml(CONFIG_SKIP)(html)).toEqual([
    ]);
  });

  // ****
  test('Parse function should receives arguments correctly', () => {

    let didReceiveElement = false;
    let didReceiveElementCorrectly = false;
    let didReceiveAttrs = false;

    deserializeHtml({
      strategies: [
        {
          tag: 'a',
          strategy: (el, { href }) => {
            didReceiveElement = !!el;
            didReceiveElementCorrectly = el instanceof window.HTMLElement;
            didReceiveAttrs = href === 'marketmuse.com';
            return 'normal';
          }
        }
      ]
    })`
      <a href="marketmuse.com">
        marketmuse
      </a>
    `;

    expect(didReceiveElement).toBe(true);
    expect(didReceiveElementCorrectly).toBe(true);
    expect(didReceiveAttrs).toBe(true);
  });

  // ****
  test('Parse function should work correctly', () => {
    expect(
      deserializeHtml({
        strategies: [
          {
            tag: 'a',
            strategy: (el, { href }) => {
              return href.indexOf('marketmuse.com') === -1
                ? 'text'
                : 'normal'
            }
          }
        ]
      })`
      <div>
        <a href="google.com">google</a>
        <a href="marketmuse.com">marketmuse</a>
        <a href="bing.com">bing</a>
      </div>
      `
    ).toEqual([
      { text: 'google' },
      {
        type: types.a,
        href: 'marketmuse.com',
        children: [{ text: 'marketmuse' }]
      },
      { text: 'bing' }
    ]);
  });

});
