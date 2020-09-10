import React from 'react';
import firebase from '../../firebase';
import { Link } from "react-router-dom";
import './Closet.scss'

var userCur= firebase.auth().currentUser;
console.log(userCur)

class Closet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

   //need this to update the user and get uid
  authListener() {
    firebase.auth().onAuthStateChanged((user) =>{
      if(user) {
        this.setState({userUid: user.uid, user: user });
      } else {
        this.setState({user: null})
      }
    })
  }

  componentDidMount() {
    this.authListener();
    // console.log(this.state.user)
  }

  render() {
    if(!this.state.user) {
      return null;
    }
    return (
      // <div className="App">
      //   <h2>hello</h2>
      //   {/* { 
      //     this.state.clothes.map(clothes => (
      //         <div className="clothes__container">
      //           <p>{clothes.style}</p>
      //           <p>{clothes.color}</p>
      //           <Link to={`/show/${clothes.key}`}>
      //             <img src={clothes.url} className="clothes__img" />
      //           </Link>
      //         </div>
      //     ))
      //   } */}
      //    { 
      //     filtered.map(clothes => (
      //         <div className="clothes__container">
      //           <p>{clothes.style}</p>
      //           <p>{clothes.color}</p>
      //           <Link to={`/show/${clothes.key}`}>
      //             <img src={clothes.url} className="clothes__img" />
      //           </Link>
      //         </div>
      //     ))
      //   }
      //   <button className="clothes__add" 	onClick={e => {
      // 					this.showModal();}}>Add Clothes
      //   </button>

      //   <Upload 
      //     show={this.state.show}
      // 		hideModal={this.hideModal} 
      //   />

      // </div>
      <div className="home-inner">
        <h3 className="welcome-text">Stylish Closet <br/><span>Welcome {this.state.user.displayName} <i className="fa fa-heart"></i></span></h3>
        <div className="main">
          <a className="closet__shoes" onClick={e => { }}></a>
          <div className="div2"></div>
          <div className="closet__coats">
            <a className="div3-1"></a>
            <div className="div3-2"></div>
          </div>
          <div className="div4">
            <a className="closet__top"></a>
            <a className="closet__bottom"></a>
          </div>
          <div className="div5"></div>
          <a className="div6"></a>
        </div>
      </div>
    )
  }
}

export default Closet;