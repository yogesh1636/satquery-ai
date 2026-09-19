import React from 'react';
import { Globe, Award, Shield } from 'lucide-react';

export const ImpactSection = () => {
  return (
    <section
      style={{
        padding: '100px 32px',
        background: 'var(--sq-bg-dark)',
        borderBottom: '1px solid var(--sq-border)'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ color: 'var(--sq-cyan)', fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '12px' }}>
            EARTH IMPACT & SIH MISSION
          </div>
          <h2 style={{ fontSize: '42px', fontWeight: '800', color: 'var(--sq-white)', marginBottom: '16px' }}>
            A Smarter Way to Understand Our Planet.
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--sq-text-secondary)', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
            Empowering scientists, urban planners, environmentalists, and disaster response teams with instant Earth observation insights.
          </p>
        </div>

        {/* SIH Impact Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="impact-grid-responsive">
          <div style={{ padding: '28px', borderRadius: '14px', background: 'rgba(6, 37, 69, 0.6)', border: '1px solid var(--sq-blue)', textAlign: 'center' }}>
            <Award size={32} style={{ color: 'var(--sq-cyan)', margin: '0 auto 12px auto' }} />
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--sq-white)', marginBottom: '4px' }}>Smart India Hackathon</div>
            <div style={{ fontSize: '12px', color: 'var(--sq-cyan)', fontWeight: '600', marginBottom: '8px' }}>SIH26167 / SIH6167</div>
            <div style={{ fontSize: '13px', color: 'var(--sq-text-secondary)', lineHeight: '1.5' }}>
              Built to solve critical national remote-sensing problem statements for automated satellite imagery analysis.
            </div>
          </div>

          <div style={{ padding: '28px', borderRadius: '14px', background: 'rgba(6, 37, 69, 0.6)', border: '1px solid var(--sq-blue)', textAlign: 'center' }}>
            <Globe size={32} style={{ color: 'var(--sq-success)', margin: '0 auto 12px auto' }} />
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--sq-white)', marginBottom: '4px' }}>Global Feeds</div>
            <div style={{ fontSize: '12px', color: 'var(--sq-success)', fontWeight: '600', marginBottom: '8px' }}>Copernicus & Landsat</div>
            <div style={{ fontSize: '13px', color: 'var(--sq-text-secondary)', lineHeight: '1.5' }}>
              Direct integration with 10m Sentinel-2 optical, Sentinel-1 SAR radar, and Landsat 9 archives.
            </div>
          </div>

          <div style={{ padding: '28px', borderRadius: '14px', background: 'rgba(6, 37, 69, 0.6)', border: '1px solid var(--sq-blue)', textAlign: 'center' }}>
            <Shield size={32} style={{ color: 'var(--sq-cyan)', margin: '0 auto 12px auto' }} />
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--sq-white)', marginBottom: '4px' }}>Zero Friction</div>
            <div style={{ fontSize: '12px', color: 'var(--sq-cyan)', fontWeight: '600', marginBottom: '8px' }}>Natural Language AI</div>
            <div style={{ fontSize: '13px', color: 'var(--sq-text-secondary)', lineHeight: '1.5' }}>
              Translates human language directly into raster math, affine transforms, and map overlays.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
