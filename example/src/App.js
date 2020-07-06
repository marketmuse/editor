import React, { useState } from 'react';
import get from 'lodash/get';
import MMSEditor, { types, slate, useFormats, useFunctions } from '@marketmuse/editor';
import '@marketmuse/editor/dist/mms-editor.css';

import './App.css';

const Separator = props => (
  <div className="separator">
    <span>{props.text}</span>
  </div>
);

function HooksTest() {
  const formatsHookTest = useFormats();
  const functionsHookTest = useFunctions();

  return (
    <div style={{ position: 'absolute', display: 'flex' }}>
      <button
        onMouseDown={e => {
          e.preventDefault();
          functionsHookTest.toggleBold();
        }}
      >
        {formatsHookTest.isBold ? 'bold' : 'not bold'}
      </button>
      <button onClick={() => functionsHookTest.clear()}>
        clear
      </button>
    </div>
  );
}

const Blue = props => (
  <span style={{ backgroundColor: 'blue', color: 'white' }} >
    {props.children}
  </span>
);

const Red = props => (
  <span style={{ borderBottom: '2px solid red' }} >
    {props.children}
  </span>
);

function App() {

  const [code, setCode] = useState('');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('google.com');
  const [raw, setRaw] = useState('');
  const [html, setHtml] = useState('');
  const [htmlExport, setHtmlExport] = useState('');

  const [redHighlights, setRedHighlights] = useState('lorem, lorem ipsum');
  const [blueHighlights, setBlueHighlights] = useState('apm tools, apm');
  const defaultCode = 'functions.focus();\nfunctions.moveCursorToStart()\nconsole.log("cursor moved")';

  // add hotkeys
  const hotkeyPlugin = {
    hotkeys: [{
      key: 'mod+b',
      when: ({ formats }) => formats.isCollapsed,
      command: () => alert('select some text for best results!'),
    }],
  };

  // add decorators
  const decoratorPlugin = {
    decorators: [
      {
        id: 'blue',
        match: blueHighlights.split(','),
        component: Blue,
        triggers: [blueHighlights],
      },
      {
        id: 'red',
        match: redHighlights.split(','),
        component: Red,
        triggers: [redHighlights],
      }
    ],
  };

  // extend formats api
  const extendFormatsPlugin = {
    formats: formats => ({
      ...formats,
      isStyled: (
        formats.isBold ||
        formats.isItalic ||
        formats.isUnderlined ||
        formats.isStrikethrough
      )
    }),
  }

  // extend functions api
  const extendFunctionsPlugin = {
    functions: (functions, { formats }) => ({
      ...functions,
      toggleBold: (...args) => {
        // do not make bold if link
        if (formats.isLink) return;
        // default behaviour
        functions.toggleBold(...args);
      }
    })
  };

  // showcase event plugins
  const eventExamplePlugin = {
    onKeyDown: (event, { functions, formats }) => {
      if (event.key === 'Enter') {
        // block keypress
        // event.preventDefault();
        // use formats api like so
        // if (formats.isBold) console.log('This is bold!');
        // else console.log('This is not bold!');
      }
    }
  };

  // test onValueChange
  const onValueChangePlugin = {
    onValueChange: ({ functions, formats }) => {
      // if (formats.isBold) console.log('This is bold!');
      // else console.log('This is not bold!');
    }
  }

  // plugin that will make first block hading
  // and the second block a paragraph
  const forcedLayoutPlugin = {
    normalizerOptions: {
      normalize: (editor, [ node, path ]) => {
        const isTopLevel = path.length === 1;
        const isFirst = path[0] === 0;
        const isSecond = path[0] === 1;
        const isHeading = node.type === types.h1;
        const isParagraph = node.type === types.p;

        // make first block heading
        if (isTopLevel && isFirst && !isHeading) {
          slate.Transforms.unwrapNodes(editor, { at: path });
          slate.Transforms.wrapNodes(editor, { children: [], type: types.h1 }, { at: path })
          return true;
        }

        // make second block paragraph
        if (isTopLevel && isSecond && !isParagraph) {
          slate.Transforms.unwrapNodes(editor, { at: path });
          slate.Transforms.wrapNodes(editor, { children: [], type: types.p }, { at: path })
          return true;
        }

        return false;
      }
    }
  }

  // test events
  const copyPastePlugin = {
    onCut: (e) => { console.log('cut', e) },
    onCopy: (e) => { console.log('copy', e) },
    onInsertData: data => { console.log('insert', data, data.getData('text/plain')) }
  };

  return (
    <MMSEditor
      plugins={[
        hotkeyPlugin,
        decoratorPlugin,
        extendFormatsPlugin,
        extendFunctionsPlugin,
        eventExamplePlugin,
        onValueChangePlugin,
        // copyPastePlugin,
        // forcedLayoutPlugin,
      ]}
    >
      {({
        decors,
        formats,
        functions,
        toolbar,
        editor,
      }) => {
        window.functions = functions;
        window.decors = decors;

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
          isFocused,
        } = formats;

        const dTotal = get(decors, 'total') || 0;
        const aBlue = get(decors, 'aggregates.blue') || 0;
        const mBlue = get(decors, 'matches.blue') || {};
        const aRed = get(decors, 'aggregates.red') || 0;
        const mRed = get(decors, 'matches.red') || {};

        const renderHtmlExport = () => {
          return (
            <>
              <Separator text="Export HTML" />
              <section className="col">
                <textarea
                  className="has-item-below"
                  style={{ borderBottom: 'none' }}
                  value={htmlExport}
                />
                <section style={{ margin: 0 }}>
                  <button
                    className="has-item-above has-item-right"
                    onClick={() => {
                      const exported = functions.exportHtml();
                      console.log('exported', exported);
                      setHtmlExport(exported);
                    }}
                  >
                    export
                  </button>
                </section>
              </section>
            </>
          )
        };

        const renderImportsExports = () => {
          return (
            <>
              <Separator text="Import / Export" />
              <label>Raw Data</label>
              <section className="col">
                <textarea
                  className="has-item-below"
                  style={{ borderBottom: 'none' }}
                  // placeholder="Enter raw data..."
                  value={raw}
                  onChange={e => setRaw(e.target.value)}
                />
                <section style={{ margin: 0 }}>
                  <button
                    className="has-item-above has-item-right"
                    onClick={() => {
                      const parsed = JSON.parse(raw);
                      console.log('parsed', parsed);
                      functions.import(parsed);
                    }}
                  >
                    import
                  </button>
                  <button
                    className="has-item-above has-item-right has-item-left"
                    onClick={() => setRaw(JSON.stringify(functions.export()))}
                  >
                    export
                  </button>
                  <button
                    className="has-item-above has-item-left"
                    onClick={() => setRaw(JSON.stringify(functions.export({ history: true })))}
                  >
                    export with history
                  </button>
                </section>
              </section>
            </>
          )
        };

        const renderHighlights = () => {
          return (
            <>
              <Separator text={`Decorations (${dTotal})`} />
              <label>Blue ({aBlue})</label>
              {Object.keys(mBlue).map(k => (
                <label key={k} style={{ border: 'none' }}>{k}: {mBlue[k]}</label>
              ))}
              <section className="col">
                <input
                  placeholder="Comma separated topics"
                  value={blueHighlights}
                  onChange={e => setBlueHighlights(e.target.value)}
                />
              </section>
              <label>Red ({aRed})</label>
              {Object.keys(mRed).map(k => (
                <label key={k} style={{ border: 'none' }}>{k}: {mRed[k]}</label>
              ))}
              <section className="col">
                <input
                  placeholder="Comma separated topics"
                  value={redHighlights}
                  onChange={e => setRedHighlights(e.target.value)}
                />
              </section>
            </>
          )
        };

        const renderLinks = () => {
          return (
            <>
              <Separator text="Link" />
              <section className="col">
                <input
                  className="has-item-below"
                  style={{ borderBottom: 'none' }}
                  placeholder="Enter url..."
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                />
                <section style={{ margin: 0 }}>
                  <button
                    disabled
                    className={`has-item-above has-item-right ${isLink ? 'active' : ''}`}
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
            </>
          )
        };

        const renderFormatters = () => {
          return (
            <>
              <Separator text="Formatters" />
              <section className="merge-below">
                <button className={`has-item-right ${isBold ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); functions.toggleBold(); }}><b>bold</b></button>
                <button className={`has-item-right has-item-left ${isItalic ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); functions.toggleItalic(); }}><i>italic</i></button>
                <button className={`has-item-right has-item-left ${isUnderline ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); functions.toggleUnderline(); }}><u>underline</u></button>
                <button className={`has-item-left ${isStrikethrough ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); functions.toggleStrikethrough(); }}><strike>strike</strike></button>
              </section>
              <section className="merge-below merge-above">
                <button disabled className={`has-item-right ${isParagraph ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); }}>p</button>
                <button className={`has-item-right has-item-left ${isH1 ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); functions.toggleHeading(1); }}>h1</button>
                <button className={`has-item-right has-item-left ${isH2 ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); functions.toggleHeading(2); }}>h2</button>
                <button className={`has-item-left ${isH3 ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); functions.toggleHeading(3); }}>h3</button>
              </section>
              <section className="merge-above">
                <button className={`has-item-right ${isBlockquote ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); functions.toggleBlockquote(); }}>blockquote</button>
                <button className={`has-item-right has-item-left ${isListNumbered ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); functions.toggleListNumbered(); }}>list (number)</button>
                <button className={`has-item-left ${isListBulleted ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); functions.toggleListBulleted(); }}>list (bullet)</button>
              </section>
            </>
          )
        };

        const renderSelections = () => {
          return (
            <>
              <Separator text="Selection" />
              <section className="merge-below">
                <button disabled className={`has-item-right ${isFocused === true ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); }}>focused</button>
                <button disabled className={`has-item-left has-item-right ${isCollapsed === true ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); }}>collapsed</button>
                <button disabled className={`has-item-left ${isCollapsed === false ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); }}>selection</button>
              </section>
              <section className="merge-above">
                <button className="has-item-above has-item-right" onClick={() => { functions.focus(); functions.moveCursorToStart(); }}>focus at start</button>
                <button className="has-item-above has-item-right has-item-left" onClick={() => functions.focus()}>focus</button>
                <button className="has-item-above has-item-right has-item-left" onClick={() => { functions.focus(); functions.moveCursorToEnd(); }}>focus at end</button>
                <button className="has-item-above has-item-left" onMouseDown={e => { e.preventDefault(); functions.selectAll(); }}>select all</button>
              </section>
            </>
          )
        };

        const renderContentControls = () => {
          return (
            <>
              <Separator text="Content" />
              <label>Text</label>
              <section className="col">
                <textarea
                  className="has-item-below"
                  style={{ borderBottom: 'none' }}
                  placeholder="Enter text..."
                  value={text}
                  onChange={e => setText(e.target.value)}
                />
                <section style={{ margin: 0 }}>
                  <button
                    className="has-item-above"
                    onMouseDown={e => {
                      e.preventDefault();
                      functions.insertText(text);
                      setText('');
                    }}
                  >
                    insert
                  </button>
                </section>
              </section>
              <label>HTML</label>
              <section className="col">
                <textarea
                  className="has-item-below"
                  style={{ borderBottom: 'none' }}
                  placeholder="Enter html..."
                  value={html}
                  onChange={e => setHtml(e.target.value)}
                />
                <section style={{ margin: 0 }}>
                  <button
                    className="has-item-above"
                    onMouseDown={e => {
                      e.preventDefault();
                      functions.insertHtml(html);
                      setHtml('');
                    }}
                  >
                    insert
                  </button>
                </section>
              </section>
            </>
          )
        };

        const renderJsPanel = () => {
          return (
            <>
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
            </>
          );
        };

        return (
          <div className="main-wrapper">

            {/* to test the hooks */}
            <HooksTest />

            {/* toolbar */}
            {toolbar()}

            {/* editor */}
            <div className="editor-wrapper">
              <div className="container">
                {editor({ placeholder: 'Enter text' })}
              </div>
            </div>

            {/* controls */}
            <div className="control-wrapper">
              {renderHighlights()}
              {renderFormatters()}
              {renderLinks()}
              {renderSelections()}
              {renderContentControls()}
              {renderHtmlExport()}
              {renderImportsExports()}
              {renderJsPanel()}
            </div>
          </div>
        );
      }}
    </MMSEditor>

  );
}

export default App;
