import { types } from '@config/common';
import serializeHtml from '@editor/serializer/serializeHtml/serializeHtml';
import clean from '@utils/test/clean';

describe('serialize html', () => {

  // ****
  test('serialize html works with single leaf node', () => {

    const nodes = [
      { type: types.p, children: [{ [types.b]: true, text: 'marketmuse1' }] },
      { type: types.p, children: [{ [types.u]: true, text: 'marketmuse2' }] },
      { type: types.p, children: [{ [types.i]: true, text: 'marketmuse3' }] },
      { type: types.p, children: [{ [types.s]: true, text: 'marketmuse4' }] },
    ];

    const serialized = clean(serializeHtml(nodes));
    let expected = '';
    expected += '<p><b>marketmuse1</b></p>';
    expected += '<p><u>marketmuse2</u></p>';
    expected += '<p><i>marketmuse3</i></p>';
    expected += '<p><s>marketmuse4</s></p>';

    expect(serialized).toEqual(expected)
  });

  // ****
  test('serialize html works with multiple leaf nodes', () => {

    const nodes = [{
      type: types.p,
      children: [{
        [types.b]: true,
        [types.u]: true,
        [types.i]: true,
        [types.s]: true,
        text: 'marketmuse'
      }]
    }];

    const serialized = clean(serializeHtml(nodes));
    const expected = '<p><b><i><u><s>marketmuse</s></u></i></b></p>';

    expect(serialized).toEqual(expected)
  });

  // ****
  test('serialize html works with nested leaf nodes', () => {

    const nodes = [{
      type: types.p,
      children: [
        { text: 'lorem ' },
        { text: 'ipsum ', [types.b]: true },
        { text: 'dolor ' },
        { text: 'sit amet ', [types.u]: true, [types.i]: true },
      ]
    }];

    const serialized = clean(serializeHtml(nodes));

    let expected = '';
    expected += '<p>';
    expected += 'lorem ';
    expected += '<b>ipsum </b>';
    expected += 'dolor ';
    expected += '<i><u>sit amet </u></i>';
    expected += '</p>';

    expect(serialized).toEqual(expected)
  });

});
