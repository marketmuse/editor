## Docs

Basic usage:

```javascript
import React from 'react';
import MMSEditor from 'mms-editor';

const App = () => (
  <MMSEditor>
    {({ component }) => (
      <div>
        {component}
      </div>
    )}
  </MMSEditor>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

### MMSEditor props

`MMSEditor` component accepts the following props.

* **className** *(string)* - Apply a class name to the editor container (the render output of `component`). By default, it will already have `mms--editor`, and provided class names will be appended. This also makes styling the editor root with `styled-components` or similar libraries possible.

* **style** *(object)* - Apply inline styles to the editor container.

* **children** *(function)* - MMSEditor adopts the [function-as-children pattern](https://reactjs.org/docs/jsx-in-depth.html#functions-as-children) to be able to pass on some editor related data down to its children, including the api and even the editor itself. Therefor, the children provided to this component **must** be a function.

* **autoFocus** *(boolean)* - Focus upon mount.

* **readOnly** *(boolean)* - Disallow editing.

### Children args

`MMSEditor` passes below arguments to its function children:

* **component** *(React Component)* - The editor instance ready to render. It is required to render this, without doing so, the editor will not be mounted which is likely to cause potential crashes. This approach is particularly useful for building toolbars / sidebars / other components that lives under the Editor provider (ie `MMSEditor`) and could consume all editor related data and utilize the api.

* **api** *(function)* - This function grabs the Slate editor instance and returns the api methods as an object with the instance wrapped in their closures. It exposes MMS Editor's higher-level api built on top of Slate JS, without even needing to interact with Slate editors instance, however if desired, a particular editor instance could be provided as the first argument and it will be used instead.

*Format helpers*: Below arguments are simple flags that provides information about the cursors location / selection. They are useful for building custom toolbars.

* **isBold** *(boolean)* - True if cursor / selection is over bold text.

* **isItalic** *(boolean)* - True if cursor / selection is over italic text.

* **isUnderline** *(boolean)* - True if cursor / selection is over underlined text.

* **isStrikethrough** *(boolean)* - True if cursor / selection is over strike through text.

### api Methods

These functions will be available within an object returned by `api` provided by `MMSEditor`'s children arg. It could be used like this: `api().focus()`

*Focus*:
* **focus()** *(void)* - Focus on the editor programmatically
* **focusAtEnd()** *(void)* - Focus on the editor programmatically at the end
* **focusAtStart()** *(void)* - Focus on the editor programmatically at the start
* **hasFocus()** *(boolean)* - Programmatically decide if the editor has focus

*Cursor*:
* **moveCursorToEnd()** *(void)* - Focuses the editor if not focused already, and moves the cursor to the end of the contents.
* **moveCursorToStart()** *(void)* - Focuses the editor if not focused already, and moves the cursor to the start of the contents.

*Content*:
* **selectAll()** *(void)* - Programmatically highlight all the text / contents in the editor.
* **clear()** *(void)* - Clear contents of the editor.

*Links*:
* **insertLink( url: string )** *(void)* - Inserts a link to the cursor location. If the selection is collapsed (ie. no text is selected, it's just the cursor), the link will be inserted and the anchor text will become the given url. Otherwise the selected text will become the anchor text. If there exists another link within the selection, it's link will be removed first.
* **removeLink()** *(void)* - Remove link(s) at the cursor selection. If there are multiple links within selection, all will be removed. Once removed, the anchor text will simply turn into a standard text node.

*Formatters*:
* **toggleBold( status?: bool )** *(void)* - Toggles bold state of current selection. Switching on / off could be enforced by providing status as the first argument.
* **toggleItalic( status?: bool )** *(void)* - Toggles italic state of current selection. Switching on / off could be enforced by providing status as the first argument.
* **toggleUnderline( status?: bool )** *(void)* - Toggles underline state of current selection. Switching on / off could be enforced by providing status as the first argument.
* **toggleStrikethrough( status?: bool )** *(void)* - Toggles strikethrough state of current selection. Switching on / off could be enforced by providing status as the first argument.

### classNames

MMS Editor comes with some built-in class names to make it simple to style the editor using only css.

* `mms--editor` - Classname of the editor. Text within the editor comes in standard html tags, so this class name could be used to style the text within the editor using those tags. ie:

```css
.mms--editor p { ... }
```

