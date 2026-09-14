import React, { useState } from 'react';
import { BookOpen, CheckCircle, HelpCircle, Award, Play } from 'lucide-react';

export const StudentWorkspaceView = ({ activeTool }) => {
  const [activeStep, setActiveStep] = useState(2);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const steps = [
    { title: '1. Satellite Orbit & Sensor Basics', desc: 'Learn Sun-synchronous orbits & multispectral bands' },
    { title: '2. True Color vs False Color RGB', desc: 'Understanding NIR Band 8 overlay for vegetation' },
    { title: '3. NDVI Index Calculation', desc: 'Compute (NIR - Red) / (NIR + Red) for crop health' },
    { title: '4. AI Natural Language Querying', desc: 'Ask SatQuery AI to detect changes over Amazon' }
  ];

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Module Banner */}
      <div
        style={{
          background: 'rgba(9, 122, 254, 0.12)',
          border: '1px solid var(--sq-blue)',
          borderRadius: '8px',
          padding: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <BookOpen size={22} style={{ color: 'var(--sq-cyan)' }} />
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--sq-white)' }}>
              Guided Remote Sensing Course: Module 2
            </div>
            <div style={{ fontSize: '11px', color: 'var(--sq-text-secondary)' }}>
              Interactive satellite imagery & AI query fundamentals
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--sq-success)' }}>
          <Award size={16} />
          <span>75% Completed</span>
        </div>
      </div>

      {/* Step Interactive Progress Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
        {steps.map((step, idx) => (
          <div
            key={idx}
            onClick={() => setActiveStep(idx + 1)}
            style={{
              padding: '12px',
              borderRadius: '6px',
              background: activeStep === idx + 1 ? 'rgba(6, 37, 69, 0.9)' : 'rgba(0, 22, 46, 0.6)',
              border: activeStep === idx + 1 ? '1px solid var(--sq-cyan)' : '1px solid var(--sq-border)',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: '700', color: activeStep === idx + 1 ? 'var(--sq-cyan)' : 'var(--sq-white)' }}>
              {step.title}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--sq-text-muted)', marginTop: '4px' }}>
              {step.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Interactive Quiz Question */}
      <div
        style={{
          background: 'rgba(0, 22, 46, 0.85)',
          border: '1px solid var(--sq-blue-mid)',
          borderRadius: '8px',
          padding: '16px'
        }}
      >
        <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--sq-white)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <HelpCircle size={16} style={{ color: 'var(--sq-cyan)' }} />
          <span>Quick Knowledge Check: What does high NIR (Near-Infrared) reflectance indicate?</span>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
          {[
            { id: 'a', text: 'A) Deep Water Body' },
            { id: 'b', text: 'B) Healthy Dense Vegetation Canopy' },
            { id: 'c', text: 'C) Concrete Urban Structure' }
          ].map((ans) => (
            <button
              key={ans.id}
              onClick={() => setSelectedAnswer(ans.id)}
              style={{
                padding: '8px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                background: selectedAnswer === ans.id ? (ans.id === 'b' ? 'rgba(50, 232, 121, 0.2)' : 'rgba(255, 82, 82, 0.2)') : 'rgba(6, 37, 69, 0.6)',
                border: selectedAnswer === ans.id ? (ans.id === 'b' ? '1px solid var(--sq-success)' : '1px solid var(--sq-error)') : '1px solid var(--sq-border)',
                color: 'var(--sq-white)',
                cursor: 'pointer'
              }}
            >
              {ans.text}
            </button>
          ))}
        </div>

        {selectedAnswer === 'b' && (
          <div style={{ fontSize: '11px', color: 'var(--sq-success)', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle size={14} /> Correct! Chlorophyll in healthy leaves reflects up to 50% of incoming NIR light.
          </div>
        )}
      </div>
    </div>
  );
};
