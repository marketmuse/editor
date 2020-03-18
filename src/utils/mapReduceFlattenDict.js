import isNil from 'lodash/isNil';

// take a list of objects, reduce into a single object by keys
// 1. for array values, flatten
// 2. for non-array values, make them an array

export default (list = []) => {
  return list
    .filter(i => i && typeof i === 'object')
    .reduce((acc, item) => {
      const currentAcc = { ...acc };

      // iterate through keys of current object
      Object.keys(item).forEach(k => {
        const currentItem = item[k];

        // ignore nil values
        if (isNil(currentItem)) return;

        // initiate key
        if (!Array.isArray(currentAcc[k])) {
          currentAcc[k] = [];
        }

        // current item: flatten or make array
        currentAcc[k] = currentAcc[k].concat(currentItem);
      })

      return currentAcc;
    }, {})
};
