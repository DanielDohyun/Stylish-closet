import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import UploadForm from './components/UploadForm/UploadForm';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

class App extends React.Component {

  render () {
    return (
      <div className="App">
        <UploadForm />
       
      </div>
    )
  }
}

export default App;