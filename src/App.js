import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sparklines from './components/Sparklines';
import Linechart from './components/Linechart';
import HighLinechart from './components/HighLinechart';

class App extends Component {
  render() {
    return (
      <div>
        <HighLinechart></HighLinechart>
      </div>
    );
  }
}

export default App;
