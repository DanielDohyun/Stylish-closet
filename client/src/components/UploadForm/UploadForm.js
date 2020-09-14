import React, {useState} from 'react';
import Progress from '../Progress/Progress';

const UploadForm = () => {
//file is null to begins with
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ['image/png', 'image/jpeg'];

  const changeHandler = e => {
    let selected = e.target.files[0];
    console.log(selected);

    // if user uploads a correct file type => shows file name, wrong file type => error msg
    if(selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('please select an image file (png or jpeg)');
    }
  }

  return (
    <form>
      <input type="file" onChange={changeHandler} />
      <div className="output">
        { error && <div className="error"> {error} </div> }
        { file && <div>{file.name}</div> }
        { file && <Progress file={file} setFile={setFile} /> }
      </div>
    </form>
  )
}

export default UploadForm;