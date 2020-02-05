/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import isFormatActive from '@editor/utils/isFormatActive';

describe('api utils: isFormatActive', () => {

  // ****
  test('format active when cursor is over formatted text', () => {
    const input = withTest(
      <editor>
        <text bold>te<cursor />st</text>
        <text>test</text>
      </editor>
    );

    const isActive = isFormatActive(input, 'bold')
    expect(isActive).toBe(true);
  });

  // ****
  test('format not active when cursor is not over formatted text', () => {
    const input = withTest(
      <editor>
        <text bold>test</text>
        <text>te<cursor />st</text>
      </editor>
    );

    const isActive = isFormatActive(input, 'bold')
    expect(isActive).toBe(false);
  });

  // ****
  // TODO: cover selections

})
