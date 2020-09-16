import React, { Component } from 'react'
import { Link } from "react-router-dom";
import firebase from '../../firebase';
import backArrow from '../../assets/icons/black-arrow.svg';
import './EditClothing.scss';
import { timestamp } from '../../firebase';

let color = [
  "White", "Brown", "Black", "Blue", "Navy", "Red", "Yellow", "Pink", "Gray"
]

let style = [
  "Casual", "Sporty", "Formal", "Vintage", "Vacation Look"
]

class EditClothing extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state= {
      key: '',
      name: '',
      color: '',
      style: '',
      url: '',
      image: null,
      newImg: false,
      user: null,
      category: ''

    }
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


  componentDidMount () {

    this._isMounted = true;

    this.authListener();
  
    const ref = firebase.firestore().collection('closet').doc(this.props.match.params.id);
    // console.log(ref);

    ref.get().then((doc) => {
      if(doc.exists) {
        const document = doc.data();
        this.setState({
          key: doc.id,
          name: document.name,
          color: document.color,
          url: document.url,
          user: document.author,
          category: document.category,
          style: document.style
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
    this.setState ({
      newImg: !this.state.newImg
    });
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
    if(!this.state.newImg) {
      alert("Please upload a new image first")
    } else {
       //chain this so that this runs after url value is passed
      const { name, style, color, url, user, category } = this.state;
      const updateRef = firebase.firestore().collection('closet').doc(this.state.key);
      const createdAt = timestamp();
      console.log(user)

      updateRef.set({
        author: user,
        name,
        style,
        color,
        url,
        category,
        createdAt

      }).then((docRef) => {
        this.setState({
          key: '',
          style: '',
          name: '',
          color: '',
          url: '' 
        });
        this.props.history.push("/show/" + this.props.match.params.id)
      })
      .catch(error => {console.error("error editing the document", error);
      })
   
    }
  }

  goBack = () => {
    this.props.history.goBack();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const id = this.props.match.params.id;

    return (

      <div className="edit">
            <img className="edit__back" src={backArrow} onClick={this.goBack} alt="back" />

          <form className="edit__form">

            <div className="edit__csBox">
              <div className="edit__color">
                <label htmlFor="color" className="edit__colorLabel">Color</label> 
                <select className="edit__select" single name="color" onChange={this.onChange}>
                  <option value={this.state.color}>{this.state.color}</option>
                  {
                    color.map(color => {
                      if(color !== this.state.color)
                      return (<option value={color}>{color}</option>)
                    })
                  }
                </select>
              </div>

              <div className="edit__style">
                <label htmlFor="style" className="edit__styleLabel">style</label>
                <select className="edit__select" single name="style" onChange={this.onChange}>
                  <option value={this.state.style}>{this.state.style}</option>
                  {
                    style.map(style => {
                      if(style !== this.state.style)
                      return (<option value={style}>{style}</option>)
                    })
                  }
                </select>
              </div>
            </div>  

            <div className="edit__imgFirst">  
              <input className="edit__imgInput" type="file" onChange={this.handleChange} />
              <button className="edit__first" onClick={this.handleUpload}>Update Photo</button>
            </div>

            <img src={this.state.url} className="edit__img" alt="img" />

            <div className="edit__btn">
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
