import React from 'react';
// import ReactDOM from 'react-dom';
import firebase from '../../firebase';
import Upload from '../Upload/Upload';
import { Link } from "react-router-dom";
import '../Shoes/Shoes.scss';
import { motion } from 'framer-motion';
import add from '../../assets/icons/upload.png';

// var userCur= firebase.auth().currentUser;
// console.log(userCur)

class Top extends React.Component {
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
      // console.log(user.uid)
      if(user) {
        this.setState({user: user.uid});
        this.getUserData(user.uid);
      } else {
        this.setState({user: null})
      }
    })
  }

  getUserData= (uid) => {
    // console.log(uid);
    firebase.firestore().collection('closet').where("author", "==", uid).orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
}

  componentDidMount() {
    this.authListener();
    // console.log(this.state.user)
  }

  onCollectionUpdate = (querySnapshot) => {
    // console.log('querySnapshot', querySnapshot)
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
    // {console.log(clothes);}

  }

  render() {

    const filtered = this.state.clothes.filter(clothes => clothes.category === "Top"); 

    return (

      <div className="clothes">
        <div className="clothes__addBtn">
          <button className="clothes__add" 	onClick={e => {
                  this.showModal();}}>Add Clothes
          </button>
          <button className="clothes__add-mobile" 	onClick={e => {
                  this.showModal();}}>
                  <img src={add} alt="add" className="clothes__icon" />
          </button>
        </div>

        <div className="clothes__grid"> 
          { 
            filtered.map(clothes => (
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

export default Top;