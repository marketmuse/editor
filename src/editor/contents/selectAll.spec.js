/** @jsx deserialize */
import { ReactEditor } from 'slate-react'
import deserialize from '@editor/deserializer/deserializeJsx';
import mount from '@utils/test/mount';
import withTest from '@utils/test/withTest';
import getFunctions from '@editor/functions';

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

    getFunctions(initial).selectAll();
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

    getFunctions(initial).selectAll();
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

    getFunctions(initial).selectAll();
    expect(initial.selection).toEqual(expected.selection)
  })
})
