import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector(".scroll-container");

    const handleScroll = () => {
      if (scrollContainer && scrollContainer.scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}>
      <div className="header-container">

        {/* Left - Logo */}
        <Link to="/" className="logo">
          <img src="/assets/images/falcon-logo.jpg" alt="Logo" />
          <span className="logo-text">Falcon</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="nav">
          <a href="#how">How it Works</a>
          <a href="#features">Features</a>
          <a href="#compliance">Compliance</a>
        </nav>

        {/* Desktop Actions */}
        <div className="actions desktop-only">
          <Link to="/login" className="btn-outline">
            <FiLogIn />
            Sign In
          </Link>
          <Link to="/signup" className="btn-primary">
            <FiUserPlus />
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <nav className="mobile-nav">
          <a href="#how" onClick={() => setMenuOpen(false)}>How it Works</a>
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#compliance" onClick={() => setMenuOpen(false)}>Compliance</a>
        </nav>
        <div className="mobile-actions">
          <Link to="/login" className="btn-outline" onClick={() => setMenuOpen(false)}>
            <FiLogIn />
            Sign In
          </Link>
          <Link to="/signup" className="btn-primary" onClick={() => setMenuOpen(false)}>
            <FiUserPlus />
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
