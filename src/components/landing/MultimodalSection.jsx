import React from 'react';
import { Cpu, Sparkles, ArrowRight } from 'lucide-react';

export const MultimodalSection = () => {
  const layers = [
    { name: 'Multispectral Satellite Imagery', desc: 'Sentinel-2 L2A & Landsat 9 13-band surface reflectance rasters.' },
    { name: 'SAR Radar Imagery', desc: 'Sentinel-1 C-band Synthetic Aperture Radar (VV+VH polarizations).' },
    { name: 'Vector GIS Layers', desc: 'Cadastral land parcels, roads, water bodies, and building boundaries.' },
    { name: 'Time-Series Archives', desc: 'Multi-year temporal imagery passes for automated change detection.' },
    { name: 'Natural Language VLM Context', desc: 'Spatial grounding and vision-language reasoning embeddings.' }
  ];

  return (
    <section
      style={{
        padding: '100px 32px',
        background: 'var(--sq-bg-dark)',
        borderBottom: '1px solid var(--sq-border)',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ color: 'var(--sq-cyan)', fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '12px' }}>
            MULTIMODAL DATA FUSION
          </div>
          <h2 style={{ fontSize: '42px', fontWeight: '800', color: 'var(--sq-white)', marginBottom: '16px' }}>
            One Question. Multiple Layers of Earth Intelligence.
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--sq-text-secondary)', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
            OrbitIQ merges optical, SAR radar, spectral indices, and GIS vector boundaries into unified visual and textual insights.
          </p>
        </div>

        {/* Convergence Visual Diagram */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.4fr 1fr', gap: '32px', alignItems: 'center' }} className="multimodal-grid-responsive">
          {/* Left: Input Layers Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {layers.map((layer, idx) => (
              <div
                key={layer.name}
                style={{
                  padding: '16px 20px',
                  borderRadius: '10px',
                  background: 'rgba(6, 37, 69, 0.7)',
                  border: '1px solid var(--sq-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(9, 122, 254, 0.2)',
                    color: 'var(--sq-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '800',
                    flexShrink: 0
                  }}
                >
                  0{idx + 1}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--sq-white)' }}>{layer.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--sq-text-secondary)', marginTop: '2px' }}>{layer.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Center: Convergence Node */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <ArrowRight size={32} style={{ color: 'var(--sq-cyan)' }} className="hide-mobile" />
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--sq-blue), #003e80)',
                border: '2px solid var(--sq-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(9, 122, 254, 0.6)',
                color: 'var(--sq-white)'
              }}
            >
              <Cpu size={36} className="spin" style={{ animationDuration: '10s' }} />
            </div>
            <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--sq-cyan)', letterSpacing: '0.05em' }}>
              ORBITIQ ENGINE
            </div>
          </div>

          {/* Right: Output Actionable Insight */}
          <div
            style={{
              padding: '32px 28px',
              borderRadius: '16px',
              background: 'linear-gradient(180deg, rgba(9, 122, 254, 0.15), rgba(0, 22, 46, 0.95))',
              border: '1px solid var(--sq-blue)',
              boxShadow: '0 20px 40px rgba(9, 122, 254, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={24} style={{ color: 'var(--sq-cyan)' }} />
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--sq-white)' }}>
                Actionable Geospatial Intelligence
              </h3>
            </div>

            <div style={{ fontSize: '13px', color: 'var(--sq-text-secondary)', lineHeight: '1.6' }}>
              Produces grounded GeoJSON spatial masks, verified confidence scoring, spectral index analytics, and multi-format reports ready for spatial analysis.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div style={{ padding: '8px 12px', background: 'rgba(0, 22, 46, 0.8)', borderRadius: '6px', border: '1px solid var(--sq-border)', color: 'var(--sq-white)' }}>
                ✓ Interactive GeoJSON Polygon Bounding Masks
              </div>
              <div style={{ padding: '8px 12px', background: 'rgba(0, 22, 46, 0.8)', borderRadius: '6px', border: '1px solid var(--sq-border)', color: 'var(--sq-white)' }}>
                ✓ Quantitative Spectral Anomaly Metrics
              </div>
              <div style={{ padding: '8px 12px', background: 'rgba(0, 22, 46, 0.8)', borderRadius: '6px', border: '1px solid var(--sq-border)', color: 'var(--sq-white)' }}>
                ✓ Exportable PDF, GeoTIFF, CSV & Shapefile
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultimodalSection;
