import serializeHtml from '@editor/serializer/serializeHtml/serializeHtml';

export default editor => {
  if (!editor || !editor.children) return null;
  return serializeHtml(editor.children);
};
