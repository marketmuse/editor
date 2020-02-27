export default (html = '') => {
  let clean = html;

  // remove new lines
  clean = clean.replace(/\n/g, '');
  // remove spaces and tabs before tags
  clean = clean.replace(/[\t ]+</g, '<');
  // remove spaces and tabs between tags
  clean = clean.replace(/>[\t ]+</g, '><');
  // remove whitespace after tags
  clean = clean.replace(/>[\t ]+$/g, '>');

  return clean
}
