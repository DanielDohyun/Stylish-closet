import React, { Component } from 'react'
import { Link, Redirect, useHistory } from "react-router-dom";
import Firebase from 'firebase';
import firebase from '../../firebase';
import backArrow from '../../assets/icons/back_arrow.svg';

let color = [
  "White", "Brown", "Black", "Blue", "Navy", "Red", "Yellow", "Pink", "Gray"
]

let style = [
  "Casual", "Sporty", "Formal", "Vintage", "Vacation Look"
]

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

  handleChange = (e) => {
    if(e.target.files[0]) {
      this.setState({
        image:e.target.files[0]

      })
    }
    console.log(e.target.files[0]);
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({document: state});
  }

  handleUpload = (e) => {
    e.preventDefault();
    const {image, url} = this.state;
    var desertRef = firebase.storage().refFromURL(url);
    const uploadTask = firebase.storage().ref(`closet/${image.name}`).put(this.state.image)
    uploadTask.on('state_changed', (snapshot) =>{console.log(snapshot)},
    (err) => {console.log(err);},

    //target storage, and folder to get url => setState url
    () => {firebase.storage().ref('closet').child(image.name).getDownloadURL().then(url => {
      this.setState({url});
      // console.log(url);
    })})
      desertRef.delete().then(function(){
        console.log('file deleted');
      }).catch(function(error){
        console.log("error while deleting the file ");
      })
   
  }

  onSubmit = (e) => {
    e.preventDefault();
    
      //chain this so that this runs after url value is passed
      const {name, style, color, url} = this.state;
      const updateRef = firebase.firestore().collection('closet').doc(this.state.key);
      updateRef.set({
        name,
        style,
        color,
        url
      }).then((docRef) => {
        this.setState({
          key: '',
          style: '',
          name: '',
          color: '',
          url: '' 
        });
        // console.log(this.props)
        // console.log(this.state.url)
        this.props.history.push("/show/" + this.props.match.params.id)
      })
      .catch(error => {console.error("error editing the document", error);
      })
   
  }

  render() {
    const id = this.props.match.params.id;

    return (

      <div className="Edit">
            <Link to='/'>
              <img src={backArrow}/>
            </Link>
          <form className="Edit__form">
          
            <label htmlFor="color" className="edit__colorLabel">Color</label> 
            <select className="edit__select" multiple name="color" onChange={this.onChange}>
              <option value={this.state.color}>{this.state.color}</option>
              {
                color.map(color => {
                  if(color !== this.state.color)
                  return (<option value={color}>{color}</option>)
                })
              }
            </select>

            <label htmlFor="style" className="edit__styleLabel">style</label>
            <select className="edit__select" multiple name="style" onChange={this.onChange}>
              <option value={this.state.style}>{this.state.style}</option>
              {
                style.map(style => {
                  if(style !== this.state.style)
                  return (<option value={style}>{style}</option>)
                })
              }
            </select>  

            <input className="edit__imgInput" type="file" onChange={this.handleChange} />
            <button className="edit__first" onClick={this.handleUpload}>Update Photo</button>
            <img src={this.state.url} className="edit__img" />

            <div className="upload__btn">
              <Link to={`/show/${id}`}>
                <button className="edit__cancel">Cancel</button>
              </Link>
              <button className="edit__update" onClick={this.onSubmit} >Save All</button>
            </div>

          </form>

      </div>
    )
  }
}

export default EditClothing;
