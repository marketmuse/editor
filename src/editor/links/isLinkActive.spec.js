/** @jsx jsx */
import jsx from '../deserializer/deserializeJsx/deserializeJsx';
import withTest from '../../test-utils/withTest';
import isLinkActive from './isLinkActive';

describe('isLinkActive', () => {

  // ***
  test('isLinkActive should return false when inactive - focus', () => {
    expect(
      isLinkActive(
        withTest(
          <editor>
            <block>
              <text>test<cursor /></text>
              <a href='test.com'>test.com</a>
            </block>
          </editor>
        )
      )
    ).toBe(
      false
    );
  })

  // ***
  test('isLinkActive should return true when active - focus', () => {
    expect(
      isLinkActive(
        withTest(
          <editor>
            <block>
              <text>test</text>
              <a href='test.com'>
                test.com
                <cursor />
              </a>
            </block>
          </editor>
        )
      )
    ).toBe(
      true
    );
  })

  // ***
  test('isLinkActive should return false when inactive - selection', () => {
    expect(
      isLinkActive(
        withTest(
          <editor>
            <block>
              <text>
                <anchor />test<focus />
              </text>
              <a href='test.com'>
                test.com
              </a>
            </block>
          </editor>
        )
      )
    ).toBe(
      false
    );
  })

  // ***
  test('isLinkActive should return true when active - selection full inner', () => {
    expect(
      isLinkActive(
        withTest(
          <editor>
            <block>
              <text>test</text>
              <a href='test.com'>
                <anchor />test.com<focus />
              </a>
            </block>
          </editor>
        )
      )
    ).toBe(
      true
    );
  })

  // ***
  test('isLinkActive should return true when active - selection full outer', () => {
    expect(
      isLinkActive(
        withTest(
          <editor>
            <block>
              <text>
                <anchor />
                test
              </text>
              <a href='test.com'>
                test.com
              </a>
              <text>
                test2
                <focus />
              </text>
            </block>
          </editor>
        )
      )
    ).toBe(
      true
    );
  })

  // ***
  test('isLinkActive should return true when active - selection partial', () => {
    expect(
      isLinkActive(
        withTest(
          <editor>
            <block>
              <text>
                <anchor />
                test
              </text>
              <a href='test.com'>
                test.com
                <focus />
              </a>
            </block>
          </editor>
        )
      )
    ).toBe(
      true
    );
  })

})
