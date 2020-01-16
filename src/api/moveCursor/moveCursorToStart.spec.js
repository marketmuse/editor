/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '../../editor/deserializer/deserializeJsx';
import mount from '../../test-utils/mount';
import withTest from '../../test-utils/withTest';
import initApi from '..';

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

    initApi(initial).moveCursorToStart();
    expect(initial.selection).toEqual(expected.selection)
  })
})
