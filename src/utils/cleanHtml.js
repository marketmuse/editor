export default (html = '') => {
  let clean = html;

  // remove new lines
  clean = clean.replace(/\n/g, '');
  // remove spaces and tabs before tags
  clean = clean.replace(/^[\t ]+</g, '<');
  clean = clean.replace(/[\t ]+</g, ' <');
  // remove multiple spaces and tabs between tags
  clean = clean.replace(/>[\t ]+</g, '> <');
  // remove whitespace after tags
  clean = clean.replace(/>[\t ]+$/g, '>');
  clean = clean.replace(/>[\t ]+/g, '> ');
  // replace multiple spaces with a single space
  // TODO: is this one a good idea ?
  clean = clean.replace(/\s\s+/g, ' ');

  return clean
}
