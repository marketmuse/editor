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

* **children** *(function)* - MMSEditor adopts the [function-as-children pattern](https://reactjs.org/docs/jsx-in-depth.html#functions-as-children) to be able to pass on some editor related data down to its children, including the api and even the text editor itself. Therefor, the children provided to this component **must** be a function.

* **autoFocus** *(boolean)* - Focus upon mount.

* **readOnly** *(boolean)* - Disallow editing.

### Children args

`MMSEditor` passes below arguments to its function children:

* **component** *(React Component)* - The editor instance ready to render. <u>It is required</u> to render this, without doing so, the editor will not be mounted which is likely to cause potential crashes. This approach is particularly useful for building toolbars / sidebars / other components that lives under the Editor provider (ie `MMSEditor`) and could consume all editor related data and utilize the api.

* **api** *(function)* - This function grabs the Slate editor instance and returns the api methods as an object with the instance wrapped in their closures. It exposes MMS Editor's higher-level api built on top of Slate JS, without even needing to interact with Slate editors instance, however if desired, a particular editor instance could be provided as the first argument and it will be used instead.

*<u>Format helpers</u>*: Below arguments are simple flags that provides information about the cursors location / selection. They are useful for building custom toolbars.

* **isBold** *(boolean)* - True if cursor / selection is over bold text.

* **isItalic** *(boolean)* - True if cursor / selection is over italic text.

* **isUnderline** *(boolean)* - True if cursor / selection is over underlined text.

* **isStrikethrough** *(boolean)* - True if cursor / selection is over strike through text.

### api Methods

### classNames

MMS Editor comes with some built-in class names to make it simple to style the editor using only css.

* `mms--editor` - Classname of the editor. This could be used to style the text within the editor based on html tags. ie:

```css
.mms--editor p { ... }
```

