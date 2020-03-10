/** @jsx deserialize */
import { ReactEditor } from 'slate-react'
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import getFunctions from '@editor/functions';
import getDocumentEdgePoint from './getDocumentEdgePoint';

describe('api utils: getDocumentPoints', () => {

  // ****
  test('get document point works', () => {
    const input = withTest(
      <editor>
        <block>test</block>
      </editor>
    );

    const startPoint = getDocumentEdgePoint(input, { edge: 'start' });
    const endPoint = getDocumentEdgePoint(input);
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

    const startPoint = getDocumentEdgePoint(input, { edge: 'start' });
    const endPoint = getDocumentEdgePoint(input);
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

    const startPoint = getDocumentEdgePoint(input, { edge: 'start' });
    const endPoint = getDocumentEdgePoint(input);
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

    const startPoint = getDocumentEdgePoint(input, { edge: 'start' });
    const endPoint = getDocumentEdgePoint(input);
    expect(startPoint).toEqual({ path: [0, 0, 0, 0], offset: 0 });
    expect(endPoint).toEqual({ path: [3, 2, 2, 0], offset: 4 })
  });

  // ***
  test('get document point works after clear', () => {
    const input = withTest(
      <editor>
        <block>test</block>
      </editor>
    );

    // clear
    getFunctions(input).clear()

    // it should select the first point
    const startPoint = getDocumentEdgePoint(input, { edge: 'start' });
    const endPoint = getDocumentEdgePoint(input);
    expect(startPoint).toEqual({ path: [0, 0], offset: 0 });
    expect(endPoint).toEqual({ path: [0, 0], offset: 0 })
  })

  // ***
  test('get document point works with no text node', () => {
    const input = withTest(<editor />);
    const startPoint = getDocumentEdgePoint(input, { edge: 'start' });
    const endPoint = getDocumentEdgePoint(input);
    expect(startPoint).toBeNull();
    expect(endPoint).toBeNull();
  })
})
