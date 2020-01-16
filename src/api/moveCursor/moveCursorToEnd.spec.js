/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '../../editor/deserializer/deserializeJsx';
import mount from '../../test-utils/mount';
import withTest from '../../test-utils/withTest';
import initApi from '..';

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

    initApi(initial).moveCursorToEnd();
    expect(initial.selection).toEqual(expected.selection)
  })
})
