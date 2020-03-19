/** @jsx deserialize */
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import mount from '@utils/test/mount';

const run = (input, expected) => {

  const result = mount({
    children: input.children,
    selection: input.selection,
    fn: ({ functions }) => functions.clear(),
  })

  return [
    { children: result.children, selection: result.selection },
    { children: expected.children, selection: expected.selection },
  ];
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
