import React, { useState } from 'react';
import { LayersIcon, TargetIcon } from '../components/common/Icons';

export const PipelineView: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(3); // Default to Predictive Trust Engine

  const pipelineSteps = [
    {
      id: 0,
      title: 'NWP / AI Models',
      tag: 'Raw Sources',
      desc: 'Ingests NCUM (4km), WRF (3km), GFS (13km), and ECMWF AIFS numerical & neural weather predictions.',
      specs: 'NetCDF4/GRIB2 · 4 active models · 00/06/12/18 UTC runs',
    },
    {
      id: 1,
      title: 'Data Harmonization',
      tag: 'Spatial Standardization',
      desc: 'Conservative regridding to standard 3km NCMRWF national coordinate reference grid with unified temporal indexing.',
      specs: 'Bilinear & conservative spatial interpolation · Topographic correction',
    },
    {
      id: 2,
      title: 'Feature Engineering',
      tag: 'State & Residuals',
      desc: 'Extracts convective parameters (CAPE, CIN, shear), recent 24h forecast residuals, topography, and synoptic regime classification.',
      specs: '14 atmospheric predictors · Real-time IMD AWS residual vector',
    },
    {
      id: 3,
      title: 'Predictive Trust Engine',
      tag: 'AI Meta-Learner',
      desc: 'Gradient boosted error meta-learner (NGBoost/XGBoost) predicts conditional future error distribution |ε̂_i| and variance σ̂_i for each model.',
      specs: 'Probabilistic regression · Natural gradient boosting · Regime conditioned',
    },
    {
      id: 4,
      title: 'Risk-Aware Weight Generator',
      tag: 'Softmax Formulation',
      desc: 'Computes model risk R_i = |ε̂_i| + λ·σ̂_i and applies temperature-scaled softmax: w_i = exp(-R_i / τ) / ∑ exp(-R_j / τ).',
      specs: 'λ = 0.35 · τ = 0.45 · Enforces convex sum(w_i) = 1.0',
    },
    {
      id: 5,
      title: 'Probabilistic Blending',
      tag: 'Density Blending',
      desc: 'Blends continuous probability distributions of precipitation, temperature, and wind using dynamic spatial weights.',
      specs: 'Kernel mixture density estimation · Conserves mass & energy flux',
    },
    {
      id: 6,
      title: 'Conformal Calibration',
      tag: 'Finite-Sample Coverage',
      desc: 'Applies split conformal prediction with non-exchangeability weighting to generate mathematically guaranteed 90% prediction intervals.',
      specs: '1 - α = 0.90 coverage · Adaptive to non-stationary monsoon shifts',
    },
    {
      id: 7,
      title: 'Operational Forecast API',
      tag: 'Dissemination Layer',
      desc: 'High-throughput low-latency WebSocket and REST endpoints feeding disaster management agencies, dashboards, and automated alert systems.',
      specs: 'Sub-40ms response · GeoJSON/Protobuf · OpenAPI 3.1 compliant',
    },
  ];

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
            <LayersIcon size="calc(20 * var(--u))" style={{ color: 'var(--accent-ice)' }} />
            <h1 className="font-headline" style={{ fontSize: 'calc(22 * var(--u))', fontWeight: 700, color: '#ffffff' }}>
              WeatherBlend-X Technical Pipeline Architecture
            </h1>
          </div>
          <p style={{ fontSize: 'calc(12.5 * var(--u))', color: 'rgba(255, 255, 255, 0.7)', marginTop: 'calc(2 * var(--u))' }}>
            End-to-end meteorological AI pipeline from NWP raw ingestion to calibrated probabilistic conformal inference
          </p>
        </div>

        <div className="aurora-tool-glass" style={{ padding: 'calc(6 * var(--u)) calc(12 * var(--u))', borderRadius: 'calc(12 * var(--u))' }}>
          <span className="font-mono" style={{ fontSize: 'calc(11.5 * var(--u))', color: 'var(--accent-ice)' }}>
            SIH 2026 · PS 26081
          </span>
        </div>
      </div>

      {/* Main Flow: 8 Glass Pipeline Modules */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'calc(12 * var(--u))',
        }}
      >
        {pipelineSteps.map((step) => {
          const isActive = activeStep === step.id;
          return (
            <div
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className="aurora-card-glass"
              style={{
                padding: 'calc(14 * var(--u)) calc(16 * var(--u))',
                borderRadius: 'calc(16 * var(--u))',
                cursor: 'pointer',
                border: isActive ? '1px solid var(--accent-ice)' : '1px solid rgba(255, 255, 255, 0.16)',
                background: isActive
                  ? 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.22) 100%)'
                  : undefined,
                transition: 'all 0.25s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-mono" style={{ fontSize: 'calc(10.5 * var(--u))', color: 'rgba(255, 255, 255, 0.6)' }}>
                  STAGE 0{step.id + 1}
                </span>
                <span
                  style={{
                    fontSize: 'calc(9.5 * var(--u))',
                    padding: 'calc(2 * var(--u)) calc(6 * var(--u))',
                    borderRadius: 'calc(6 * var(--u))',
                    background: isActive ? 'var(--accent-ice)' : 'rgba(255, 255, 255, 0.1)',
                    color: isActive ? '#041018' : '#ffffff',
                    fontWeight: 600,
                  }}
                >
                  {step.tag}
                </span>
              </div>

              <div
                className="font-headline"
                style={{
                  fontSize: 'calc(14 * var(--u))',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginTop: 'calc(8 * var(--u))',
                }}
              >
                {step.title}
              </div>

              <p style={{ fontSize: 'calc(11 * var(--u))', color: 'rgba(255, 255, 255, 0.78)', marginTop: 'calc(4 * var(--u))', lineHeight: 1.35 }}>
                {step.desc}
              </p>

              <div
                className="font-mono"
                style={{
                  fontSize: 'calc(9.5 * var(--u))',
                  color: 'var(--accent-ice)',
                  marginTop: 'calc(8 * var(--u))',
                  borderTop: '1px solid rgba(255, 255, 255, 0.10)',
                  paddingTop: 'calc(6 * var(--u))',
                }}
              >
                {step.specs}
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Dive on Section 26: Predictive Trust Engine Visual */}
      <div className="aurora-card-glass aurora-sheen" style={{ padding: 'calc(18 * var(--u)) calc(22 * var(--u))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(8 * var(--u))', marginBottom: 'calc(14 * var(--u))' }}>
          <TargetIcon size="calc(18 * var(--u))" style={{ color: 'var(--accent-ice)' }} />
          <span className="font-headline" style={{ fontSize: 'calc(16 * var(--u))', fontWeight: 700, color: '#ffffff' }}>
            Predictive Trust Engine: AI Meta-Learner Architecture
          </span>
        </div>

        {/* 3-Tier Visual Schema */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 40px 1fr 40px 1fr',
            alignItems: 'center',
            gap: 'calc(8 * var(--u))',
          }}
        >
          {/* Input Features */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: 'calc(14 * var(--u))',
              borderRadius: 'calc(12 * var(--u))',
              border: '1px solid rgba(255, 255, 255, 0.14)',
            }}
          >
            <div style={{ fontSize: 'calc(11 * var(--u))', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600 }}>
              Input Conditioning Features
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'calc(6 * var(--u))',
                marginTop: 'calc(8 * var(--u))',
                fontSize: 'calc(11 * var(--u))',
                color: '#ffffff',
              }}
            >
              <div>• Historical Model Skill</div>
              <div>• Current Atmospheric State</div>
              <div>• Model Disagreement (σ)</div>
              <div>• Forecast Trajectory</div>
              <div>• Recent Residuals (IMD)</div>
              <div>• Spatial Region & Terrain</div>
              <div>• Season & Diurnal Cycle</div>
              <div>• Forecast Lead Time</div>
              <div>• Convective Regime</div>
            </div>
          </div>

          {/* Arrow 1 */}
          <div style={{ textAlign: 'center', fontSize: 'calc(20 * var(--u))', color: 'var(--accent-ice)' }}>
            →
          </div>

          {/* AI Meta Learner Core */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(158, 230, 255, 0.15), rgba(255, 255, 255, 0.12))',
              padding: 'calc(14 * var(--u))',
              borderRadius: 'calc(12 * var(--u))',
              border: '1px solid var(--accent-ice)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 'calc(11 * var(--u))', textTransform: 'uppercase', color: 'var(--accent-ice)', fontWeight: 600 }}>
              AI Meta-Learner
            </div>
            <div className="font-headline" style={{ fontSize: 'calc(15 * var(--u))', fontWeight: 700, color: '#ffffff', marginTop: 'calc(6 * var(--u))' }}>
              NGBoost / XGBoost
            </div>
            <div style={{ fontSize: 'calc(10.5 * var(--u))', color: 'rgba(255, 255, 255, 0.75)', marginTop: 'calc(4 * var(--u))' }}>
              Natural Gradient Boosting for Probabilistic Residual Estimation
            </div>
          </div>

          {/* Arrow 2 */}
          <div style={{ textAlign: 'center', fontSize: 'calc(20 * var(--u))', color: 'var(--accent-ice)' }}>
            →
          </div>

          {/* Outputs */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: 'calc(14 * var(--u))',
              borderRadius: 'calc(12 * var(--u))',
              border: '1px solid rgba(255, 255, 255, 0.14)',
            }}
          >
            <div style={{ fontSize: 'calc(11 * var(--u))', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600 }}>
              Outputs & Weighting
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(6 * var(--u))', marginTop: 'calc(8 * var(--u))', fontSize: 'calc(11 * var(--u))' }}>
              <div style={{ color: '#ffffff' }}>✓ Expected Future Error |ε̂_i|</div>
              <div style={{ color: '#ffffff' }}>✓ Error Uncertainty σ̂_i</div>
              <div style={{ color: '#ffffff' }}>✓ Failure Tail Probability</div>
              <div style={{ color: 'var(--accent-ice)', fontWeight: 600 }}>↓ Dynamic Weight Generator w_i</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
