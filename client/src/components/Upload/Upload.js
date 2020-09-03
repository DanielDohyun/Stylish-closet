import React, { Component } from 'react'
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import Firebase from 'firebase';
import firebase from '../../firebase';

class Upload extends Component {
  constructor (props) {
    super (props);
    this.state={
      image: null,
      style: '',
      color: '',
      url: ''
    }
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.style] = e.target.value;
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

  handleUpload = e => {
    e.preventDefault();
    const {image} = this.state;
    const uploadTask = firebase.storage().ref(`closet/${image.id}`).put(this.state.image)
    uploadTask.on('state changed', (snapshot) =>{console.log(snapshot)},
    (err) => {console.log(err);},
    () => {firebase.storage().ref('closet').child(image.id).getDownloadURL().then(url => {
      console.log(url);
    })})

  }



  render() {
    return (
      <>
        <form>
          {/* <input value={input} onChange={event => setInput(event.target.value)} /> */}
          <label for="color">Color</label> 
          <input type="text" className="form-color" name="color" onChange={this.onChange}/>
          
          <label for="style">style</label>
          <input type="text" className="form-style" name="style" onChange={this.onChange}/>

          <input className="upload-img" type="file" onChange={this.handleChange} />
          <img src={this.state.url} />
          
          {/* <select className="upload-select" multiple title="Choose one of the following...">
            <option>White</option>
            <option>Black</option>
            <option>Blue</option>
            <option>Navy</option>
            <option>Red</option>
            <option>Yellow</option>
          </select> */}
          <button className="upload-cancel">Cancel</button>

          <button className="upload-submit-img" onClick={this.handleUpload} >Upload Image First</button>
          <button className="upload-submit" onClick={this.onSubmit} >Submit</button>

        </form>
      </>
    )
  }
}

export default Upload;
