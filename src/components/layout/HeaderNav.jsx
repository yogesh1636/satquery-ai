import React from 'react';
import { BrandLogo } from '../auth/BrandLogo';

export const HeaderNav = ({ title = 'Authentication Flow' }) => {
  return (
    <header className="header-nav">
      <BrandLogo size="md" />
      <div className="header-nav-right">
        <span>{title}</span>
        <span className="divider-pipe">|</span>
        <span style={{ color: 'var(--sq-cyan)', fontWeight: '500' }}>Understand Earth. Just Ask.</span>
      </div>
    </header>
  );
};
