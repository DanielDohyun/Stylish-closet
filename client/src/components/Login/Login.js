import React, { Component } from 'react';
import { Link } from "react-router-dom";
import firebase from '../../firebase';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.signup = this.signup.bind(this);
    this.state= {
      email: "",
      password: ""
    }
  }

  //email signup
  login = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
      console.log(u);
    }).catch(err => {
      console.log(err)});
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  // signup = (e) => {
  //   e.preventDefault();
  //   firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) =>{
  //     console.log(u)
  //   }).catch(err=> console.log(err));
  // }


  //Google

  onSubmit = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
     console.log(error)
    });
  }

  GoogleLogout = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // console.log('User is singed in')
        console.log(user +'\n' + user.email)
        console.log(this + this.setState)
        this.setState({
          email:user.email
        })

      } else {
        console.log('No User is signed in')
      }
    });
  }

  render() {

    return (

      <div>
        <form className="login">
          <input 
          className="login__email"
          name="email"
          type="email"
          id="email"
          placeholder="enter email address"
          onChange={this.handleChange}
          value={this.state.email}
          />
          <input 
          className="login__password"
          name="password"
          type="password"
          id="password"
          placeholder="enter password"
          onChange={this.handleChange}
          value={this.state.password}
          />

          <button onClick={this.login} className="login__loginBtn">Login</button>
          <Link to="/Signup" >
            <button className="login__signupBtn">Signup</button>
          </Link>
          <button type="button" onClick={this.onSubmit} className="login__google">Login with Google</button>

        </form>
      </div>
    )
  }
}

export default Login;
