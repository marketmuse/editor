import { types } from '@config/common';
import deserializeRaw from '@editor/deserializer/deserializeRaw/deserializeRaw';

describe('deserialize raw migrations', () => {

  // ****
  test('deserializeRaw migrates data to latest version', () => {

    const raw = {
      version: '42',
      data_version: 0,
      data: [{
        type: types.p,
        children: [{ text: 'marketmuse' }]
      }]
    }

    const expected = [{
      type: types.p,
      children: [{ text: 'marketmuse' }]
    }];

    const deserialized = deserializeRaw(raw);
    expect(deserialized).toEqual(expected)
  });

  // ****
  test('deserializeRaw migrates data to latest version correctly', () => {

    const raw = {
      version: '42',
      data_version: 0,
      data: [
        {
          type: 'double-paragraph',
          children: [{ text: 'marketmuse' }]
        },
        {
          text: 'marketmuse',
          boldAndItalic: true,
        },
        {
          type: 'hyperlink',
          src: 'marketmuse.com',
          children: [{ text: 'marketmuse' }]
        }
      ]
    }

    const expected = [
      {
        type: types.p,
        children: [{ text: 'marketmuse' }]
      },
      {
        text: 'marketmuse',
        [types.b]: true,
        [types.i]: true,
      },
      {
        type: types.a,
        href: 'marketmuse.com',
        children: [{ text: 'marketmuse' }]
      }
    ];

    const deserialized = deserializeRaw(raw);
    expect(deserialized).toEqual(expected)
  });

});
