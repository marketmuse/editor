/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import toggleFormat from '@editor/formatters/toggleFormat';

describe('api utils: toggleFormat', () => {

  // ****
  test('toggles format off', () => {
    
    const input = withTest(
      <editor>
        <h1>
          <anchor />test<focus />
        </h1>
      </editor>
    );

    const expected = withTest(
      <editor>
        <p>
          <anchor />test<focus />
        </p>
      </editor>
    );

    toggleFormat(input, 'block', 'heading-one');
    expect(input.children).toEqual(expected.children)
  });

  // ****
  test('toggles format on', () => {
    
    const input = withTest(
      <editor>
        <p>
          <anchor />test<focus />
        </p>
      </editor>
    );

    const expected = withTest(
      <editor>
        <h1>
          <anchor />test<focus />
        </h1>
      </editor>
    );

    toggleFormat(input, 'block', 'heading-one');
    expect(input.children).toEqual(expected.children)
  });

})
