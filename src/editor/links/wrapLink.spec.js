/** @jsx jsx */
import jsx from '../deserializer/deserializeJsx/deserializeJsx';
import withTest from '../../test-utils/withTest';
import wrapLink from './wrapLink';

describe('wrapLink', () => {

  // ***
  test('wrap link with focus - empty', () => {

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

    wrapLink(initial, 'test.com');
    expect(initial.children).toEqual(expected.children)
    expect(initial.selection).toEqual(expected.selection)
  })

  // ***
  test('wrap link with focus - middle', () => {

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

    wrapLink(initial, 'test.com');
    expect(initial.children).toEqual(expected.children)
    expect(initial.selection).toEqual(expected.selection)
  })

  // ***
  test('wrap link with focus - selection empty', () => {

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

    wrapLink(initial, 'test.com');
    expect(initial.children).toEqual(expected.children)
    expect(initial.selection).toEqual(expected.selection)
  })

  // ***
  test('wrap link with focus - selection middle', () => {

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

    wrapLink(initial, 'test.com');
    expect(initial.children).toEqual(expected.children)
    expect(initial.selection).toEqual(expected.selection)
  })
})
