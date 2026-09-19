import React from 'react';
import { Globe } from 'lucide-react';

export const FooterStrip = () => {
  return (
    <footer className="footer-strip">
      <div className="footer-content">
        <div className="footer-left">
          <Globe size={14} style={{ color: 'var(--sq-cyan)' }} />
          <span style={{ fontWeight: '600', color: 'var(--sq-white)' }}>OrbitIQ</span>
          <span style={{ color: 'var(--sq-blue-mid)' }}>|</span>
          <span style={{ color: 'var(--sq-text-secondary)' }}>Understand Earth. Just Ask.</span>
        </div>
        <div className="footer-right">
          <span>AI for a Smarter, Safer, More Sustainable Planet.</span>
        </div>
      </div>
    </footer>
  );
};
