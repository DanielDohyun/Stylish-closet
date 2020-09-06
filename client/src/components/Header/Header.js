import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import firebase from '../../firebase';

class Header extends Component {

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

        <button className="nav__signout" onClick={this.GoogleLogout}>Signout</button>
      </div>
    )
  }
}

export default Header;
