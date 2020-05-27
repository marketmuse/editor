import serializeHtml from '@editor/serializer/serializeHtml/serializeHtml';

export default (editor, options) => {
  if (!editor || !editor.children) return null;
  const value = editor.children;
  return serializeHtml(value);
};
