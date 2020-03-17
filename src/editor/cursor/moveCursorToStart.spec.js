/** @jsx deserialize */
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import mount from '@utils/test/mount';

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

    const editor = mount({
      fn: ({ functions }) => {
        const e = functions._getEditor();
        e.children = initial.children;
        e.selection = initial.selection;
        functions.moveCursorToStart();
      }
    })

    expect(editor.selection).toEqual(expected.selection)
  })
})
