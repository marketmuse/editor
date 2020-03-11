/** @jsx deserialize */
import { ReactEditor } from 'slate-react'
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import selectAll from '@editor/contents/selectAll';

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

    selectAll(initial);
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

    selectAll(initial);
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

    selectAll(initial);
    expect(initial.selection).toEqual(expected.selection)
  })
})
