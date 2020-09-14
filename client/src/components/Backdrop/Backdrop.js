import React from 'react';
import './Backdrop.scss';

class Backdrop extends React.Component {
  render() {
    return (
      <div className="backDrop" onClick={this.props.close} >

      </div>  
    );
  }
};

export default Backdrop;