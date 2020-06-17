export default (html = '') => html
  // remove coments
  .replace(/<!--\[if(.|\n)*?endif]-->/g, '')
  // replace line breaks with spaces
  // when sentences are broken by a new line, it causes
  // the space between words to disappear
  .replace(/(?:\n\r|\r\n|\r|\n)/gm, ' ')
  // remove spaces and tabs before tags
  .replace(/^[\t ]+</g, '<')
  .replace(/[\t ]+</g, ' <')
  // remove multiple spaces and tabs between tags
  .replace(/>[\t ]+</g, '> <')
  // remove whitespace after tags
  .replace(/>[\t ]+$/g, '>')
  .replace(/>[\t ]+/g, '> ')
  // replace more than two space characters
  // with a single space
  .replace(/\s\s+/g, ' ')
  // replace space character variations
  .replace(/\u21B5|\u2000|\u2001|\u2002|\u2003|\u2004|\u2005|\u2006|\u2007|\u2008|\u2009|\u00A0/g, ' ')
  // replace dash character variations
  .replace(/\u2010|\u2011|\u2012|\u2013|\u2014|\u2015/g, '-')
  // replace vertical bar character variations
  .replace(/\u2016/g, '|')
  // replace opening - closing single quotes with standard
  .replace(/‘|’/g, `'`)
  // replace opening - closing double quotes with standard
  .replace(/“|”/g, `"`)
  // replace three dots character with three dots
  .replace(/…/g, `...`);
