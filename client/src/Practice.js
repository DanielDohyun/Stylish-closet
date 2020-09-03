import React, {useState, useEffect} from 'react';
import './App.css';
import db from './firebase';
import firebase from 'firebase';

function Practice() {
  const [closet, setCloset] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // this code here fires when the app.js loads
    db.collection('closet').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setCloset(snapshot.docs.map(doc => ({
        id:doc.id,
        // console.log(doc.data())
        closet: doc.data().closet
      })
      
      ))
    })
  }, []);

  const addTodo = (event) => {
    event.preventDefault();

    db.collection('closet').add({
      closet: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput('');
  } 

  return (
    <>
      <h1>hello world</h1>
      <form>
        <input value={input} onChange={event => setInput(event.target.value)}></input>
        <button disabled={!input} onClick={addTodo}>Closet</button>
      </form>

      <ul>
        {closet.map(closet => (
          <>
            <li>{closet.closet}</li>
            <button onClick={e => 
              {db.collection('closet').doc(closet.id).delete()}}>
            </button>
          </>
        ))}
      </ul>

    </>
  )
}

export default Practice;