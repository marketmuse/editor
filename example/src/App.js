import React from 'mms-editor/node_modules/react';
import MMSEditor from 'mms-editor'
import './App.css';

function App() {
  return (
    <MMSEditor>
      {({ component, api }) => {
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

              <section>
                <button onClick={() => console.log(api()._getEditor())}>log(editor)</button>
                <button onClick={() => console.log(api()._populateWindow())}>populate window</button>
              </section>

              <section>
                <button onClick={() => api().focus()}>focus</button>
              </section>

              <section>
                <button onClick={() => api().focusAtStart()}>focus at start</button>
                <button onClick={() => api().focusAtEnd()}>focus at end</button>
              </section>

            </div>
          </div>
        );
      }}
    </MMSEditor>

  );
}

export default App;
