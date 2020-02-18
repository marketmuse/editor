# Docs

Basic usage:

```javascript
import React from 'react';
import MMSEditor from 'mms-editor';

// import styles
import 'mms-editor/dist/mms-editor.css';

const App = () => (
  <MMSEditor>
    {({ toolbar, component }) => (
      <div>
        {toolbar()}
        {component}
      </div>
    )}
  </MMSEditor>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

## MMSEditor

`MMSEditor` is the Editor provider, it's responsible for keeping the state and managing the editor. It accepts the following props.

* **className** *(string)* - Apply a class name to the editor container (the render output of `component`). By default, it will already have `mms--editor`, and provided class names will be appended. This also makes styling the editor root with `styled-components` or similar libraries possible.
* **style** *(object)* - Apply inline styles to the editor container.
* **autoFocus** *(boolean)* - Focus upon mount.
* **readOnly** *(boolean)* - Disallow editing.
* **children** *(function)* - MMSEditor adopts the [function-as-children pattern](https://reactjs.org/docs/jsx-in-depth.html#functions-as-children) to be able to pass on some editor related data down to its children, including the api and even the editor itself. Therefor, the children provided to this component **must** be a function (see below for arguments).

### Children args

* **component** *(React Component)* - The editor instance ready to render. It is required to render this, without doing so, the editor will not be mounted which is likely to cause potential crashes. This approach is particularly useful for building toolbars / sidebars / other components that lives under the Editor provider (ie `MMSEditor`) and could consume all editor related data and utilize the api.
* **formats** *(object)* - Flags that provides information about the cursors location / selection (see formats section for more details).
* **functions** *(object)* - Object that contains high-level api methods with the editor instance in their closure. Useful for building custom behaviour. See functions api section for more details.
* **toolbar( config?: object )** *(function)* - A function that takes in a config object, and returns the toolbar component ready to render. Note that this needs to be rendered for the toolbar to function, even for inline style. See the toolbars section for more details.

## Formats api

Formats api is an object with flags that provides information about the cursors location / selection. They are useful for building custom toolbars (see formats section for more details)

*Mark*: These are styles attached to text nodes, a block could be in multiple states at a time.

* **isBold** *(boolean)* - True if cursor / selection is over bold text.
* **isItalic** *(boolean)* - True if cursor / selection is over italic text.
* **isUnderline** *(boolean)* - True if cursor / selection is over underlined text.
* **isStrikethrough** *(boolean)* - True if cursor / selection is over strike through text.

*Block*: These indicate the type of block within the selection. A block have a single type at a time.

* **isH1** *(boolean)* - True if cursor / selection is in a h1 block.
* **isH2** *(boolean)* - True if cursor / selection is in a h2 block.
* **isH3** *(boolean)* - True if cursor / selection is in a h3 block.
* **isHeading** *(boolean)* - True if cursor / selection is in an heading block.
* **isLink** *(boolean)* - True if cursor / selection is on a link block.
* **isParagraph** *(boolean)* - True if cursor / selection is in a paragraph block (which is the default).
* **isBlockquote** *(boolean)* - True if cursor / selection is in a blockquote block.
* **isListNumbered** *(boolean)* - True if cursor / selection is in a list item (li) block within a numbered list (ol) block.
* **isListBulleted** *(boolean)* - True if cursor / selection is in a list item (li) block within a bulleted list (ul) block.

*Misc*:

* **isCollapsed** *(boolean / null)* - Cursor location within a text is referred to as [Selection](https://developer.mozilla.org/en-US/docs/Web/API/Selection), and is indicated with an anhor point and a focus point. When a text is highlighted, anchor is where the selection begins and focus is the where it ends. A selection is [collapsed](https://developer.mozilla.org/en-US/docs/Web/API/Selection/isCollapsed) when anchor and focus are the same position, meaning, no text is selected. When there is no selection (ie. editor has no focus), this value will be null.

## Functions api

Functions api consists of an object that holds methods that could be used to control the editor programmatically. These functions already has the editor instance wrapped within their closures, so they could be used directly. It exposes MMS Editor's higher-level api built on top of Slate JS, without even needing to interact with Slate editors instance.

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

* **getLink()** *(object)* - Returns link data within the current selection. If there are multiple links, the last one will be returned.
* **insertLink( url: string )** *(void)* - Inserts a link to the cursor location. If the selection is collapsed (ie. no text is selected, it's just the cursor), the link will be inserted and the anchor text will become the given url. Otherwise the selected text will become the anchor text. If there exists another link within the selection, it's link will be removed first.
* **removeLink()** *(void)* - Remove link(s) at the cursor selection. If there are multiple links within selection, all will be removed. Once removed, the anchor text will simply turn into a standard text node.

*Formatters*:

* **toggleBold( status?: bool )** *(void)* - Toggles bold state of current selection. 
* **toggleItalic( status?: bool )** *(void)* - Toggles italic state of current selection. 
* **toggleUnderline( status?: bool )** *(void)* - Toggles underline state of current selection. 
* **toggleStrikethrough( status?: bool )** *(void)* - Toggles strikethrough state of current selection. 
* **toggleHeading( level: int, status?: bool )** *(void)* - Toggles heading state of current block. 
* **toggleBlockquote( status?: bool )** *(void)* - Toggles blockquote state of current block. 
* **toggleListNumbered( status?: bool )** *(void)* - Toggles numbered list state of current block. 
* **toggleListBulleted( status?: bool )** *(void)* - Toggles bulleted list state of current block. 


## Classnames api

MMS Editor comes with built-in class names aiming to make styling the editor as simple as using basic css. Base styles that comes with the provided `mms-editor.css` also uses this api to style the editor. One could either chose to import this file and extend the base styles, or omit it and create new styles from scratch.

* `mms--editor` - Classname of the editor. Helpers:
  * `mms--disabled` - When editor is read-only.

Text within the editor comes in standard html tags, so this class name could be used to style the text within the editor using those tags. ie:

```css
.mms--editor p { ... }
```

* `mms--toolbar` - Classname of the default toolbar wrapper (applies to both styles).
* `mms--toolbar-inline` - Applies to toolbar wrapper for inline style toolbar.
* `mms--toolbar-embedded` - Applies to toolbar wrapper for embedded style toolbar.
* `mms--toolbar-visible` - Applies to toolbar when it is visible (ie. reflects the visible state of the inline toolbar as a class name, applies also to embedded toolbars)
* `mms--toolbar-hidden` - Applies to toolbar when it is hidden (ie. reflects the hidden state of the inline toolbar as a class name, applies also to embedded toolbars)
* `mms--toolbar-button` - Applies to toolbar buttons. Helpers:
  * `mms--disabled` - When button is disabled
  * `mms--active` - When cursor is over mark / block indicated by the button *(ie. bold button would be appended with this class name when cursor is over bold text)*

* `mms--toolbar-screen` - Applies to toolbar screen, a wrapper around buttons.
* `mms--toolbar-spacer` - Applies to toolbar spacers.
* `mms--toolbar-back` - Applies to previous screen button on toolbar.
* `mms--toolbar-headings` - Headings button class
* `mms--toolbar-heading-one` - H1 button class
* `mms--toolbar-heading-two` - H2 button class
* `mms--toolbar-heading-three` - H3 button class

*Helper classNames*: Below class names gets appended to DOM elements for indicating the state. They do not represent any particular element, so they shouldn't be styled directly. Ie:

```css
/* bad */
.mms--active {}

/* good */
.mms--toolbar-button.mms--active {}
```

* `mms--active` - Active state
* `mms--disabled` - Disabled state


## Toolbar

MMSEditor comes with a built-in toolbar that has primary rich text editing support out of the box, and could easily by configured / extended with custom functionality.

### features

* Built with the `Formats api`, `Functions api` and `Classnames api`, meaning one could easily extend the toolbar with advanced custom features, or create functionally equivalent custom toolbars.
* Built-in inline / embedded toolbar support.
* Support for multiple screens *(for instance, the 'Link' button on the default toolbar screen could switch the active screen to the link screen that only has a text input to accept a URL)*.
* Layout configuration possible on a per screen basis (it is possible to change the layout of existing screens, create new screens, link them together, add custom buttons or components or custom functionality).

### config object

* **className** *(string)* - Applies to the toolbar wrapper.
* **style** *(object)* - Applies to the toolbar wrapper. 
* **inline** *(boolean)* - Inline toolbar. Defaults to true.
* **layout** *(object)* - Configuration for the toolbar (see below)

### layout

* TODO: Write this part