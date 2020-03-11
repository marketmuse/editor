/** @jsx deserialize */
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import moveCursorToStart from '@editor/cursor/moveCursorToStart';

describe('api: moveCursorToStart', () => {
  test('moving cursor to start', () => {

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
          <cursor />test
        </block>
      </editor>
    );

    moveCursorToStart(initial);
    expect(initial.selection).toEqual(expected.selection)
  })
})
