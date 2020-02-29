import { types } from '@config/common';
import deserializeHtml, {
  SKIP,
  CONTINUE,
  CONTINUE_TEXT,
  TEXT,
  TEXT_CHILDREN,
} from '@editor/deserializer/deserializeHtml';

const CONFIG_TEXT = { tagSettings: [{ tag: 'h1', parse: TEXT }] };
const CONFIG_TEXT_CHILDREN = { tagSettings: [{ tag: 'h1', parse: TEXT_CHILDREN }] };
const CONFIG_CONTINUE = { tagSettings: [{ tag: 'h1', parse: CONTINUE }] };
const CONFIG_CONTINUE_TEXT = { tagSettings: [{ tag: 'h1', parse: CONTINUE_TEXT }] };
const CONFIG_SKIP = { tagSettings: [{ tag: 'h1', parse: SKIP }] };

const html = `
<h1>
  test
  <a href="marketmuse.com"> marketmuse</a>
</h1>
`;

describe('deserialize html: tag settings', () => {

  // ****
  test('default settings should parse normally', () => {
    expect(deserializeHtml()(html)).toEqual([{
      type: types.h1,
      children: [
        { text: 'test' },
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
      { text: 'test' },
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
  test('Parse should take a function and receives correct arguments', () => {
    expect(
      deserializeHtml({
        tagSettings: [
          {
            tag: 'a',
            parse: (el, { href }) => {
              // `el` should be an instance of HTMLElement.
              // To test this, simply return something that
              // will break this test if that isn't the case.
              if (!(el instanceof window.HTMLElement)) return null;
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
