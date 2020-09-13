import React from 'react';
import './Toggle.scss';

class Toggle extends React.Component {
  render () {
    return (
      <button className="toggle-btn">
        <div classNam="toggle-line"></div>
        <div classNam="toggle-line"></div>
        <div classNam="toggle-line"></div>
      </button>
    )
  }
}

export default Toggle;