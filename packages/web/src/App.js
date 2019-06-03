import React from 'react';
import logo from './logo.svg';
import './App.css';

import MorpherService from '@szgabsz91/morpher-client-shared';

const service = new MorpherService();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React - {service.getTitle()}
        </a>
      </header>
    </div>
  );
}

export default App;
