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
      children: initial.children,
      selection: initial.selection,
      fn: ({ functions }) => functions.moveCursorToEnd(),
    })

    expect(editor.selection).toEqual(expected.selection)
  })
})
