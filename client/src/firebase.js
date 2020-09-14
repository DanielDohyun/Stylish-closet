import firebase from "firebase";
import 'firebase/storage'
import 'firebase/firestore';

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
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectStorage, timestamp };
export default firebase;


