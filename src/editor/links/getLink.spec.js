/** @jsx deserialize */
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import getLink from '@editor/links/getLink';

describe('isLinkActive', () => {

  // ***
  test('should return active link', () => {
    const link = getLink(
      withTest(
        <editor>
          <block>
            <a href='test.com'>te<cursor />st.com</a>
          </block>
        </editor>
      )
    );

    expect(link.href).toBe('test.com');
  })
})
