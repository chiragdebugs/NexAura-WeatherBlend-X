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
      className="dashboard-right-rail"
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
