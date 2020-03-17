/** @jsx deserialize */
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import mount from '@utils/test/mount';

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

    const editor = mount({
      fn: ({ functions }) => {
        const e = functions._getEditor();
        e.children = initial.children;
        e.selection = initial.selection;
        functions.moveCursorToEnd();
      }
    })

    expect(editor.selection).toEqual(expected.selection)
  })
})
