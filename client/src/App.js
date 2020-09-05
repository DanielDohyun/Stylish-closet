import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
// import './App.css';
import db from './firebase';
import Firebase from 'firebase';
import firebase from './firebase';
import Closet from './components/Closet/Closet';
import Upload from './components/Upload/Upload';
import ShowClothing from './components/ShowClothing/ShowClothing';
import EditClothing from './components/EditClothing/EditClothing';

class App extends React.Component {

  render () {
    // console.log(this.state.clothes);
    return (
      <BrowserRouter>
      {/* <Header /> */}
      <section className="main">
        <div className="main-content">
          <Switch>
            <Route exact path="/" component={Closet} />

            <Route
              exact
              path="/show/:id"
              component={ShowClothing}
            />

            <Route
              exact
              path="/edit/:id"
              component={EditClothing}
            />

          </Switch>
        </div>
      </section>
      <footer>
        <p className="copyright">Style Inc. All Rights Reserved.</p>
      </footer>
    </BrowserRouter>

    )
  }
}

export default App;