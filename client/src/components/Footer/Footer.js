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
          <div className="footer__inner">
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
                <h1 className="contact__heading">Support</h1>
                <p class="contact__name">
                  Stylish Closet Management</p>
                <p class="contact__location">1000 Style Street West
                  Toronto, Ontario M5V 1L7</p>
                <p class="contact__email"><a className="contact__mailto" href="mailto:info@stylishcloset.com">info@stylishcloset.com</a></p>
              </div>
            </div>
          </div>
            <p class="copyright">Copyright The Stylish Closet © 2020
              All Rights Reserved</p>
        </div>

      </>

    )
  }
}

export default Footer;
