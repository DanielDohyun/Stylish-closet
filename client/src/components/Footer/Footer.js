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
            <div className="sns">
              <h1 className="sns__heading">Get In Touch</h1>
              <div className="sns__container">
                <img className="sns__icon" src={instagram} alt="insta" />
                
                <img className="sns__icon" src={facebook} alt="face" />
                <img className="sns__icon" src={twitter} alt="twit" />
              </div>
            </div>

            <div className="contact">
              <div className="contact__container">
                <h1 className="contact__heading">Support</h1>
                <p className="contact__name">
                  Daniel Kim </p>
                <p className="contact__location">1000 Style Street West
                  Toronto, Ontario M5V 1L7</p>
                <p className="contact__email"><a className="contact__mailto" href="mailto:kkdh1109@hotmail.com">kkdh1109@hotmail.com</a></p>
              </div>
            </div>
          </div>
            <p className="copyright">Copyright The Closet Organizer © 2020
              All Rights Reserved</p>
        </div>

      </>

    )
  }
}

export default Footer;
