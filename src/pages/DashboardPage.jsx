import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoleById, rolesConfig } from '../config/rolesConfig';
import { BrandLogo } from '../components/auth/BrandLogo';
import { FooterStrip } from '../components/layout/FooterStrip';
import { EARTH_BG_URL } from '../config/assets';
import { setUserRole, logoutUser } from '../utils/auth';

// Subviews
import { MultispectralView } from '../components/dashboard/MultispectralView';
import { ChangeDetectionView } from '../components/dashboard/ChangeDetectionView';
import { SpectralIndexCalculator } from '../components/dashboard/SpectralIndexCalculator';
import { DatasetComparisonView } from '../components/dashboard/DatasetComparisonView';
import { StudentWorkspaceView } from '../components/dashboard/StudentWorkspaceView';
import { GisAnalystView } from '../components/dashboard/GisAnalystView';
import { OrganizationView } from '../components/dashboard/OrganizationView';
import { ToastNotification } from '../components/dashboard/ToastNotification';

import { 
  FlaskConical, 
  GraduationCap, 
  Map, 
  Building2, 
  Layers, 
  Download, 
  Sparkles, 
  LogOut, 
  Activity, 
  ChevronRight,
  Database,
  BarChart3,
  Loader2,
  CheckCircle2
} from 'lucide-react';

const iconMap = {
  FlaskConical,
  GraduationCap,
  Map,
  Building2
};

