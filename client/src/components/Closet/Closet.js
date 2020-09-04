import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import db from '../../firebase';
import Firebase from 'firebase';
import firebase from '../../firebase';
import Upload from '../Upload/Upload';
import ShowClothing from '../ShowClothing/ShowClothing';
import { Link } from "react-router-dom";

class Closet extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('closet');
    this.unsubscribe = null;
    this.state= {
      clothes: [],
      show: false,
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
  
  componentDidMount () {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);

  }

  onCollectionUpdate = (querySnapshot) => {
    console.log('querySnapshot', querySnapshot)
    const clothes = [];
    querySnapshot.forEach((doc) => {
      console.log('doc data', doc.data())
      const {style, color, url} = doc.data();
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

  render () {
    // console.log(this.state.clothes);
    return (
      <div className="App">
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
    )
  }
}

export default Closet;