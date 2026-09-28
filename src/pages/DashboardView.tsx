import type { LocationData } from '../types/weather';
import { HeroSection } from '../components/dashboard/HeroSection';
import { ForecastTrajectory } from '../components/dashboard/ForecastTrajectory';
import { RightRail } from '../components/dashboard/RightRail';
import { TrustExplanationPanel } from '../components/dashboard/TrustExplanationPanel';
import { ModelDisagreementPanel } from '../components/dashboard/ModelDisagreementPanel';

interface DashboardViewProps {
  location: LocationData;
  onSelectLeadTime: (leadTime: string) => void;
  onNavigateTab: (tab: 'trust' | 'intelligence' | 'map' | 'history' | 'pipeline') => void;
  onOpenDetailedExplanation: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  location,
  onSelectLeadTime,
  onNavigateTab,
  onOpenDetailedExplanation,
}) => {
  return (
    <div className="dashboard-grid-layout">
      {/* Primary Column: Hero, Center Intelligence, Trajectory */}
      <div className="dashboard-main-col">
        <HeroSection location={location} />

        <div className="dashboard-center-intelligence">
          <TrustExplanationPanel
            explanations={location.trustExplanations}
            onOpenDetailedExplanation={onOpenDetailedExplanation}
          />
          <ModelDisagreementPanel
            models={location.models}
            blendedForecast={location.blendedForecast}
            disagreementLevel={location.uncertainty.disagreementLevel}
          />
        </div>

        <ForecastTrajectory
          trajectory={location.trajectory}
          selectedLeadTime={location.leadTime}
          onSelectLeadTime={onSelectLeadTime}
        />
      </div>

      {/* Operational Side Column: Right Rail */}
      <div className="dashboard-side-col">
        <RightRail
          location={location}
          onNavigateTrust={() => onNavigateTab('trust')}
        />
      </div>
    </div>
  );
};
