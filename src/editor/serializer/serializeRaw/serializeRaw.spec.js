import { types, DATA_VERSION } from '@config/common';
import serializeRaw from '@editor/serializer/serializeRaw/serializeRaw';

describe('serialize raw', () => {

  // ****
  test('serializeRaw works', () => {

    const data = [{
      type: types.p,
      children: [{ text: 'marketmuse' }]
    }];

    const expected = {
      version: process.env.LIB_VERSION,
      data_version: DATA_VERSION,
      data: [{
        type: types.p,
        children: [{ text: 'marketmuse' }]
      }]
    };

    const serialized = serializeRaw(data);
    expect(serialized).toEqual(expected)
  });

});
