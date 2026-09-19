import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, Compass } from 'lucide-react';

const SUGGESTED_QUERIES = [
  'Detect vegetation loss in the Amazon.',
  'Compare urban expansion in Mumbai between 2024 and 2026.',
  'Find coastal erosion near Gujarat.',
  'Explain the NDVI trend in Maharashtra.',
  'Identify major land-use changes in Delhi.'
];

const PRESET_ANSWERS = {
  'Detect vegetation loss in the Amazon.': {
    region: 'Southern Amazon Basin',
    dataset: 'Sentinel-2 L2A (10m)',
    trend: '-14.2% Forest Cover',
    confidence: '94.8% VLM Confidence',
    observation: 'Deforestation anomaly & canopy thinning detected across 1,248 km² over Q3 2026 satellite passes.'
  },
  'Compare urban expansion in Mumbai between 2024 and 2026.': {
    region: 'Navi Mumbai Coastal Region',
    dataset: 'Landsat 9 + Sentinel-1 SAR',
    trend: '+22.4% Built-Up Area',
    confidence: '96.1% VLM Confidence',
    observation: 'Rapid infrastructure expansion & reclamation detected along eastern port corridor.'
  },
  'Find coastal erosion near Gujarat.': {
    region: 'Gulf of Khambhat Coastline',
    dataset: 'Sentinel-1 SAR Radar (VV+VH)',
    trend: '1.4m / yr Shoreline Retreat',
    confidence: '91.5% VLM Confidence',
    observation: 'Severe wave action erosion detected along tidal mudflats with high-resolution radar co-registration.'
  },
  'Explain the NDVI trend in Maharashtra.': {
    region: 'Marathwada Agricultural Zone',
    dataset: 'MODIS + Sentinel-2 MSI',
    trend: 'NDVI +0.68 (Dense Crop)',
    confidence: '93.2% VLM Confidence',
    observation: 'Optimal monsoonal crop canopy health observed across sugarcane & soybean belts.'
  },
  'Identify major land-use changes in Delhi.': {
    region: 'Yamuna Floodplain Corridor',
    dataset: 'High-Res Optical 0.5m',
    trend: '34.8% Urban Incroachment',
    confidence: '95.0% VLM Confidence',
    observation: 'Seasonal wetland conversion to temporary agricultural and industrial storage parcels.'
  }
};

export const QueryDemo = () => {
  const [query, setQuery] = useState(SUGGESTED_QUERIES[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState(PRESET_ANSWERS[SUGGESTED_QUERIES[0]]);

  const handleRunQuery = (selectedQuery = query) => {
    setQuery(selectedQuery);
    setIsProcessing(true);
    setActiveStep(1);

    setTimeout(() => setActiveStep(2), 500);
    setTimeout(() => setActiveStep(3), 1100);
    setTimeout(() => {
      setIsProcessing(false);
      setActiveStep(4);
      setResult(PRESET_ANSWERS[selectedQuery] || PRESET_ANSWERS[SUGGESTED_QUERIES[0]]);
    }, 1600);
  };

  return (
    <section
      id="capabilities"
      style={{
        padding: '100px 32px',
        background: 'var(--sq-bg-dark)',
        borderTop: '1px solid var(--sq-border)',
        borderBottom: '1px solid var(--sq-border)',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--sq-cyan)', fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '12px' }}>
            <Compass size={16} /> INTERACTIVE DEMO
          </div>
          <h2 style={{ fontSize: '42px', fontWeight: '800', color: 'var(--sq-white)', marginBottom: '16px' }}>
            Ask Earth Anything.
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--sq-text-secondary)', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
            Query satellite imagery using natural language instead of configuring complex remote-sensing workflows.
          </p>
        </div>

        {/* Suggested Chips */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
          {SUGGESTED_QUERIES.map((q) => (
            <button
              key={q}
              onClick={() => handleRunQuery(q)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                background: query === q ? 'rgba(9, 122, 254, 0.25)' : 'rgba(0, 22, 46, 0.7)',
                border: query === q ? '1px solid var(--sq-cyan)' : '1px solid var(--sq-border)',
                color: query === q ? 'var(--sq-white)' : 'var(--sq-text-secondary)',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 180ms ease'
              }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Interactive Query Box */}
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: 'linear-gradient(180deg, rgba(6, 37, 69, 0.9), rgba(0, 22, 46, 0.95))',
            border: '1px solid var(--sq-blue)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
          }}
        >
          {/* Prompt Bar */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleRunQuery(); }}
            style={{
              display: 'flex',
              gap: '12px',
              background: 'rgba(0, 22, 46, 0.9)',
              border: '1px solid var(--sq-border)',
              borderRadius: '10px',
              padding: '8px 14px',
              alignItems: 'center',
              marginBottom: '24px'
            }}
          >
            <Sparkles size={20} style={{ color: 'var(--sq-cyan)', flexShrink: 0 }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask OrbitIQ to analyze any satellite region on Earth..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--sq-white)',
                fontSize: '14px',
                fontFamily: 'var(--sq-font)'
              }}
            />
            <button
              type="submit"
              disabled={isProcessing}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                background: 'var(--sq-blue)',
                border: 'none',
                color: 'var(--sq-white)',
                fontSize: '13px',
                fontWeight: '700',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{isProcessing ? 'Analyzing...' : 'Run Query'}</span>
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Visual Execution Flow Pipeline */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }} className="query-flow-grid">
            {[
              { num: '01', title: 'Query', desc: 'Natural Language' },
              { num: '02', title: 'Thinking', desc: 'Intent & AOI' },
              { num: '03', title: 'Analyzing', desc: 'Multimodal VLM' },
              { num: '04', title: 'Result', desc: 'Grounded Insight' }
            ].map((stepItem, idx) => {
              const active = activeStep >= idx + 1;
              return (
                <div
                  key={stepItem.num}
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    background: active ? 'rgba(9, 122, 254, 0.15)' : 'rgba(0, 22, 46, 0.5)',
                    border: active ? '1px solid var(--sq-cyan)' : '1px solid rgba(27, 91, 149, 0.3)',
                    transition: 'all 250ms ease'
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: '800', color: active ? 'var(--sq-cyan)' : 'var(--sq-text-muted)', marginBottom: '4px' }}>
                    STEP {stepItem.num}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--sq-white)' }}>
                    {stepItem.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--sq-text-secondary)', marginTop: '2px' }}>
                    {stepItem.desc}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Result Output Card */}
          {result && (
            <div
              style={{
                padding: '20px',
                borderRadius: '10px',
                background: 'rgba(0, 22, 46, 0.8)',
                border: '1px solid var(--sq-blue)',
                animation: 'fadeIn 300ms ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--sq-success)' }} />
                  <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--sq-white)' }}>{result.region}</span>
                  <span style={{ fontSize: '11px', color: 'var(--sq-text-muted)' }}>({result.dataset})</span>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--sq-cyan)', fontWeight: '700', background: 'rgba(9, 122, 254, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                    {result.trend}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--sq-success)', fontWeight: '700', background: 'rgba(50, 232, 121, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                    {result.confidence}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--sq-text-secondary)', lineHeight: '1.6' }}>
                {result.observation}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QueryDemo;
