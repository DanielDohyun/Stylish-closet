import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../../firebase';
import Upload from '../Upload/Upload';
import { Link } from "react-router-dom";
import './All.scss';
import { motion } from 'framer-motion';

var userCur= firebase.auth().currentUser;
console.log(userCur)

class All extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      clothes: [],
      show: false,
      user: null
    };
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
        this.getUserData(user.uid);
      } else {
        this.setState({user: null})
      }
    })
  }

  getUserData= (uid) => {
    console.log(uid);
    firebase.firestore().collection('closet').where("author", "==", uid).orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
}

  componentDidMount() {
    this.authListener();
    // console.log(this.state.user)
  }

  onCollectionUpdate = (querySnapshot) => {
    console.log('querySnapshot', querySnapshot)
    const clothes = [];
    querySnapshot.forEach((doc) => {
      console.log('doc data', doc.data())
      const { style, color, url, category } = doc.data();
      clothes.push({
        key: doc.id,
        doc,
        style,
        color,
        url,
        category
      })
    })
    this.setState({
      clothes
    });
    {console.log(clothes);}

  }

  render() {
    return (
      <div className="clothes">
        <div className="clothes__addBtn">
          <button className="clothes__add" 	onClick={e => {
                  this.showModal();}}>Add Clothes
          </button>
          <button className="clothes__add-mobile" 	onClick={e => {
                  this.showModal();}}>+
          </button>
        </div>

        <div className="clothes__grid"> 
          { 
            this.state.clothes.map(clothes => (
                <div className="clothes__inner">
                  {/* <p>{clothes.style}</p>
                  <p>{clothes.color}</p> */}
                  <motion.div className="clothes__imgWrap"
                    layout
                  >
                    <Link to={`/show/${clothes.key}`} className="clothes__img">
                      <motion.img src={clothes.url} className="clothes__img" alt="photo"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 1}}
                      />
                    </Link>
                  </motion.div>
                </div>
            ))
          }
        </div>

        <Upload 
          show={this.state.show}
      		hideModal={this.hideModal} 
        />

      </div>
    )
  }
}

export default All;