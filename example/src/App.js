import React from 'mms-editor/node_modules/react';
import MMSEditor from 'mms-editor'
import './App.css';

function App() {
  return (
    <div className="wrapper">
      <div className="container">
        <MMSEditor>
          {({ component, api }) => {
            window.api = api;
            return component;
          }}
        </MMSEditor>
      </div>
    </div>
  );
}

export default App;
