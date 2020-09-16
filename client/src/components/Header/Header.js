import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import firebase from '../../firebase';
import './Header.scss';
import Toggle from '../SideNav/Toggle';

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
    window.location.reload(true);
    this.props.history.push('/');

    }).catch(function(error) {
      // An error happened.
    });
  }

  render() {

    return (

      <div className="header nav navbar-default navbar-fixed-top">
        <div className="header__left">
          <Toggle click={this.props.toggleHandler} user={this.state.user} />
          <p className="header__name"><a href="/"> Closet Organizer </a></p>
        </div>
        {
          this.state.user && 
            <div className="header__link">
              <NavLink
              exact
              to="/"
              className="header__closet"
              activeClassName="selected"
              >
                Closet{" "}
              </NavLink>

              {/* <NavLink
                exact
                to="/Recommendation"
                className="header__recommendation"
                activeClassName="selected"
              >
                Style of the day
              </NavLink> */}
            <button className="header__out" onClick={this.GoogleLogout}>Signout</button>
          </div>
        }

      </div>
    )
  }
}

export default Header;
