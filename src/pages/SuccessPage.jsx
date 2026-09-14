import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderNav } from '../components/layout/HeaderNav';
import { FooterStrip } from '../components/layout/FooterStrip';
import { PrimaryButton } from '../components/auth/PrimaryButton';
import { AuthCard } from '../components/auth/AuthCard';
import { Globe, ShieldCheck, Sparkles } from 'lucide-react';

export const SuccessPage = () => {
  const navigate = useNavigate();

  const handleGoToRoleOrDashboard = () => {
    localStorage.setItem('satquery_is_authenticated', 'true');
    const role = localStorage.getItem('satquery_user_role') || localStorage.getItem('satquery_role');
    if (role) {
      navigate(`/dashboard/${role}`);
    } else {
      navigate('/onboarding/role');
    }
  };

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      {/* Background imagery */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <img
          src="/assets/earth_remote_sensing_bg.jpg"
          alt="SatQuery Earth"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(0, 22, 46, 0.4), #00162E)'
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <HeaderNav title="Account Ready" />

        <main className="main-content">
          <div className="success-card-wrapper">
            <AuthCard>
              {/* CSS Animated SVG Success Check */}
              <div className="success-icon-container">
                <svg className="success-icon-svg" viewBox="0 0 52 52">
                  <circle cx="26" cy="26" r="23" fill="none" stroke="var(--sq-success)" strokeWidth="3" />
                  <path
                    fill="none"
                    stroke="var(--sq-success)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 27l7 7 16-16"
                  />
                </svg>
              </div>

              <h1 className="hero-heading" style={{ fontSize: '32px', marginBottom: '8px' }}>
                Account Created!
              </h1>
              <h2 className="subtitle" style={{ fontSize: '16px', color: 'var(--sq-white)', fontWeight: '600', marginBottom: '12px' }}>
                Welcome to SatQuery AI.
              </h2>
              <p className="subtitle" style={{ marginBottom: '28px', maxWidth: '380px', margin: '0 auto 28px auto' }}>
                Your workspace is ready. Start analyzing satellite imagery with AI-powered insights.
              </p>

              <PrimaryButton onClick={handleGoToRoleOrDashboard}>
                Go to Dashboard
              </PrimaryButton>

              {/* Bottom indicators */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '16px',
                  marginTop: '32px',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(27, 91, 149, 0.4)',
                  fontSize: '12px',
                  color: 'var(--sq-text-secondary)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Globe size={14} style={{ color: 'var(--sq-cyan)' }} />
                  <span>Real Data</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} style={{ color: 'var(--sq-cyan)' }} />
                  <span>Real Insights</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={14} style={{ color: 'var(--sq-cyan)' }} />
                  <span>A Better Tomorrow</span>
                </div>
              </div>
            </AuthCard>
          </div>
        </main>

        <FooterStrip />
      </div>
    </div>
  );
};
