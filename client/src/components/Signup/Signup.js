import React, { Component } from 'react';
import firebase from '../../firebase';
import { Redirect } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state= {
      first: "",
      last: "",
      birth: "",
      email: "",
      password: "",
      redirect: false
    }
  }

  signup = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) =>{
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
        }).catch(function(error) {
          // An error happened.
        });   
    }).catch(err=> console.log(err));
    alert('account successfully created!');
    this.setState({
      redirect: true
    });  
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // console.log('User is singed in')
        // console.log(user.displayName +'\n' + user.email)
        this.setState({
          email:user.email
        })

      } else {
        console.log('No User is signed in')
      }
    });
  }

  render() {
    if (this.state.redirect === true) {
			return <Redirect to="/" />;
    }
    
    return (

      <div>
          <form className="login">
            <input 
            className="login__first"
            name="first"
            type="text"
            id="first"
            placeholder="First Name"
            onChange={this.handleChange}
            value={this.first}
            />

            <input 
            className="login__last"
            name="last"
            type="text"
            id="last"
            placeholder="Last Name"
            onChange={this.handleChange}
            value={this.last}
            />

            <input 
            className="login__birth"
            name="birth"
            type="text"
            id="birth"
            placeholder="DD/MM/YYYY"
            onChange={this.handleChange}
            value={this.birth}
            />
            
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

            <button onClick={this.signup} className="login__signupBtn">Signup</button>
        </form>
      </div>
    )
  }
}

export default Signup;
