const transformGdocs = el => {

  // do not parse children of li tags
  if (el.tagName === 'LI') {
    el.innerHTML = el.innerText;
  }

  // leaf nodes where we need to transform the styles
  if (el.tagName === 'SPAN' || el.tagName === 'LI') {
    const tags = [];

    // extract styles
    if (el.style.fontWeight === '700') tags.push('b');
    if (el.style.fontStyle === 'italic') tags.push('i');
    if ((el.style.textDecoration || '').indexOf('underline') !== -1) tags.push('u');
    if ((el.style.textDecoration || '').indexOf('line-through') !== -1) tags.push('s');

    const container = document.createElement('span');
    container.innerText = el.innerText;

    // wrap extracted tags and return
    const wrapped = tags.reduce((acc, tag) => {
      const newTag = document.createElement(tag);
      newTag.appendChild(acc.cloneNode(true))
      return newTag;
    }, container);

    // el.innerHTML = wrapped.innerHTML;
    const base = document.createElement(el.tagName);
    base.appendChild(wrapped.cloneNode(true));
    return base;
  }

  const children = el.children || [];

  // base case - no children
  if (children.length === 0) return el;

  // process children
  const newChildren = Array
    .from(children)
    .map(transformGdocs);

  // create a new element with the same tag
  let newEl = null;
  try {
    newEl = document.createElement(el.tagName);
  } catch (e) {
    newEl = document.createElement('span');
  }

  // add new children
  newChildren.forEach(c => {
    newEl.appendChild(c.cloneNode(true))
  })

  return newEl;
}

export default {
  htmlDeserializerOptions: {
    transforms: [
      el => {
        try {

          // google docs returns markup in a b
          // tag with `font-weight: normal`
          if (
            el.tagName === 'B' &&
            el.style.fontWeight === 'normal' &&
            el.id.indexOf('docs-internal-guid') !== -1
          ) {

            // convert the root b tag into a div, which will
            // then be eliminated by the deserializer later on
            const newEl = document.createElement('div');
            newEl.innerHTML = el.innerHTML;

            // start transformation from the new root
            return transformGdocs(newEl);
          }

          return el;

        } catch (e) {
          return el;
        }
      }
    ],
  }
};
