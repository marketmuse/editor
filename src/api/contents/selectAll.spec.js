/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '../../editor/deserializer/deserializeJsx';
import mount from '../../test-utils/mount';
import withTest from '../../test-utils/withTest';
import initApi from '..';

describe('api: selectAll', () => {

  // ***
  test('select all without focus', () => {

    const initial = withTest(
      <editor>
        <block>
          test
        </block>
      </editor>
    );

    const expected = withTest(
      <editor>
        <block>
          <anchor />test<focus />
        </block>
      </editor>
    );

    initApi(initial).selectAll();
    expect(initial.selection).toEqual(expected.selection)
  })

  // ***
  test('select all with focus', () => {

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
          <anchor />test<focus />
        </block>
      </editor>
    );

    initApi(initial).selectAll();
    expect(initial.selection).toEqual(expected.selection)
  })

  // ***
  test('select all with selection', () => {

    const initial = withTest(
      <editor>
        <block>
          t<anchor />es<focus />t
        </block>
      </editor>
    );

    const expected = withTest(
      <editor>
        <block>
          <anchor />test<focus />
        </block>
      </editor>
    );

    initApi(initial).selectAll();
    expect(initial.selection).toEqual(expected.selection)
  })
})
