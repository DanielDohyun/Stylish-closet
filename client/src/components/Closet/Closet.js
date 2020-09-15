import React from 'react';
// import ReactDOM from 'react-dom';
import firebase from '../../firebase';
// import Upload from '../Upload/Upload';
// import ShowClothing from '../ShowClothing/ShowClothing';
import { Link } from "react-router-dom";
import './Closet.scss'
// import { auth } from 'firebase';

// var userCur= firebase.auth().currentUser;
// console.log(userCur)

class Closet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clothes: [],
      show: false,
      userUid: null,
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
    console.log(this.state.user)
  }

  goToCloset = () => {
    this.props.history.push('/closet');
  }

  render() {
    // console.log(this.state.clothes);
    // const filtered = this.state.clothes.filter(clothes => clothes.style == "Formal"); 
    // console.log(this.props)
    if(!this.state.user) {
      return null;
    }
    return (
    
      <div className="home-container">
        <h3 className="welcome-text">Closet Oranizer <br/><span>Welcome {this.state.user.displayName}</span></h3>
        <div className="home-inner">
        
        <Link to="/shoes" className="div1">
          <div className="div1 closet__shoes"> </div>
        </Link>
          <div className="div2"></div>

          <Link to="/coats" className="div3">
            <div className="div3 ">
              <div className="div3-1"></div>
              <div className="div3-2"></div>
            </div>
          </Link> 

          <div className="div4">
          <Link to="/top" className="div4-1">
            <div className="div4-1 closet__top"></div>
          </Link>

          <Link to="/bottom" className="div4-2">
            <div className="div4-2 closet__bottom"></div>
          </Link>  
          </div>

          <Link to="/all" className="div5">
            <div className="div5"></div>
          </Link>

          <Link to="/accessory" className="div6">
            <div className="div6 closet__accessory"></div>
          </Link>
        </div>
      </div>
    )
  }
}

export default Closet;