import React, { Component } from 'react';
import './App.css';
import ClimasContainer from './components/ClimasContainer';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title">Clima Board</h1>
        </div>
        <ClimasContainer />
      </div>
    );
  }
}

export default App;
