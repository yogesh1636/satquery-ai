import React from 'react';
import { Sprout, CloudRain, Building, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ApplicationsSection = () => {
  const apps = [
    {
      title: 'Agriculture & Food Security',
      icon: Sprout,
      desc: 'Monitor crop canopy health, evaluate soil moisture anomalies, and predict harvest yields using multitemporal NDVI indices.'
    },
    {
      title: 'Climate & Environmental Change',
      icon: CloudRain,
      desc: 'Track global deforestation rates, glacier retreat, coastal erosion dynamics, and ocean thermal anomalies.'
    },
    {
      title: 'Urban Planning & Infrastructure',
      icon: Building,
      desc: 'Detect unauthorized land encroachment, monitor highway construction progress, and map municipal LULC expansion.'
    },
    {
      title: 'Disaster Management & Relief',
      icon: AlertTriangle,
      desc: 'Rapid flood extent mapping, wildfire burn scar analysis, and post-earthquake structural damage assessment.'
    },
    {
      title: 'Government & National Defense',
      icon: ShieldCheck,
      desc: 'Border surveillance, maritime vessel tracking, critical infrastructure monitoring, and SOC2 compliant auditing.'
    }
  ];

  return (
    <section
      id="applications"
      style={{
        padding: '100px 32px',
        background: 'var(--sq-bg-deep)',
        borderBottom: '1px solid var(--sq-border)'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ color: 'var(--sq-cyan)', fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '12px' }}>
            REAL-WORLD APPLICATIONS
          </div>
          <h2 style={{ fontSize: '42px', fontWeight: '800', color: 'var(--sq-white)', marginBottom: '16px' }}>
            From Satellite Data to Real-World Decisions.
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--sq-text-secondary)', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
            Transforming raw Earth observation rasters into domain-specific actionable insights across global industries.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="applications-grid">
          {apps.map(app => {
            const Icon = app.icon;
            return (
              <div
                key={app.title}
                style={{
                  padding: '24px',
                  borderRadius: '12px',
                  background: 'rgba(6, 37, 69, 0.6)',
                  border: '1px solid var(--sq-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: 'rgba(9, 122, 254, 0.15)',
                    border: '1px solid var(--sq-blue)',
                    color: 'var(--sq-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--sq-white)', marginBottom: '6px' }}>
                    {app.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--sq-text-secondary)', lineHeight: '1.6' }}>
                    {app.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ApplicationsSection;
