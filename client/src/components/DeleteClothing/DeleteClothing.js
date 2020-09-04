import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom";
import Firebase from 'firebase';
import firebase from '../../firebase';


class DeleteClothing extends Component {
  constructor(props) {
    super(props);
    this.state= {
      key: '',
      name: '',
      color: '',
      style: ''
    }
  }

  render() {

    return (

      <div>
        
      </div>
    )
  }
}

export default DeleteClothing;
