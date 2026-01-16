import React, { useState, useEffect } from 'react';
import { FiShield, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import './AuthLayout.css';
import './GeneralAuth.css';
import Logo from '../../assets/falcon-logo.jpg';

const AuthLayout = ({ children, title, subtitle }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      tagline: 'COMMERCIAL BANKING',
      icon: <FiTrendingUp />,
      title: 'Elevate Your Growth',
      desc: 'Unlock premium commercial banking tools designed for institutional-grade financial management.',
    },
    {
      tagline: 'ETHICAL FINANCE',
      icon: <FiShield />,
      title: 'Integrity in Every Asset',
      desc: 'Experience banking that prioritizes community and ethical standards without compromising on performance.',
    },
    {
      tagline: 'TRANSFORMATIVE INSIGHTS',
      icon: <FiCheckCircle />,
      title: 'Intelligence First',
      desc: 'Leverage advanced analytics and deep financial insights to stay ahead in the evolving market.',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="auth-layout-modern">
      <div className="auth-split-container">
        {/* Left Panel - Visual & Info */}
        <div className="auth-left-panel">
          <div className="auth-brand-overlay">
            <img src={Logo} alt="Falcon" />
            <span>Falcon</span>
          </div>

          <div className="auth-carousel">
            <div className="carousel-content" style={{ height: '320px' }}>
              <div
                className="carousel-slide-inner"
                style={{
                  transform: `translateY(-${activeSlide * 100}%)`,
                  transition: 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
                }}
              >
                {slides.map((slide, index) => (
                  <div className="slide-item" key={index}>
                    <div
                      style={{
                        fontSize: '12px',
                        fontWeight: 800,
                        letterSpacing: '0.15em',
                        opacity: 0.6,
                        marginBottom: '24px',
                      }}
                    >
                      {slide.tagline}
                    </div>
                    <div className="slide-icon" style={{ marginBottom: '24px', opacity: 0.9 }}>
                      {slide.icon}
                    </div>
                    <h2 style={{ fontSize: '44px', marginBottom: '20px' }}>{slide.title}</h2>
                    <p style={{ fontSize: '20px', lineHeight: 1.5, opacity: 0.7 }}>{slide.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="carousel-dots" style={{ marginTop: '60px' }}>
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`dot ${activeSlide === index ? 'active' : ''}`}
                  onClick={() => setActiveSlide(index)}
                  style={{
                    background: activeSlide === index ? 'var(--white)' : 'rgba(255, 255, 255, 0.3)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="auth-right-panel">
          <div className="auth-form-wrapper">
            <div className="auth-brand-mobile">
              <img src="/assets/images/falcon-logo.jpg" alt="Falcon" />
              <span>Falcon</span>
            </div>

            {(title || subtitle) && (
              <div className="auth-header" style={{ marginBottom: '32px' }}>
                {title && (
                  <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>
                    {title}
                  </h1>
                )}
                {subtitle && <p style={{ color: 'var(--gray)', fontSize: '16px' }}>{subtitle}</p>}
              </div>
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
