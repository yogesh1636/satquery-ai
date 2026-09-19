import React, { useState } from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';
import { EARTH_BG_URL } from '../../config/assets';

export const AnalysisShowcase = () => {
  const [activeLayer, setActiveLayer] = useState('NDVI');
  const [resolution, setResolution] = useState('10m / px');

  const layersInfo = {
    NDVI: { label: 'NDVI Vegetation Index', color: 'var(--sq-success)', desc: 'Normalized Difference Vegetation Index highlighting canopy density & health.' },
    RGB: { label: 'True Color Optical RGB', color: 'var(--sq-cyan)', desc: 'Surface optical Bands 4 (Red), 3 (Green), 2 (Blue) natural true-color view.' },
    NIR: { label: 'False Color NIR (Band 8)', color: 'var(--sq-blue)', desc: 'Near-Infrared band synthesis identifying water boundaries and vegetation stress.' }
  };

  return (
    <section
      style={{
        padding: '100px 32px',
        background: 'var(--sq-bg-deep)',
        borderBottom: '1px solid var(--sq-border)'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ color: 'var(--sq-cyan)', fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '12px' }}>
            INTERACTIVE PRODUCT SHOWCASE
          </div>
          <h2 style={{ fontSize: '42px', fontWeight: '800', color: 'var(--sq-white)', marginBottom: '16px' }}>
            Live Remote Sensing Analysis.
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--sq-text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Inspect multispectral rasters, switch band layer combinations, and observe real-time VLM spatial detections.
          </p>
        </div>

        {/* Product Viewer Container */}
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            background: 'rgba(6, 37, 69, 0.8)',
            border: '1px solid var(--sq-blue)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.6)'
          }}
        >
          {/* Top Controls Toolbar */}
          <div
            style={{
              padding: '14px 20px',
              background: 'rgba(0, 22, 46, 0.9)',
              borderBottom: '1px solid var(--sq-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Layers size={18} style={{ color: 'var(--sq-cyan)' }} />
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--sq-white)' }}>Active Layer:</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {Object.keys(layersInfo).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveLayer(key)}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      border: activeLayer === key ? '1px solid var(--sq-cyan)' : '1px solid transparent',
                      background: activeLayer === key ? 'rgba(9, 122, 254, 0.25)' : 'transparent',
                      color: activeLayer === key ? 'var(--sq-white)' : 'var(--sq-text-muted)',
                      cursor: 'pointer'
                    }}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '12px', color: 'var(--sq-text-secondary)' }}>
              <span>Resolution: <strong style={{ color: 'var(--sq-white)' }}>{resolution}</strong></span>
              <select
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                style={{ background: 'rgba(0, 22, 46, 0.9)', color: 'var(--sq-white)', border: '1px solid var(--sq-border)', borderRadius: '4px', padding: '2px 6px', fontSize: '11px' }}
              >
                <option value="10m / px">10m / px (Sentinel-2)</option>
                <option value="30m / px">30m / px (Landsat 9)</option>
                <option value="0.5m / px">0.5m / px (High-Res Ortho)</option>
              </select>
            </div>
          </div>

          {/* Raster Image Visualizer */}
          <div style={{ position: 'relative', height: '420px', width: '100%', overflow: 'hidden' }}>
            <img
              src={EARTH_BG_URL}
              alt="Remote Sensing View"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: activeLayer === 'NDVI'
                  ? 'hue-rotate(90deg) contrast(1.3) saturate(1.4)'
                  : activeLayer === 'NIR'
                  ? 'hue-rotate(180deg) contrast(1.2)'
                  : 'none',
                transition: 'filter 300ms ease'
              }}
            />

            {/* Simulated Bounding Box Detection Overlays */}
            <div
              style={{
                position: 'absolute',
                top: '30%',
                left: '40%',
                width: '160px',
                height: '120px',
                border: '2px dashed var(--sq-cyan)',
                borderRadius: '6px',
                background: 'rgba(9, 122, 254, 0.15)',
                padding: '8px',
                color: 'var(--sq-white)',
                fontSize: '11px',
                boxShadow: '0 0 14px rgba(9, 122, 254, 0.4)'
              }}
            >
              <div style={{ fontWeight: '700', color: 'var(--sq-cyan)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={12} /> AOI Detection #1
              </div>
              <div>NDVI Anomaly: +14.2%</div>
              <div style={{ color: 'var(--sq-success)', fontWeight: '600', marginTop: '2px' }}>94.2% Confidence</div>
            </div>
          </div>

          {/* Bottom Info Strip */}
          <div style={{ padding: '14px 20px', background: 'rgba(0, 22, 46, 0.9)', borderTop: '1px solid var(--sq-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
            <div style={{ color: 'var(--sq-text-secondary)' }}>{layersInfo[activeLayer].desc}</div>
            <div style={{ color: 'var(--sq-success)', fontWeight: '600' }}>● Real-time Model Inference</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisShowcase;
