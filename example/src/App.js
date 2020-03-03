import React, { useState } from './deps/react';
import MMSEditor, { useFormats, useFunctions } from './deps/editor';
import './deps/editorCss';

import './App.css';

const Separator = props => (
  <separator>
    <span>{props.text}</span>
  </separator>
);

function HooksTest() {
  const formatsHookTest = useFormats();
  const functionsHookTest = useFunctions();
  
  return (
    <button
      style={{ position: 'absolute' }}
      onMouseDown={e => {
        e.preventDefault();
        functionsHookTest.toggleBold();
      }}
    >
      {formatsHookTest.isBold ? 'bold' : 'not bold'}
    </button>
  );
}

function App() {

  const [code, setCode] = useState('');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('google.com');
  const [jsx, setJsx] = useState('');
  const [redHighlights, setRedHighlights] = useState('cat, dog, bird');
  const [blueHighlights, setBlueHighlights] = useState('toyota, honda');
  const defaultCode = 'functions.focus();\nfunctions.moveCursorToStart()\nconsole.log("cursor moved")';
  const defaultJsx = `<editor>\n\t<block>\n\t\t<text>yo!</text>\n\t</block>\n</editor>`;

  const plugins = [{
    // add hotkeys
    hotkeys: [
      {
        key: 'mod+b',
        when: ({ formats }) => formats.isCollapsed,
        command: () => alert('select some text for best results!'),
      },
    ],
    // add decorators
    decorators: [
      {
        id: 'blue',
        match: blueHighlights.split(','),
        style: { backgroundColor: 'blue', color: 'white' },
        triggers: [blueHighlights],
      },
      {
        id: 'red',
        match: redHighlights.split(','),
        style: { backgroundColor: 'red', color: 'white' },
        triggers: [redHighlights],
      }
    ],
    // extend formats
    formats: formats => ({
      ...formats,
      isStyled: (
        formats.isBold ||
        formats.isItalic ||
        formats.isUnderlined ||
        formats.isStrikethrough 
      )
    }),
    // extend functions
    functions: (functions, { formats }) => ({
      ...functions,
      toggleBold: (...args) => {
        // do not make bold if link
        if (formats.isLink) return;
        // default behaviour
        functions.toggleBold(...args);
      }
    })
  }];

  return (
    <MMSEditor plugins={plugins}>
      {({
        formats,
        functions,
        toolbar,
        editor,
      }) => {
        window.functions = functions;

        const {
          isBold,
          isItalic,
          isUnderline,
          isStrikethrough,
          isH1,
          isH2,
          isH3,
          isLink,
          isParagraph,
          isBlockquote,
          isListNumbered,
          isListBulleted,
          isCollapsed,
        } = formats;

        return (
          <div className="main-wrapper">
            {/* to test the hooks */}
            <HooksTest />

            {/* toolbar */}
            {toolbar()}

            {/* editor */}
            <div className="editor-wrapper">
              <div className="container">
                {editor()}
              </div>
            </div>

            {/* controls */}
            <div className="control-wrapper">

              {/* highlights */}
              <Separator text="Highlights" />
              <label>Blue</label>
              <section class="col">
                <input
                  placeholder="Comma separated topics"
                  value={blueHighlights}
                  onChange={e => setBlueHighlights(e.target.value)}
                />
              </section>
              <label>Red</label>
              <section class="col">
                <input
                  placeholder="Comma separated topics"
                  value={redHighlights}
                  onChange={e => setRedHighlights(e.target.value)}
                />
              </section>

              {/* formatters */}
              <Separator text="Formatters" />
              <section className="merge-below">
                <button className={`has-item-right ${isBold ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); functions.toggleBold(); }}><b>bold</b></button>
                <button className={`has-item-right has-item-left ${isItalic ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); functions.toggleItalic(); }}><i>italic</i></button>
                <button className={`has-item-right has-item-left ${isUnderline ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); functions.toggleUnderline(); }}><u>underline</u></button>
                <button className={`has-item-left ${isStrikethrough ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); functions.toggleStrikethrough(); }}><strike>strike</strike></button>
              </section>
              <section className="merge-below merge-above">
                <button className={`disabled has-item-right ${isParagraph ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); }}>p</button>
                <button className={`has-item-right has-item-left ${isH1 ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); functions.toggleHeading(1); }}>h1</button>
                <button className={`has-item-right has-item-left ${isH2 ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); functions.toggleHeading(2); }}>h2</button>
                <button className={`has-item-left ${isH3 ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); functions.toggleHeading(3); }}>h3</button>
              </section>
              <section className="merge-above">
                <button className={`has-item-right ${isBlockquote ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); functions.toggleBlockquote(); }}>blockquote</button>
                <button className={`has-item-right has-item-left ${isListNumbered ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); functions.toggleListNumbered(); }}>list (number)</button>
                <button className={`has-item-left ${isListBulleted ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); functions.toggleListBulleted(); }}>list (bullet)</button>
              </section>

              {/* selections */}
              <Separator text="Selection" />
              <section>
                <button className={`disabled has-item-right ${isCollapsed === true ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); }}>collapsed</button>
                <button className={`disabled has-item-left ${isCollapsed === false ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); }}>selection</button>
              </section>

              {/* links */}
              <Separator text="Link" />
              <label>Url</label>
              <section class="col">
                <input
                  className="has-item-below"
                  style={{ borderBottom: 'none' }}
                  placeholder="Enter url..."
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                />
                <section style={{ margin: 0 }}>
                  <button
                    className={`disabled has-item-above has-item-right ${isLink ? 'active' : ''}`}
                    onClick={() => {}}
                  >
                    is link
                  </button>
                  <button
                    className="has-item-above has-item-left has-item-right"
                    onClick={() => functions.insertLink(url)}
                  >
                    insert link
                  </button>
                  <button
                    className="has-item-above has-item-left"
                    onClick={() => functions.removeLink()}
                  >
                    remove link
                  </button>
                </section>
              </section>

              {/* focus stuff */}
              <Separator text="Focus" />
              <section>
                <button onClick={() => functions.focus()}>focus</button>
              </section>
              <section>
                <button onClick={() => functions.focusAtStart()}>focus at start</button>
                <button onClick={() => functions.focusAtEnd()}>focus at end</button>
              </section>

              {/* content controls */}
              <Separator text="Content" />
              {/* text content */}
              <label>Text</label>
              <section class="col">
                <textarea
                  className="has-item-below"
                  style={{ borderBottom: 'none' }}
                  placeholder="Enter text..."
                  value={text}
                  onChange={e => setText(e.target.value)}
                />
                <section style={{ margin: 0 }}>
                  <button className="has-item-above has-item-right">+start</button>
                  <button className="has-item-above has-item-right has-item-left">+end</button>
                  <button className="has-item-above has-item-right has-item-left">+cursor</button>
                  <button className="has-item-above has-item-right has-item-left">replace</button>
                  <button className="has-item-above has-item-left">clear</button>
                </section>
              </section>
              {/* jsx content */}
              <label>
                <a href="https://github.com/ianstormtaylor/slate/tree/master/packages/slate-hyperscript" target="_new">
                  Hyperscript
                </a>
              </label>
              <section class="col">
                <textarea
                  className="has-item-below"
                  style={{ borderBottom: 'none' }}
                  placeholder={defaultJsx}
                  value={jsx}
                  onChange={e => setJsx(e.target.value)}
                />
                <section style={{ margin: 0 }}>
                  <button className="has-item-above has-item-right">replace</button>
                  <button className="has-item-above has-item-left">clear</button>
                </section>
              </section>
              <section>
                <button onClick={() => functions.selectAll()}>select all</button>
              </section>
              <section>
                <button onClick={() => functions.clear()}>clear</button>
              </section>


              {/* JS stuff */}
              <Separator text="JS" />
              <section className="col">
                <textarea
                  className="has-item-below"
                  style={{ borderBottom: 'none' }}
                  placeholder={defaultCode}
                  value={code}
                  onChange={e => setCode(e.target.value)}
                />
                <section style={{ margin: 0 }}>
                  <button
                    className="has-item-above has-item-right"
                    onClick={() => {
                      functions._populateWindow();
                      console.log('code', code)
                      console.log('defaultCode', defaultCode)
                      const useCode = code || defaultCode;
                      eval(useCode); // eslint-disable-line
                    }}
                  >
                    eval
                  </button>
                  <button
                    className="has-item-above has-item-left"
                    onClick={() => setCode('')}
                  >
                    clear
                  </button>
                </section>
              </section>
              <section>
                <button onClick={() => console.log(functions._getEditor())}>log(editor)</button>
                <button onClick={() => functions._populateWindow()}>populate window</button>
              </section>


            </div>
          </div>
        );
      }}
    </MMSEditor>

  );
}

export default App;
