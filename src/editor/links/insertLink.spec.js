/** @jsx deserialize */
import deserialize from '@editor/deserializer/deserializeJsx';
import withTest from '@utils/test/withTest';
import getFunctions from '@editor/functions';

describe('api: insert link', () => {

  // ***
  test('insert link with focus - empty', () => {

    const initial = withTest(
      <editor>
        <block>
          <cursor />
        </block>
      </editor>
    );

    const expected = withTest(
      <editor>
        <block>
          <text />
          <a href='test.com'>
            test.com
            <cursor />
          </a>
          <text />
        </block>
      </editor>
    );

    getFunctions(initial).insertLink('test.com');
    expect(initial.children).toEqual(expected.children)
    expect(initial.selection).toEqual(expected.selection)
  })

  // ***
  test('insert link with focus - middle', () => {

    const initial = withTest(
      <editor>
        <block>
          te
          <cursor />
          st
        </block>
      </editor>
    );

    const expected = withTest(
      <editor>
        <block>
          te
          <a href='test.com'>
            test.com
            <cursor />
          </a>
          st
        </block>
      </editor>
    );

    getFunctions(initial).insertLink('test.com');
    expect(initial.children).toEqual(expected.children)
    expect(initial.selection).toEqual(expected.selection)
  })

  // ***
  test('insert link with focus - selection empty', () => {

    const initial = withTest(
      <editor>
        <block>
          <anchor />
          test
          <focus />
        </block>
      </editor>
    );

    const expected = withTest(
      <editor>
        <block>
          <text />
          <a href='test.com'>
            test
            <cursor />
          </a>
          <text />
        </block>
      </editor>
    );

    getFunctions(initial).insertLink('test.com');
    expect(initial.children).toEqual(expected.children)
    expect(initial.selection).toEqual(expected.selection)
  })

  // ***
  test('insert link with focus - selection middle', () => {

    const initial = withTest(
      <editor>
        <block>
          wo
          <anchor />
          test
          <focus />
          rd
        </block>
      </editor>
    );

    const expected = withTest(
      <editor>
        <block>
          wo
          <a href='test.com'>
            test
            <cursor />
          </a>
          rd
        </block>
      </editor>
    );

    getFunctions(initial).insertLink('test.com');
    expect(initial.children).toEqual(expected.children)
    expect(initial.selection).toEqual(expected.selection)
  })
})
