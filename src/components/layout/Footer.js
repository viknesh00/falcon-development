import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook, FaGooglePlay, FaApple } from "react-icons/fa";
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
            <a href="#" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>

        </div>

        {/* Links */}
        <div className="footer-links">
          <div>
            <h4>Home</h4>
            <a>About</a>
            <a>How it works</a>
            <a>Features</a>
            <a>Pricing</a>
            <a>Testimonials</a>
            <a>FAQ’s</a>
          </div>

          <div>
            <h4>Wallet</h4>
            <a>Financing</a>
            <a>Credit monitor</a>
            <a>Payments</a>
          </div>

          <div>
            <h4>Legal & Compliance & Support</h4>
            <a>Shariah compliance</a>
            <a>Privacy policy</a>
            <a>Terms of service</a>
            <a>Complaints process</a>
            <a>Contact Us</a>
            <a>Help centre</a>
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
          © Falcon. All rights reserved.<br />
          Shariah-compliant financial services. No interest charged. Terms apply.
        </p>

        <a>Terms of Services</a>
      </div>
    </footer>
  );
};

export default Footer;
