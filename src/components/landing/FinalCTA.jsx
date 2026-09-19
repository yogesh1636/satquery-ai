import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { EARTH_BG_URL } from '../../config/assets';
import { isAuthenticated, getUserRole } from '../../utils/auth';

export const FinalCTA = () => {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const userRole = getUserRole();

  const handleLaunch = () => {
    if (loggedIn && userRole) {
      navigate(`/dashboard/${userRole}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        padding: '120px 32px',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(9, 122, 254, 0.25) 0%, rgba(0, 22, 46, 1) 80%)',
        overflow: 'hidden',
        textAlign: 'center'
      }}
    >
      {/* Background Earth Overlay */}
      <img
        src={EARTH_BG_URL}
        alt="Earth Backdrop"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.15,
          filter: 'blur(4px)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--sq-cyan)', fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '16px' }}>
          <Sparkles size={16} /> START EXPLORING EARTH INTELLIGENCE
        </div>

        <h2 style={{ fontSize: '52px', fontWeight: '900', color: 'var(--sq-white)', marginBottom: '16px', lineHeight: '1.1' }}>
          The Earth Is Speaking.<br />
          <span style={{ color: 'var(--sq-cyan)', background: 'linear-gradient(90deg, #38BDF8, #2F80ED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Just Ask.
          </span>
        </h2>

        <p style={{ fontSize: '18px', color: 'var(--sq-text-secondary)', marginBottom: '36px', lineHeight: '1.6' }}>
          Explore satellite imagery, spectral band analytics, and bi-temporal change detection through natural language.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handleLaunch}
            style={{
              padding: '16px 32px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--sq-blue), #0056b3)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'var(--sq-white)',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 10px 35px rgba(9, 122, 254, 0.5)',
              transition: 'all 200ms ease'
            }}
          >
            <span>Launch OrbitIQ Platform →</span>
          </button>

          <a
            href="#technology"
            style={{
              padding: '16px 28px',
              borderRadius: '12px',
              background: 'rgba(0, 22, 46, 0.8)',
              border: '1px solid var(--sq-border)',
              color: 'var(--sq-white)',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>Explore Technology</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
