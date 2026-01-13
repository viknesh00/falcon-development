import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiLogIn, FiUserPlus } from "react-icons/fi";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

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

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        
        {/* Left - Logo */}
        <Link to="/" className="logo">
          {/* Use image OR text */}
          <img src="/assets/images/falcon-logo.jpg" alt="Logo"/>
          <span className="logo-text">Falcon</span>
        </Link>

        {/* Center - Navigation */}
        <nav className="nav">
          <a href="#how">How it Works</a>
          <a href="#features">Features</a>
          <a href="#compliance">Compliance</a>
        </nav>

        {/* Right - Actions */}
        <div className="actions">
          <Link to="/login" className="btn-outline">
            <FiLogIn />
            Sign In
          </Link>
          <Link to="/signup" className="btn-primary">
            <FiUserPlus />
            Sign Up
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;
