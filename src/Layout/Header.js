import React from "react";


const Header = () => {



  return (
    <header className="header">
      <div className="header-container">
        
        {/* Left - Logo */}
        <div className="logo">
          {/* Use image OR text */}
          <img src="/assets/images/falcon-logo.jpg" alt="Logo"/>
          <span className="logo-text">Falcon</span>
        </div>

        {/* Center - Navigation */}
        <nav className="nav">
          <a href="#how">How it Works</a>
          <a href="#features">Features</a>
          <a href="#compliance">Compliance</a>
        </nav>

        {/* Right - Actions */}
        <div className="actions">
          <button className="btn-outline">Sign In</button>
          <button className="btn-primary">Sign Up</button>
        </div>

      </div>
    </header>
  );
};

export default Header;
