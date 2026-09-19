import React from 'react';
import { X, Play, Shield, Cpu, Activity } from 'lucide-react';

export const DemoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(0, 10, 24, 0.88)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          background: 'var(--sq-bg-dark)',
          border: '1px solid var(--sq-border)',
          borderRadius: '16px',
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(9, 122, 254, 0.25)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--sq-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(0, 22, 46, 0.6)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(9, 122, 254, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--sq-cyan)'
              }}
            >
              <Play size={16} fill="var(--sq-cyan)" />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--sq-white)', margin: 0 }}>
                Orbit IQ — Platform Demo Walkthrough
              </h3>
              <div style={{ fontSize: '12px', color: 'var(--sq-text-secondary)', marginTop: '2px' }}>
                AI-Powered Natural Language Querying & Multispectral VLM Engine
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--sq-text-secondary)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 150ms ease'
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--sq-white)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--sq-text-secondary)')}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content / Visual Simulation */}
        <div style={{ padding: '24px' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '420px',
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#000d1a',
              border: '1px solid rgba(60, 146, 197, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '20px'
            }}
          >
            {/* Animated Grid Lines Background */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `linear-gradient(rgba(60, 146, 197, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(60, 146, 197, 0.08) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                zIndex: 1
              }}
            />

            {/* Simulation Header Telemetry */}
            <div style={{ zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#22c55e',
                    boxShadow: '0 0 10px #22c55e'
                  }}
                />
                <span style={{ fontSize: '12px', fontFamily: 'monospace', color: 'var(--sq-cyan)' }}>
                  LIVE DEMO STREAM · SENTINEL-2 L2A COG
                </span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--sq-text-muted)' }}>
                MODE: VLM RASTER GROUNDING v2.4
              </div>
            </div>

            {/* Simulation Central Interactive Demonstration */}
            <div style={{ zIndex: 2, textAlign: 'center', margin: 'auto' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--sq-blue), #0056b3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                  boxShadow: '0 0 30px rgba(9, 122, 254, 0.6)',
                  cursor: 'pointer'
                }}
              >
                <Play size={28} fill="#ffffff" style={{ marginLeft: '4px' }} />
              </div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--sq-white)', marginBottom: '8px' }}>
                "Detect flood extent over Assam valley from Sentinel-2 & Sentinel-1 SAR"
              </div>
              <div style={{ fontSize: '13px', color: 'var(--sq-cyan)', maxWidth: '520px', margin: '0 auto' }}>
                Orbit IQ processes multimodal satellite passes, computes NDWI indices, and outputs polygon vector overlays in &lt; 2 seconds.
              </div>
            </div>

            {/* Simulation Telemetry Metrics Bar */}
            <div
              style={{
                zIndex: 2,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                background: 'rgba(0, 22, 46, 0.85)',
                border: '1px solid var(--sq-border)',
                padding: '12px 16px',
                borderRadius: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={16} style={{ color: 'var(--sq-cyan)' }} />
                <div style={{ fontSize: '11px' }}>
                  <div style={{ color: 'var(--sq-text-muted)' }}>Spatial Band Resolution</div>
                  <div style={{ color: 'var(--sq-white)', fontWeight: '600' }}>10m Multispectral</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cpu size={16} style={{ color: 'var(--sq-blue)' }} />
                <div style={{ fontSize: '11px' }}>
                  <div style={{ color: 'var(--sq-text-muted)' }}>Inference Latency</div>
                  <div style={{ color: 'var(--sq-white)', fontWeight: '600' }}>420 ms</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={16} style={{ color: 'var(--sq-success)' }} />
                <div style={{ fontSize: '11px' }}>
                  <div style={{ color: 'var(--sq-text-muted)' }}>Confidence Score</div>
                  <div style={{ color: 'var(--sq-white)', fontWeight: '600' }}>98.4% Accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoModal;
