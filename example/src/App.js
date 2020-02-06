import React, { useState } from 'mms-editor/node_modules/react';
import MMSEditor from 'mms-editor'
import './App.css';

const Separator = props => (
  <separator>
    <span>{props.text}</span>
  </separator>
);

function App() {

  const [code, setCode] = useState('')
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const [jsx, setJsx] = useState('')
  const defaultCode = 'api().focus();\napi().moveCursorToStart()\nconsole.log("cursor moved")';
  const defaultJsx = `<editor>\n\t<block>\n\t\t<text>yo!</text>\n\t</block>\n</editor>`;

  return (
    <MMSEditor>
      {({
        api,
        component,
        isBold,
        isItalic,
        isUnderline,
        isStrikethrough,
      }) => {
        window.api = api;

        return (
          <div className="main-wrapper">

            {/* editor */}
            <div className="editor-wrapper">
              <div className="container">
                {component}
              </div>
            </div>

            {/* controls */}
            <div className="control-wrapper">

              {/* JS stuff */}
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
                      api()._populateWindow();
                      eval(code || defaultCode); // eslint-disable-line
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
                <button onClick={() => console.log(api()._getEditor())}>log(editor)</button>
                <button onClick={() => api()._populateWindow()}>populate window</button>
              </section>

              {/* formatters */}
              <Separator text="Formatters" />
              <section>
                <button className={`has-item-right ${isBold ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); api().toggleBold(); }}><b>bold</b></button>
                <button className={`has-item-right has-item-left ${isItalic ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); api().toggleItalic(); }}><i>italic</i></button>
                <button className={`has-item-right has-item-left ${isUnderline ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); api().toggleUnderline(); }}><u>underline</u></button>
                <button className={`has-item-left ${isStrikethrough ? 'active' : ''}`} onMouseDown={e => { e.preventDefault(); api().toggleStrikethrough(); }}><strike>strike</strike></button>
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
                    className="has-item-above has-item-right"
                    onClick={() => api().insertLink(url)}
                  >
                    insert link
                  </button>
                  <button
                    className="has-item-above has-item-left"
                    onClick={() => api().removeLink()}
                  >
                    remove link
                  </button>
                </section>
              </section>

              {/* focus stuff */}
              <Separator text="Focus" />
              <section>
                <button onClick={() => api().focus()}>focus</button>
              </section>
              <section>
                <button onClick={() => api().focusAtStart()}>focus at start</button>
                <button onClick={() => api().focusAtEnd()}>focus at end</button>
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
                <button onClick={() => api().selectAll()}>select all</button>
              </section>
              <section>
                <button onClick={() => api().clear()}>clear</button>
              </section>

            </div>
          </div>
        );
      }}
    </MMSEditor>

  );
}

export default App;
