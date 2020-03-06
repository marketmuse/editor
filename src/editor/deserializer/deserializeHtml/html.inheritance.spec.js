import { types } from '@config/common';
import deserializeHtml from '@editor/deserializer/deserializeHtml';

describe('deserialize html: inheritance', () => {

  // ****
  test('should skip style tags and pass correct props to children', () => {
    expect(
      deserializeHtml()`
        <i>
          <b>
            <a href="marketmuse.com">marketmuse</a>
          </b>
        </i>
      `
    ).toEqual([
      {
        type: types.a,
        href: 'marketmuse.com',
        children: [{
          text: 'marketmuse',
          [types.b]: true,
          [types.i]: true,
        }]
      },
    ]);
  });

  // ****
  test('should evaluate style tags correctly as children', () => {
    expect(
      deserializeHtml()`
        <a href="marketmuse.com">
          <b>
            <i>marketmuse</i>
          </b>
        </a>
      `
    ).toEqual([
      {
        type: types.a,
        href: 'marketmuse.com',
        children: [{
          text: 'marketmuse',
          [types.b]: true,
          [types.i]: true,
        }]
      },
    ]);
  });

});
