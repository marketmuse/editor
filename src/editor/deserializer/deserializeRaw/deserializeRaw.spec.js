import { types, DATA_VERSION } from '@config/common';
import deserializeRaw from '@editor/deserializer/deserializeRaw/deserializeRaw';

describe('deserialize raw', () => {

  // ****
  test('deserializeRaw works', () => {

    const raw = {
      version: '42',
      data_version: DATA_VERSION,
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

});
