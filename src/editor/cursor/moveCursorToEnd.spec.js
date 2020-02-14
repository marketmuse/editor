/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '@editor/deserializer/deserializeJsx/deserializeJsx';
import mount from '@utils/test/mount';
import withTest from '@utils/test/withTest';
import getFunctions from '@editor/functions';

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

    getFunctions(initial).moveCursorToEnd();
    expect(initial.selection).toEqual(expected.selection)
  })
})
