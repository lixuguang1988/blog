import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import '../node_modules/antd/dist/antd.css'

import  TablePage from "./TablePage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={TablePage} />
      </div>
    );
  }
}

export default App;
