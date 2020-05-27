import { types } from '@config/common';
import deserializeHtml from '@editor/deserializer/deserializeHtml/deserializeHtml';

describe('deserialize html: leafs', () => {

  // ****
  test('deserialize works for leaf nodes', () => {

    let html = '';
    html += '<b>b</b>';
    html += '<i>i</i>';
    html += '<u>u</u>';
    html += '<s>s</s>';

    expect(deserializeHtml()(html)).toEqual([
      { type: types.p, children: [{ text: 'b', [types.b]: true }] },
      { type: types.p, children: [{ text: 'i', [types.i]: true }] },
      { type: types.p, children: [{ text: 'u', [types.u]: true }] },
      { type: types.p, children: [{ text: 's', [types.s]: true }] },
    ]);
  });

  // ****
  test('deserialize works for nested leaf nodes', () => {

    let html = '';
    html += '<b>';
    html += '<i>bi</i>';
    html += '</b>';
    html += '<b>';
    html += '<i>';
    html += '<s>bis</s>';
    html += '</i>';
    html += '</b>';

    expect(deserializeHtml()(html)).toEqual([
      { type: types.p, children: [{ text: 'bi', [types.b]: true, [types.i]: true }] },
      { type: types.p, children: [{ text: 'bis', [types.b]: true, [types.i]: true, [types.s]: true }] },
    ]);
  });

  // ****
  test('deserialize works for mixed leaf nodes', () => {

    let html = '';
    html += '<b>b';
    html += '<i>bi';
    html += '<s>bis</s>';
    html += '</i>';
    html += '<s>bs';
    html += '<i>bsi</i>';
    html += '</s>';
    html += '</b>';

    expect(deserializeHtml()(html)).toEqual([
      { type: types.p, children: [{ text: 'b', [types.b]: true }] },
      { type: types.p, children: [{ text: 'bi', [types.b]: true, [types.i]: true }] },
      { type: types.p, children: [{ text: 'bis', [types.b]: true, [types.i]: true, [types.s]: true }] },
      { type: types.p, children: [{ text: 'bs', [types.b]: true, [types.s]: true }] },
      { type: types.p, children: [{ text: 'bsi', [types.b]: true, [types.s]: true, [types.i]: true }] },
    ]);
  });

});
