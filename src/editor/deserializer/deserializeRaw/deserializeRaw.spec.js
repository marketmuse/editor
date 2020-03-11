import versions from '@config/versions';
import { types } from '@config/common';
import deserializeRaw from '@editor/deserializer/deserializeRaw/deserializeRaw';

describe('deserialize raw', () => {

  // ****
  test('deserializeRaw works', () => {

    const raw = {
      ...versions,
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
