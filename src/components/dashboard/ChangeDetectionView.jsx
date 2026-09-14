import React, { useState } from 'react';
import { Sliders, AlertTriangle, ShieldCheck, Calendar, ArrowRight } from 'lucide-react';
import { EARTH_BG_URL } from '../../config/assets';

export const ChangeDetectionView = ({ activeDataset }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [timePeriod, setTimePeriod] = useState('2024-09 vs 2026-09');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
      {/* Top Banner Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px'
        }}
      >
        <div
          style={{
            padding: '12px',
            background: 'rgba(0, 22, 46, 0.8)',
            border: '1px solid var(--sq-border)',
            borderRadius: '6px'
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--sq-text-muted)' }}>Change Detected</div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--sq-cyan)' }}>12.8%</div>
          <div style={{ fontSize: '10px', color: 'var(--sq-success)' }}>● Surface Deforestation</div>
        </div>

        <div
          style={{
            padding: '12px',
            background: 'rgba(0, 22, 46, 0.8)',
            border: '1px solid var(--sq-border)',
            borderRadius: '6px'
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--sq-text-muted)' }}>AI Confidence</div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--sq-white)' }}>94%</div>
          <div style={{ fontSize: '10px', color: 'var(--sq-text-secondary)' }}>High Precision Model</div>
        </div>

        <div
          style={{
            padding: '12px',
            background: 'rgba(0, 22, 46, 0.8)',
            border: '1px solid var(--sq-border)',
            borderRadius: '6px'
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--sq-text-muted)' }}>Affected Area</div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--sq-cyan)' }}>1,248 km²</div>
          <div style={{ fontSize: '10px', color: 'var(--sq-text-secondary)' }}>Southern Basin Zone</div>
        </div>

        <div
          style={{
            padding: '12px',
            background: 'rgba(0, 22, 46, 0.8)',
            border: '1px solid var(--sq-border)',
            borderRadius: '6px'
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--sq-text-muted)' }}>Active Dataset</div>
          <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--sq-white)', marginTop: '4px' }}>{activeDataset.name}</div>
          <div style={{ fontSize: '10px', color: 'var(--sq-cyan)' }}>{timePeriod}</div>
        </div>
      </div>

      {/* Interactive Before / After Split Slider UI */}
      <div
        style={{
          position: 'relative',
          height: '280px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid var(--sq-blue)'
        }}
      >
        <img
          src={EARTH_BG_URL}
          alt="After Analysis"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'hue-rotate(90deg) contrast(120%)'
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: `${sliderPos}%`,
            overflow: 'hidden',
            borderRight: '2px solid var(--sq-cyan)',
            boxShadow: '0 0 16px rgba(60, 146, 197, 0.8)'
          }}
        >
          <img
            src={EARTH_BG_URL}
            alt="Before Baseline"
            style={{
              width: '1000px',
              height: '280px',
              objectFit: 'cover'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              padding: '4px 10px',
              background: 'rgba(0, 22, 46, 0.85)',
              border: '1px solid var(--sq-blue-mid)',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: '600',
              color: 'var(--sq-white)'
            }}
          >
            BEFORE (BASELINE 2024)
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '4px 10px',
            background: 'rgba(0, 22, 46, 0.85)',
            border: '1px solid var(--sq-cyan)',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: '600',
            color: 'var(--sq-cyan)'
          }}
        >
          AFTER (CURRENT 2026)
        </div>

        {/* Slider input */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            accentColor: 'var(--sq-blue)',
            cursor: 'pointer'
          }}
        />
      </div>

      <div style={{ fontSize: '11px', color: 'var(--sq-text-muted)', textAlign: 'center' }}>
        ↔ Drag the slider to compare 2024 Baseline against 2026 Satellite Change Matrix
      </div>
    </div>
  );
};
