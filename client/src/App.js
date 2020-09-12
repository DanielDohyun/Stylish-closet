import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import firebase from './firebase';
import Closet from './components/Closet/Closet';
import ShowClothing from './components/ShowClothing/ShowClothing';
import EditClothing from './components/EditClothing/EditClothing';
import Header from './components/Header/Header';
import Signup from './components/Signup/Signup';
import Footer from './components/Footer/Footer';
import Coats from './components/Coats/Coats';
import Shoes from './components/Shoes/Shoes';
import Top from './components/Top/Top';
import Bottom from './components/Bottom/Bottom';
import All from './components/All/All';
import Accessory from './components/Accessory/Accessory';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) =>{
      console.log(user.uid)
      if(user) {
        this.setState({user})
      } else {
        this.setState({user: null})
      }
    })
  }

  render () {
    console.log(this.state.user);
    return (
      <BrowserRouter>
      <Header />
      <section className="main">
        <div className="main-content">
          <Switch>
            <Route exact path="/Signup" component={Signup} />

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

            <Route
              exact
              path="/shoes"
              component={Shoes}
            />

            <Route
              exact
              path="/coats"
              component={Coats}
            />
            
            <Route
              exact
              path="/top"
              component={Top}
            />

            <Route
              exact
              path="/bottom"
              component={Bottom}
            />

             <Route
              exact
              path="/all"
              component={All}
            />

            <Route
              exact
              path="/accessory"
              component={Accessory}
            />

            {this.state.user ? <Closet /> : <Login />}

            <Route exact path="/" component={Closet} />

          </Switch>
        </div>
      </section>
      <Footer />
    </BrowserRouter>

    )
  }
}

export default App;