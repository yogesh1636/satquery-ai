import React from 'react';

export const TechnologySection = () => {
  const techStack = [
    { label: 'Vision-Language AI', tech: 'PyTorch + HuggingFace VLM Base Specialist' },
    { label: 'Geospatial Engine', tech: 'GDAL, Rasterio, Shapely & PyProj' },
    { label: 'Spatial Database', tech: 'PostgreSQL 15 + PostGIS & Redis Cache' },
    { label: 'Realtime Streaming', tech: 'WebSocket Hub & Async Task Queue' }
  ];

  return (
    <section
      id="technology"
      style={{
        padding: '100px 32px',
        background: 'var(--sq-bg-dark)',
        borderBottom: '1px solid var(--sq-border)'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ color: 'var(--sq-cyan)', fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '12px' }}>
            DEEP-TECH STACK
          </div>
          <h2 style={{ fontSize: '42px', fontWeight: '800', color: 'var(--sq-white)', marginBottom: '16px' }}>
            Powered by Next-Gen Geospatial AI.
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--sq-text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            OrbitIQ combines state-of-the-art vision-language models with high-performance raster co-registration libraries.
          </p>
        </div>

        {/* Architecture Pipeline Flow Diagram */}
        <div
          style={{
            padding: '32px',
            borderRadius: '16px',
            background: 'rgba(6, 37, 69, 0.6)',
            border: '1px solid var(--sq-blue)',
            marginBottom: '40px'
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--sq-white)', marginBottom: '20px', textAlign: 'center' }}>
            SYSTEM PIPELINE ARCHITECTURE
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', textAlign: 'center' }} className="pipeline-grid">
            {[
              { step: '01', name: 'User Query', detail: 'NL Prompt (EN/HI)' },
              { step: '02', name: 'Intent Router', detail: 'LangGraph Engine' },
              { step: '03', name: 'Specialist Models', detail: 'PyTorch VLM Grounding' },
              { step: '04', name: 'Geospatial COG', detail: 'Rasterio & PostGIS' },
              { step: '05', name: 'Grounded Result', detail: 'GeoJSON + Metrics' }
            ].map(item => (
              <div key={item.step} style={{ padding: '14px', background: 'rgba(0, 22, 46, 0.8)', borderRadius: '8px', border: '1px solid var(--sq-border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--sq-cyan)', fontWeight: '800' }}>{item.step}</div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--sq-white)', marginTop: '4px' }}>{item.name}</div>
                <div style={{ fontSize: '10px', color: 'var(--sq-text-muted)', marginTop: '2px' }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stack Badges Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="tech-stack-grid">
          {techStack.map(t => (
            <div key={t.label} style={{ padding: '16px', borderRadius: '10px', background: 'rgba(0, 22, 46, 0.7)', border: '1px solid rgba(27, 91, 149, 0.3)' }}>
              <div style={{ fontSize: '11px', color: 'var(--sq-text-muted)', textTransform: 'uppercase' }}>{t.label}</div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--sq-white)', marginTop: '4px' }}>{t.tech}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
