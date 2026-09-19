import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Activity, ShieldCheck } from 'lucide-react';
import { HeroVisual } from './HeroVisual';
import { isAuthenticated, getUserRole } from '../../utils/auth';

export const HeroSection = () => {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const userRole = getUserRole();

  const handleExplore = () => {
    if (loggedIn && userRole) {
      navigate(`/dashboard/${userRole}`);
    } else {
      navigate('/login');
    }
  };

  const handleScrollHow = (e) => {
    e.preventDefault();
    const target = document.getElementById('how-it-works');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="overview"
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '130px',
        paddingBottom: '80px',
        background: 'radial-gradient(ellipse at 50% 20%, rgba(9, 122, 254, 0.18) 0%, rgba(0, 22, 46, 1) 70%)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px', width: '100%', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center' }} className="hero-grid-responsive">
          
          {/* Left Hero Content */}
          <div>
            {/* Eyebrow */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '20px',
                background: 'rgba(9, 122, 254, 0.15)',
                border: '1px solid var(--sq-blue)',
                color: 'var(--sq-cyan)',
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '0.08em',
                marginBottom: '24px'
              }}
            >
              <Sparkles size={14} />
              <span>AI-POWERED EARTH OBSERVATION · SIH EDITION</span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: '58px',
                fontWeight: '800',
                color: 'var(--sq-white)',
                lineHeight: '1.08',
                letterSpacing: '-1.5px',
                marginBottom: '20px'
              }}
            >
              Understand Earth.<br />
              <span style={{ color: 'var(--sq-cyan)', background: 'linear-gradient(90deg, #38BDF8, #2F80ED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Just Ask.
              </span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: '18px',
                color: 'var(--sq-text-secondary)',
                lineHeight: '1.6',
                maxWidth: '560px',
                marginBottom: '36px'
              }}
            >
              Turn satellite imagery, spectral bands, and time-series data into actionable geospatial intelligence through natural-language AI queries.
            </p>

            {/* CTA Group */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '44px' }}>
              <button
                onClick={handleExplore}
                style={{
                  padding: '14px 28px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, var(--sq-blue), #0056b3)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'var(--sq-white)',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 30px rgba(9, 122, 254, 0.45)',
                  transition: 'all 200ms ease'
                }}
              >
                <span>Explore OrbitIQ →</span>
              </button>

              <a
                href="#how-it-works"
                onClick={handleScrollHow}
                style={{
                  padding: '14px 24px',
                  borderRadius: '10px',
                  background: 'rgba(0, 22, 46, 0.8)',
                  border: '1px solid var(--sq-border)',
                  color: 'var(--sq-white)',
                  fontSize: '15px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>See How It Works</span>
              </a>
            </div>

            {/* Hero Trust Badges */}
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', fontSize: '12px', color: 'var(--sq-text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Activity size={14} style={{ color: 'var(--sq-success)' }} />
                <span>Sentinel & Landsat Ready</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} style={{ color: 'var(--sq-cyan)' }} />
                <span>Multimodal VLM Grounding</span>
              </div>
            </div>
          </div>

          {/* Right Hero Graphic */}
          <div>
            <HeroVisual />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
