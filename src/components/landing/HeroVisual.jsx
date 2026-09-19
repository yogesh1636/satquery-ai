import React from 'react';
import { EARTH_BG_URL } from '../../config/assets';

export const HeroVisual = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '720px',
        height: '520px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none'
      }}
    >
      {/* Outer Atmospheric Orbital Rings */}
      <div
        style={{
          position: 'absolute',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          border: '1px dashed rgba(60, 146, 197, 0.35)',
          animation: 'spin 40s linear infinite'
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: '560px',
          height: '560px',
          borderRadius: '50%',
          border: '1px stroke rgba(9, 122, 254, 0.2)',
          transform: 'rotate(-45deg)',
          boxShadow: '0 0 40px rgba(9, 122, 254, 0.15)'
        }}
      />

      {/* Main Earth Container with Glowing Atmosphere */}
      <div
        style={{
          position: 'relative',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: '0 0 80px rgba(9, 122, 254, 0.5), inset -20px -20px 50px rgba(0, 0, 0, 0.9), inset 10px 10px 30px rgba(60, 146, 197, 0.6)',
          border: '1px solid rgba(60, 146, 197, 0.5)'
        }}
      >
        <img
          src={EARTH_BG_URL}
          alt="OrbitIQ Remote Sensing Earth"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'contrast(1.1) brightness(0.9)',
            animation: 'panEarth 60s linear infinite'
          }}
        />

        {/* Radar Sweep Arc */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'conic-gradient(from 0deg at 50% 50%, rgba(9, 122, 254, 0.3) 0deg, transparent 60deg, transparent 360deg)',
            borderRadius: '50%',
            animation: 'spin 8s linear infinite'
          }}
        />
      </div>

      {/* Telemetry Target Badges on Earth */}
      <div
        style={{
          position: 'absolute',
          top: '22%',
          right: '15%',
          background: 'rgba(0, 22, 46, 0.85)',
          border: '1px solid var(--sq-cyan)',
          padding: '6px 12px',
          borderRadius: '20px',
          backdropFilter: 'blur(8px)',
          fontSize: '11px',
          color: 'var(--sq-white)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 4px 14px rgba(0,0,0,0.5)'
        }}
      >
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--sq-cyan)' }} />
        <span>Sentinel-2 L2A · 10m / px</span>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '25%',
          left: '10%',
          background: 'rgba(0, 22, 46, 0.85)',
          border: '1px solid var(--sq-success-dark)',
          padding: '6px 12px',
          borderRadius: '20px',
          backdropFilter: 'blur(8px)',
          fontSize: '11px',
          color: 'var(--sq-white)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 4px 14px rgba(0,0,0,0.5)'
        }}
      >
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--sq-success)' }} />
        <span>NDVI Vegetation Mask: Active</span>
      </div>
    </div>
  );
};

export default HeroVisual;
