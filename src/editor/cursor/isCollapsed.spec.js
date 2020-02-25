/** @jsx jsx */
import jsx from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import isCollapsed from '@editor/cursor/isCollapsed';

describe('isCollapsed', () => {

  // ***
  test('should return true when the selection is collapsed', () => {
    expect(
      isCollapsed(
        withTest(
          <editor>
            <block>
              <text>test<cursor /></text>
            </block>
          </editor>
        )
      )
    ).toBe(
      true
    );
  })

  // ***
  test('should return false when the selection not collapsed', () => {
    expect(
      isCollapsed(
        withTest(
          <editor>
            <block>
              <text>t<anchor />es<focus />t</text>
            </block>
          </editor>
        )
      )
    ).toBe(
      false
    );
  })

  // ***
  test('should return null when there is no selection', () => {
    expect(
      isCollapsed(
        withTest(
          <editor>
            <block>
              <text>test</text>
            </block>
          </editor>
        )
      )
    ).toBe(
      null
    );
  })

})
