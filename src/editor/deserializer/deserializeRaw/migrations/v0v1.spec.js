// a test should be implemented for every migration script

import { types } from '@config/common';
import v0v1 from '@editor/deserializer/deserializeRaw/migrations/v0v1';

describe('migrations from data version 0 to 1', () => {

  // ****
  test('removal: boldAndItalic', () => {

    const before = [{
      type: types.p,
      children: [{
        text: 'marketmuse',
        boldAndItalic: true
      }]
    }]

    const after = [{
      type: types.p,
      children: [{
        text: 'marketmuse',
        bold: true,
        italic: true,
      }]
    }]

    const migrated = v0v1(before);
    expect(migrated).toEqual(after)
  });

  // ****
  test('removal: double-paragraph', () => {

    const before = [{
      type: 'double-paragraph',
      children: [{ text: 'marketmuse' }]
    }]

    const after = [{
      type: types.p,
      children: [{ text: 'marketmuse' }]
    }]

    const migrated = v0v1(before);
    expect(migrated).toEqual(after)
  });

  // ****
  test('rename: `hyperlink` and its attribute `src`', () => {

    const before = [{
      type: 'hyperlink',
      src: 'marketmuse.com',
      children: [{ text: 'marketmuse' }]
    }]

    const after = [{
      type: types.a,
      href: 'marketmuse.com',
      children: [{ text: 'marketmuse' }]
    }]

    const migrated = v0v1(before);
    expect(migrated).toEqual(after)
  });

});
