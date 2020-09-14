import React from 'react';
import './Toggle.scss';

class Toggle extends React.Component {
  render () {
    return (
      <button className="toggle-btn" onClick={this.props.click} >
        <div className="toggle-line"></div>
        <div className="toggle-line"></div>
        <div className="toggle-line"></div>
      </button>
    )
  }
}

export default Toggle;