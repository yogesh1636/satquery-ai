import React from 'react';
import { Globe, Orbit } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BrandLogo = ({ size = 'md', interactive = true }) => {
  const isLarge = size === 'lg';

  const logoContent = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: interactive ? 'pointer' : 'default' }}>
      <div
        style={{
          width: isLarge ? '44px' : '36px',
          height: isLarge ? '44px' : '36px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, rgba(9, 122, 254, 0.25), rgba(60, 146, 197, 0.15))',
          border: '1px solid var(--sq-cyan)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--sq-cyan)',
          boxShadow: '0 0 16px rgba(60, 146, 197, 0.3)',
          position: 'relative'
        }}
      >
        <Globe size={isLarge ? 24 : 20} />
        <Orbit 
          size={isLarge ? 30 : 24} 
          style={{ position: 'absolute', color: 'var(--sq-blue)', opacity: 0.8 }} 
        />
      </div>
      <div>
        <div style={{ 
          fontSize: isLarge ? '22px' : '18px', 
          fontWeight: '800', 
          color: 'var(--sq-white)',
          letterSpacing: '-0.3px',
          lineHeight: '1.1'
        }}>
          SatQuery <span style={{ color: 'var(--sq-cyan)' }}>AI</span>
        </div>
        <div style={{ 
          fontSize: isLarge ? '11px' : '9px', 
          fontWeight: '500', 
          color: 'var(--sq-cyan)',
          letterSpacing: '0.8px',
          textTransform: 'uppercase'
        }}>
          Ask. Analyze. Explore.
        </div>
      </div>
    </div>
  );

  if (interactive) {
    return (
      <Link to="/login" style={{ textDecoration: 'none' }}>
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};
