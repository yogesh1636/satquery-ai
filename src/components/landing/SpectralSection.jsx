import React, { useState } from 'react';
import { Activity, Sun } from 'lucide-react';

export const SpectralSection = () => {
  const [selectedBand, setSelectedBand] = useState('NIR');

  const bands = [
    { key: 'RGB', label: 'True Color RGB', wavelength: '400 - 700 nm', usage: 'Human visual inspection & optical mapping.' },
    { key: 'NIR', label: 'Near-Infrared (NIR)', wavelength: '780 - 900 nm', usage: 'Chlorophyll absorption & vegetation canopy health.' },
    { key: 'SWIR', label: 'Short-Wave Infrared', wavelength: '1550 - 1750 nm', usage: 'Soil moisture, snow differentiation & rock classification.' },
    { key: 'Thermal', label: 'Thermal Infrared (TIR)', wavelength: '10.4 - 12.5 µm', usage: 'Land surface temperature & heat island mapping.' }
  ];

  const indices = [
    { name: 'NDVI', fullName: 'Normalized Difference Vegetation Index', formula: '(NIR - Red) / (NIR + Red)', val: '0.74 (Dense Canopy)' },
    { name: 'NDWI', fullName: 'Normalized Difference Water Index', formula: '(Green - NIR) / (Green + NIR)', val: '0.45 (Abundant Surface Water)' },
    { name: 'NDBI', fullName: 'Normalized Difference Built-up Index', formula: '(SWIR - NIR) / (SWIR + NIR)', val: '-0.18 (Non-Urban)' }
  ];

  return (
    <section
      style={{
        padding: '100px 32px',
        background: 'var(--sq-bg-deep)',
        borderBottom: '1px solid var(--sq-border)'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ color: 'var(--sq-cyan)', fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '12px' }}>
            SPECTRAL INTELLIGENCE
          </div>
          <h2 style={{ fontSize: '42px', fontWeight: '800', color: 'var(--sq-white)', marginBottom: '16px' }}>
            Beyond the Visible Spectrum.
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--sq-text-secondary)', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
            OrbitIQ synthesizes 13+ spectral bands across optical, near-infrared, and thermal sensors to evaluate Earth surface properties.
          </p>
        </div>

        {/* Bands & Indices Split */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="spectral-grid-responsive">
          {/* Left: Bands */}
          <div style={{ padding: '28px', borderRadius: '14px', background: 'rgba(6, 37, 69, 0.7)', border: '1px solid var(--sq-border)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--sq-white)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sun size={20} style={{ color: 'var(--sq-cyan)' }} />
              Spectral Band Analysis
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
              {bands.map(b => (
                <button
                  key={b.key}
                  onClick={() => setSelectedBand(b.key)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '600',
                    border: selectedBand === b.key ? '1px solid var(--sq-cyan)' : '1px solid var(--sq-border)',
                    background: selectedBand === b.key ? 'rgba(9, 122, 254, 0.25)' : 'rgba(0, 22, 46, 0.6)',
                    color: selectedBand === b.key ? 'var(--sq-white)' : 'var(--sq-text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  {b.key}
                </button>
              ))}
            </div>

            {bands.filter(b => b.key === selectedBand).map(b => (
              <div key={b.key} style={{ padding: '16px', borderRadius: '8px', background: 'rgba(0, 22, 46, 0.8)', border: '1px solid var(--sq-blue)' }}>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--sq-white)', marginBottom: '4px' }}>{b.label}</div>
                <div style={{ fontSize: '11px', color: 'var(--sq-cyan)', marginBottom: '8px' }}>Wavelength: {b.wavelength}</div>
                <div style={{ fontSize: '12px', color: 'var(--sq-text-secondary)', lineHeight: '1.5' }}>{b.usage}</div>
              </div>
            ))}
          </div>

          {/* Right: Calculated Indices */}
          <div style={{ padding: '28px', borderRadius: '14px', background: 'rgba(6, 37, 69, 0.7)', border: '1px solid var(--sq-border)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--sq-white)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={20} style={{ color: 'var(--sq-success)' }} />
              Live Index Calculation Engine
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {indices.map(idx => (
                <div key={idx.name} style={{ padding: '14px', borderRadius: '8px', background: 'rgba(0, 22, 46, 0.8)', border: '1px solid rgba(27, 91, 149, 0.4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--sq-white)' }}>{idx.name} ({idx.fullName})</span>
                    <span style={{ fontSize: '11px', color: 'var(--sq-success)', fontWeight: '700' }}>{idx.val}</span>
                  </div>
                  <code style={{ fontSize: '11px', color: 'var(--sq-cyan)', background: 'rgba(9, 122, 254, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                    Formula: {idx.formula}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpectralSection;
