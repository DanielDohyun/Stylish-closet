import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.css';
// import db from '../../firebase';
// import Firebase from 'firebase';
import firebase from '../../firebase';
import Upload from '../Upload/Upload';
import ShowClothing from '../ShowClothing/ShowClothing';
import { Link } from "react-router-dom";

import './Closet.scss'
import { auth } from 'firebase';

// console.log(user)
// db.collection("closet").where("author", "==", user.uid).get();
var userCur= firebase.auth().currentUser;
console.log(userCur)


class Closet extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      clothes: [],
      show: false,
      user: null
    };
    // this.ref = firebase.firestore().collection('closet/' + this.state.user.id);

  }

  showModal = () => {
    this.setState({
      show: true,
    });
  };

  hideModal = e => {
    this.setState({
      show: !this.state.show,
    });
  };

   //need this to update the user and get uid
  authListener() {
    firebase.auth().onAuthStateChanged((user) =>{
      console.log(user.uid)
      if(user) {
        this.setState({user: user.uid});
        this.getUserData(user.id);
      } else {
        this.setState({user: null})
      }
    })
  }

  getUserData= (uid) => {
    firebase.firestore().collectionGroup('closet' + uid).onSnapshot(this.onCollectionUpdate)
}

  componentDidMount() {
    this.authListener();
    console.log(this.state.user)
    // this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    // this.ref = firebase.firestore().collection('closet/' + this.state.user.id);
    // this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);

  }

  onCollectionUpdate = (querySnapshot) => {
    console.log('querySnapshot', querySnapshot)
    const clothes = [];
    querySnapshot.forEach((doc) => {
      console.log('doc data', doc.data())
      const { style, color, url } = doc.data();
      clothes.push({
        key: doc.id,
        doc,
        style,
        color,
        url
      })
    })
    this.setState({
      clothes
    });
    // {console.log(clothes);}

  }

  render() {
    // console.log(this.state.clothes);
    return (
      <div className="App">
        <h2>hello</h2>
        { 
          this.state.clothes.map(clothes => (
              <div className="clothes__container">
                <p>{clothes.style}</p>
                <p>{clothes.color}</p>
                <Link to={`/show/${clothes.key}`}>
                  <img src={clothes.url} className="clothes__img" />
                </Link>
              </div>
          ))
        }
        <button className="clothes__add" 	onClick={e => {
      					this.showModal();}}>Add Clothes
        </button>

        <Upload 
          show={this.state.show}
      		hideModal={this.hideModal} 
        />

      </div>
      // <div className="home-inner">
      //   <h3 className="welcome-text">Stylish Closet <br/><span>made by Daniel Kim <i className="fa fa-heart"></i></span></h3>
      //   <div className="main">
      //     <a className="div1" onClick={e => { }}></a>
      //     <div className="div2"></div>
      //     <div className="div3">
      //       <a className="div3-1"></a>
      //       <div className="div3-2"></div>
      //     </div>
      //     <div className="div4">
      //       <a className="div4-1"></a>
      //       <a className="div4-2"></a>
      //     </div>
      //     <div className="div5"></div>
      //     <a className="div6"></a>
      //   </div>
      // </div>
    )
  }
}

export default Closet;