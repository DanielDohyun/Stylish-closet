import React from 'react';
import useStorage from '../../hooks/useStorage';

const ProgressBar = ({ file, setFile }) => {
  const { url, Progress } = useStorage(file);
  console.log(Progress, url)
  return (
    <div className="progress-bar">progress</div>
  )
}

export default ProgressBar;