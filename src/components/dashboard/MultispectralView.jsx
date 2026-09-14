import React from 'react';
import { Layers, Eye, Sliders, Activity } from 'lucide-react';

export const MultispectralView = ({ activeDataset, selectedLayer, setSelectedLayer, resolution, setResolution, selectedBands, setSelectedBands }) => {
  const layers = [
    { id: 'multispectral-rgb', label: 'Multispectral RGB' },
    { id: 'ndvi-overlay', label: 'NDVI Vegetation Overlay' },
    { id: 'thermal-infrared', label: 'Thermal InfraRed' },
    { id: 'sar-radar', label: 'SAR Synthetic Aperture Radar' }
  ];

  const bands = ['NIR (Band 8)', 'Red (Band 4)', 'Green (Band 3)', 'Blue (Band 2)', 'SWIR-1 (Band 11)', 'SWIR-2 (Band 12)'];

  const toggleBand = (band) => {
    if (selectedBands.includes(band)) {
      if (selectedBands.length > 1) {
        setSelectedBands(selectedBands.filter((b) => b !== band));
      }
    } else {
      setSelectedBands([...selectedBands, band]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Control bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '12px 16px',
          background: 'rgba(0, 22, 46, 0.85)',
          borderBottom: '1px solid var(--sq-border)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--sq-cyan)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Layers size={14} /> Layer:
          </span>
          {layers.map((l) => (
            <button
              key={l.id}
              onClick={() => setSelectedLayer(l.label)}
              style={{
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: '500',
                background: selectedLayer === l.label ? 'var(--sq-blue)' : 'rgba(6, 37, 69, 0.7)',
                border: selectedLayer === l.label ? '1px solid var(--sq-blue-hover)' : '1px solid var(--sq-border)',
                color: 'var(--sq-white)',
                cursor: 'pointer',
                transition: 'all 180ms ease'
              }}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: 'var(--sq-text-muted)' }}>Resolution:</span>
          <select
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              background: 'rgba(0, 22, 46, 0.9)',
              border: '1px solid var(--sq-blue-mid)',
              color: 'var(--sq-cyan)',
              fontSize: '11px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="10m / px">10m / px (Native)</option>
            <option value="5m / px">5m / px (Super-Res AI)</option>
            <option value="0.5m / px">0.5m / px (Sub-meter Fusion)</option>
          </select>
        </div>
      </div>

      {/* Band selector badges */}
      <div style={{ padding: '0 16px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '11px', color: 'var(--sq-text-muted)' }}>Spectral Composite:</span>
        {bands.map((b) => {
          const isActive = selectedBands.includes(b);
          return (
            <button
              key={b}
              onClick={() => toggleBand(b)}
              style={{
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: '500',
                background: isActive ? 'rgba(60, 146, 197, 0.2)' : 'rgba(0, 22, 46, 0.5)',
                border: isActive ? '1px solid var(--sq-cyan)' : '1px solid rgba(27, 91, 149, 0.4)',
                color: isActive ? 'var(--sq-cyan)' : 'var(--sq-text-muted)',
                cursor: 'pointer'
              }}
            >
              {isActive ? '✓ ' : '+ '}{b}
            </button>
          );
        })}
      </div>
    </div>
  );
};
