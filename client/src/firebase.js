import firebase from "firebase";
// import * as firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore';

// const settings = {timestampInSnapshot: true};

// const firebaseApp = firebase.initializeApp({
//   apiKey: "AIzaSyDL9nalv3h9jZ6GVrJH3_nDaoXxHI4ho2I",
//   authDomain: "stylish-closet.firebaseapp.com",
//   databaseURL: "https://stylish-closet.firebaseio.com",
//   projectId: "stylish-closet",
//   storageBucket: "stylish-closet.appspot.com",
//   messagingSenderId: "148656574674",
//   appId: "1:148656574674:web:3bdd0e6feea9a78e21dd0b",
//   measurementId: "G-2L9BXGCRH9"
// });

// const db = firebaseApp.firestore();

// export default db;


const firebaseConfig = {
  apiKey: "AIzaSyDL9nalv3h9jZ6GVrJH3_nDaoXxHI4ho2I",
  authDomain: "stylish-closet.firebaseapp.com",
  databaseURL: "https://stylish-closet.firebaseio.com",
  projectId: "stylish-closet",
  storageBucket: "stylish-closet.appspot.com",
  messagingSenderId: "148656574674",
  appId: "1:148656574674:web:3bdd0e6feea9a78e21dd0b",
  measurementId: "G-2L9BXGCRH9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.firestone().settings(settings);
// firebase.analytics();

// initialize 2 services 
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

export { projectFirestore, projectStorage };
export default firebase;


