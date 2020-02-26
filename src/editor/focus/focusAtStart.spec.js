/** @jsx deserialize */
import { ReactEditor } from 'slate-react'
import deserialize from '@editor/deserializer/deserializeJsx';
import mount from '@utils/test/mount';
import withTest from '@utils/test/withTest';
import getFunctions from '@editor/functions';

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

    const api = getFunctions(initial);

    // mount the editor
    mount(initial);

    // focus
    api.focusAtStart();

    expect(initial.selection).toEqual(expected.selection)
  })
})
