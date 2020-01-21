import get from 'lodash/get';

export default (components = []) => (
  components.reduce((acc, c = {}) => {
    if (!c || !c.tag) return acc;

    const makeObject = tag => ({ [tag]: c.get });

    return {
      ...acc,
      ...(Array.isArray(c.tag)
        ? c.tag.reduce((acc2, tag) => ({ ...acc2, ...makeObject(tag) }), {})
        : makeObject(c.tag)
      ),
    }
  }, {})
);
