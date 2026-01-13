import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="section-inner">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <Link to="/" className="logo">
              <img src="/assets/images/falcon-logo.jpg" alt="Logo" />
              <span className="logo-text">Falcon</span>
            </Link>
            <p className="footer-desc">
              Money that aligns with your values. Ethical returns,
              Sharia-compliant, and fair for everyone.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Links: Company */}
          <div className="footer-col">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><a href="#how">How it Works</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#compliance">Compliance</a></li>
              <li><Link to="/signup">Get Started</Link></li>
            </ul>
          </div>

          {/* Links: Legal */}
          <div className="footer-col">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service">Terms of Service</Link></li>
              <li><Link to="/cookie-policy">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4>Contact</h4>
            <ul className="footer-links contact-links">
              <li>Email: support@falcon.finance</li>
              <li>Phone: +44 20 1234 5678</li>
              <li>Address: London, United Kingdom</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>
            © {currentYear} Falcon Finance. All rights reserved. A Sharia-compliant financial service.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
