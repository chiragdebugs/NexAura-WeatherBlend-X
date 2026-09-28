import React from 'react';
import type { ModelContribution } from '../../types/weather';
import { TargetIcon } from '../common/Icons';

interface CardModelTrustProps {
  models: ModelContribution[];
  leadTime: string;
  onNavigateTrust?: () => void;
}

export const CardModelTrust: React.FC<CardModelTrustProps> = ({
  models,
  leadTime,
  onNavigateTrust,
}) => {
  return (
    <div
      className="aurora-card-glass aurora-sheen animate-right-2"
      style={{
        padding: 'calc(16 * var(--u)) calc(20 * var(--u))',
        display: 'flex',
        flexDirection: 'column',
        cursor: onNavigateTrust ? 'pointer' : 'default',
      }}
      onClick={onNavigateTrust}
      title="Click to view in-depth Model Trust Matrix"
    >
      {/* Title & Subtitle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(6 * var(--u))' }}>
            <TargetIcon size="calc(14 * var(--u))" style={{ color: 'var(--accent-ice)' }} />
            <span
              className="font-headline"
              style={{
                fontSize: 'calc(14.5 * var(--u))',
                fontWeight: 600,
                color: '#ffffff',
                letterSpacing: 'calc(-0.2 * var(--u))',
              }}
            >
              Model Trust
            </span>
          </div>
          <div
            style={{
              fontSize: 'calc(10.5 * var(--u))',
              color: 'rgba(255, 255, 255, 0.60)',
              marginTop: 'calc(1 * var(--u))',
            }}
          >
            Predicted reliability · {leadTime}
          </div>
        </div>

        {/* Small guideline badge */}
        <span
          style={{
            fontSize: 'calc(9.5 * var(--u))',
            color: 'rgba(255, 255, 255, 0.60)',
            textTransform: 'uppercase',
            letterSpacing: 'calc(0.4 * var(--u))',
          }}
        >
          Lower Err → Higher Wt
        </span>
      </div>

      {/* Model Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(10 * var(--u))', marginTop: 'calc(12 * var(--u))' }}>
        {models.map((model) => {
          const percentage = Math.round(model.weight * 100);
          return (
            <div key={model.name} style={{ display: 'flex', flexDirection: 'column', gap: 'calc(3 * var(--u))' }}>
              {/* Row Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'calc(6 * var(--u))' }}>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 'calc(12 * var(--u))',
                      fontWeight: 600,
                      color: '#ffffff',
                    }}
                  >
                    {model.name}
                  </span>
                  <span
                    style={{
                      fontSize: 'calc(10 * var(--u))',
                      color: 'rgba(255, 255, 255, 0.55)',
                    }}
                  >
                    Err: {model.predictedError} mm
                  </span>
                </div>

                <span
                  className="font-mono"
                  style={{
                    fontSize: 'calc(12.5 * var(--u))',
                    fontWeight: 600,
                    color: model.weight >= 0.4 ? 'var(--accent-ice)' : '#ffffff',
                  }}
                >
                  {percentage}%
                </span>
              </div>

              {/* Elegant thin horizontal glass bar / wave meter */}
              <div
                style={{
                  width: '100%',
                  height: 'calc(5 * var(--u))',
                  background: 'rgba(255, 255, 255, 0.12)',
                  borderRadius: 'calc(3 * var(--u))',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${percentage}%`,
                    background: model.name === 'WRF'
                      ? 'linear-gradient(90deg, rgba(255,255,255,0.7), #9ee6ff)'
                      : model.name === 'NCUM'
                      ? 'linear-gradient(90deg, rgba(255,255,255,0.75), #ffffff)'
                      : 'linear-gradient(90deg, rgba(255,255,255,0.4), rgba(255,255,255,0.65))',
                    borderRadius: 'calc(3 * var(--u))',
                    transition: 'width 0.8s var(--e-out)',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
