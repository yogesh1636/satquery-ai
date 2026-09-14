import React, { useState } from 'react';
import { Building2, Shield, Users, FileText, Activity, CheckCircle } from 'lucide-react';

export const OrganizationView = () => {
  const [activeProject, setActiveProject] = useState('amazon');

  const projects = [
    { id: 'amazon', name: 'Amazon Basin Forestry Asset', area: '14,500 km²', status: 'Active Monitoring', alert: 'No Deforestation Violations' },
    { id: 'sahara', name: 'Sahara Solar Infrastructure', area: '2,800 km²', status: 'Operational', alert: 'Panel Dust Index Optimal' },
    { id: 'delta', name: 'Indus Delta Coastal Flood Monitoring', area: '5,200 km²', status: 'Real-Time Risk', alert: 'Tide Height Normal' }
  ];

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Enterprise Multi-Project Monitoring Grid */}
      <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--sq-white)', textTransform: 'uppercase' }}>
        Enterprise Monitored Infrastructure Projects
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
        {projects.map((p) => (
          <div
            key={p.id}
            onClick={() => setActiveProject(p.id)}
            style={{
              padding: '14px',
              borderRadius: '8px',
              background: activeProject === p.id ? 'rgba(9, 122, 254, 0.15)' : 'rgba(0, 22, 46, 0.65)',
              border: activeProject === p.id ? '1px solid var(--sq-blue)' : '1px solid var(--sq-border)',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--sq-white)' }}>{p.name}</span>
              <span style={{ fontSize: '10px', color: 'var(--sq-success)', background: 'rgba(50,232,121,0.12)', padding: '2px 6px', borderRadius: '4px' }}>
                {p.status}
              </span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--sq-text-secondary)', marginBottom: '4px' }}>
              Coverage Area: {p.area}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--sq-cyan)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle size={12} /> {p.alert}
            </div>
          </div>
        ))}
      </div>

      {/* ESG Compliance Indicator Banner */}
      <div
        style={{
          background: 'rgba(0, 22, 46, 0.85)',
          border: '1px solid var(--sq-blue-mid)',
          borderRadius: '8px',
          padding: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Shield size={22} style={{ color: 'var(--sq-cyan)' }} />
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--sq-white)' }}>
              Automated ESG Carbon Sink & Compliance Audit
            </div>
            <div style={{ fontSize: '11px', color: 'var(--sq-text-secondary)' }}>
              Certified satellite verification for EU Deforestation Regulation (EUDR) & ISO 14064
            </div>
          </div>
        </div>

        <button
          style={{
            padding: '6px 14px',
            borderRadius: '6px',
            background: 'var(--sq-blue)',
            border: 'none',
            color: 'var(--sq-white)',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Download ESG Audit Report (PDF)
        </button>
      </div>
    </div>
  );
};
