/** @jsx jsx */
import jsx from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import initApi from '@editor/api';

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
