import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './SideNav.scss';

class SideNav extends React.Component {

  render() {
  
    let sideClasses = 'side';
    if(this.props.show) {
      sideClasses = 'side open';
    }

    return (
      <div className={sideClasses} >

        <ul>
          <li>
             <a className="menu-item" href="/shoes">shoes</a>
          </li>
          <li>
             <a className="menu-item" href="/coats">coats</a>
          </li>
          <li>
            <a className="menu-item" href="/top">top</a>
          </li>
          <li>
            <a className="menu-item" href="/bottom">bottom</a>
          </li>
          <li>
              <a className="menu-item" href="/all">all</a>
          </li>
          <li>
             <a className="menu-item" href="/accessory">accessory</a>
          </li>

        </ul>

      </div>
    );
  }
};

export default SideNav;