import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Sparkles, Cpu, CheckCircle2, X } from 'lucide-react';
import { HeroVisual } from './HeroVisual';
import { DemoModal } from './DemoModal';
import { isAuthenticated, getUserRole } from '../../utils/auth';
import { HERO_PREVIEW_IMAGE_URL } from '../../config/assets';

const PREVIEW_DATASETS = [
  {
    id: 'sentinel2-rgb',
    title: 'Sentinel-2 RGB',
    subtitle: '10m True Color Optical',
    image: HERO_PREVIEW_IMAGE_URL,
    details: 'Sentinel-2 Band 4-3-2 True Color composite for natural landscape observation.'
  },
  {
    id: 'ndvi-vegetation',
    title: 'NDVI Vegetation',
    subtitle: 'Near-Infrared Spectral Index',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop',
    details: 'Normalized Difference Vegetation Index (NIR - Red)/(NIR + Red) for agricultural crop stress.'
  },
  {
    id: 'false-color-nir',
    title: 'False Color NIR',
    subtitle: 'Band 8 Infrared Anomaly',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop',
    details: 'Near-Infrared false color rendering highlighting urban density vs dense canopy.'
  },
  {
    id: 'sar-flood-mask',
    title: 'SAR Flood Mask',
    subtitle: 'Sentinel-1 C-Band Radar',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=600&auto=format&fit=crop',
    details: 'Synthetic Aperture Radar penetration for all-weather day/night flood extent mapping.'
  }
];

