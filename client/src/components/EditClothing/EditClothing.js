import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom";
import Firebase from 'firebase';
import firebase from '../../firebase';


class EditClothing extends Component {
  constructor(props) {
    super(props);
    this.state= {
      key: '',
      name: '',
      color: '',
      style: '',
      url: '',
      image: null
    }
  }

  handleChange = (e) => {
    if(e.target.files[0]) {
      this.setState({
        image:e.target.files[0]

      })
    }
    console.log(e.target.files[0]);
  }

  componentDidMount () {
  
    const ref = firebase.firestore().collection('closet').doc(this.props.match.params.id);
    // console.log(ref);

    ref.get().then((doc) => {
      if(doc.exists) {
        const document = doc.data();
        this.setState({
          key: doc.id,
          name: document.name,
          color: document.color,
          style: document.style,
          url: document.url
  
        });
      } else {
        console.log('no such document is present')
      }
    })
  }

  render() {

    return (

      <div className="Edit">

        <input className="Edit-imgInput" type="file" onChange={this.handleChange} />
        <img src={this.state.url} className="Edit-img" />

        <div className="Edit__btn">
            <button className="Edit-cancel" onClick={hideModal}>Cancel</button>
            <button className="Edit-submit" onClick={this.onSubmit} >Submit</button>
          </div>

      </div>
    )
  }
}

export default EditClothing;
