import mapReduceFlattenDict from '@utils/mapReduceFlattenDict';

describe('mapReduceFlattenDict', () => {

  // ****
  test('mapReduceFlattenDict works', () => {

    const items = [
      { a: [1, 2], b: { num: 1 } },
      { a: [3, 4], c: 'c1', d: 'd1' },
      { b: { num: 2 }, c: ['c2', 'c3'] },
      { a: [5], b: [{ num: 3 }, { num: 4, bar: 'foo' }], c: null },
      { a: null, b: undefined, c: 'c4' },
      { a: [6, 7], b: { num: 5 }, d: 'd2' },
      { b: [], d: 'd3' },
    ]

    const res = mapReduceFlattenDict(items);

    expect(res).toEqual({
      a: [1, 2, 3, 4, 5, 6, 7],
      b: [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4, bar: 'foo' }, { num: 5 }],
      c: ['c1', 'c2', 'c3', 'c4'],
      d: ['d1', 'd2', 'd3'],
    })
  });

})
