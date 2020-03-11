import isNil from 'lodash/isNil';
import deserializeRaw from '@editor/deserializer/deserializeRaw/deserializeRaw';

export default (editor, setValue, raw) => {

  // throw error for invalid data
  if (!raw || typeof raw !== 'object') {
    throw new Error('Failed to import: invalid data');
  }

  // deserialize
  const deserialized = deserializeRaw(raw);

  // throw error for failed deserialization
  if (isNil(deserialized)) {
    throw new Error('Failed to import: cannot deserialize');
  }

  // set editor state
  setValue(deserialized);

  // attach history if present
  if (raw.history) editor.history = raw.history;
}
