# Docs

Basic usage:

```javascript
import React from 'react';
import MMSEditor from 'mms-editor';

// import styles
import 'mms-editor/dist/mms-editor.css';

const App = () => (
  <MMSEditor>
    {({ editor, toolbar }) => (
      <div>
        {toolbar()}
        {editor()}
      </div>
    )}
  </MMSEditor>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

# MMSEditor

`MMSEditor` is the Editor provider, it's responsible for keeping the state and managing the editor. It accepts the following props.

* **children** *(function)* - MMSEditor adopts the [function-as-children pattern](https://reactjs.org/docs/jsx-in-depth.html#functions-as-children) to be able to pass on some editor related data down to its children, including the api and even the editor itself. Therefor, the children provided to this component **must** be a function (see below for arguments).
* **plugins** *(array)* - An array of plugin objects that has functions to extend the libraries core api's. See plugins section.

### Children args

* **formats** *(object)* - Flags that provides information about the cursors location / selection (see formats section for more details).
* **functions** *(object)* - Object that contains high-level api methods with the editor instance in their closure. Useful for building custom behaviour. See functions api section for more details.
* **editor( config?: object )** *(function)* - A function that takes a config object returns the editor component. See next section for configuration options.
* **toolbar( config?: object )** *(function)* - A function that takes in a config object and returns the toolbar component. Note that this needs to be rendered for the toolbar to function, even for inline style. See the toolbars section for more details.


# Formats api

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


# Functions api

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


# editor()

A function that takes a config object returns the editor component. It is required to render this, without doing so, the editor will not be mounted which is likely to cause potential crashes. This approach is particularly useful for building toolbars / sidebars / other components that lives under the Editor provider (ie `MMSEditor`) and could consume all editor related data and utilize the api.

### config

* **id** *(string)* - Applies an ID to the editor container.
* **style** *(object)* - Apply inline styles to the editor container.
* **className** *(string)* - Apply a class name to the editor container (the render output of `component`). By default, it will already have `mms--editor`, and provided class names will be appended. This also makes styling the editor root with `styled-components` or similar libraries possible.
* **autoFocus** *(boolean)* - Focus upon mount.
* **readOnly** *(boolean)* - Disallow editing.
* **onKeyDown** *(function( event: [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)) -> void)*
* **decorators** *(array)* - Configuration for custom decorators. See [decorations](#decorations-api) section.
* **hotkeys** *(object)* - Configuration for custom hotkeys. See [hotkeys](#hotkeys-api) section below.


## Decorations api

Decorations are a type of text-level formatting that computes at render time based on the content. It is useful for implement things that requires dynamic highlighting, such as search or syntax highlighting. MMS editor allows you to implement your own **highlight rules**, and apply styles to or provide your own React Components to wrap around the text that matches your rule. `editor` function accepts `decorations`, an array of configuration objects.

### config objects

* **id** *(string)*
* **transform** *(function( text: string ) -> string )* - Receives the text chunk that'll be matched with (note: that is **not** the full corpus, it'll receive each leaf node of type `text`, so one chunk at a time). Return new value to transform the text to match with before attempting to match. This is useful for things like making the text lowercase.
* **match** *(string, [string] or regex)* - A string, string array, or a regular expression to match against.
* **evaluate** *(function( args: object ) -> bool)* - Every term matched based on the `match` configuration above will go through this method. This is where you can write custom logic to discard some of the matches. It receives the term, along with some other stats, to help customize the logic.
  * **term** *(string)* - Matched term
  * **terms** *(object)* - A dictionary with keys being matched terms and values being how many times they were matched so far.
  * **aggregate** *(number)* - Number of matches this decorator has received so far.
* **triggers** *array*
* **component** *(ReactComponent)*
* **render** *(function( props: object ) ReactComponent)*

*Example*

```javascript
const Apple = props => (
  <span style={{ color: 'red' }}>
    {props.children}
  </span>
);

