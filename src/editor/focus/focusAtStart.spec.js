/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '@editor/deserializer/deserializeJsx/deserializeJsx';
import mount from '@utils/test/mount';
import withTest from '@utils/test/withTest';
import initApi from '@editor/api';

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

    const api = initApi(initial);

    // mount the editor
    mount(initial);

    // focus
    api.focusAtStart();

    expect(initial.selection).toEqual(expected.selection)
  })
})
