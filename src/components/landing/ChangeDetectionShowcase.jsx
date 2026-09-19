import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { EARTH_BG_URL } from '../../config/assets';

export const ChangeDetectionShowcase = () => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0..100

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

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
            BI-TEMPORAL CHANGE DETECTION
          </div>
          <h2 style={{ fontSize: '42px', fontWeight: '800', color: 'var(--sq-white)', marginBottom: '16px' }}>
            See Earth Change Over Time.
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--sq-text-secondary)', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
            Drag the temporal comparison slider to inspect land cover changes, urban growth, or deforestation between satellite passes.
          </p>
        </div>

        {/* Draggable Comparison Container */}
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            background: 'rgba(6, 37, 69, 0.8)',
            border: '1px solid var(--sq-blue)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.6)'
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              padding: '12px 20px',
              background: 'rgba(0, 22, 46, 0.9)',
              borderBottom: '1px solid var(--sq-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '13px'
            }}
          >
            <div style={{ display: 'flex', gap: '16px', color: 'var(--sq-white)', fontWeight: '600' }}>
              <span style={{ color: 'var(--sq-cyan)' }}>PASS A: October 2024</span>
              <span style={{ color: 'var(--sq-text-muted)' }}>vs</span>
              <span style={{ color: 'var(--sq-success)' }}>PASS B: September 2026</span>
            </div>
            <div style={{ color: 'var(--sq-text-muted)', fontSize: '12px' }}>
              Drag left/right to compare
            </div>
          </div>

          {/* Interactive Comparison Canvas */}
          <div
            onMouseMove={handleMouseMove}
            style={{
              position: 'relative',
              height: '400px',
              width: '100%',
              overflow: 'hidden',
              cursor: 'col-resize',
              userSelect: 'none'
            }}
          >
            {/* After Image (Pass B 2026) */}
            <img
              src={EARTH_BG_URL}
              alt="Pass B 2026"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'contrast(1.3) saturate(1.5) hue-rotate(45deg)'
              }}
            />

            {/* Before Image Clip (Pass A 2024) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: `${sliderPosition}%`,
                overflow: 'hidden',
                borderRight: '2px solid var(--sq-white)'
              }}
            >
              <img
                src={EARTH_BG_URL}
                alt="Pass A 2024"
                style={{
                  width: '960px',
                  height: '400px',
                  objectFit: 'cover',
                  maxWidth: 'none',
                  filter: 'contrast(1.0)'
                }}
              />
            </div>

            {/* Vertical Slider Handle Line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${sliderPosition}%`,
                transform: 'translateX(-50%)',
                width: '4px',
                background: 'var(--sq-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px var(--sq-cyan)'
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--sq-blue)',
                  border: '2px solid var(--sq-white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--sq-white)',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.6)'
                }}
              >
                <ArrowLeftRight size={18} />
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div style={{ padding: '16px 20px', background: 'rgba(0, 22, 46, 0.95)', borderTop: '1px solid var(--sq-border)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', fontSize: '12px' }} className="stats-bar-grid">
            <div>
              <div style={{ color: 'var(--sq-text-muted)' }}>Change Detected</div>
              <div style={{ color: 'var(--sq-white)', fontWeight: '700', fontSize: '14px' }}>1,248 km² Deforestation</div>
            </div>
            <div>
              <div style={{ color: 'var(--sq-text-muted)' }}>VLM Confidence</div>
              <div style={{ color: 'var(--sq-success)', fontWeight: '700', fontSize: '14px' }}>94.2% High</div>
            </div>
            <div>
              <div style={{ color: 'var(--sq-text-muted)' }}>Time Variance</div>
              <div style={{ color: 'var(--sq-white)', fontWeight: '700', fontSize: '14px' }}>24 Months</div>
            </div>
            <div>
              <div style={{ color: 'var(--sq-text-muted)' }}>Specialist Model</div>
              <div style={{ color: 'var(--sq-cyan)', fontWeight: '700', fontSize: '14px' }}>PyTorch Change-Net</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangeDetectionShowcase;
