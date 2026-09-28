import React from 'react';
import type { ModelContribution } from '../../types/weather';

interface ModelDisagreementPanelProps {
  models: ModelContribution[];
  blendedForecast: number;
  disagreementLevel: string;
}

export const ModelDisagreementPanel: React.FC<ModelDisagreementPanelProps> = ({
  models,
  blendedForecast,
  disagreementLevel,
}) => {
  // Max scale mm for the divergence bars
  const maxRain = 100;

  return (
    <div
      className="aurora-tool-glass"
      style={{
        padding: 'calc(12 * var(--u)) calc(16 * var(--u))',
        borderRadius: 'calc(16 * var(--u))',
        display: 'flex',
        flexDirection: 'column',
        gap: 'calc(8 * var(--u))',
      }}
    >
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          className="font-headline"
          style={{
            fontSize: 'calc(12.5 * var(--u))',
            fontWeight: 600,
            color: '#ffffff',
            letterSpacing: 'calc(-0.2 * var(--u))',
            textTransform: 'uppercase',
          }}
        >
          Model Disagreement
        </span>
        <span
          style={{
            fontSize: 'calc(11 * var(--u))',
            color: disagreementLevel === 'Moderate' ? 'rgba(255, 255, 255, 0.85)' : 'var(--status-amber)',
            fontWeight: 500,
          }}
        >
          {disagreementLevel} disagreement
        </span>
      </div>

      {/* Horizontal Divergence Lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(5 * var(--u))' }}>
        {models.map((m) => {
          const widthPct = Math.min(100, Math.max(10, (m.forecast / maxRain) * 100));
          return (
            <div
              key={m.name}
              style={{
                display: 'grid',
                gridTemplateColumns: 'calc(45 * var(--u)) 1fr calc(48 * var(--u))',
                alignItems: 'center',
                gap: 'calc(8 * var(--u))',
              }}
            >
              <span className="font-mono" style={{ fontSize: 'calc(11 * var(--u))', color: 'rgba(255, 255, 255, 0.7)' }}>
                {m.name}
              </span>
              <div
                style={{
                  height: 'calc(4 * var(--u))',
                  background: 'rgba(255, 255, 255, 0.10)',
                  borderRadius: 'calc(2 * var(--u))',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${widthPct}%`,
                    background: 'rgba(255, 255, 255, 0.55)',
                    borderRadius: 'calc(2 * var(--u))',
                  }}
                />
              </div>
              <span className="font-mono" style={{ fontSize: 'calc(11 * var(--u))', color: '#ffffff', textAlign: 'right' }}>
                {m.forecast} mm
              </span>
            </div>
          );
        })}

        {/* Final Blended Line (dominant) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'calc(65 * var(--u)) 1fr calc(48 * var(--u))',
            alignItems: 'center',
            gap: 'calc(8 * var(--u))',
            marginTop: 'calc(3 * var(--u))',
            paddingTop: 'calc(4 * var(--u))',
            borderTop: '1px dashed rgba(255, 255, 255, 0.18)',
          }}
        >
          <span
            className="font-headline"
            style={{
              fontSize: 'calc(11.5 * var(--u))',
              fontWeight: 600,
              color: 'var(--accent-ice)',
            }}
          >
            Final Blend
          </span>
          <div
            style={{
              height: 'calc(6 * var(--u))',
              background: 'rgba(255, 255, 255, 0.12)',
              borderRadius: 'calc(3 * var(--u))',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${(blendedForecast / maxRain) * 100}%`,
                background: 'linear-gradient(90deg, #9ee6ff, #ffffff)',
                borderRadius: 'calc(3 * var(--u))',
                boxShadow: '0 0 calc(6 * var(--u)) rgba(158, 230, 255, 0.5)',
              }}
            />
          </div>
          <span
            className="font-mono"
            style={{
              fontSize: 'calc(12 * var(--u))',
              fontWeight: 700,
              color: 'var(--accent-ice)',
              textAlign: 'right',
            }}
          >
            {blendedForecast} mm
          </span>
        </div>
      </div>
    </div>
  );
};
