export const tag = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
export const type = 'heading';
export const get = ({ level, tag = '' } = {}) => {
  let useLevel = level;
  if (!useLevel) {
    let useTag = tag.toUpperCase();
    if (useTag === 'H1') useLevel = 1;
    if (useTag === 'H2') useLevel = 2;
    if (useTag === 'H3') useLevel = 3;
    if (useTag === 'H4') useLevel = 4;
    if (useTag === 'H5') useLevel = 5;
    if (useTag === 'H6') useLevel = 6;
  }
  return {
    type,
    level: useLevel
  }
};
