import React, { Component } from 'react'
import { Link } from "react-router-dom";
// import Firebase from 'firebase';
import firebase from '../../firebase';
import backArrow from '../../assets/icons/black-arrow.svg';
import './ShowClothing.scss';

class ShowClothing extends Component {
  constructor(props){
    super(props);
    this.state = {
      clothing: [],
      key: ''
    }
  }

  componentDidMount () {
  
    const ref = firebase.firestore().collection('closet').doc(this.props.match.params.id);
    // console.log(ref);

    ref.get().then((doc) => {
      if(doc.exists) {
        this.setState({
          clothing: doc.data(),
          key: doc.id,
          isLoading: false,
        });
      } else {
        console.log('no such document is present')
      }
    })
  }

  delete(id){
    var desertRef = firebase.storage().refFromURL(this.state.clothing.url)
    firebase.firestore().collection('closet').doc(id).delete().then(() => {
      console.log('document is successfully deleted')
      this.goBack();
    }).catch((error) => {console.error("error is ", error)})
    desertRef.delete().then(function(){
      console.log('file deleted');
      this.goBack();
    }).catch(function(error){
      console.log("error while deleting the file ");
    })
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    // const {ShowClothing, hideClothing} = this.props;
    // console.log(this.props);

    if (!this.state.clothing) {
			return null;
		}

    return (

      <div className="current">
        <div className="current__backBox">
          <img className="current__back" src={backArrow} onClick={this.goBack} alt="back"/>
        </div>

          <div className="current__img">
            <img src={this.state.clothing.url} className="upload-img" alt="curImg" />
          </div>

          <div className="current__info">
            <h3 className="current__color">{this.state.clothing.color}</h3>
            <h3 className="current__style">{this.state.clothing.style}</h3>
          </div>

          <div className="current__btn">
            <Link to={`/edit/${this.state.key}`}>
              <button className="current__edit">Edit</button>
            </Link>
            {/* passing key as an id */}
            <button onClick={this.delete.bind(this, this.state.key)} className="current__delete">Delete</button>
          </div>
      </div>
    )
  }
}

export default ShowClothing;
