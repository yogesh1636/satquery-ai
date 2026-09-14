import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

export const DatasetComparisonView = () => {
  const datasetDetails = {
    'sentinel-2': {
      name: 'Sentinel-2 L2A',
      agency: 'ESA / Copernicus',
      resolution: '10m / 20m / 60m',
      bands: '13 Spectral Bands (VNIR + SWIR)',
      temporal: '5 Days (Constellation 2A/2B)',
      swath: '290 km Swath Width',
      bestFor: 'Vegetation monitoring, coastal analysis, crop classification'
    },
    'landsat-9': {
      name: 'Landsat 9 OLI-2',
      agency: 'USGS / NASA',
      resolution: '15m (Panchromatic) / 30m / 100m (TIRS)',
      bands: '11 Bands (Optical + Thermal)',
      temporal: '8 Days (With Landsat 8)',
      swath: '185 km Swath Width',
      bestFor: 'Thermal anomaly detection, long-term climate trend analysis'
    },
    'modis': {
      name: 'MODIS Surface Reflectance',
      agency: 'NASA Terra/Aqua',
      resolution: '250m / 500m / 1000m',
      bands: '36 Spectral Bands',
      temporal: '1-2 Days (Daily Global)',
      swath: '2330 km Swath Width',
      bestFor: 'Global scale environmental monitoring, wildfire tracking'
    }
  };

  const [datasetA, setDatasetA] = useState('sentinel-2');
  const [datasetB, setDatasetB] = useState('landsat-9');

  const dsA = datasetDetails[datasetA];
  const dsB = datasetDetails[datasetB];

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Selector controls */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr', gap: '12px', alignItems: 'center' }}>
        <div>
          <label style={{ fontSize: '11px', color: 'var(--sq-text-muted)', display: 'block', marginBottom: '4px' }}>Select Dataset A:</label>
          <select
            value={datasetA}
            onChange={(e) => setDatasetA(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              background: 'rgba(0, 22, 46, 0.85)',
              border: '1px solid var(--sq-blue)',
              color: 'var(--sq-white)',
              fontSize: '13px',
              fontWeight: '600',
              outline: 'none'
            }}
          >
            <option value="sentinel-2">Sentinel-2 L2A</option>
            <option value="landsat-9">Landsat 9 OLI-2</option>
            <option value="modis">MODIS Surface Reflectance</option>
          </select>
        </div>

        <div style={{ textAlign: 'center', color: 'var(--sq-cyan)' }}>
          <ArrowLeftRight size={20} />
        </div>

        <div>
          <label style={{ fontSize: '11px', color: 'var(--sq-text-muted)', display: 'block', marginBottom: '4px' }}>Select Dataset B:</label>
          <select
            value={datasetB}
            onChange={(e) => setDatasetB(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              background: 'rgba(0, 22, 46, 0.85)',
              border: '1px solid var(--sq-blue)',
              color: 'var(--sq-white)',
              fontSize: '13px',
              fontWeight: '600',
              outline: 'none'
            }}
          >
            <option value="sentinel-2">Sentinel-2 L2A</option>
            <option value="landsat-9">Landsat 9 OLI-2</option>
            <option value="modis">MODIS Surface Reflectance</option>
          </select>
        </div>
      </div>

      {/* Comparison Grid Table */}
      <div
        style={{
          background: 'rgba(0, 22, 46, 0.75)',
          border: '1px solid var(--sq-border)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr 1fr',
            background: 'rgba(6, 37, 69, 0.9)',
            padding: '10px 16px',
            fontSize: '12px',
            fontWeight: '700',
            borderBottom: '1px solid var(--sq-border)'
          }}
        >
          <span>Specification</span>
          <span style={{ color: 'var(--sq-cyan)' }}>{dsA.name}</span>
          <span style={{ color: 'var(--sq-white)' }}>{dsB.name}</span>
        </div>

        <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', borderBottom: '1px solid rgba(27,91,149,0.3)', fontSize: '12px' }}>
          <span style={{ color: 'var(--sq-text-muted)' }}>Agency / Provider</span>
          <span>{dsA.agency}</span>
          <span>{dsB.agency}</span>
        </div>

        <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', borderBottom: '1px solid rgba(27,91,149,0.3)', fontSize: '12px' }}>
          <span style={{ color: 'var(--sq-text-muted)' }}>Spatial Resolution</span>
          <span style={{ color: 'var(--sq-success)', fontWeight: '600' }}>{dsA.resolution}</span>
          <span style={{ color: 'var(--sq-success)', fontWeight: '600' }}>{dsB.resolution}</span>
        </div>

        <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', borderBottom: '1px solid rgba(27,91,149,0.3)', fontSize: '12px' }}>
          <span style={{ color: 'var(--sq-text-muted)' }}>Spectral Bands</span>
          <span>{dsA.bands}</span>
          <span>{dsB.bands}</span>
        </div>

        <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', borderBottom: '1px solid rgba(27,91,149,0.3)', fontSize: '12px' }}>
          <span style={{ color: 'var(--sq-text-muted)' }}>Revisit Frequency</span>
          <span>{dsA.temporal}</span>
          <span>{dsB.temporal}</span>
        </div>

        <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', fontSize: '12px' }}>
          <span style={{ color: 'var(--sq-text-muted)' }}>Primary Use Case</span>
          <span style={{ color: 'var(--sq-text-secondary)' }}>{dsA.bestFor}</span>
          <span style={{ color: 'var(--sq-text-secondary)' }}>{dsB.bestFor}</span>
        </div>
      </div>
    </div>
  );
};
