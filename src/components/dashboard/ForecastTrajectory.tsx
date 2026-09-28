import React, { useState } from 'react';
import type { TrajectoryPoint } from '../../types/weather';
import { DropIcon, WindIcon } from '../common/Icons';

interface ForecastTrajectoryProps {
  trajectory: TrajectoryPoint[];
  selectedLeadTime: string;
  onSelectLeadTime: (leadTime: string) => void;
}

export const ForecastTrajectory: React.FC<ForecastTrajectoryProps> = ({
  trajectory,
  selectedLeadTime,
  onSelectLeadTime,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // SVG chart dimensions for the smooth trajectory curve
  const width = 820;
  const height = 110;
  const paddingX = 40;
  const paddingY = 20;

  // Compute scale
  const maxRain = Math.max(...trajectory.map((t) => t.upperBound), 110);
  const minRain = 0;

  const points = trajectory.map((pt, i) => {
    const x = paddingX + (i / (trajectory.length - 1)) * (width - 2 * paddingX);
    const y = height - paddingY - ((pt.rainfall - minRain) / (maxRain - minRain)) * (height - 2 * paddingY);
    const yBaseline = height - paddingY - ((pt.baselineRainfall - minRain) / (maxRain - minRain)) * (height - 2 * paddingY);
    const yUpper = height - paddingY - ((pt.upperBound - minRain) / (maxRain - minRain)) * (height - 2 * paddingY);
    const yLower = height - paddingY - ((pt.lowerBound - minRain) / (maxRain - minRain)) * (height - 2 * paddingY);
    return { x, y, yBaseline, yUpper, yLower, pt };
  });

  // Generate smooth cubic bezier curves for SVG path
  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const current = pts[i];
      const next = pts[i + 1];
      const controlX1 = current.x + (next.x - current.x) * 0.45;
      const controlY1 = current.y;
      const controlX2 = current.x + (next.x - current.x) * 0.55;
      const controlY2 = next.y;
      path += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${next.x} ${next.y}`;
    }
    return path;
  };

  const linePath = createSmoothPath(points);
  const baselinePath = createSmoothPath(points.map((p) => ({ x: p.x, y: p.yBaseline })));

  // Area fill under the main curve
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  // Uncertainty band (fill between upper and lower)
  const upperPath = createSmoothPath(points.map((p) => ({ x: p.x, y: p.yUpper })));
  const lowerPtsReversed = [...points].reverse().map((p) => ({ x: p.x, y: p.yLower }));
  const lowerReversePath = lowerPtsReversed.reduce((acc, p, idx) => {
    if (idx === 0) return `L ${p.x} ${p.y}`;
    const prev = lowerPtsReversed[idx - 1];
    const cx1 = prev.x + (p.x - prev.x) * 0.45;
    const cy1 = prev.y;
    const cx2 = prev.x + (p.x - prev.x) * 0.55;
    const cy2 = p.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p.x} ${p.y}`;
  }, '');
  const uncertaintyBandPath = `${upperPath} ${lowerReversePath} Z`;

  return (
    <section
      className="desktop-bottom-strip animate-bottom-strip aurora-card-glass aurora-sheen"
      style={{
        position: 'absolute',
        left: 'calc(126 * var(--u))',
        right: 'calc(370 * var(--u))',
        bottom: 'calc(24 * var(--u))',
        height: 'calc(255 * var(--u))',
        padding: 'calc(16 * var(--u)) calc(22 * var(--u)) calc(12 * var(--u)) calc(22 * var(--u))',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 35,
      }}
      aria-label="Forecast Trajectory and Blended Timeline"
    >
      {/* Top Header of Trajectory strip */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(12 * var(--u))' }}>
          <span
            className="font-headline"
            style={{
              fontSize: 'calc(14 * var(--u))',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: 'calc(-0.2 * var(--u))',
            }}
          >
            Forecast Trajectory
          </span>
          <span
            style={{
              fontSize: 'calc(11 * var(--u))',
              color: 'rgba(255, 255, 255, 0.65)',
            }}
          >
            Adaptive Calibrated Multi-Model Blend
          </span>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(16 * var(--u))' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(6 * var(--u))' }}>
            <div
              style={{
                width: 'calc(16 * var(--u))',
                height: 'calc(2.5 * var(--u))',
                background: '#ffffff',
                borderRadius: 'calc(2 * var(--u))',
              }}
            />
            <span style={{ fontSize: 'calc(11 * var(--u))', color: 'rgba(255, 255, 255, 0.85)' }}>
              WeatherBlend-X
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(6 * var(--u))' }}>
            <div
              style={{
                width: 'calc(16 * var(--u))',
                height: 'calc(1.5 * var(--u))',
                background: 'rgba(158, 230, 255, 0.45)',
                borderTop: '1px dashed rgba(158, 230, 255, 0.8)',
              }}
            />
            <span style={{ fontSize: 'calc(11 * var(--u))', color: 'rgba(255, 255, 255, 0.65)' }}>
              Baseline NWP
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(6 * var(--u))' }}>
            <div
              style={{
                width: 'calc(12 * var(--u))',
                height: 'calc(10 * var(--u))',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: 'calc(2 * var(--u))',
              }}
            />
            <span style={{ fontSize: 'calc(11 * var(--u))', color: 'rgba(255, 255, 255, 0.65)' }}>
              90% Interval
            </span>
          </div>
        </div>
      </div>

      {/* SVG Smooth Trajectory Graph */}
      <div style={{ width: '100%', height: 'calc(105 * var(--u))', position: 'relative', marginTop: 'calc(4 * var(--u))' }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="auroraAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
              <stop offset="65%" stopColor="#9ee6ff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="uncertaintyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.12)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.02)" />
            </linearGradient>
          </defs>

          {/* Uncertainty Band */}
          <path
            d={uncertaintyBandPath}
            fill="url(#uncertaintyGrad)"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="0.8"
            strokeDasharray="2 3"
          />

          {/* Area Fill wipe */}
          <path
            d={areaPath}
            fill="url(#auroraAreaGrad)"
            className="animate-wipe-fill"
          />

          {/* Baseline Curve */}
          <path
            d={baselinePath}
            fill="none"
            stroke="rgba(158, 230, 255, 0.5)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Primary Blended Line with drawLine animation */}
          <path
            d={linePath}
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.4"
            strokeLinecap="round"
            pathLength="1"
            className="animate-draw-line"
          />

          {/* Data Points on Curve */}
          {points.map((p, idx) => {
            const isSelected = p.pt.leadTime === selectedLeadTime;
            const isHovered = hoveredIndex === idx;
            return (
              <g key={p.pt.leadTime} style={{ cursor: 'pointer' }} onClick={() => onSelectLeadTime(p.pt.leadTime)}>
                {/* Glowing halo for selected point */}
                {isSelected && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="8"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.6)"
                    strokeWidth="1.5"
                  />
                )}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isSelected || isHovered ? 4.5 : 3.2}
                  fill="#ffffff"
                  stroke="rgba(4, 16, 24, 0.85)"
                  strokeWidth="1.8"
                  style={{ transition: 'all 0.2s' }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Trajectory Time Step Columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${trajectory.length}, 1fr)`,
          gap: 'calc(8 * var(--u))',
          paddingTop: 'calc(4 * var(--u))',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        {trajectory.map((step, idx) => {
          const isSelected = step.leadTime === selectedLeadTime;
          return (
            <div
              key={step.leadTime}
              onClick={() => onSelectLeadTime(step.leadTime)}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                padding: 'calc(4 * var(--u)) calc(2 * var(--u))',
                borderRadius: 'calc(8 * var(--u))',
                background: isSelected ? 'rgba(255, 255, 255, 0.16)' : 'transparent',
                transition: 'background 0.2s, transform 0.2s',
                transform: isSelected ? 'translateY(-1px)' : 'none',
              }}
            >
              {/* Hour Tag */}
              <div
                className="font-mono"
                style={{
                  fontSize: 'calc(12 * var(--u))',
                  fontWeight: 600,
                  color: isSelected ? 'var(--accent-ice)' : 'rgba(255, 255, 255, 0.75)',
                  marginBottom: 'calc(2 * var(--u))',
                }}
              >
                {step.timeLabel}
              </div>

              {/* Large Temperature */}
              <div
                style={{
                  fontSize: 'calc(17 * var(--u))',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: '1.1',
                }}
              >
                {step.temperature}°
              </div>

              {/* Rainfall and Wind */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'calc(3 * var(--u))',
                  fontSize: 'calc(11 * var(--u))',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.95)',
                  marginTop: 'calc(2 * var(--u))',
                }}
              >
                <DropIcon size="calc(10 * var(--u))" style={{ opacity: 0.7 }} />
                <span>{step.rainfall} mm</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'calc(3 * var(--u))',
                  fontSize: 'calc(10 * var(--u))',
                  color: 'rgba(255, 255, 255, 0.55)',
                  marginTop: 'calc(1 * var(--u))',
                }}
              >
                <WindIcon size="calc(9 * var(--u))" style={{ opacity: 0.55 }} />
                <span>{step.wind} km/h</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
