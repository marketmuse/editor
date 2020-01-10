/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '../../test-utils/jsx';
import withTest from '../../test-utils/withTest';
import initApi from '..';

const run = (inputSoft, inputHard, exSoft, exHard) => {
  initApi(inputSoft).clear();
  initApi(inputHard).clear({ hard: true });
  return [
    { s: inputSoft.children, h: inputHard.children },
    { s: exSoft.children, h: exHard.children }
  ]
}

describe('api: clear', () => {

  // ****
  test('clear works', () => {

    const inputSoft = withTest(
      <editor>
        <element>
          <text>test</text>
        </element>
      </editor>
    );

    const inputHard = withTest(
      <editor>
        <element>
          <text>test</text>
        </element>
      </editor>
    );

    const expectedSoft = withTest(
      <editor>
        <element>
          <text />
        </element>
      </editor>
    );

    const expectedHard = withTest(
      <editor />
    );

    const [actual, expected] = run(
      inputSoft,
      inputHard,
      expectedSoft,
      expectedHard
    );

    expect(actual).toEqual(expected);
  });

  // ****
  test('clear works with multiple blocks', () => {

    const inputSoft = withTest(
      <editor>
        <block><text>test</text></block>
        <block><text>test</text></block>
        <block><text>test</text></block>
      </editor>
    );

    const inputHard = withTest(
      <editor>
        <block><text>test</text></block>
        <block><text>test</text></block>
        <block><text>test</text></block>
      </editor>
    );

    const expectedSoft = withTest(
      <editor>
        <block>
          <text />
        </block>
      </editor>
    );

    const expectedHard = withTest(
      <editor />
    );

    const [actual, expected] = run(
      inputSoft,
      inputHard,
      expectedSoft,
      expectedHard
    );

    expect(actual).toEqual(expected);
  });

  // ****
  test('clear works with nested blocks', () => {

    const inputSoft = withTest(
      <editor>
        <block>
          <block>
            <text>test</text>
          </block>
        </block>
      </editor>
    );

    const inputHard = withTest(
      <editor>
        <block>
          <block>
            <text>test</text>
          </block>
        </block>
      </editor>
    );

    const expectedSoft = withTest(
      <editor>
        <block>
          <block>
            <text />
          </block>
        </block>
      </editor>
    );

    const expectedHard = withTest(
      <editor />
    );

    const [actual, expected] = run(
      inputSoft,
      inputHard,
      expectedSoft,
      expectedHard,
    );

    expect(actual).toEqual(expected);
  });

  // ****
  test('clear works with multiple nested blocks', () => {

    const inputSoft = withTest(
      <editor>
        <block><block><block><text>test</text></block></block></block>
        <block><block><block><text>test</text></block></block></block>
        <block><block><block><text>test</text></block></block></block>
        <block>
          <block><block><text>test</text></block></block>
          <block><block><text>test</text></block></block>
          <block>
            <block><text>test</text></block>
            <block><text>test</text></block>
            <block><text>test</text></block>
          </block>
        </block>
      </editor>
    );

    const inputHard = withTest(
      <editor>
        <block><block><block><text>test</text></block></block></block>
        <block><block><block><text>test</text></block></block></block>
        <block><block><block><text>test</text></block></block></block>
        <block>
          <block><block><text>test</text></block></block>
          <block><block><text>test</text></block></block>
          <block>
            <block><text>test</text></block>
            <block><text>test</text></block>
            <block><text>test</text></block>
          </block>
        </block>
      </editor>
    );

    const expectedSoft = withTest(
      <editor>
        <block>
          <block>
            <block>
              <text />
            </block>
          </block>
        </block>
      </editor>
    );

    const expectedHard = withTest(
      <editor />
    );

    const [actual, expected] = run(
      inputSoft,
      inputHard,
      expectedSoft,
      expectedHard
    );

    expect(actual).toEqual(expected);
  });
})
