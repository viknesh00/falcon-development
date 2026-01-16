import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">

        {/* Logo */}
        <div className="logo">
          <img src="/assets/images/falcon-logo.jpg" alt="Falcon logo" />
          <span>Falcon</span>
        </div>

        {/* Navigation */}
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#how">How it Works?</a>
          <a href="#features">Features</a>
          <a href="#compliance">Compliance</a>
        </nav>

        {/* Actions (IMPORTANT: open class added) */}
        <div className={`actions ${menuOpen ? "open" : ""}`}>
          <button className="btn-outline">Sign in</button>
          <button className="btn-solid">Register</button>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

      </div>
    </header>
  );
};

export default Header;
