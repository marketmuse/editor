// Replace weird unicode characters MS Word inserts
const normalizeMsOffice = (str = '') => str
  .replace(/<!--\[if(.|\n)*?endif]-->/g, '')
  .replace(/\u2000|\u2001|\u2002|\u2003|\u2004|\u2005|\u2006|\u2007|\u2008|\u2009|\u00A0/g, ' ')
  .replace(/\u2010|\u2011|\u2012|\u2013|\u2014|\u2015/g, '-')
  .replace(/\u2016/g, '|')
  .replace(/‘|’/g, `'`)
  .replace(/“|”/g, `"`)
  .replace(/…/g, `...`);

// reference to the list container being parsed
let activeListRef = null;

// Parse MS word clipboard contents
const transformMsOffice = el => {

  // span tags contain text and `<o:p></o:p>` tags which we
  // don't need to parse, so disregard html content of
  // span tags and convert them to readable text
  if (el.tagName === 'SPAN') {
    el.innerHTML = el.innerText;
  }

  // list items
  if (el.className.indexOf('MsoList') !== -1) {

    // list item class names
    const isFirst = el.className.indexOf('First') !== -1;
    const isLast = el.className.indexOf('Last') !== -1;

    // if this is the first list item, create a list wrapper and
    // keep its ref in the window var for the following recursions
    if (isFirst) {
      // TODO: detect list style (ul / ol)
      activeListRef = document.createElement('ul');
    }

    // convert to list item and append it
    // to the active list container
    if (activeListRef) {
      const listItem = document.createElement('li');
      listItem.innerHTML = el.innerText;
      activeListRef.appendChild(listItem);
    }

    // clear reference to the active list if last list item
    if (isLast) activeListRef = null;

    // for the first item, return the list container as the
    // current element, return null for sibling list items and
    // append them to the active list container ref instead
    if (isFirst) return activeListRef;
    else return null;
  }

  const children = el.children || [];

  // base case - no children
  if (children.length === 0) return el;

  // process children
  const newChildren = Array
    .from(children)
    .map(transformMsOffice)
    .filter(Boolean);

  let newEl = null;

  // create a new element with the same tag
  // MS office generates invalid html tags so
  // fall back to a span tag
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
};

export default {
  htmlDeserializerOptions: {
    transforms: [
      el => {
        try {

          // include all microsoft office products
          const isMsOfficeRootElement = el.tagName === 'HTML' && (
            (el.getAttribute('xmlns:o') || '').indexOf('schemas-microsoft-com:office') !== -1 ||
            (el.getAttribute('xmlns:w') || '').indexOf('schemas-microsoft-com:office') !== -1 ||
            (el.getAttribute('xmlns:m') || '').indexOf('schemas.microsoft.com/office') !== -1
          );

          // only parse the root element
          if (!isMsOfficeRootElement) return el;

          // grab body contents of the clipboard
          const body = el.getElementsByTagName('body')[0];
          const htmlString = body ? body.innerHTML : el.innerHTML;

          // normalize html string
          const normalizedHtmlString = normalizeMsOffice(htmlString);

          // convert the root tag into a div, which will
          // then be eliminated by the deserializer later on
          const newEl = document.createElement('div');
          newEl.innerHTML = normalizedHtmlString;

          // start transformation from the new root
          const transformed = transformMsOffice(newEl);
          console.log('transformed', transformed);
          return transformed;

        } catch (e) {
          console.log('err', e);
          return el;
        }
      }
    ],
  }
};
