/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import toggleFormat from '@editor/utils/toggleFormat';

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

    toggleFormat(input, 'bold');
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

    toggleFormat(input, 'bold');
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

    toggleFormat(input, 'bold', true);
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

    toggleFormat(input, 'bold', true);
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

    toggleFormat(input, 'bold', false);
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

    toggleFormat(input, 'bold', false);
    expect(input.children).toEqual(expected.children)
  });

})
