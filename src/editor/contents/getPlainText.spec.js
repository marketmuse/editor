import mount from '@utils/test/mount';
import { types } from '@config/common';

describe('getPlainText', () => {

  // ****
  test('getPlainText works', () => {

    let plainText;

    mount({
      children: [
        {
          type: types.p,
          children: [{ text: 'marketmuse' }]
        },
        {
          type: types.p,
          children: [{ text: 'test' }]
        },
      ],
      fn: ({ functions }) => {
        plainText = functions.getPlainText();
      }
    });

    expect(plainText).toEqual('marketmuse\ntest');
  });

});
