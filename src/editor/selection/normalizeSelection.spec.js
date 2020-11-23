/** @jsx deserialize */
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import normalizeSelection from '@editor/selection/normalizeSelection';

describe('selection: normalize selection', () => {

  // ****
  test('fixes selection extension anomaly', () => {

    const input = withTest(
      <editor>
        <block>
          <text>
            <anchor />test
          </text>
        </block>
        <block>
          <text>
            <focus />test
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
        <block>
          <text>
            test
          </text>
        </block>
      </editor>
    );

    normalizeSelection(input);
    expect(input.selection).toEqual(expected.selection)
  });

  // ****
  test('extension anomaly fix applies only to the consecutive block', () => {

    const input = withTest(
      <editor>
        <block>
          <text>
            <anchor />test
          </text>
        </block>
        <block />
        <block>
          <text>
            <focus />test
          </text>
        </block>
      </editor>
    );

    normalizeSelection(input);
    expect(input.selection).toEqual(input.selection)
  });

  // ****
  test('extension anomaly fix applies only on the forward direction', () => {

    const input = withTest(
      <editor>
        <block>
          <text>
            <focus />test
          </text>
        </block>
        <block>
          <text>
            <anchor />test
          </text>
        </block>
      </editor>
    );

    normalizeSelection(input);
    expect(input.selection).toEqual(input.selection)
  });

})
