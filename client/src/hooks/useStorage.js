import { useState, useEffect } from 'react';
import { projectStorage } from '../firebase';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  // 2nd argument= dependency which is file in this case function inside useEffect will fire every time file changes 
  useEffect(() => {

    //ref to where the file should be saved
    const storageRef = projectStorage.ref(file.name);

    //take the file and put it in the ref 
    storageRef.put(file).on('state_changed', (snap) => {
      //% of upload 
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100; 
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, async () => {
      //this will fire when upload is fully complete
      const url = await storageRef.getDownloadURL;
      setUrl(url);
    })
  }, [file]);

  return {progress, url, error}
}

export default useStorage;