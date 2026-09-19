import React, { useState, useEffect } from 'react';
import { CheckCircle2, Cpu, Layers, Sparkles } from 'lucide-react';

export const JobProgressOverlay = ({ isRunning, queryText, onComplete }) => {
  const [step, setStep] = useState(0);
  const steps = [
    { label: 'Job Queued — Assigning GPU Worker...', progress: 15, icon: Cpu },
    { label: 'Parsing Natural Language Intent & AOI Bounds...', progress: 40, icon: Sparkles },
    { label: 'Executing VLM Grounding & Multispectral Model...', progress: 75, icon: Layers },
    { label: 'Generating GeoJSON Overlays & Confidence Mask...', progress: 100, icon: CheckCircle2 }
  ];

  useEffect(() => {
    if (!isRunning) {
      setStep(0);
      return;
    }

    const t1 = setTimeout(() => setStep(1), 400);
    const t2 = setTimeout(() => setStep(2), 900);
    const t3 = setTimeout(() => {
      setStep(3);
      if (onComplete) onComplete();
    }, 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isRunning, onComplete]);

  if (!isRunning && step === 0) return null;

  const current = steps[step] || steps[0];
  const StepIcon = current.icon;

  return (
    <div
      style={{
        margin: '12px 16px',
        padding: '14px 18px',
        background: 'linear-gradient(90deg, rgba(9, 122, 254, 0.18), rgba(0, 22, 46, 0.9))',
        border: '1px solid var(--sq-blue)',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(9, 122, 254, 0.2)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: 'var(--sq-cyan)' }}>
          <StepIcon size={16} className={step < 3 ? 'spin' : ''} />
          <span>{current.label}</span>
        </div>
        <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--sq-white)' }}>{current.progress}%</span>
      </div>

      <div style={{ height: '6px', background: 'rgba(0, 22, 46, 0.8)', borderRadius: '3px', overflow: 'hidden' }}>
        <div
          style={{
            width: `${current.progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--sq-blue), var(--sq-cyan))',
            transition: 'width 300ms ease'
          }}
        />
      </div>

      <div style={{ fontSize: '11px', color: 'var(--sq-text-muted)', marginTop: '6px', display: 'flex', justifyContent: 'space-between' }}>
        <span>Query: &quot;{queryText}&quot;</span>
        <span>WebSocket Job ID: #job-{Math.floor(Math.random() * 89999 + 10000)}</span>
      </div>
    </div>
  );
};

export default JobProgressOverlay;
