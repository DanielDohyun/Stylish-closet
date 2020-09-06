import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import firebase from '../../firebase';
import './Header.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }


  //this authListener is to track login state => if user is logged in => show signout button
  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) =>{
      if(user) {
        this.setState({user})
      } else {
        this.setState({user: null})
      }
    })
  }

  GoogleLogout = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  render() {

    return (

      <div className="header">
        {/*replace with logo or style it */}
        <p>StyLish Inc</p>

        {
          this.state.user && 
          <div className="header__nav">
            <NavLink
            exact
            to="/"
            className="header__Closet"
            activeClassName="selected"
            >
              Closet{" "}
            </NavLink>

            <NavLink
              exact
              to="/Recommendation"
              className="header__Recommendation"
              activeClassName="selected"
            >
              Style of the day
            </NavLink>

            <button className="nav__signout" onClick={this.GoogleLogout}>Signout</button>
          </div>
        }

      </div>
    )
  }
}

export default Header;
