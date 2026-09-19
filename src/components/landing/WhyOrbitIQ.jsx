import React from 'react';
import { MessageSquare, Layers, CheckCircle2, Globe } from 'lucide-react';

export const WhyOrbitIQ = () => {
  const benefits = [
    {
      title: 'Natural Language',
      desc: 'Ask Earth questions directly in plain text instead of configuring complex GIS software workflows.',
      icon: MessageSquare
    },
    {
      title: 'Multimodal Fusion',
      desc: 'Combines optical imagery, SAR radar, spectral indices, and vector boundaries into unified visual context.',
      icon: Layers
    },
    {
      title: 'Actionable Intelligence',
      desc: 'Delivers clear confidence scores, observations, GeoJSON spatial overlays, and exportable reports.',
      icon: CheckCircle2
    },
    {
      title: 'Accessible & Scalable',
      desc: 'Tailored persona workspaces for students, researchers, GIS specialists, and enterprise organizations.',
      icon: Globe
    }
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
            WHY ORBITIQ
          </div>
          <h2 style={{ fontSize: '42px', fontWeight: '800', color: 'var(--sq-white)', marginBottom: '16px' }}>
            Remote Sensing Made Simple.
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--sq-text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Earth observation should not require a GIS specialist for every routine question.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }} className="why-orbitiq-grid">
          {benefits.map(b => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
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
                    {b.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--sq-text-secondary)', lineHeight: '1.6' }}>
                    {b.desc}
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

export default WhyOrbitIQ;
