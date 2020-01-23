/** @jsx jsx */
import jsx from '../deserializer/deserializeJsx/deserializeJsx';
import withTest from '../../test-utils/withTest';
import unwrapLink from './unwrapLink';

describe('unwrapLink', () => {

  // ***
  test('wrap link with focus', () => {

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

    unwrapLink(initial);
    expect(initial.children).toEqual(expected.children)
    expect(initial.selection).toEqual(expected.selection)
  })

  // ***
  test('wrap link with selection - full', () => {

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

    unwrapLink(initial);
    expect(initial.children).toEqual(expected.children)
    expect(initial.selection).toEqual(expected.selection)
  })

  // ***
  test('wrap link with selection - partial', () => {

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

    unwrapLink(initial);
    expect(initial.children).toEqual(expected.children)
    expect(initial.selection).toEqual(expected.selection)
  })

})
