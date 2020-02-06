import { Editor } from 'slate';

export default (editor, type, format) => {

	// mark type
	if (type === 'mark') {
		const marks = Editor.marks(editor)
  	return marks ? marks[format] === true : false;
	}
  
  // block type
	else {
		const [match] = Editor.nodes(editor, {
	    match: n => n.type && n.type === format,
	  })

	  return !!match;
	}
}
