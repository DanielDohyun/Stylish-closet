import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
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
import SideNav from './components/SideNav/SideNav';
import Backdrop from './components/Backdrop/Backdrop';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      sideOpen: false
    }
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) =>{
      // console.log(user.uid)
      if(user) {
        this.setState({user})
      } else {
        this.setState({user: null})
      }
    })
  }

  toggleHandler = () => {
    this.setState((prevState) => {
      return {sideOpen: !prevState.sideOpen};
    });
  }

  backdropHandler = () => {
    this.setState({
      sideOpen: false
    });
  }

  render () {
    let backdrop;

    if(this.state.sideOpen) {
      backdrop = <Backdrop close={this.backdropHandler} />
    }
    return (
      <div id="App" className="App" style={{height: '100%'}}>
        <BrowserRouter>
        
          <Header toggleHandler={this.toggleHandler} />
          <SideNav show={this.state.sideOpen} />
          {backdrop}

          <section className="main" id="mainBody" >
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

                <Route exact path="/login" component={Login} />

                <Route exact path="/" component={Closet} />

              </Switch>
            </div>
          </section>
          <Footer />
        </BrowserRouter>
      </div>
    )
  }
}

export default App;