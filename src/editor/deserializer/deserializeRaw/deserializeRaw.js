import isNil from 'lodash/isNil';
import migrate, { migrations } from '@editor/deserializer/deserializeRaw/migrations';

const deserializeRaw = raw => {

  // invalid data
  if (!raw || typeof raw !== 'object') return null;
  if (isNil(raw.version) || isNil(raw.data_version)) return null;

  // if migration available, migrate and rerun function
  const migration = migrations[raw.data_version];
  if (migration) return deserializeRaw(migrate(migration, raw));

  // return editor data
  return raw.data;
};

export default deserializeRaw;
