import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      // Check scroll position from multiple sources
      const scrollContainer = document.querySelector('.scroll-container');
      const body = document.body;
      const html = document.documentElement;

      let scrollPosition = 0;

      if (scrollContainer && scrollContainer.scrollTop > 0) {
        scrollPosition = scrollContainer.scrollTop;
      } else if (window.scrollY > 0) {
        scrollPosition = window.scrollY;
      } else if (window.pageYOffset > 0) {
        scrollPosition = window.pageYOffset;
      } else if (body.scrollTop > 0) {
        scrollPosition = body.scrollTop;
      } else if (html.scrollTop > 0) {
        scrollPosition = html.scrollTop;
      }

      setScrolled(scrollPosition > 50);
    };

    // Add listeners to all possible scroll sources
    const scrollContainer = document.querySelector('.scroll-container');

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('scroll', handleScroll);

    // Check initial state
    handleScroll();

    // Cleanup
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="header-inner">
        {/* Logo */}
        <div className="logo">
          <img src="/assets/images/falcon-logo.jpg" alt="Falcon logo" />
          <span>Falcon</span>
        </div>

        {/* Navigation */}
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <button onClick={() => scrollToSection('about')}>About</button>
          <button onClick={() => scrollToSection('services')}>Services</button>
          <button onClick={() => scrollToSection('how')}>How it Works?</button>
          <button onClick={() => scrollToSection('features')}>Features</button>
          <button onClick={() => scrollToSection('compliance')}>Compliance</button>
        </nav>

        {/* Actions */}
        <div className={`actions ${menuOpen ? 'open' : ''}`}>
          <button onClick={() => navigate('/login')} className="btn-outline">
            Sign in
          </button>
          <button onClick={() => navigate('/signup')} className="btn-solid">
            Register
          </button>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
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
