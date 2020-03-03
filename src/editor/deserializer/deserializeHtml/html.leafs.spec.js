import { types } from '@config/common';
import deserializeHtml from '@editor/deserializer/deserializeHtml';

describe('deserialize html: leafs', () => {

  // ****
  test('deserialize works for leaf nodes', () => {
    expect(
      deserializeHtml()`
        <b>b</b>
        <i>i</i>
        <u>u</u>
        <s>s</s>
      `
    ).toEqual([
      { text: 'b', [types.b]: true },
      { text: 'i', [types.i]: true },
      { text: 'u', [types.u]: true },
      { text: 's', [types.s]: true },
    ]);
  });

  // ****
  test('deserialize works for nested leaf nodes', () => {
    expect(
      deserializeHtml()`
        <b>
          <i>bi</i>
        </b>
        <b>
          <i>
            <s>bis</s>
          </i>
        </b>
      `
    ).toEqual([
      { text: 'bi', [types.b]: true, [types.i]: true },
      { text: 'bis', [types.b]: true, [types.i]: true, [types.s]: true },
    ]);
  });

  // ****
  test('deserialize works for mixed leaf nodes', () => {
    expect(
      deserializeHtml()`
        <b>b
          <i>bi
            <s>bis</s>
          </i>
          <s>bs
            <i>bsi</i>
          </s>
        </b>
      `
    ).toEqual([
      { text: 'b ', [types.b]: true },
      { text: 'bi ', [types.b]: true, [types.i]: true },
      { text: 'bis', [types.b]: true, [types.i]: true, [types.s]: true },
      { text: 'bs ', [types.b]: true, [types.s]: true },
      { text: 'bsi', [types.b]: true, [types.s]: true, [types.i]: true },
    ]);
  });

});
