import { types } from '@config/common';

export const initialRange = {
  anchor: { path: [0, 0], offset: 0 },
  focus: { path: [0, 0], offset: 0 },
};

export default [{
  type: types.p,
  children: [{ text: '' }]
}];
