/** @jsx deserialize */
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import moveCursorToEnd from '@editor/cursor/moveCursorToEnd';

describe('api: moveCursorToEnd', () => {
  test('moving cursor to end', () => {

    const initial = withTest(
      <editor>
        <block>
          te<cursor />st
        </block>
      </editor>
    );

    const expected = withTest(
      <editor>
        <block>
          test<cursor />
        </block>
      </editor>
    );

    moveCursorToEnd(initial);
    expect(initial.selection).toEqual(expected.selection)
  })
})
