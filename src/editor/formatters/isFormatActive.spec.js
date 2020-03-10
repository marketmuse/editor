/** @jsx deserialize */
import { ReactEditor } from 'slate-react'
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import isFormatActive from '@editor/formatters/isFormatActive';

describe('api utils: isFormatActive', () => {

  // ****
  test('(mark) format active when cursor is over formatted area', () => {
    const input = withTest(
      <editor>
        <text bold>te<cursor />st</text>
        <text>test</text>
      </editor>
    );

    const isActive = isFormatActive(input, 'mark', 'bold')
    expect(isActive).toBe(true);
  });

  // ****
  test('(mark) format not active when cursor is not over formatted area', () => {
    const input = withTest(
      <editor>
        <text bold>test</text>
        <text>te<cursor />st</text>
      </editor>
    );

    const isActive = isFormatActive(input, 'mark', 'bold')
    expect(isActive).toBe(false);
  });

  // ****
  test('(block) format active when cursor is over formatted area', () => {
    const input = withTest(
      <editor>
        <h1><text>te<cursor />st</text></h1>
      </editor>
    );

    const isActive = isFormatActive(input, 'block', 'heading-one')
    expect(isActive).toBe(true);
  });

  // ****
  test('(block) format not active when cursor is not over formatted area', () => {
    const input = withTest(
      <editor>
        <h1><text>test</text></h1>
        <p><text>te<cursor />st</text></p>
      </editor>
    );

    const isActive = isFormatActive(input, 'block', 'heading-one')
    expect(isActive).toBe(false);
  });

})
