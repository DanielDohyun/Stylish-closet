import React, { Component } from 'react'
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import Firebase from 'firebase';
import firebase from '../../firebase';
import Modal from 'react-bootstrap4-modal';

// import './Upload.scss';

class Upload extends Component {
  constructor (props) {
    super (props);
    this.ref=firebase.firestore().collection('closet');
    this.state={
      image: null,
      style: '',
      color: '',
      url: '',
      name: ''
    }
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleChange = (e) => {
    if(e.target.files[0]) {
      this.setState({
        image:e.target.files[0]

      })
    }
    console.log(e.target.files[0]);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {image} = this.state;
    const uploadTask = firebase.storage().ref(`closet/${image.name}`).put(this.state.image)
    uploadTask.on('state_changed', (snapshot) =>{console.log(snapshot)},
    (err) => {console.log(err);},

    //target storage, and folder to get url => setState url
    () => {firebase.storage().ref('closet').child(image.name).getDownloadURL().then(url => {
      this.setState({url});
      // console.log(url);

      //chain this so that this runs after url value is passed
      const {name, style, color} = this.state;
      this.ref.add({
        name,
        style,
        color,
        url:this.state.url
      }).then((docRef) => {
        this.setState({
          name: '',
          style: '',
          url: '' 
        });
        // console.log(this.props)
        // console.log(this.state.url)
        // this.props.history.push("/")
      })
      .catch(error => {console.error("error adding document", error);
      })
    })})

    this.props.hideModal();
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
          
          <label htmlFor="color" className="upload__colorLabel">Color</label> 
          <select className="upload__select" multiple name="color" onChange={this.onChange}>
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
          <select className="upload__select" multiple name="style" onChange={this.onChange}>
            <option value="N/A">Style</option>
            <option value="Casual">Casual</option>
            <option value="Sporty">Sporty</option>
            <option value="Formal">Formal</option>
            <option value="Vintage">Vintage</option>
            <option value="Vacation Look">Vacation Look</option>
          </select>  

          <input className="upload__imgInput" type="file" onChange={this.handleChange} />
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
