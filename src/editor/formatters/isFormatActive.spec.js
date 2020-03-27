/** @jsx deserialize */
import { initialRange } from '@config/initialValue';
import mount from '@utils/test/mount';
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

  // ****
  test('isFormatActive should not fail when no nodes were found', () => {

    let isBold = null;

    mount({
      // invalid children
      children: null,
      // selection of nodes that doesn't exist
      selection: initialRange,
      // it shouldn't throw an error and
      // isBold value should be false in this case
      fn: ({ formats }) => { isBold = formats.isBold; },
    });

    expect(isBold).toBe(false);
  });

})
