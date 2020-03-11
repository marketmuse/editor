/** @jsx deserialize */
import { ReactEditor } from 'slate-react'
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import mount from '@utils/test/mount';
import withTest from '@utils/test/withTest';
import focusAtStart from '@editor/focus/focusAtStart';

describe('api: focus at start', () => {
  test('is focus at start working', () => {

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
            <cursor />hello
          </text>
        </block>
      </editor>
    );

    // mount the editor
    mount(initial);

    // focus
    focusAtStart(initial);

    expect(initial.selection).toEqual(expected.selection)
  })
})
