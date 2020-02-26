/** @jsx deserialize */
import { ReactEditor } from 'slate-react'
import deserialize from '@editor/deserializer/deserializeJsx';
import withTest from '@utils/test/withTest';
import toggleFormat from '@editor/formatters/toggleFormat';

describe('api utils: toggleFormat', () => {

  // ****
  test('toggles format off', () => {

    const input = withTest(
      <editor>
        <block>
          <text bold>
            <anchor />test<focus />
          </text>
        </block>
      </editor>
    );

    const expected = withTest(
      <editor>
        <block>
          <text>
            <anchor />test<focus />
          </text>
        </block>
      </editor>
    );

    toggleFormat(input, 'mark', 'bold');
    expect(input.children).toEqual(expected.children)
  });

  // ****
  test('toggles format on', () => {

    const input = withTest(
      <editor>
        <block>
          <text>
            <anchor />test<focus />
          </text>
        </block>
      </editor>
    );

    const expected = withTest(
      <editor>
        <block>
          <text bold>
            <anchor />test<focus />
          </text>
        </block>
      </editor>
    );

    toggleFormat(input, 'mark', 'bold');
    expect(input.children).toEqual(expected.children)
  });

  // ****
  test('toggles format force on while off', () => {

    const input = withTest(
      <editor>
        <block>
          <text>
            <anchor />test<focus />
          </text>
        </block>
      </editor>
    );

    const expected = withTest(
      <editor>
        <block>
          <text bold>
            <anchor />test<focus />
          </text>
        </block>
      </editor>
    );

    toggleFormat(input, 'mark', 'bold', { status: true });
    expect(input.children).toEqual(expected.children)
  });

  // ****
  test('toggles format force on while on', () => {

    const input = withTest(
      <editor>
        <block>
          <text bold>
            <anchor />test<focus />
          </text>
        </block>
      </editor>
    );

    const expected = withTest(
      <editor>
        <block>
          <text bold>
            <anchor />test<focus />
          </text>
        </block>
      </editor>
    );

    toggleFormat(input, 'mark', 'bold', { status: true });
    expect(input.children).toEqual(expected.children)
  });

  // ****
  test('toggles format force off while on', () => {

    const input = withTest(
      <editor>
        <block>
          <text bold>
            <anchor />test<focus />
          </text>
        </block>
      </editor>
    );

    const expected = withTest(
      <editor>
        <block>
          <text>
            <anchor />test<focus />
          </text>
        </block>
      </editor>
    );

    toggleFormat(input, 'mark', 'bold', { status: false });
    expect(input.children).toEqual(expected.children)
  });

  // ****
  test('toggles format force off while off', () => {

    const input = withTest(
      <editor>
        <block>
          <text>
            <anchor />test<focus />
          </text>
        </block>
      </editor>
    );

    const expected = withTest(
      <editor>
        <block>
          <text>
            <anchor />test<focus />
          </text>
        </block>
      </editor>
    );

    toggleFormat(input, 'mark', 'bold', { status: false });
    expect(input.children).toEqual(expected.children)
  });

})
