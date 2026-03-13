import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Header.css';
import { FiMenu, FiX } from 'react-icons/fi';

/**
 * Header Component
 * ----------------
 * A responsive application header with:
 * - Scroll-based styling
 * - Mobile hamburger navigation
 * - Section-based smooth scrolling
 * - Optional external scroll state control
 *
 * @param {Object} props
 * @param {boolean} [props.scrolled] - Forces the header into scrolled state (overrides auto scroll)
 * @param {boolean} [props.actionButtonDisable=false] - Hides Sign in / Register buttons
 */
const Header = ({ scrolled: forceScrolled, actionButtonDisable = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(forceScrolled || false);

  const navigate = useNavigate();
  useEffect(() => {
    if (forceScrolled !== undefined && forceScrolled !== null) {
      setScrolled(forceScrolled);
      return;
    }

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
  }, [forceScrolled]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="header-inner">
        {/* Logo */}
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }} className="logo">
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
        {actionButtonDisable ? (
          <></>
        ) : (
          <>
            {/* Actions */}
            <div className={`actions ${menuOpen ? 'open' : ''}`}>
              <button onClick={() => navigate('/login')} className="btn-outline">
                Sign in
              </button>
              <button onClick={() => navigate('/signup')} className="btn-solid">
                Register
              </button>
            </div>
          </>
        )}
        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX size={24} color="white" /> : <FiMenu size={24} color="white" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
