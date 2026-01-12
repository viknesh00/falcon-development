import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth > 768) {
      setMenuOpen(false);
    }
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  return (
    <header className="header">
      <div className="header-container">

        {/* Logo */}
        <a href="/" className="logo">
          <img src="/assets/images/falcon-logo.jpg" alt="Logo" />
          <span className="logo-text">Falcon</span>
        </a>

        {/* Desktop Nav */}
        <nav className="nav">
          <a href="#how">How it Works</a>
          <a href="#features">Features</a>
          <a href="#compliance">Compliance</a>
        </nav>

        {/* Desktop Actions */}
        <div className="actions">
          <button className="btn-outline">Sign In</button>
          <button className="btn-primary">Sign Up</button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <a href="#how" onClick={() => setMenuOpen(false)}>How it Works</a>
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#compliance" onClick={() => setMenuOpen(false)}>Compliance</a>
          <button className="btn-outline">Sign In</button>
          <button className="btn-primary">Sign Up</button>
        </div>
      )}
    </header>
  );
};

export default Header;
