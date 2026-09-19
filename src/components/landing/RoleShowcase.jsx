import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FlaskConical, GraduationCap, Map, Building2, ArrowRight } from 'lucide-react';

export const RoleShowcase = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'researcher',
      title: 'Researcher',
      icon: FlaskConical,
      badge: 'Academic & Science',
      desc: 'Multispectral band analysis, spectral index calculations, cross-sensor dataset calibration, and scientific report exports.'
    },
    {
      id: 'student',
      title: 'Student',
      icon: GraduationCap,
      badge: 'Learning & Exploration',
      desc: 'Guided Earth Explorer tutorials, orbital mechanics quizzes, basic imagery layers, and interactive AI query sandbox.'
    },
    {
      id: 'gis-analyst',
      title: 'GIS Analyst',
      icon: Map,
      badge: 'Professional Geospatial',
      desc: 'Vector parcel layers, LULC land-use classification, 3D raster blend opacity, and GeoTIFF / GeoJSON exports.'
    },
    {
      id: 'organization',
      title: 'Organization',
      icon: Building2,
      badge: 'Enterprise & Gov',
      desc: 'Multi-project asset monitoring, high-frequency constellation feeds, team role access control, and ESG compliance auditing.'
    }
  ];

  return (
    <section
      style={{
        padding: '100px 32px',
        background: 'var(--sq-bg-dark)',
        borderBottom: '1px solid var(--sq-border)'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ color: 'var(--sq-cyan)', fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '12px' }}>
            PERSONALIZED WORKSPACES
          </div>
          <h2 style={{ fontSize: '42px', fontWeight: '800', color: 'var(--sq-white)', marginBottom: '16px' }}>
            Built for Everyone Who Works With Earth Data.
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--sq-text-secondary)', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
            OrbitIQ tailors AI models, raster layers, and analytical tooling to match your professional role and workflow.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }} className="roles-showcase-grid">
          {roles.map(r => {
            const Icon = r.icon;
            return (
              <div
                key={r.id}
                onClick={() => navigate(`/register/${r.id}`)}
                style={{
                  padding: '28px 24px',
                  borderRadius: '14px',
                  background: 'linear-gradient(180deg, rgba(6, 37, 69, 0.7), rgba(0, 22, 46, 0.9))',
                  border: '1px solid var(--sq-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  cursor: 'pointer',
                  transition: 'all 250ms ease'
                }}
                className="role-card-hover"
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
                  <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--sq-cyan)', background: 'rgba(9, 122, 254, 0.15)', padding: '2px 8px', borderRadius: '12px' }}>
                    {r.badge}
                  </span>
                </div>

                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--sq-white)', marginBottom: '8px' }}>
                    {r.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--sq-text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
                    {r.desc}
                  </p>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--sq-cyan)', fontSize: '12px', fontWeight: '700' }}>
                  <span>Launch {r.title} Workspace</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RoleShowcase;
