import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Aut from './components/autocomplete/Aut';
import db from './components/autocomplete/db';
import Chart from './components/chart/Chart'; 

class App extends Component {
  render() {
    return (
      <div>
      <Aut/>
      
      </div>
    );
  }
}

export default App;
