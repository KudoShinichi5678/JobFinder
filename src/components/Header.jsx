import React from 'react';
import { 
  Briefcase, 
  Bookmark, 
  BarChart3, 
  Scale, 
  RefreshCw,
  MapPin,
  Compass
} from 'lucide-react';

export function Header({ 
  onOpenSync, 
  isSyncing, 
  savedJobsCount, 
  onOpenBookmarks, 
  compareJobsCount, 
  onOpenCompare,
  onOpenAnalytics,
  desiredLocation,
  onOpenLocationModal,
  totalJobsCount,
  filteredCount
}) {
  const isGps = desiredLocation?.type === 'current';

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand */}
        <div className="header-brand">
          <div className="brand-logo-icon">
            <Briefcase size={20} />
          </div>
          <div>
            <div className="brand-name-row">
              <span className="brand-name">JobFinder</span>
              <span className="brand-badge">Tech</span>
            </div>
            <p className="brand-subtitle">Thailand & Global Remote Tech Roles</p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="header-actions">
          {/* Desired Location Quick Indicator / Trigger */}
          {desiredLocation && (
            <button 
              className={`btn btn-header-action btn-header-location ${isGps ? 'gps-mode' : ''}`}
              onClick={onOpenLocationModal}
              title={`Desired Location: ${desiredLocation.name} (Click to change)`}
            >
              {isGps ? <Compass size={15} className="text-cyan" /> : <MapPin size={15} className="text-blue" />}
              <span className="header-location-text">
                {desiredLocation.shortName || 'Location'}
              </span>
            </button>
          )}

          {/* Live Sync / Refresh button */}
          <button 
            className="btn btn-header-action"
            onClick={onOpenSync}
            disabled={isSyncing}
            title="Check for new jobs"
          >
            <RefreshCw size={15} className={isSyncing ? 'spinning' : ''} />
            <span className="btn-label">{isSyncing ? 'Updating...' : 'Sync Feeds'}</span>
          </button>

          {/* Market Trends */}
          <button 
            className="btn btn-header-action"
            onClick={onOpenAnalytics}
            title="View market salary insights"
          >
            <BarChart3 size={15} />
            <span className="btn-label">Trends</span>
          </button>

          {/* Compare */}
          <button 
            className={`btn btn-header-action ${compareJobsCount > 0 ? 'active' : ''}`}
            onClick={onOpenCompare}
            title="Compare selected jobs"
          >
            <Scale size={15} />
            <span className="btn-label">Compare</span>
            {compareJobsCount > 0 && <span className="header-badge">{compareJobsCount}</span>}
          </button>

          {/* Saved */}
          <button 
            className={`btn btn-header-action ${savedJobsCount > 0 ? 'active' : ''}`}
            onClick={onOpenBookmarks}
            title="View saved jobs"
          >
            <Bookmark size={15} />
            <span className="btn-label">Saved</span>
            {savedJobsCount > 0 && <span className="header-badge">{savedJobsCount}</span>}
          </button>

        </div>
      </div>
    </header>
  );
}
