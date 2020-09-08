import React, { Component } from 'react'
import facebook from '../../assets/png/facebook.png';
import instagram from '../../assets/png/instagram.png';
import twitter from '../../assets/png/twitter.png';
import './Footer.scss';

class Footer extends Component {

  render() {

    return (

      <>
        <div className="footer">
          <div class="sns">
            <h1 class="sns__heading">Get In Touch</h1>
            <div class="sns__container">
              <img class="sns__icon" src={instagram} />
              
              <img class="sns__icon" src={facebook} />
              <img class="sns__icon" src={twitter} />
            </div>
          </div>

          <div class="contact">
            <div class="contact__container">
              <p class="contact__name">Richard Rovner
                The Bees Knees Management</p>
              <p class="contact__location">460 King Street West
                Toronto, Ontario M5V 1L7</p>
              <p class="contact__email"><a href="mailto:info@thebeesknees.com">info@thebeesknees.com</a></p>
            </div>
          </div>
            <p class="copyright">Copyright The Bees Knees © 2018
              All Rights Reserved</p>
        </div>

      </>

    )
  }
}

export default Footer;
