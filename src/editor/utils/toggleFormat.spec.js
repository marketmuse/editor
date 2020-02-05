/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import isFormatActive from '@editor/utils/isFormatActive';
import toggleFormat from '@editor/utils/toggleFormat';

// TODO: fix tests here

describe('api utils: toggleFormat', () => {

  // ****
  test('toggles format off', () => {
    
    const input = withTest(
      <editor>
        <anchor />
        <text bold>test</text>
        <focus />
      </editor>
    );

    toggleFormat(input, 'bold');

    const isActive = isFormatActive(input, 'bold')
    expect(isActive).toBe(false);
  });

  // ****
  test('toggles format on', () => {
    
    const input = withTest(
      <editor>
        <anchor />
        <text>test</text>
        <focus />
      </editor>
    );

    toggleFormat(input, 'bold');

    const isActive = isFormatActive(input, 'bold')
    expect(isActive).toBe(true);
  });

})
