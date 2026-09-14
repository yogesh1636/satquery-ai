import React, { useState } from 'react';
import { Map, Layers, CheckSquare, Square, Download, Filter } from 'lucide-react';

export const GisAnalystView = () => {
  const [layers, setLayers] = useState({
    cadastral: true,
    lulc: true,
    contours: false,
    waterways: true
  });

  const toggleLayer = (key) => {
    setLayers({ ...layers, [key]: !layers[key] });
  };

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Top Vector Controls Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          background: 'rgba(0, 22, 46, 0.85)',
          border: '1px solid var(--sq-border)',
          borderRadius: '6px',
          padding: '10px 14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--sq-cyan)' }}>Active GIS Vector Layers:</span>

          <button
            onClick={() => toggleLayer('cadastral')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '11px',
              background: layers.cadastral ? 'rgba(9, 122, 254, 0.25)' : 'transparent',
              border: layers.cadastral ? '1px solid var(--sq-blue)' : '1px solid var(--sq-border)',
              color: 'var(--sq-white)',
              cursor: 'pointer'
            }}
          >
            {layers.cadastral ? <CheckSquare size={14} style={{ color: 'var(--sq-cyan)' }} /> : <Square size={14} />}
            <span>Cadastral Parcels</span>
          </button>

          <button
            onClick={() => toggleLayer('lulc')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '11px',
              background: layers.lulc ? 'rgba(9, 122, 254, 0.25)' : 'transparent',
              border: layers.lulc ? '1px solid var(--sq-blue)' : '1px solid var(--sq-border)',
              color: 'var(--sq-white)',
              cursor: 'pointer'
            }}
          >
            {layers.lulc ? <CheckSquare size={14} style={{ color: 'var(--sq-cyan)' }} /> : <Square size={14} />}
            <span>LULC Land Cover</span>
          </button>

          <button
            onClick={() => toggleLayer('contours')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '11px',
              background: layers.contours ? 'rgba(9, 122, 254, 0.25)' : 'transparent',
              border: layers.contours ? '1px solid var(--sq-blue)' : '1px solid var(--sq-border)',
              color: 'var(--sq-white)',
              cursor: 'pointer'
            }}
          >
            {layers.contours ? <CheckSquare size={14} style={{ color: 'var(--sq-cyan)' }} /> : <Square size={14} />}
            <span>10m Elevation Contours</span>
          </button>
        </div>

        <div style={{ fontSize: '11px', color: 'var(--sq-text-muted)' }}>
          EPSG:4326 (WGS84)
        </div>
      </div>

      {/* Land-Use Land-Cover Classification Legend */}
      <div
        style={{
          background: 'rgba(0, 22, 46, 0.75)',
          border: '1px solid var(--sq-border)',
          borderRadius: '6px',
          padding: '12px 14px'
        }}
      >
        <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--sq-white)', marginBottom: '8px', textTransform: 'uppercase' }}>
          Land-Use / Land-Cover (LULC) Classification Legend
        </div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '11px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', background: '#32E879', borderRadius: '2px' }} /> Dense Canopy (42.1%)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', background: '#3C92C5', borderRadius: '2px' }} /> Water Bodies (14.6%)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', background: '#FFB74D', borderRadius: '2px' }} /> Agriculture (28.5%)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', background: '#E57373', borderRadius: '2px' }} /> Built-up Urban (14.8%)
          </span>
        </div>
      </div>
    </div>
  );
};
