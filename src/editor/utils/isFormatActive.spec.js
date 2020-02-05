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
  test('format active when selection covers formatted text', () => {
    const input = withTest(
      <editor>
        <text bold><anchor />test<focus /></text>
        <text>test</text>
      </editor>
    );

    const isActive = isFormatActive(input, 'bold')
    expect(isActive).toBe(true);
  });

  // ****
  test('format active when selection partially covers formatted text', () => {
    const input = withTest(
      <editor>
        <text bold>t<anchor />es<focus />t</text>
        <text>test</text>
      </editor>
    );

    const isActive = isFormatActive(input, 'bold')
    expect(isActive).toBe(true);
  });

  // ****
  test('format not active when selection partially covers more than formatted text', () => {
    const input = withTest(
      <editor>
        <text>te<anchor />st</text>
        <text bold>test</text>
        <text>te<focus />st</text>
      </editor>
    );

    const isActive = isFormatActive(input, 'bold')
    expect(isActive).toBe(true);
  });


})
