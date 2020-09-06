import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import firebase from '../../firebase';

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

      <div>
        <NavLink
        	exact
					to="/"
					className="nav__Closet"
					activeClassName="selected"
				>
					Closet{" "}
				</NavLink>
				<NavLink
					exact
					to="/Recommendation"
					className="nav__Recommendation"
					activeClassName="selected"
				>
          Style of the day
				</NavLink>

        {
          this.state.user && 
          <button className="nav__signout" onClick={this.GoogleLogout}>Signout</button>
        }
      </div>
    )
  }
}

export default Header;
