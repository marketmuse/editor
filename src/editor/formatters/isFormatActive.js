import { Editor } from 'slate';

export default (editor, type, format) => {

  if (type === 'mark') {

    // mark type
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;

  } else {

    // block type
    const [match] = Editor.nodes(editor, {
      match: n => n.type && n.type === format,
    })

    return !!match;
  }
}
