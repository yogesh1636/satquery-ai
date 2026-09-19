import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { BrandLogo } from '../auth/BrandLogo';
import { isAuthenticated, getUserRole } from '../../utils/auth';

export const LandingNav = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const loggedIn = isAuthenticated();
  const userRole = getUserRole();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLaunchApp = () => {
    if (loggedIn && userRole) {
      navigate(`/dashboard/${userRole}`);
    } else {
      navigate('/login');
    }
  };

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Applications', href: '#applications' },
    { label: 'Technology', href: '#technology' }
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '12px 24px' : '20px 32px',
        background: scrolled ? 'rgba(0, 22, 46, 0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--sq-border)' : '1px solid transparent',
        transition: 'all 300ms ease'
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <BrandLogo size="md" interactive={true} linkTo="/" />

        {/* Desktop Nav Links */}
        <nav style={{ display: 'flex', gap: '28px', alignItems: 'center' }} className="landing-desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: 'var(--sq-text-secondary)',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: '500',
                transition: 'color 180ms ease'
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--sq-white)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--sq-text-secondary)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA Buttons */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }} className="landing-desktop-nav">
          <Link
            to="/login"
            style={{
              padding: '8px 16px',
              color: 'var(--sq-white)',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '600'
            }}
          >
            Sign In
          </Link>

          <button
            onClick={handleLaunchApp}
            style={{
              padding: '9px 18px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--sq-blue), #0056b3)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'var(--sq-white)',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 16px rgba(9, 122, 254, 0.35)',
              transition: 'all 200ms ease'
            }}
          >
            <span>{loggedIn ? 'Open Workspace' : 'Explore Platform'}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation"
          className="landing-mobile-btn"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--sq-white)',
            cursor: 'pointer'
          }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(0, 22, 46, 0.98)',
            borderBottom: '1px solid var(--sq-border)',
            padding: '20px 24px',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: 'var(--sq-white)',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: '500'
              }}
            >
              {link.label}
            </a>
          ))}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              style={{
                padding: '10px',
                textAlign: 'center',
                color: 'var(--sq-white)',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600',
                border: '1px solid var(--sq-border)',
                borderRadius: '8px'
              }}
            >
              Sign In
            </Link>

            <button
              onClick={() => {
                setMobileOpen(false);
                handleLaunchApp();
              }}
              style={{
                padding: '12px',
                borderRadius: '8px',
                background: 'var(--sq-blue)',
                border: 'none',
                color: 'var(--sq-white)',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Explore OrbitIQ Platform
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingNav;
