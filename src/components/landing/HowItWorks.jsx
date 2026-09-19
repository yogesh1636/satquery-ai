import React from 'react';
import { MessageSquare, BrainCircuit, LineChart, FileText } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      num: '01',
      title: 'Ask',
      icon: MessageSquare,
      desc: 'Submit any natural-language query in plain English or Hindi regarding satellite imagery or geographical regions.'
    },
    {
      num: '02',
      title: 'Understand',
      icon: BrainCircuit,
      desc: 'The OrbitIQ Vision-Language router parses location AOI, time range, spectral context, and user intent.'
    },
    {
      num: '03',
      title: 'Analyze',
      icon: LineChart,
      desc: 'Invokes specialized PyTorch models for VLM grounding, bi-temporal change detection, and optical-SAR fusion.'
    },
    {
      num: '04',
      title: 'Explain',
      icon: FileText,
      desc: 'Generates grounded GeoJSON map overlays, confidence metrics, spectral observations, and downloadable reports.'
    }
  ];

  return (
    <section
      id="how-it-works"
      style={{
        padding: '100px 32px',
        background: 'var(--sq-bg-deep)',
        borderBottom: '1px solid var(--sq-border)'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ color: 'var(--sq-cyan)', fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '12px' }}>
            ARCHITECTURE & PIPELINE
          </div>
          <h2 style={{ fontSize: '42px', fontWeight: '800', color: 'var(--sq-white)', marginBottom: '16px' }}>
            How OrbitIQ Works.
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--sq-text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            A four-stage multimodal pipeline designed for deep-tech Earth observation and geospatial decision support.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }} className="how-it-works-grid">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                style={{
                  padding: '28px 24px',
                  borderRadius: '14px',
                  background: 'linear-gradient(180deg, rgba(6, 37, 69, 0.6), rgba(0, 22, 46, 0.8))',
                  border: '1px solid var(--sq-border)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: 'rgba(9, 122, 254, 0.15)',
                      border: '1px solid var(--sq-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--sq-cyan)'
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <span style={{ fontSize: '24px', fontWeight: '900', color: 'rgba(27, 91, 149, 0.5)' }}>
                    {step.num}
                  </span>
                </div>

                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--sq-white)', marginBottom: '8px' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--sq-text-secondary)', lineHeight: '1.6' }}>
                    {step.desc}
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

export default HowItWorks;
