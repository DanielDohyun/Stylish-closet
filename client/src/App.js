// import React, {useState, useEffect} from 'react';
// import ReactDOM from 'react-dom';
// import './App.css';
// import UploadForm from './components/UploadForm/UploadForm';
// import ImageGrid from './components/ImageGrid/ImageGrid';
// import Upload from './components/Upload/Upload';
// // import 'bootstrap/dist/css/bootstrap.css';
// // import 'bootstrap/dist/css/bootstrap-theme.css';

// class App extends React.Component {

//   render () {
//     return (
//       <div className="App">
//         {/* <UploadForm /> */}
//         {/* <ImageGrid /> */}
//         <Upload />
       
//       </div>
//     )
//   }
// }

// export default App;

import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import db from './firebase';
import Firebase from 'firebase';
import firebase from './firebase';
import Practice from './Practice';
import Dropdown from './Dropdown';
import Upload from './components/Upload/Upload';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('closet');
    this.unsubscribe = null;
    this.state= {
      clothes: []
    };
  }
  
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
    {console.log(clothes);}

  }

  render () {
    // console.log(this.state.clothes);
    return (
      <div className="App">
        {/* <h1>hello</h1> */}
        {/* <Practice /> */}
        {/* <Dropdown /> */}
        {/* this.state.clothes.url && */}
        { 
          this.state.clothes.map(clothes => (
            <>
              <h1>{clothes.style}</h1>
              <h1>{clothes.color}</h1>
              <img src={clothes.url} />
            </>
          ))
        }
        <Upload />
       
      </div>
    )
  }
}

export default App;