export const HeroSection = () => {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const userRole = getUserRole();
  const [demoOpen, setDemoOpen] = useState(false);
  const [activePreview, setActivePreview] = useState(null);

  const handleExplore = () => {
    if (loggedIn && userRole) {
      navigate(`/dashboard/${userRole}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <section
        id="overview"
        style={{
          position: 'relative',
          minHeight: '100vh',
          paddingTop: '120px',
          paddingBottom: '40px',
          background: 'radial-gradient(ellipse at 50% 15%, rgba(9, 122, 254, 0.22) 0%, rgba(0, 22, 46, 1) 75%)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        {/* Background Subtle Stars & Atmosphere */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(1px 1px at 20px 30px, #ffffff 100%, transparent), radial-gradient(1px 1px at 150px 150px, #ffffff 100%, transparent), radial-gradient(1px 1px at 300px 80px, #38bdf8 100%, transparent)`,
            backgroundSize: '400px 400px',
            opacity: 0.3,
            pointerEvents: 'none'
          }}
        />

        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px', width: '100%', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '40px', alignItems: 'center' }} className="hero-grid-responsive">
            
            {/* Left Column Content */}
            <div>
              {/* Kicker Badge: PEOPLE | PLANET | PROGRESS */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '6px 16px',
                  borderRadius: '24px',
                  background: 'rgba(9, 122, 254, 0.12)',
                  border: '1px solid var(--sq-cyan)',
                  color: 'var(--sq-cyan)',
                  fontSize: '11px',
                  fontWeight: '700',
                  letterSpacing: '0.12em',
                  marginBottom: '24px',
                  boxShadow: '0 0 20px rgba(60, 146, 197, 0.2)'
                }}
              >
                <Sparkles size={14} />
                <span>PEOPLE &nbsp;|&nbsp; PLANET &nbsp;|&nbsp; PROGRESS</span>
              </div>

              {/* Orbit IQ Brand Heading & Tagline */}
              <h1
                style={{
                  fontSize: '62px',
                  fontWeight: '900',
                  color: 'var(--sq-white)',
                  lineHeight: '1.04',
                  letterSpacing: '-1.8px',
                  marginBottom: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '32px', color: 'var(--sq-cyan)', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  <span>Orbit IQ</span>
                  <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', color: 'var(--sq-white)', border: '1px solid var(--sq-border)' }}>SIH EDITION</span>
                </div>
                <span>FROM SATELLITES</span><br />
                <span style={{ background: 'linear-gradient(90deg, #38BDF8 0%, #097AFE 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  TO SOLUTIONS
                </span>
              </h1>

              {/* Secondary Title */}
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: '800',
                  color: 'var(--sq-cyan)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '16px'
                }}
              >
                AI-POWERED SATELLITE DATA INTELLIGENCE
              </div>

              {/* Supporting Description */}
              <p
                style={{
                  fontSize: '17px',
                  color: 'var(--sq-text-secondary)',
                  lineHeight: '1.6',
                  maxWidth: '580px',
                  marginBottom: '28px'
                }}
              >
                "An AI-powered satellite data intelligence platform that helps you understand our planet, just by asking."
              </p>

              {/* Main Philosophy Pillars Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  background: 'rgba(0, 22, 46, 0.75)',
                  border: '1px solid var(--sq-border)',
                  maxWidth: '580px',
                  marginBottom: '32px',
                  backdropFilter: 'blur(10px)'
                }}
              >
                {['SEE', 'ANALYZE', 'UNDERSTAND', 'SOLVE'].map((pillar, idx) => (
                  <React.Fragment key={pillar}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '800', color: 'var(--sq-white)', letterSpacing: '0.08em' }}>
                      <span style={{ color: 'var(--sq-cyan)' }}>0{idx + 1}.</span>
                      <span>{pillar}</span>
                    </div>
                    {idx < 3 && <div style={{ color: 'var(--sq-border)', fontSize: '14px' }}>|</div>}
                  </React.Fragment>
                ))}
              </div>

              {/* Primary Action Buttons */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '36px' }}>
                <button
                  onClick={handleExplore}
                  style={{
                    padding: '16px 32px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, var(--sq-blue), #0056b3)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: 'var(--sq-white)',
                    fontSize: '15px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 8px 32px rgba(9, 122, 254, 0.5)',
                    transition: 'all 200ms ease'
                  }}
                >
                  <span>Explore Orbit IQ →</span>
                </button>

                <button
                  onClick={() => setDemoOpen(true)}
                  style={{
                    padding: '16px 28px',
                    borderRadius: '10px',
                    background: 'rgba(0, 22, 46, 0.85)',
                    border: '1px solid var(--sq-cyan)',
                    color: 'var(--sq-cyan)',
                    fontSize: '15px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 200ms ease'
                  }}
                >
                  <Play size={18} fill="var(--sq-cyan)" />
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* 4 Interactive Dataset Image Preview Cards */}
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--sq-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
                  MULTISPECTRAL DATASETS & RASTER PREVIEWS
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', maxWidth: '620px' }}>
                  {PREVIEW_DATASETS.map((ds) => (
                    <div
                      key={ds.id}
                      onClick={() => setActivePreview(ds)}
                      style={{
                        position: 'relative',
                        height: '76px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: activePreview?.id === ds.id ? '2px solid var(--sq-cyan)' : '1px solid var(--sq-border)',
                        cursor: 'pointer',
                        boxShadow: activePreview?.id === ds.id ? '0 0 16px rgba(60, 146, 197, 0.5)' : 'none',
                        transition: 'all 180ms ease'
                      }}
                    >
                      <img
                        src={ds.image}
                        alt={ds.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          filter: 'brightness(0.8) contrast(1.1)'
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(180deg, transparent 20%, rgba(0, 22, 46, 0.95) 100%)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          padding: '6px 8px'
                        }}
                      >
                        <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--sq-white)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {ds.title}
                        </div>
                        <div style={{ fontSize: '8px', color: 'var(--sq-cyan)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {ds.subtitle}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Earth Satellite Graphic Visual */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <HeroVisual />
            </div>

          </div>
        </div>

        {/* Bottom Hero Ticker Banner */}
        <div
          style={{
            width: '100%',
            background: 'rgba(0, 16, 35, 0.92)',
            borderTop: '1px solid var(--sq-border)',
            borderBottom: '1px solid var(--sq-border)',
            padding: '14px 32px',
            marginTop: '40px',
            zIndex: 3
          }}
        >
          <div
            style={{
              maxWidth: '1440px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div
              style={{
                fontSize: '14px',
                fontWeight: '800',
                color: 'var(--sq-white)',
                letterSpacing: '0.12em',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <span style={{ color: 'var(--sq-cyan)' }}>REAL DATA.</span>
              <span>REAL INSIGHTS.</span>
              <span style={{ color: 'var(--sq-cyan)' }}>A MORE RESILIENT PLANET.</span>
            </div>

            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', fontSize: '12px', color: 'var(--sq-text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} style={{ color: '#22c55e' }} />
                <span>ISRO Bhuvan & Copernicus API</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Cpu size={14} style={{ color: 'var(--sq-cyan)' }} />
                <span>Multimodal Vision Transformer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Walkthrough Modal */}
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />

      {/* Dataset Preview Lightbox Modal */}
      {activePreview && (
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
          onClick={() => setActivePreview(null)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '720px',
              background: 'var(--sq-bg-dark)',
              border: '1px solid var(--sq-cyan)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(60, 146, 197, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: 'relative', height: '360px' }}>
              <img src={activePreview.image} alt={activePreview.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button
                onClick={() => setActivePreview(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(0,0,0,0.7)',
                  border: '1px solid var(--sq-border)',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ fontSize: '11px', color: 'var(--sq-cyan)', fontWeight: '700', letterSpacing: '0.1em' }}>
                {activePreview.subtitle}
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--sq-white)', margin: '4px 0 12px 0' }}>
                {activePreview.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--sq-text-secondary)', lineHeight: '1.6', margin: 0 }}>
                {activePreview.details}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;
