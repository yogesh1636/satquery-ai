import React from 'react';
import { BrandLogo } from '../auth/BrandLogo';

export const LandingFooter = () => {
  return (
    <footer
      style={{
        padding: '60px 32px 32px 32px',
        background: '#001021',
        borderTop: '1px solid var(--sq-border)',
        color: 'var(--sq-text-secondary)',
        fontSize: '13px'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '32px' }} className="footer-grid-responsive">
        <div>
          <BrandLogo size="md" interactive={true} linkTo="/" />
          <p style={{ fontSize: '13px', color: 'var(--sq-text-secondary)', marginTop: '16px', lineHeight: '1.6', maxWidth: '320px' }}>
            Vision-Language Assistant for Multimodal Remote-Sensing Imagery & Geospatial Intelligence.
          </p>
        </div>

        <div>
          <div style={{ fontWeight: '700', color: 'var(--sq-white)', marginBottom: '14px', fontSize: '14px' }}>Product</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a href="#overview" style={{ color: 'var(--sq-text-secondary)', textDecoration: 'none' }}>Overview</a>
            <a href="#capabilities" style={{ color: 'var(--sq-text-secondary)', textDecoration: 'none' }}>Capabilities</a>
            <a href="#how-it-works" style={{ color: 'var(--sq-text-secondary)', textDecoration: 'none' }}>How It Works</a>
            <a href="#applications" style={{ color: 'var(--sq-text-secondary)', textDecoration: 'none' }}>Applications</a>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: '700', color: 'var(--sq-white)', marginBottom: '14px', fontSize: '14px' }}>Workspaces</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a href="#/register/researcher" style={{ color: 'var(--sq-text-secondary)', textDecoration: 'none' }}>Researcher</a>
            <a href="#/register/student" style={{ color: 'var(--sq-text-secondary)', textDecoration: 'none' }}>Student Explorer</a>
            <a href="#/register/gis-analyst" style={{ color: 'var(--sq-text-secondary)', textDecoration: 'none' }}>GIS Analyst</a>
            <a href="#/register/organization" style={{ color: 'var(--sq-text-secondary)', textDecoration: 'none' }}>Organization</a>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: '700', color: 'var(--sq-white)', marginBottom: '14px', fontSize: '14px' }}>Hackathon & Repo</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a href="https://github.com/yogesh1636/satquery-ai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sq-cyan)', textDecoration: 'none' }}>GitHub Repository ↗</a>
            <span style={{ color: 'var(--sq-text-muted)' }}>SIH26167 / SIH6167</span>
            <span style={{ color: 'var(--sq-text-muted)' }}>Smart India Hackathon</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '40px auto 0 auto', paddingTop: '24px', borderTop: '1px solid rgba(27, 91, 149, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: 'var(--sq-text-muted)' }}>
        <div>© 2026 OrbitIQ. All rights reserved.</div>
        <div>AI for a Smarter, Safer, More Sustainable Planet.</div>
      </div>
    </footer>
  );
};

export default LandingFooter;
