import deserialize from '@editor/deserializer/deserialize';

export default (text = '') => {
  const useText = typeof text === 'string' ? text : '';
  // interpret new lines as paragraphs
  // remove empty lines
  return useText
    .split(/\n/gi)
    .filter(t => !!t && t.length > 0)
    .map(t => (
      deserialize('P', {}, [
        deserialize('#TEXT', {}, t)
      ])
    ))
};
