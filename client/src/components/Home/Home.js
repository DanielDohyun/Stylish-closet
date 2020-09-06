import React, { Component } from 'react'
import firebase from '../../firebase';

//this can be inside header
class Home extends Component {
  constructor(props) {
    super(props);
    this.state= {

    }
  }

  logout = () => {
    firebase.auth().signOut();
  }

  render() {

    return (

      <div>
        <button onClick={this.logout}>Logout</button>
      </div>
    )
  }
}

export default Home;
