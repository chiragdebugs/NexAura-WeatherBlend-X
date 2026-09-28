import React from 'react';
import type { LocationData } from '../../types/weather';
import { CardMainForecast } from './CardMainForecast';
import { CardModelTrust } from './CardModelTrust';
import { CardUncertainty } from './CardUncertainty';
import { CardExtremeRisk } from './CardExtremeRisk';

interface RightRailProps {
  location: LocationData;
  onNavigateTrust: () => void;
}

export const RightRail: React.FC<RightRailProps> = ({ location, onNavigateTrust }) => {
  return (
    <aside
      className="desktop-right-rail"
      style={{
        position: 'absolute',
        right: 'calc(38 * var(--u))',
        top: 'calc(134 * var(--u))',
        bottom: 'calc(24 * var(--u))',
        width: 'calc(310 * var(--u))',
        display: 'flex',
        flexDirection: 'column',
        gap: 'calc(12 * var(--u))',
        zIndex: 35,
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingRight: 'calc(2 * var(--u))',
      }}
      aria-label="Operational Metrics and Model Trust Rail"
    >
      <CardMainForecast location={location} />
      <CardModelTrust
        models={location.models}
        leadTime={location.leadTime}
        onNavigateTrust={onNavigateTrust}
      />
      <CardUncertainty location={location} />
      <CardExtremeRisk location={location} />
    </aside>
  );
};
