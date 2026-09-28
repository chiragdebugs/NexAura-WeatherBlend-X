import React from 'react';
import type { LocationData } from '../../types/weather';
import { TargetIcon, CheckIcon } from './Icons';

interface TrustDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: LocationData;
}

export const TrustDetailModal: React.FC<TrustDetailModalProps> = ({
  isOpen,
  onClose,
  location,
}) => {
  if (!isOpen) return null;

  const sortedModels = [...location.models].sort((a, b) => b.weight - a.weight);
  const topModelsText = sortedModels
    .slice(0, 2)
    .map((m) => `${m.name} (${Math.round(m.weight * 100)}%)`)
    .join(' & ');

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(4, 16, 24, 0.78)',
        backdropFilter: 'blur(calc(10 * var(--u)))',
        WebkitBackdropFilter: 'blur(calc(10 * var(--u)))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 220,
      }}
      onClick={onClose}
    >
      <div
        className="aurora-card-glass"
        style={{
          width: 'calc(620 * var(--u))',
          maxWidth: '92vw',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: 'calc(24 * var(--u))',
          borderRadius: 'calc(24 * var(--u))',
          display: 'flex',
          flexDirection: 'column',
          gap: 'calc(16 * var(--u))',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(8 * var(--u))' }}>
              <TargetIcon size="calc(20 * var(--u))" style={{ color: 'var(--accent-ice)' }} />
              <h2 className="font-headline" style={{ fontSize: 'calc(18 * var(--u))', fontWeight: 700, color: '#ffffff' }}>
                Meteorological Trust Diagnostic Report
              </h2>
            </div>
            <p style={{ fontSize: 'calc(12 * var(--u))', color: 'rgba(255, 255, 255, 0.65)', marginTop: 'calc(2 * var(--u))' }}>
              Why WeatherBlend-X dynamically trusted {topModelsText} for {location.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="aurora-tool-glass"
            style={{
              padding: 'calc(4 * var(--u)) calc(10 * var(--u))',
              borderRadius: 'calc(8 * var(--u))',
              fontSize: 'calc(12 * var(--u))',
              color: '#ffffff',
            }}
          >
            Close
          </button>
        </div>

        {/* 4 Core Evidence Blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(10 * var(--u))' }}>
          {[
            {
              title: 'WRF Predicted Lower Conditional Error',
              detail: 'Gradient-boosted meta-learner predicts an expected residual error of only 4.8 mm for WRF under current high-CAPE boundary conditions, compared to 11.4 mm for synoptic GFS.',
            },
            {
              title: 'NCUM & WRF Agreement on Convective Onset',
              detail: 'Both meso-scale models independently predict the primary squall line arrival between 17:35 UTC and 18:00 UTC, reducing temporal uncertainty to under 25 minutes.',
            },
            {
              title: 'Atmospheric State Matches Convective Regime',
              detail: `Observed CAPE of ${location.cape} J/kg and steep low-level lapse rates strongly favor non-hydrostatic convective-permitting model physics over hydrostatic global grids.`,
            },
            {
              title: 'Model Disagreement Remains Within Historical Calibrated Bounds',
              detail: `The standard deviation across models (σ = 18.2 mm) is within the 82nd percentile of historical monsoon thunderstorm cases, permitting reliable conformal interval calibration.`,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                padding: 'calc(12 * var(--u)) calc(14 * var(--u))',
                borderRadius: 'calc(12 * var(--u))',
                display: 'flex',
                gap: 'calc(10 * var(--u))',
              }}
            >
              <div
                style={{
                  width: 'calc(18 * var(--u))',
                  height: 'calc(18 * var(--u))',
                  borderRadius: '50%',
                  background: 'rgba(74, 222, 128, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--status-green)',
                  flexShrink: 0,
                  marginTop: 'calc(2 * var(--u))',
                }}
              >
                <CheckIcon size="calc(11 * var(--u))" />
              </div>
              <div>
                <div style={{ fontSize: 'calc(13 * var(--u))', fontWeight: 600, color: '#ffffff' }}>{item.title}</div>
                <div style={{ fontSize: 'calc(11.5 * var(--u))', color: 'rgba(255, 255, 255, 0.8)', marginTop: 'calc(3 * var(--u))', lineHeight: 1.4 }}>
                  {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Summary */}
        <div
          style={{
            padding: 'calc(12 * var(--u))',
            background: 'rgba(158, 230, 255, 0.1)',
            border: '1px solid rgba(158, 230, 255, 0.25)',
            borderRadius: 'calc(10 * var(--u))',
            fontSize: 'calc(11.5 * var(--u))',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: 1.45,
          }}
        >
          <strong>Summary for Forecaster:</strong> High confidence in {location.blendedForecast} mm blended value ({location.leadTime}). Equal-weight averaging would have skewed rainfall due to synoptic bias. Dynamic weighting successfully protected the forecast for the prevailing {location.atmosphericRegime} regime.
        </div>
      </div>
    </div>
  );
};
