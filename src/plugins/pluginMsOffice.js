// Normalize html string and replace some characters
const normalizeHtmlString = (str = '') => str
  .replace(/<!--\[if(.|\n)*?endif]-->/g, '')
  .replace(/<o:p>(.|\n)*?<\/o:p>/g, '')
  .replace(/\u2000|\u2001|\u2002|\u2003|\u2004|\u2005|\u2006|\u2007|\u2008|\u2009|\u00A0/g, ' ')
  .replace(/\u2010|\u2011|\u2012|\u2013|\u2014|\u2015/g, '-')
  .replace(/\u2016/g, '|')
  .replace(/‘|’/g, `'`)
  .replace(/“|”/g, `"`)
  .replace(/…/g, `...`);

// ms office produces html in a way that text
// are not individually wrapped with DOM nodes
// and can appear as their siblings. for example:
// `<p>Click <a href="...">here</a>.</p>`
// this causes the text nodes to be ignored,
// therefore text nodes needs to be wrapped with
// span tags, and these span tags should have no
// children other than the text they contain
const wrapTextNodes = el => {
  // already a text node
  if (el.nodeType === 3) return el;
  // element has no text nodes
  if (Array.from(el.childNodes).every(c => c.nodeType !== 3)) return el;
  // every child of this element is already a text node
  if (Array.from(el.childNodes).every(c => c.nodeType === 3)) return el;
  // shallow clone node
  const newEl = el.cloneNode(false);
  // add child nodes, wrapping text within spans
  (el.childNodes || []).forEach(child => {
    if (child && child.nodeType === 3) {
      // text node
      const wrapper = document.createElement('span');
      wrapper.innerText = child.textContent;
      newEl.appendChild(wrapper);
    } else {
      newEl.appendChild(child.cloneNode(true));
    }
  })

  return newEl;
}

// reference to the list container being parsed
let activeListRef = null;

// Parse MS word clipboard contents
const transformMsOffice = _el => {

  const el = wrapTextNodes(_el);

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
          const normalizedHtmlString = normalizeHtmlString(htmlString);

          // convert the root tag into a div, which will
          // then be eliminated by the deserializer later on
          const newEl = document.createElement('div');
          newEl.innerHTML = normalizedHtmlString;

          // start transformation from the new root
          return transformMsOffice(newEl);

        } catch (e) {
          console.log('err', e);
          return el;
        }
      }
    ],
  }
};
