import React, { Component, createContext } from 'react'
import { Link, Redirect } from "react-router-dom";
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import Firebase from 'firebase';
import firebase from '../../firebase';
import backArrow from '../../assets/icons/back_arrow.svg';

class ShowClothing extends Component {
  constructor(props){
    super(props);
    this.state = {
      clothing: [],
      key: '',
      redirect: false
    }
  }

   // const {ShowClothing, hideClothing} = this.props;
   
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
      this.props.history.push('/');
      // this.props.hideClothing();
    }).catch((error) => {console.error("error is ", error)})
    desertRef.delete().then(function(){
      console.log('file deleted');
      this.setState({
        redirect:true
      })
    }).catch(function(error){
      console.log("error while deleting the file ");
    })
  }

  render() {
    const {ShowClothing, hideClothing} = this.props;
    if (!this.state.clothing) {
			return null;
		} else if (this.state.redirect === true) {
			return <Redirect to="/" />;
		}

    return (

      <div>
        <Link to='/'>
        <img src={backArrow}/>
        </Link>
          
          <div className="current__img">
            <img src={this.state.clothing.url} className="upload-img" />
          </div>

          <div className="current__info">
            <h3 className="current__color">{this.state.clothing.color}</h3>
            <h3 className="current__style">{this.state.clothing.style}</h3>
          </div>

          <div className="current__btn">
            <Link to={`/clothing/edit/${this.state.key}`}>
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
