import React, { Component } from 'react';
import firebase from '../../firebase';
import { Redirect } from 'react-router-dom';
import './Signup.scss';

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
      u.user.updateProfile({
        displayName: this.state.first
      })
      alert('account successfully created!')
      firebase.auth().signOut().then(() => {
          this.setState({
            redirect: true
          });
          window.location.reload(true);
        });
    }).catch(err=> alert(err.message));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
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
          <form className="sign">
            <div className="sign__name">
              <input 
              className="sign__first"
              name="first"
              type="text"
              id="first"
              placeholder="First Name"
              onChange={this.handleChange}
              value={this.first}
              />

              <input 
              className="sign__last"
              name="last"
              type="text"
              id="last"
              placeholder="Last Name"
              onChange={this.handleChange}
              value={this.last}
              />
            </div>

            <input 
            className="sign__birth"
            name="birth"
            type="text"
            id="birth"
            placeholder="DD/MM/YYYY"
            onChange={this.handleChange}
            value={this.birth}
            />
            
            <div className="sign__mail">
              <input 
              className="sign__email"
              name="email"
              type="email"
              id="email"
              placeholder="enter email address"
              onChange={this.handleChange}
              value={this.state.email}
              />
              <input 
              className="sign__password"
              name="password"
              type="password"
              id="password"
              placeholder="enter password"
              onChange={this.handleChange}
              value={this.state.password}
              />
            </div>

            <button onClick={this.signup} className="sign__signupBtn">Signup</button>
        </form>
      </div>
    )
  }
}

export default Signup;
