import React, { Component } from 'react';
import './App.css';
import ClientComponent from './components/ClientComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ClientComponent />    
      </div>
    );
  }
}

export default App;
