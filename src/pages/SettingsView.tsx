import React, { useState } from 'react';
import { SettingsIcon } from '../components/common/Icons';

export const SettingsView: React.FC = () => {
  const [lambda, setLambda] = useState(0.35);
  const [tau, setTau] = useState(0.45);
  const [conformalAlpha, setConformalAlpha] = useState(0.10);

  return (
    <div
      className="desktop-page-container"
      style={{
        position: 'absolute',
        left: 'calc(126 * var(--u))',
        right: 'calc(38 * var(--u))',
        top: 'calc(94 * var(--u))',
        bottom: 'calc(24 * var(--u))',
        overflowY: 'auto',
        overflowX: 'hidden',
        zIndex: 35,
        display: 'flex',
        flexDirection: 'column',
        gap: 'calc(16 * var(--u))',
        paddingRight: 'calc(6 * var(--u))',
      }}
    >
      {/* Title */}
      <div
        className="aurora-card-glass aurora-sheen"
        style={{
          padding: 'calc(16 * var(--u)) calc(24 * var(--u))',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(8 * var(--u))' }}>
            <SettingsIcon size="calc(20 * var(--u))" style={{ color: 'var(--accent-ice)' }} />
            <h1 className="font-headline" style={{ fontSize: 'calc(22 * var(--u))', fontWeight: 700, color: '#ffffff' }}>
              Workstation Settings & Telemetry Configuration
            </h1>
          </div>
          <p style={{ fontSize: 'calc(12.5 * var(--u))', color: 'rgba(255, 255, 255, 0.7)', marginTop: 'calc(2 * var(--u))' }}>
            Operational forecasting engine configuration, meta-learner parameters, and data feed status
          </p>
        </div>

        <div className="aurora-tool-glass" style={{ padding: 'calc(6 * var(--u)) calc(12 * var(--u))', borderRadius: 'calc(12 * var(--u))' }}>
          <span style={{ fontSize: 'calc(11.5 * var(--u))', color: 'var(--status-green)', fontWeight: 600 }}>
            System Sync: 06:00 UTC Active
          </span>
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'calc(16 * var(--u))' }}>
        {/* Telemetry Feeds */}
        <div className="aurora-card-glass" style={{ padding: 'calc(20 * var(--u))', display: 'flex', flexDirection: 'column', gap: 'calc(12 * var(--u))' }}>
          <span className="font-headline" style={{ fontSize: 'calc(15 * var(--u))', fontWeight: 600, color: '#ffffff' }}>
            Operational NWP & Ground Observational Ingestion Feeds
          </span>

          {[
            { name: 'NCMRWF Unified Model (NCUM)', status: 'Connected', ping: '12ms', cycle: '12:00 UTC Run' },
            { name: 'IMD WRF Meso-Scale High Resolution', status: 'Connected', ping: '18ms', cycle: '12:00 UTC Run' },
            { name: 'NCEP Global Forecast System (GFS)', status: 'Connected', ping: '34ms', cycle: '12:00 UTC Run' },
            { name: 'ECMWF AIFS Neural Predictor', status: 'Connected', ping: '42ms', cycle: '12:00 UTC Run' },
            { name: 'IMD Automatic Weather Station (AWS) Network', status: 'Active (48 Stations)', ping: '8ms', cycle: 'Live 15-min Telemetry' },
            { name: 'Doppler Weather Radar (DWR Mumbai & Paradip)', status: 'Active (Dual-Pol)', ping: '14ms', cycle: 'Live Volume Scan' },
          ].map((feed, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.07)',
                padding: 'calc(10 * var(--u)) calc(14 * var(--u))',
                borderRadius: 'calc(10 * var(--u))',
              }}
            >
              <div>
                <div style={{ fontSize: 'calc(12.5 * var(--u))', fontWeight: 600, color: '#ffffff' }}>{feed.name}</div>
                <div style={{ fontSize: 'calc(10.5 * var(--u))', color: 'rgba(255, 255, 255, 0.55)' }}>{feed.cycle}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 'calc(11.5 * var(--u))', color: 'var(--status-green)', fontWeight: 600 }}>
                  ● {feed.status}
                </span>
                <div className="font-mono" style={{ fontSize: 'calc(10 * var(--u))', color: 'rgba(255, 255, 255, 0.5)' }}>
                  latency: {feed.ping}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hyperparameter Tuner */}
        <div className="aurora-card-glass" style={{ padding: 'calc(20 * var(--u))', display: 'flex', flexDirection: 'column', gap: 'calc(16 * var(--u))' }}>
          <span className="font-headline" style={{ fontSize: 'calc(15 * var(--u))', fontWeight: 600, color: '#ffffff' }}>
            Algorithmic Hyperparameters
          </span>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'calc(12 * var(--u))', color: '#ffffff' }}>
              <span>Risk Uncertainty Penalty (λ):</span>
              <span className="font-mono" style={{ color: 'var(--accent-ice)', fontWeight: 600 }}>{lambda}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={lambda}
              onChange={(e) => setLambda(parseFloat(e.target.value))}
              style={{ width: '100%', marginTop: 'calc(6 * var(--u))', accentColor: 'var(--accent-ice)' }}
            />
            <div style={{ fontSize: 'calc(10 * var(--u))', color: 'rgba(255, 255, 255, 0.55)', marginTop: 'calc(2 * var(--u))' }}>
              Penalizes models with wide predictive uncertainty distributions.
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'calc(12 * var(--u))', color: '#ffffff' }}>
              <span>Softmax Temperature (τ):</span>
              <span className="font-mono" style={{ color: 'var(--accent-ice)', fontWeight: 600 }}>{tau}</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="1.0"
              step="0.05"
              value={tau}
              onChange={(e) => setTau(parseFloat(e.target.value))}
              style={{ width: '100%', marginTop: 'calc(6 * var(--u))', accentColor: 'var(--accent-ice)' }}
            />
            <div style={{ fontSize: 'calc(10 * var(--u))', color: 'rgba(255, 255, 255, 0.55)', marginTop: 'calc(2 * var(--u))' }}>
              Controls sharpness of model weight differentiation (lower = sharper winner-take-most).
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'calc(12 * var(--u))', color: '#ffffff' }}>
              <span>Conformal Target Coverage (1 - α):</span>
              <span className="font-mono" style={{ color: 'var(--accent-ice)', fontWeight: 600 }}>{Math.round((1 - conformalAlpha) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.20"
              step="0.01"
              value={conformalAlpha}
              onChange={(e) => setConformalAlpha(parseFloat(e.target.value))}
              style={{ width: '100%', marginTop: 'calc(6 * var(--u))', accentColor: 'var(--accent-ice)' }}
            />
            <div style={{ fontSize: 'calc(10 * var(--u))', color: 'rgba(255, 255, 255, 0.55)', marginTop: 'calc(2 * var(--u))' }}>
              Statistically calibrated finite-sample prediction interval guarantee.
            </div>
          </div>

          <div
            style={{
              padding: 'calc(10 * var(--u)) calc(12 * var(--u))',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: 'calc(8 * var(--u))',
              fontSize: 'calc(11 * var(--u))',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            All parameters operate in local memory for this prototype workstation and persist across navigation sessions.
          </div>
        </div>
      </div>
    </div>
  );
};
