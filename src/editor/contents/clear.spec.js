/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import getFunctions from '@editor/functions';

const run = (input, expected) => {
  getFunctions(input).clear();
  return [ input.children, expected.children ];
}

describe('api: clear', () => {

  // ****
  test('clear works', () => {
    const [actual, expected] = run(
      withTest(
        <editor>
          <p>
            <text>test</text>
          </p>
        </editor>
      ),
      withTest(
        <editor>
          <p>
            <text />
          </p>
        </editor>
      )
    );

    expect(actual).toEqual(expected);
  });

  // ****
  test('clear works with multiple blocks', () => {
    const [actual, expected] = run(
      withTest(
        <editor>
          <p><text>test</text></p>
          <p><text>test</text></p>
          <p><text>test</text></p>
        </editor>
      ),
      withTest(
        <editor>
          <p>
            <text />
          </p>
        </editor>
      )
    );

    expect(actual).toEqual(expected);
  });

  // ****
  test('clear works with nested blocks', () => {
    const [actual, expected] = run(
      withTest(
        <editor>
          <p>
            <p>
              <text>test</text>
            </p>
          </p>
        </editor>
      ),
      withTest(
        <editor>
          <p>
            <text />
          </p>
        </editor>
      ),
    );

    expect(actual).toEqual(expected);
  });

  // ****
  test('clear works with multiple nested blocks', () => {
    const [actual, expected] = run(
      withTest(
        <editor>
          <p><p><p><text>test</text></p></p></p>
          <p><p><p><text>test</text></p></p></p>
          <p><p><p><text>test</text></p></p></p>
          <p>
            <p><p><text>test</text></p></p>
            <p><p><text>test</text></p></p>
            <p>
              <p><text>test</text></p>
              <p><text>test</text></p>
              <p><text>test</text></p>
            </p>
          </p>
        </editor>
      ),
      withTest(
        <editor>
          <p>
            <text />
          </p>
        </editor>
      )
    );

    expect(actual).toEqual(expected);
  });

  // ****
  test('clear works with selection', () => {
    const [actual, expected] = run(
      withTest(
        <editor>
          <p>
            <text>te<cursor />st</text>
          </p>
        </editor>
      ),
      withTest(
        <editor>
          <p>
            <text>
              <cursor />
            </text>
          </p>
        </editor>
      )
    );

    expect(actual).toEqual(expected);
  })
})
