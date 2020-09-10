import React, { Component } from 'react'
// import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import Firebase from 'firebase';
import firebase from '../../firebase';
import Modal from 'react-bootstrap4-modal';

import './Upload.scss';

// var userCur = firebase.auth().currentUser;

class Upload extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('closet');
    // this.ref = firebase.firestore().collection("closet").where("author", "==", user.uid);
    this.state = {
      image: null,
      style: '',
      color: '',
      url: '',
      name: '',
      category: '',
      check: 0,
      user: null
    }
  }

  //need this to update the user and get uid
  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) =>{
      console.log(user.uid)
      if(user) {
        this.setState({user})
      } else {
        this.setState({user: null})
      }
    })
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleChange = (e) => {
    if (e.target.files[0]) {
      this.setState({
        image:e.target.files[0],
        check: 1
      })
    }
    console.log(e.target.files[0]);
  }

  onSubmit = (e) => {
    e.preventDefault();

    if(this.state.check === 1) {
      const {image} = this.state;
    const uploadTask = firebase.storage().ref(`closet/${image.name}`).put(this.state.image)
    uploadTask.on('state_changed', (snapshot) =>{console.log(snapshot)},
    (err) => {console.log(err);},

    //target storage, and folder to get url => setState url
    () => {firebase.storage().ref('closet').child(image.name).getDownloadURL().then(url => {
      this.setState({url});
      // console.log(url);

      //chain this so that this runs after url value is passed
      const {name, style, color, user, category} = this.state;
      var userCur= firebase.auth().currentUser;
      // this.ref.where("author", "==", userCur.uid).set({
      // this.ref.doc(userCur.uid).add({
      this.ref.add({
        author: user.uid,
        name,
        style,
        color,
        url:this.state.url,
        category
      }).then((docRef) => {
        this.setState({
          name: '',
          style: '',
          url: '',
          color: '',
          category: '' 
        });
      })
      .catch(error => {console.error("error adding document", error);
      })
    })})
    this.setState({check:0});
    this.props.hideModal();
    } else {
      e.preventDefault();
          alert('Please select an image first');
    }
  }

  render() {
    const {name, style, color,} = this.state;
    const {show, hideModal} = this.props;
    if (!show) {
			return null;
		}
     
    return (
      <>

				<div className="upload-overlay"></div>
        <form className="upload">

        <label htmlFor="category" className="upload__categoryLabel">Category</label> 
          <select className="upload__select" single name="category" onChange={this.onChange}>
            <option value="N/A">Category</option>
            <option value="Coats&Jackets">Coats & Jackets</option>
            <option value="Top">Top</option>
            <option value="Bottom">Bottom</option>
            <option value="Shoes">Shoes</option>
            <option value="Accessory">Accessory</option>
          </select>
          
          <label htmlFor="color" className="upload__colorLabel">Color</label> 
          <select className="upload__select" single name="color" onChange={this.onChange}>
            <option value="N/A">Color</option>
            <option value="White">White</option>
            <option value="Brown">Brown</option>
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
            <option value="Navy">Navy</option>
            <option value="Red">Red</option>
            <option value="Yellow">Yellow</option>
            <option value="Pink">Pink</option>
            <option value="Gray">Gray</option>
          </select>

          <label htmlFor="style" className="upload__styleLabel">style</label>
          <select className="upload__select" single name="style" onChange={this.onChange}>
            <option value="N/A">Style</option>
            <option value="Casual">Casual</option>
            <option value="Sporty">Sporty</option>
            <option value="Formal">Formal</option>
            <option value="Vintage">Vintage</option>
            <option value="Vacation Look">Vacation Look</option>
          </select>  

          <input className="upload__imgInput" type="file" onChange={this.handleChange} />
          {/* <button className="upload__first" onClick={this.handleUpload}>Upload Photo</button> */}
          <img src={this.state.url} className="upload__img" />

          <div className="upload__btn">
            <button className="upload__cancel" onClick={hideModal}>Cancel</button>
            <button className="upload__submit" onClick={this.onSubmit} >Submit</button>
          </div>

        </form>
      </>
    )
  }
}
  export default Upload;
