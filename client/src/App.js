import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import db from './firebase';
import Firebase from 'firebase';
import firebase from './firebase';
import Practice from './Practice';
import Dropdown from './Dropdown';

class App extends React.Component {

  render () {
    return (
      <div className="App">
        <h1>hello</h1>
        <Practice />
        <Dropdown />
      </div>
    )
  }
}

export default App;