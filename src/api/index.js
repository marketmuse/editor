import focus from './focus/focus';
import focusAtEnd from './focusAtEnd/focusAtEnd';
import focusAtStart from './focusAtStart/focusAtStart';
import insertText from './insertText/insertText';

export default editor => ({
  _getEditor: () => editor,
  focus: () => focus(editor),
  focusAtEnd: () => focusAtEnd(editor),
  focusAtStart: () => focusAtStart(editor),
  insertText: text => insertText(editor, text),
});
