// Replace weird unicode characters MS Word inserts
const normalizeMsOffice = (str = '') => (
  str
    .replace(/\u2000|\u2001|\u2002|\u2003|\u2004|\u2005|\u2006|\u2007|\u2008|\u2009|\u00A0/g, ' ')
    .replace(/\u2010|\u2011|\u2012|\u2013|\u2014|\u2015/g, '-')
    .replace(/\u2016/g, '|')
    .replace(/‘|’/g, `'`)
    .replace(/“|”/g, `"`)
    .replace(/…/g, `...`)
);

// Parse MS word clipboard contents
const transformMsOffice = el => {

};

export default {
  htmlDeserializerOptions: {
    transforms: [
      el => {
        try {

          // include all microsoft office products
          const isMsOfficeRootElement = (
            (el.getAttribute('xmlns:o') || '').indexOf('schemas-microsoft-com:office') ||
            (el.getAttribute('xmlns:w') || '').indexOf('schemas-microsoft-com:office') ||
            (el.getAttribute('xmlns:m') || '').indexOf('schemas.microsoft.com/office')
          );

          // this HTML is coming from MS Office
          if (isMsOfficeRootElement) {

            // normalize html string
            const normalizedHtmlString = normalizeMsOffice(el.innerHTML);

            // convert the root tag into a div, which will
            // then be eliminated by the deserializer later on
            const newEl = document.createElement('div');
            newEl.innerHTML = normalizedHtmlString;

            // start transformation from the new root
            return transformMsOffice(newEl);
          }

          return el;

        } catch (e) {
          return el;
        }
      }
    ],
  }
};
