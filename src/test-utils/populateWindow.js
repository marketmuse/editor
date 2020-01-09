import * as s from 'slate';
import * as sr from 'slate-react';

export default editor => {
  window.slate = s;
  window.slateReact = sr;
  window.editor = editor;
}
