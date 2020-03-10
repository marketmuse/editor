import serializeRaw from '@editor/serializer/serializeRaw/serializeRaw';

export default (editor, { history } = {}) => {
  if (!editor || !editor.children) return null;
  const value = editor.children;
  const metadata = history ? { history: editor.history } : {};
  return serializeRaw(value, metadata);
};
