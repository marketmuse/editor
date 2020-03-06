import combineOptions from '@editor/deserializer/deserializeHtml/utils/combineOptions';

describe('combine options', () => {

  // ***
  test('combine options function should work properly', () => {
    const fn = () => {};

    const {
      transforms,
      strategies,
    } = combineOptions([
      { transforms: [fn, fn] },
      { strategies: [fn, fn, fn] },
      {
        transforms: [fn, fn, fn],
        strategies: [fn, fn]
      }
    ]);

    expect(transforms.length).toBe(5);
    expect(strategies.length).toBe(5);
  })
})
