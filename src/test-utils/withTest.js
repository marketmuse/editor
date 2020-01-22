import withMarketmuse from '../editor/enhancer/withMarketmuse';

export default editor => {
  const { isInline, isVoid } = editor

  editor.isInline = element => {
    return element.inline === true ? true : isInline(element)
  }

  editor.isVoid = element => {
    return element.void === true ? true : isVoid(element)
  }

  return withMarketmuse(editor, { test: true });
}
