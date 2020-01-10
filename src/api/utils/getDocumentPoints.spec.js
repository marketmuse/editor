/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '../../test-utils/jsx';
import mount from '../../test-utils/mount';
import withTest from '../../test-utils/withTest';
import initApi from '..';
import getDocumentEndPoint from './getDocumentEndPoint';
import getDocumentStartPoint from './getDocumentStartPoint';

describe('api utils: getDocumentPoints', () => {

  // ****
  test('get document point works', () => {
    const input = withTest(
      <editor>
        <block>test</block>
      </editor>
    );

    const startPoint = getDocumentStartPoint(input);
    const endPoint = getDocumentEndPoint(input);
    expect(startPoint).toEqual({ path: [0, 0], offset: 0 });
    expect(endPoint).toEqual({ path: [0, 0], offset: 4 });
  });

  // ****
  test('get document point works with multiple blocks', () => {
    const input = withTest(
      <editor>
        <block>test</block>
        <block>test</block>
        <block>test</block>
      </editor>
    );

    const startPoint = getDocumentStartPoint(input);
    const endPoint = getDocumentEndPoint(input);
    expect(startPoint).toEqual({ path: [0, 0], offset: 0 });
    expect(endPoint).toEqual({ path: [2, 0], offset: 4 })
  });

  // ****
  test('get document point works with nested blocks', () => {
    const input = withTest(
      <editor>
        <block>
          <block>
            <block>
              test
            </block>
          </block>
        </block>
      </editor>
    );

    const startPoint = getDocumentStartPoint(input);
    const endPoint = getDocumentEndPoint(input);
    expect(startPoint).toEqual({ path: [0, 0, 0, 0], offset: 0 });
    expect(endPoint).toEqual({ path: [0, 0, 0, 0], offset: 4 })
  });

  // ****
  test('get document point works with multiple nested blocks', () => {
    const input = withTest(
      <editor>
        <block><block><block>test</block></block></block>
        <block><block><block>test</block></block></block>
        <block><block><block>test</block></block></block>
        <block>
          <block><block>test</block></block>
          <block><block>test</block></block>
          <block>
            <block>test</block>
            <block>test</block>
            <block>test</block>
          </block>
        </block>
      </editor>
    );

    const startPoint = getDocumentStartPoint(input);
    const endPoint = getDocumentEndPoint(input);
    expect(startPoint).toEqual({ path: [0, 0, 0, 0], offset: 0 });
    expect(endPoint).toEqual({ path: [3, 2, 2, 0], offset: 4 })
  });

  // ***
  // TODO: find a way to better handle hard clear
  test('get document point works after hard clear', () => {
    const input = withTest(
      <editor>
        <block>test</block>
      </editor>
    );

    // hard clear
    initApi(input).clear({ hard: true })

    // it should select the first point
    const startPoint = getDocumentStartPoint(input);
    const endPoint = getDocumentEndPoint(input);
    expect(startPoint).toEqual({ path: [0, 0], offset: 0 });
    expect(endPoint).toEqual({ path: [0, 0], offset: 0 })
  })
})
