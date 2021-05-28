import { types } from '@config/common';
import deserializeHtml from '@editor/deserializer/deserializeHtml/deserializeHtml';

describe('deserialize html: inheritance', () => {

  // ****
  test('should skip style tags and pass correct props to children', () => {

    let html = '';
    html += '<i>';
    html += '<b>';
    html += '<a href="marketmuse.com">marketmuse</a>';
    html += '</b>';
    html += '</i>';

    expect(deserializeHtml()(html)).toEqual([
      {
        children: [{
          type: types.a,
          href: 'marketmuse.com',
          children: [{
            text: 'marketmuse',
            [types.b]: true,
            [types.i]: true,
          }]
        }],
        type: types.p
      }]);
  });

  // ****
  test('should evaluate style tags correctly as children', () => {

    let html = '';
    html += '<a href="marketmuse.com">';
    html += '<b>';
    html += '<i>marketmuse</i>';
    html += '</b>';
    html += '</a>';

    expect(deserializeHtml()(html)).toEqual([
      {
        children: [{
          type: types.a,
          href: 'marketmuse.com',
          children: [{
            text: 'marketmuse',
            [types.b]: true,
            [types.i]: true,
          }]
        }],
        type: types.p
      }]);
  });

});
