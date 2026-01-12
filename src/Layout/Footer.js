import React from "react";


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-left">
          <h3>Falcon</h3>
          <p>Ethical borrowing for the modern world.</p>
        </div>
        <div className="footer-right">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {currentYear} Falcon Finance. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
