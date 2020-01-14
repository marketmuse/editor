/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '../../utils/jsx';
import withTest from '../../test-utils/withTest';
import initApi from '..';

const run = (input, exHard) => {
  initApi(input).clear();
  return [ input.children, exHard.children ];
}

describe('api: clear', () => {

  // ****
  test('clear works', () => {
    const [actual, expected] = run(
      withTest(
        <editor>
          <paragraph>
            <text>test</text>
          </paragraph>
        </editor>
      ),
      withTest(
        <editor>
          <paragraph>
            <text />
          </paragraph>
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
          <paragraph><text>test</text></paragraph>
          <paragraph><text>test</text></paragraph>
          <paragraph><text>test</text></paragraph>
        </editor>
      ),
      withTest(
        <editor>
          <paragraph>
            <text />
          </paragraph>
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
          <paragraph>
            <paragraph>
              <text>test</text>
            </paragraph>
          </paragraph>
        </editor>
      ),
      withTest(
        <editor>
          <paragraph>
            <text />
          </paragraph>
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
          <paragraph><paragraph><paragraph><text>test</text></paragraph></paragraph></paragraph>
          <paragraph><paragraph><paragraph><text>test</text></paragraph></paragraph></paragraph>
          <paragraph><paragraph><paragraph><text>test</text></paragraph></paragraph></paragraph>
          <paragraph>
            <paragraph><paragraph><text>test</text></paragraph></paragraph>
            <paragraph><paragraph><text>test</text></paragraph></paragraph>
            <paragraph>
              <paragraph><text>test</text></paragraph>
              <paragraph><text>test</text></paragraph>
              <paragraph><text>test</text></paragraph>
            </paragraph>
          </paragraph>
        </editor>
      ),
      withTest(
        <editor>
          <paragraph>
            <text />
          </paragraph>
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
          <paragraph>
            <text>te<cursor />st</text>
          </paragraph>
        </editor>
      ),
      withTest(
        <editor>
          <paragraph>
            <text>
              <cursor />
            </text>
          </paragraph>
        </editor>
      )
    );

    expect(actual).toEqual(expected);
  })
})
