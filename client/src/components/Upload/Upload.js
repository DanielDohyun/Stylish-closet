import React, { Component } from 'react'
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import Firebase from 'firebase';
import firebase from '../../firebase';

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

  handleUpload = e => {
    e.preventDefault();
    // const {image} = this.state;
    // const uploadTask = firebase.storage().ref(`closet/${image.name}`).put(this.state.image)
    // uploadTask.on('state_changed', (snapshot) =>{console.log(snapshot)},
    // (err) => {console.log(err);},
    // () => {firebase.storage().ref('closet').child(image.name).getDownloadURL().then(url => {
    //   this.setState({url});
    // })})

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
  }

  render() {
    const {name, style, color} = this.state;
     
    return (
      <>
        <form>
          {/* <input value={input} onChange={event => setInput(event.target.value)} /> */}
          <label htmlFor="color">Color</label> 
          <input type="text" className="form-color" name="color" onChange={this.onChange}/>
          
          <label htmlFor="style">style</label>
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
