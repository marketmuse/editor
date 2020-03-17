/** @jsx deserialize */
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import mount from '@utils/test/mount';
import withTest from '@utils/test/withTest';
import focusAtEnd from '@editor/focus/focusAtEnd';

describe('api: focus at end', () => {
  test('is focus at end working', () => {

    const initial = withTest(
      <editor>
        <block>
          <text>
            hello
          </text>
        </block>
      </editor>
    );

    const expected = withTest(
      <editor>
        <block>
          <text>
            hello<cursor />
          </text>
        </block>
      </editor>
    );

    // mount the editor
    mount(initial);

    // focus
    focusAtEnd(initial);

    expect(initial.selection).toEqual(expected.selection)
  })
})
