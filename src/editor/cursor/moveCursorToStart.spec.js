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
      children: initial.children,
      selection: initial.selection,
      fn: ({ functions }) => functions.moveCursorToStart(),
    })

    expect(editor.selection).toEqual(expected.selection)
  })
})
