import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

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
          <button onClick={() => scrollToSection("about")}>About</button>
          <button onClick={() => scrollToSection("services")}>Services</button>
          <button onClick={() => scrollToSection("how")}>How it Works?</button>
          <button onClick={() => scrollToSection("features")}>Features</button>
          <button onClick={() => scrollToSection("compliance")}>Compliance</button>
        </nav>

        {/* Actions */}
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