const decorators = [
  {
    id: 'apple',
    match: /apple/i,
    component: Apple
  },
  {
    id: 'search-query',
    transform: text => text.toLowerCase();
    match: query,
    style: { backgroundColor: 'yellow' },
    triggers: [query]
  }
]
```

## Hotkeys api

Hotkeys api allows you to create custom key bindings, and assign them functionality using the `formats` and `functions` apis. It allows you to assign multiple commands to the same hotkeys, and run them in different contexts.

Hotkeys api accepts an array of keymap objects, order of execution of the commands are dictated by the order of this array. When omitted, the editor will use the [default configuration](/src/config/defaultHotkeys.js), otherwise the provided configuration.

### keymap objects

* **key** *(string)* - Natural syntax expression that describes the key bindings delaminated by `+` sign. Use `mod` to describe `cmd` on Mac, `ctrl` on Windows. This is the first argument evaluated by [is-hotkey](https://github.com/ianstormtaylor/is-hotkey) library, check out the [api](https://github.com/ianstormtaylor/is-hotkey#api) for more details. 
* **when** *(function( args: object ) -> bool)* - Contextual awareness for hotkeys, commands will run only when this function returns true. If omitted, commands will run every time. The args it receives is as follows:
  * **event** *([KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent))* - The KeyboardEvent object received from `onKeyDown` event. 
  * **formats** *(object)* - Formats api (see Formats api section for details).
* **command** *(function( args: object ) -> void)* - Command that fires upon `onKeyDown` event. Args are as follows:
  * **event** *([KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent))* - The KeyboardEvent object received from `onKeyDown` event. 
  * **functions** *(object)* - Functions api (see Functions api section for details).
  * **formats** *(object)* - Formats api (see Formats api section for details).

Example:

```javascript
const hotkeys = [
  {
    key: 'mod+b',
    when: ({ formats }) => formats.isParagraph(),
    command: ({ functions }) => functions.toggleBold(),
  },
  {
    key: 'mod+b',
    when: ({ formats }) => formats.isCollapsed(),
    command: () => alert('select some text for best results!'),
  },
]
```


# toolbar( config )

MMSEditor comes with a built-in toolbar that has primary rich text editing support out of the box, and could easily by configured / extended with custom functionality.

### features

* Built with the `Formats api`, `Functions api` and `Classnames api`, meaning one could easily extend the toolbar with advanced custom features, or create functionally equivalent custom toolbars.
* Built-in inline / embedded toolbar support.
* Support for multiple screens *(for instance, the 'Link' button on the default toolbar screen could switch the active screen to the link screen that only has a text input to accept a URL)*.
* Layout configuration possible on a per screen basis (it is possible to change the layout of existing screens, create new screens, link them together, add custom buttons or components or custom functionality).

### config object

* TODO
* Example: see the [default configuration](/src/config/defaultToolbar.js) as an example.



# Styling

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
* `mms--toolbar-input` - Applies to toolbar inputs. Helpers:
  * `mms--disabled` - When input is disabled.
* `mms--toolbar-spacer` - Applies to toolbar spacers.

*Helper classNames*: Below class names gets appended to DOM elements for indicating the state. They do not represent any particular element, so they shouldn't be styled directly. Ie:

```css
/* bad */
.mms--active {}

/* good */
.mms--toolbar-button.mms--active {}
```

* `mms--active` - Active state
* `mms--disabled` - Disabled state
* `mms--toolbar-ignore-focus` - Inline toolbar will not render if there is no selection (ie. editor has no focus). Use this class name to prevent toolbar from hiding when main editor loses focus. Currently, this class name is used in text input elements within the toolbar.

# Plugins

MMS editor supports plugins that could enhance the `functions` and `formats` api's, allowing to create custom functions and formats, or extending / modifying the behaviour of the current ones. The `MMSEditor` component accepts `plugins` prop, which should be an array of plugin objects.

Plugin object's functions basically receive the api and returns the extended version of of it. Within this function, it's possible to extend the api and modify the behaviour. Once the api is extended with plugins, all sub components / sub api's that receives the formats and functions (ie. such as the toolbar, decorations api, hotkeys api etc.) will receive the extended version of it.

### plugin object

* **formats** *(function( formats: object, args: object ) -> formats)* - A function that receives the current formats and args object, and returns new formats. Args are as follows:
	* **functions** *(object)* - Functions api (version with current plugin **not applied**, but previous plugin **applied**).
	
* **functions** *(function( functions: object, args: object ) -> functions)* - A function that receives the current functions and args object, and returns new functions. Args are as follows:
	* **formats** *(object)* - Formats api (version with current plugin **not applied**, but previous plugin **applied**).

	
*Example*

Extend `formats` api with `isStyled`:

```javascript
const plugins = [{
  formats: formats => ({
    ...formats,
    isStyled: (
      formats.isBold ||
      formats.isItalic ||
      formats.isUnderlined ||
      formats.isStrikethrough 
    )
  })
}]
```

Modify behaviour of `toggleBold`:

```javascript
const plugins = [{
  functions: (functions, { formats }) => ({
    ...functions,
    toggleBold: (...args) => {
      
      // do not make bold if link
      if (formats.isLink) return;
      
      // default behaviour
      functions.toggleBold(...args);
    }
  })
}]