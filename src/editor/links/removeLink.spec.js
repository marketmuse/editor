/** @jsx deserialize */
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import getFunctions from '@editor/functions';

describe('api: remove link', () => {

  // ***
  test('remove link with focus', () => {

    const initial = withTest(
      <editor>
        <block>
          <a href='test.com'>
            test.com
            <cursor />
          </a>
        </block>
      </editor>
    );

    const expected = withTest(
      <editor>
        <block>
          <text>
            test.com
            <cursor />
          </text>
        </block>
      </editor>
    );

    getFunctions(initial).removeLink();
    expect(initial.children).toEqual(expected.children)
    expect(initial.selection).toEqual(expected.selection)
  })

  // ***
  test('remove link with selection - full', () => {

    const initial = withTest(
      <editor>
        <block>
          <anchor />
          <a href='test.com'>test.com</a>
          <focus />
        </block>
      </editor>
    );

    const expected = withTest(
      <editor>
        <block>
          <text>
            <anchor />
            test.com
            <focus />
          </text>
        </block>
      </editor>
    );

    getFunctions(initial).removeLink();
    expect(initial.children).toEqual(expected.children)
    expect(initial.selection).toEqual(expected.selection)
  })

  // ***
  test('remove link with selection - partial', () => {

    const initial = withTest(
      <editor>
        <block>
          <anchor />
          <a href='test.com'>
            test<focus />.com
          </a>
        </block>
      </editor>
    );

    const expected = withTest(
      <editor>
        <block>
          <text>
            <anchor />test<focus />.com
          </text>
        </block>
      </editor>
    );

    getFunctions(initial).removeLink();
    expect(initial.children).toEqual(expected.children)
    expect(initial.selection).toEqual(expected.selection)
  })

})
