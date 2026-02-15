import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaGooglePlay,
  FaApple,
} from 'react-icons/fa';
import './styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <div className="brand">
            <img src="/assets/images/falcon-logo.jpg" alt="Falcon" />
            <span>Falcon</span>
          </div>

          <div className="socials">
            <a href="/" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="/" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="/" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="/" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="footer-links">
          <div>
            <h4>Home</h4>
            <Link to="/">About</Link>
            <Link to="/">How it works</Link>
            <Link to="/">Features</Link>
            <Link to="/">Pricing</Link>
            <Link to="/">Testimonials</Link>
            <Link to="/">FAQ’s</Link>
          </div>

          <div>
            <h4>Wallet</h4>
            <Link to="/">Financing</Link>
            <Link to="/">Credit monitor</Link>
            <Link to="/">Payments</Link>
          </div>

          <div>
            <h4>Legal & Compliance & Support</h4>
            <Link to="/">Shariah compliance</Link>
            <Link to="/">Privacy policy</Link>
            <Link to="/">Terms of service</Link>
            <Link to="/">Complaints process</Link>
            <Link to="/">Contact Us</Link>
            <Link to="/">Help centre</Link>
          </div>
        </div>

        {/* App download */}
        <div className="footer-app">
          <h4>Download our App</h4>

          <button className="store-btn">
            <FaGooglePlay className="store-icon" />
            <div className="store-text">
              <small>Get it on</small>
              <strong>Google Play</strong>
            </div>
          </button>

          <button className="store-btn">
            <FaApple className="store-icon" />
            <div className="store-text">
              <small>Download on the</small>
              <strong>App Store</strong>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>
          © Falcon. All rights reserved.
          <br />
          Shariah-compliant financial services. No interest charged. Terms apply.
        </p>

        <Link to="/">Terms of Services</Link>
      </div>
    </footer>
  );
};

export default Footer;
