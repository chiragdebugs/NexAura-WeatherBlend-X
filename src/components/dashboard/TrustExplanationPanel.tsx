import React from 'react';
import { CheckIcon, ActivityIcon } from '../common/Icons';

interface TrustExplanationPanelProps {
  explanations: string[];
  onOpenDetailedExplanation: () => void;
}

export const TrustExplanationPanel: React.FC<TrustExplanationPanelProps> = ({
  explanations,
  onOpenDetailedExplanation,
}) => {
  return (
    <div
      className="aurora-tool-glass aurora-sheen"
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(6 * var(--u))' }}>
          <ActivityIcon size="calc(13 * var(--u))" style={{ color: 'var(--accent-ice)' }} />
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
            Why the AI Trusts This Forecast
          </span>
        </div>

        <button
          onClick={onOpenDetailedExplanation}
          style={{
            fontSize: 'calc(11 * var(--u))',
            color: 'var(--accent-ice)',
            fontWeight: 500,
            textDecoration: 'underline',
            textUnderlineOffset: 'calc(2 * var(--u))',
            opacity: 0.9,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
        >
          Trust explanation →
        </button>
      </div>

      {/* 4 Compact reasons */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'calc(6 * var(--u)) calc(12 * var(--u))',
        }}
      >
        {explanations.slice(0, 4).map((reason, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'calc(6 * var(--u))',
            }}
          >
            <div
              style={{
                width: 'calc(14 * var(--u))',
                height: 'calc(14 * var(--u))',
                borderRadius: '50%',
                background: 'rgba(74, 222, 128, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--status-green)',
                flexShrink: 0,
                marginTop: 'calc(2 * var(--u))',
              }}
            >
              <CheckIcon size="calc(9 * var(--u))" />
            </div>
            <span
              style={{
                fontSize: 'calc(11.5 * var(--u))',
                lineHeight: '1.35',
                color: 'rgba(255, 255, 255, 0.90)',
              }}
            >
              {reason}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