export const DashboardPage = () => {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const role = getRoleById(roleId);
  const IconComp = iconMap[role.iconName] || Map;

  // Active States
  const [activeToolId, setActiveToolId] = useState(role.defaultTool || role.focusAreas[0].id);
  const [activeDatasetId, setActiveDatasetId] = useState(role.datasets[0].id);
  const [selectedLayer, setSelectedLayer] = useState('Multispectral RGB');
  const [resolution, setResolution] = useState('10m / px');
  const [selectedBands, setSelectedBands] = useState(['NIR (Band 8)', 'Red (Band 4)', 'Green (Band 3)']);
  
  // AI Query & Export States
  const [aiPrompt, setAiPrompt] = useState('Analyze NDVI vegetation anomaly over Southern Amazon region for Q3 2026');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [queryResult, setQueryResult] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  // Sync active tool when roleId changes
  useEffect(() => {
    const newRole = getRoleById(roleId);
    if (!localStorage.getItem('satquery_role')) {
      localStorage.setItem('satquery_role', roleId);
    }
    setActiveToolId(newRole.defaultTool || newRole.focusAreas[0].id);
    setActiveDatasetId(newRole.datasets[0].id);
    setQueryResult(null);
  }, [roleId]);

  const activeDataset = role.datasets.find((d) => d.id === activeDatasetId) || role.datasets[0];
  const currentAnalytics = role.analytics[activeToolId] || role.analytics[Object.keys(role.analytics)[0]];

  // Handle Role Switch
  const handleRoleSwitch = (newRoleId) => {
    setUserRole(newRoleId);
    navigate(`/dashboard/${newRoleId}`);
  };

  // Handle Sign Out (Preserves role preference, clears active session)
  const handleSignOut = () => {
    logoutUser();
    navigate('/login', { replace: true });
  };

  // Export Data Handler (Generates CSV download)
  const handleExportData = () => {
    const timestamp = new Date().toISOString();
    const csvContent = [
      ['SatQuery AI Export Metadata', 'Value'],
      ['Timestamp', timestamp],
      ['Role Workspace', role.label],
      ['Active Tool', activeToolId],
      ['Dataset', activeDataset.name],
      ['Resolution', resolution],
      ['Selected Layer', selectedLayer],
      ['Bands', `"${selectedBands.join('; ')}"`],
      ['', ''],
      ['Metric Name', 'Value / Change', 'Status'],
      ...currentAnalytics.map(a => [`"${a.name}"`, `"${a.change}"`, `"${a.status}"`])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `SatQuery_${role.id}_${activeToolId}_Export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Trigger Toast
    setToast('✓ Data exported successfully (CSV)');
    setTimeout(() => setToast(null), 3000);
  };

  // Run AI Query Handler
  const handleRunAiQuery = (e) => {
    if (e) e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsAnalyzing(true);
    setQueryResult(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      setQueryResult({
        region: 'Southern Amazon Basin',
        index: 'NDVI',
        trend: '+14.2%',
        confidence: '92.4%',
        observation: 'Vegetation anomaly & dense canopy expansion detected in Q3 2026 satellite pass.'
      });
      setToast('✓ AI Satellite Analysis Complete');
      setTimeout(() => setToast(null), 3500);
    }, 1200);
  };

  // Current Mode Text calculation
  const getModeText = () => {
    switch (activeToolId) {
      case 'multispectral': return 'Multispectral Analysis — 24 Spectral Bands Active';
      case 'change-detection': return 'Change Detection — Temporal Comparison Active';
      case 'spectral-index': return 'Spectral Index Calculator — Live Index Analysis';
      case 'dataset-comparison': return 'Dataset Comparison — Multi-Sensor Cross Calibration';
      case 'guided-explorer': return 'Guided Explorer — Interactive Student Mode';
      case 'vector-layers': return 'GIS Vector Layers — Spatial Classification Mode';
      case 'multi-project': return 'Enterprise Multi-Project — 12 Satellites Live Stream';
      default: return `${role.label} Mode Active`;
    }
  };

  return (
    <div className="dashboard-page-container">
      {/* Toast Notification */}
      <ToastNotification message={toast} />

      {/* Dashboard Top Navbar */}
      <nav className="dashboard-nav">
        <BrandLogo size="md" />

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="dashboard-role-badge">
            <IconComp size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
            <span>{role.label} Workspace</span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {Object.values(rolesConfig).map((r) => (
              <button
                key={r.id}
                onClick={() => handleRoleSwitch(r.id)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: r.id === role.id ? '1px solid var(--sq-blue)' : '1px solid transparent',
                  background: r.id === role.id ? 'rgba(9, 122, 254, 0.2)' : 'transparent',
                  color: r.id === role.id ? 'var(--sq-white)' : 'var(--sq-text-muted)',
                  fontSize: '11px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 180ms ease'
                }}
              >
                {r.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleSignOut}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              background: 'rgba(0, 22, 46, 0.8)',
              border: '1px solid var(--sq-border)',
              color: 'var(--sq-text-secondary)',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </nav>

      {/* Hero Welcome Banner */}
      <div
        style={{
          background: 'linear-gradient(90deg, rgba(6, 37, 69, 0.95), rgba(0, 22, 46, 0.8))',
          borderBottom: '1px solid var(--sq-border)',
          padding: '24px 32px'
        }}
      >
        <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--sq-white)' }}>
                {role.welcome}
              </h1>
              <span style={{ fontSize: '12px', color: 'var(--sq-success)', background: 'rgba(50, 232, 121, 0.12)', padding: '2px 8px', borderRadius: '12px', border: '1px solid var(--sq-success-dark)' }}>
                ● AI Stream Active
              </span>
            </div>
            <p className="subtitle" style={{ fontSize: '13px' }}>
              {role.subtitle}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div
              style={{
                padding: '8px 16px',
                background: 'rgba(0, 22, 46, 0.7)',
                border: '1px solid var(--sq-blue-mid)',
                borderRadius: '8px',
                textAlign: 'right'
              }}
            >
              <div style={{ fontSize: '10px', color: 'var(--sq-text-muted)', textTransform: 'uppercase' }}>Current Mode</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--sq-cyan)' }}>{getModeText()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <main className="dashboard-layout-main">
        {/* Left Side Control Panel */}
        <aside className="dash-panel">
          <h2 className="dash-title">
            <Layers size={18} style={{ color: 'var(--sq-cyan)' }} />
            <span>Analysis Tools</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            {role.focusAreas.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveToolId(tool.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  background: activeToolId === tool.id ? 'var(--sq-blue)' : 'rgba(0, 22, 46, 0.6)',
                  border: activeToolId === tool.id ? '1px solid var(--sq-blue-hover)' : '1px solid var(--sq-border)',
                  color: 'var(--sq-white)',
                  fontSize: '13px',
                  fontWeight: activeToolId === tool.id ? '600' : '400',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 180ms ease'
                }}
              >
                <span>{tool.label}</span>
                <ChevronRight size={14} style={{ opacity: activeToolId === tool.id ? 1 : 0.4 }} />
              </button>
            ))}
          </div>

          <h2 className="dash-title">
            <Database size={18} style={{ color: 'var(--sq-cyan)' }} />
            <span>Active Datasets</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {role.datasets.map((dataset) => {
              const isSelected = activeDatasetId === dataset.id;
              return (
                <div
                  key={dataset.id}
                  onClick={() => setActiveDatasetId(dataset.id)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '6px',
                    background: isSelected ? 'rgba(9, 122, 254, 0.15)' : 'rgba(0, 22, 46, 0.5)',
                    border: isSelected ? '1px solid var(--sq-blue)' : '1px solid rgba(27, 91, 149, 0.3)',
                    fontSize: '12px',
                    color: isSelected ? 'var(--sq-white)' : 'var(--sq-text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 180ms ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isSelected ? 'var(--sq-cyan)' : 'var(--sq-blue-mid)' }} />
                    <span style={{ fontWeight: isSelected ? '600' : '400' }}>{dataset.name}</span>
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--sq-text-muted)' }}>{dataset.resolution}</span>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Center Remote Sensing Interactive Map Workspace */}
        <section className="dash-panel" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Central Dynamic View Switching */}
          <div style={{ flex: 1, position: 'relative', overflowY: 'auto' }}>
            {/* Top Toolbar overlay on map */}
            <div
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 10,
                background: 'rgba(0, 22, 46, 0.9)',
                borderBottom: '1px solid var(--sq-border)',
                padding: '10px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ fontSize: '12px', color: 'var(--sq-text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--sq-cyan)', fontWeight: '600' }}>Dataset: {activeDataset.name}</span>
                <span style={{ color: 'var(--sq-blue-mid)' }}>|</span>
                <span>{activeDataset.bands}</span>
              </div>

              <button
                onClick={handleExportData}
                className="map-control-btn"
                style={{ background: 'var(--sq-blue)', borderColor: 'var(--sq-blue-hover)' }}
              >
                <Download size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                Export Data
              </button>
            </div>

            {/* Interactive View Routing inside Map Card */}
            {role.id === 'researcher' && (
              <>
                {activeToolId === 'multispectral' && (
                  <div>
                    <MultispectralView
                      activeDataset={activeDataset}
                      selectedLayer={selectedLayer}
                      setSelectedLayer={setSelectedLayer}
                      resolution={resolution}
                      setResolution={setResolution}
                      selectedBands={selectedBands}
                      setSelectedBands={setSelectedBands}
                    />
                    <div style={{ position: 'relative', height: '320px', margin: '0 16px' }}>
                      <img src={EARTH_BG_URL} alt="Remote Sensing View" className="map-view-img" style={{ borderRadius: '8px', border: '1px solid var(--sq-border)' }} />
                    </div>
                  </div>
                )}
                {activeToolId === 'change-detection' && <ChangeDetectionView activeDataset={activeDataset} />}
                {activeToolId === 'spectral-index' && <SpectralIndexCalculator />}
                {activeToolId === 'dataset-comparison' && <DatasetComparisonView />}
              </>
            )}

            {role.id === 'student' && <StudentWorkspaceView activeTool={activeToolId} />}
            {role.id === 'gis-analyst' && <GisAnalystView />}
            {role.id === 'organization' && <OrganizationView />}
          </div>

          {/* AI Query Result Banner if available */}
          {queryResult && (
            <div
              style={{
                margin: '12px 16px',
                padding: '12px 16px',
                background: 'rgba(9, 122, 254, 0.12)',
                border: '1px solid var(--sq-blue)',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontWeight: '700', color: 'var(--sq-cyan)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} /> AI Observation: {queryResult.region}
                </span>
                <span style={{ color: 'var(--sq-success)', fontWeight: '600' }}>{queryResult.confidence} Confidence</span>
              </div>
              <p style={{ color: 'var(--sq-text-secondary)' }}>{queryResult.observation}</p>
            </div>
          )}

          {/* Natural AI Prompt Bar at Bottom */}
          <form
            onSubmit={handleRunAiQuery}
            style={{
              margin: '12px 16px 16px 16px',
              background: 'rgba(0, 22, 46, 0.9)',
              border: '1px solid var(--sq-blue)',
              borderRadius: '8px',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Sparkles size={18} style={{ color: 'var(--sq-cyan)', flexShrink: 0 }} />
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Ask SatQuery AI to analyze any satellite region on Earth..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--sq-white)',
                fontFamily: 'var(--sq-font)',
                fontSize: '13px'
              }}
            />
            <button
              type="submit"
              disabled={isAnalyzing}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                background: 'var(--sq-blue)',
                border: 'none',
                color: 'var(--sq-white)',
                fontSize: '12px',
                fontWeight: '600',
                cursor: isAnalyzing ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 size={14} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Analyzing...</span>
                </>
              ) : (
                <span>Run AI Query</span>
              )}
            </button>
          </form>
        </section>

        {/* Right Side Analytics Metrics Panel */}
        <aside className="dash-panel">
          <h2 className="dash-title">
            <BarChart3 size={18} style={{ color: 'var(--sq-cyan)' }} />
            <span>AI Analytics & Metrics</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {currentAnalytics.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '14px',
                  borderRadius: '8px',
                  background: 'rgba(0, 22, 46, 0.6)',
                  border: '1px solid var(--sq-blue-mid)'
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--sq-text-muted)', marginBottom: '4px' }}>
                  {item.name}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--sq-white)' }}>
                    {item.change}
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'rgba(50, 232, 121, 0.15)',
                      color: 'var(--sq-success)'
                    }}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 'auto',
              padding: '14px',
              borderRadius: '8px',
              background: 'rgba(9, 122, 254, 0.1)',
              border: '1px solid var(--sq-blue)',
              textAlign: 'center'
            }}
          >
            <Activity size={20} style={{ color: 'var(--sq-cyan)', margin: '0 auto 8px auto' }} />
            <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--sq-white)' }}>
              Tailored for {role.label}s
            </div>
            <div style={{ fontSize: '11px', color: 'var(--sq-text-secondary)', marginTop: '4px' }}>
              Optimized remote sensing AI models & spatial tools loaded.
            </div>
          </div>
        </aside>
      </main>

      <FooterStrip />
    </div>
  );
};
