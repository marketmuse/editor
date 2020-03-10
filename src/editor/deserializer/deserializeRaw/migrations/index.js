// add migration scripts like below
// <from_version>: { to: <to_version>, fn: <migration_function> }
import v0v1 from '@editor/deserializer/deserializeRaw/migrations/v0v1';

export const migrations = {
  0: { to: 1, fn: v0v1 },
};

export default (migration, raw) => {
  const migrated = migration.fn(raw.data);
  return {
    ...raw,
    data: migrated,
    data_version: migration.to,
  }
};
