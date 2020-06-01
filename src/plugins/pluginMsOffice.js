// TODO
const normalizeMsOffice = () => {};

// TODO
const transformMsOffice = () => {};

export default {
  htmlDeserializerOptions: {
    transforms: [
      el => {
        try {

          // TODO
          const isMsOfficeRootElement = false;

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
