import React, { useState } from 'react';
import { Calculator, Sparkles, Activity } from 'lucide-react';

export const SpectralIndexCalculator = () => {
  const [selectedIndex, setSelectedIndex] = useState('NDVI');
  const [nir, setNir] = useState(0.85);
  const [red, setRed] = useState(0.14);
  const [green, setGreen] = useState(0.25);
  const [swir, setSwir] = useState(0.32);

  let calculatedValue = 0;
  let formulaStr = '';
  let interpretation = '';
  let statusColor = 'var(--sq-success)';

  if (selectedIndex === 'NDVI') {
    formulaStr = 'NDVI = (NIR - Red) / (NIR + Red)';
    const denom = nir + red;
    calculatedValue = denom !== 0 ? (nir - red) / denom : 0;
    if (calculatedValue > 0.6) {
      interpretation = 'Dense Healthy Vegetation Canopy';
      statusColor = 'var(--sq-success)';
    } else if (calculatedValue > 0.2) {
      interpretation = 'Moderate Vegetation / Grassland';
      statusColor = 'var(--sq-cyan)';
    } else {
      interpretation = 'Barren Soil / Rock / Urban Area';
      statusColor = 'var(--sq-text-muted)';
    }
  } else if (selectedIndex === 'NDWI') {
    formulaStr = 'NDWI = (Green - NIR) / (Green + NIR)';
    const denom = green + nir;
    calculatedValue = denom !== 0 ? (green - nir) / denom : 0;
    if (calculatedValue > 0.3) {
      interpretation = 'Open Water Body / Deep River';
      statusColor = 'var(--sq-cyan)';
    } else if (calculatedValue > 0) {
      interpretation = 'High Canopy Moisture Content';
      statusColor = 'var(--sq-success)';
    } else {
      interpretation = 'Non-water Land Surface';
      statusColor = 'var(--sq-text-muted)';
    }
  } else if (selectedIndex === 'NDBI') {
    formulaStr = 'NDBI = (SWIR - NIR) / (SWIR + NIR)';
    const denom = swir + nir;
    calculatedValue = denom !== 0 ? (swir - nir) / denom : 0;
    if (calculatedValue > 0.1) {
      interpretation = 'Dense Built-Up Urban Infrastructure';
      statusColor = '#FF9800';
    } else {
      interpretation = 'Natural Non-Urban Surface';
      statusColor = 'var(--sq-success)';
    }
  }

  const formattedValue = calculatedValue.toFixed(3);

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Index Tabs */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {['NDVI', 'NDWI', 'NDBI'].map((idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              background: selectedIndex === idx ? 'var(--sq-blue)' : 'rgba(0, 22, 46, 0.7)',
              border: selectedIndex === idx ? '1px solid var(--sq-blue-hover)' : '1px solid var(--sq-border)',
              color: 'var(--sq-white)',
              cursor: 'pointer'
            }}
          >
            {idx}
          </button>
        ))}
      </div>

      {/* Formula & Live Display */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '16px',
          background: 'rgba(0, 22, 46, 0.85)',
          border: '1px solid var(--sq-blue-mid)',
          borderRadius: '8px',
          padding: '16px'
        }}
      >
        <div>
          <div style={{ fontSize: '11px', color: 'var(--sq-text-muted)', textTransform: 'uppercase' }}>Formula</div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--sq-cyan)', fontFamily: 'monospace', margin: '4px 0 12px 0' }}>
            {formulaStr}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--sq-text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                <span>NIR Reflectance (Band 8):</span>
                <span>{nir}</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={nir}
                onChange={(e) => setNir(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--sq-blue)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: 'var(--sq-text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Red Reflectance (Band 4):</span>
                <span>{red}</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={red}
                onChange={(e) => setRed(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--sq-blue)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: 'var(--sq-text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Green Reflectance (Band 3):</span>
                <span>{green}</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={green}
                onChange={(e) => setGreen(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--sq-blue)' }}
              />
            </div>
          </div>
        </div>

        {/* Calculated Result Panel */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            background: 'rgba(6, 37, 69, 0.7)',
            border: '1px solid var(--sq-border)',
            borderRadius: '8px',
            padding: '16px'
          }}
        >
          <div style={{ fontSize: '12px', color: 'var(--sq-text-muted)', textTransform: 'uppercase' }}>{selectedIndex} Index Result</div>
          <div style={{ fontSize: '38px', fontWeight: '800', color: 'var(--sq-white)', margin: '8px 0' }}>
            {formattedValue}
          </div>
          <div
            style={{
              padding: '4px 12px',
              borderRadius: '12px',
              background: 'rgba(0, 22, 46, 0.8)',
              border: `1px solid ${statusColor}`,
              color: statusColor,
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            {interpretation}
          </div>
        </div>
      </div>
    </div>
  );
};
