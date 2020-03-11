import versions from '@config/versions';
import { types } from '@config/common';
import serializeRaw from '@editor/serializer/serializeRaw/serializeRaw';
import packageJson from '@/package.symlink.json';

describe('serialize raw', () => {

  // ****
  test('serializeRaw works', () => {

    const data = [{
      type: types.p,
      children: [{ text: 'marketmuse' }]
    }];

    const expected = {
      ...versions,
      data: [{
        type: types.p,
        children: [{ text: 'marketmuse' }]
      }]
    };

    const serialized = serializeRaw(data);
    expect(serialized).toEqual(expected)
  });

});
