import React, { Component } from 'react'
// import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
// import Firebase from 'firebase';
import { timestamp } from '../../firebase';
import firebase from '../../firebase';
// import Modal from 'react-bootstrap4-modal';
import close from '../../assets/icons/close.svg';
import { motion } from 'framer-motion';

import './Upload.scss';

// var userCur = firebase.auth().currentUser;

class Upload extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('closet');
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

      //chain this so that this runs after url value is passed
      const {name, style, color, user, category} = this.state;
      // var userCur= firebase.auth().currentUser;
      const createdAt = timestamp();

      this.ref.add({
        author: user.uid,
        name,
        style,
        color,
        url:this.state.url,
        category,
        createdAt
        
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
    // const {name, style, color,} = this.state;
    const {show, hideModal} = this.props;
    if (!show) {
			return null;
		}
     
    return (
      <>

				<motion.div className="upload-overlay" onClick={hideModal} 
          initial = {{opacity:0}}
          animate = {{opacity:1}}
        >
        
        </motion.div>
        <motion.form className="upload"
          initial = {{x: '-100vw'}}
          animate = {{x: 0}}
        >
          <img alt="close" className="upload__close" src={close} onClick={hideModal} /> 

          <div className="upload__inner">

            <label htmlFor="category" className="upload__categoryLabel">Category</label> 
              <select className="upload__select" single name="category" onChange={this.onChange}>
                <option value="N/A">Category</option>
                <option value="Coats">Coats & Jackets</option>
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

              <label htmlFor="style" className="upload__styleLabel">Style</label>
              <select className="upload__select" single name="style" onChange={this.onChange}>
                <option value="N/A">Style</option>
                <option value="Casual">Casual</option>
                <option value="Sporty">Sporty</option>
                <option value="Formal">Formal</option>
                <option value="Vintage">Vintage</option>
                <option value="Vacation Look">Vacation Look</option>
              </select>  

              <input className="upload__imgInput" type="file" onChange={this.handleChange} />
              {/* <img src={this.state.url} className="upload__img" alt="upload" /> */}

          </div>  

          <div className="upload__btn">
            <button className="upload__cancel" onClick={hideModal}>Cancel</button>
            <button className="upload__submit" onClick={this.onSubmit} >Submit</button>
          </div>

        </motion.form>
      </>
    )
  }
}
  export default Upload;
