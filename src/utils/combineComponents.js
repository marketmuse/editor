import get from 'lodash/get';

export default (components = []) => (
  components.reduce((acc, c) => {
    if (!c || !get(c.tag)) return acc;
    const makeObject = c => ({ [c.tag]: c });

    return {
      ...acc,
      ...(Array.isArray(c.tag)
        ? c.tag.reduce((acc2, ct) => ({ ...acc2, ...makeObject(ct) }), {})
        : makeObject(c)
      ),
    }
  }, {})
)
