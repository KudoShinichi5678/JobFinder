import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Compass, 
  Edit3, 
  SlidersHorizontal,
  ChevronDown,
  Globe2,
  Check,
  ArrowUpDown
} from 'lucide-react';
import { PRESET_LOCATIONS } from '../utils/locationUtils';

export function DesiredLocationBar({
  desiredLocation,
  onOpenLocationModal,
  onDetectCurrentLocation,
  isDetectingGPS,
  onToggleFilterRadius,
  sortBy,
  onToggleSortNearest,
  matchingJobsCount,
  totalJobsCount,
  onQuickChangeLocation
}) {
  const [showQuickDropdown, setShowQuickDropdown] = useState(false);

  const isCurrentGps = desiredLocation.type === 'current';
  const isWorldwide = desiredLocation.isWorldwide;
  const isNearestSorted = sortBy === 'nearest';

  return (
    <div className="desired-location-card">
      <div className="loc-bar-main-row">
        {/* Left Side: Pin Icon & Active Location Information */}
        <div className="loc-bar-info-block">
          <div className={`loc-pin-icon-box ${isCurrentGps ? 'gps-active' : ''}`}>
            {isCurrentGps ? (
              <Compass size={20} className={isDetectingGPS ? 'spin-slow' : ''} />
            ) : isWorldwide ? (
              <Globe2 size={20} />
            ) : (
              <MapPin size={20} />
            )}
          </div>

          <div className="loc-texts-container">
            <div className="loc-label-line">
              <span className="loc-sub-title">DESIRED LOCATION</span>
              <span className={`loc-source-badge ${isCurrentGps ? 'gps' : 'preset'}`}>
                {isCurrentGps ? '📍 Current GPS' : 'Target Hub'}
              </span>
              {desiredLocation.filterOnlyWithinRadius && (
                <span className="loc-filter-active-badge">
                  Filtered to &lt; {desiredLocation.radiusKm} km
                </span>
              )}
            </div>

            <div className="loc-current-selection">
              <h3 className="loc-name-text" onClick={onOpenLocationModal} title="Click to change location">
                {desiredLocation.name}
              </h3>

              {/* Quick Dropdown Trigger */}
              <div className="quick-switch-wrap">
                <button
                  type="button"
                  className="btn-quick-switch"
                  onClick={() => setShowQuickDropdown(prev => !prev)}
                  title="Quick switch city"
                >
                  <span>Quick Switch</span>
                  <ChevronDown size={13} className={showQuickDropdown ? 'rotate-180' : ''} />
                </button>

                {/* Quick Hubs Dropdown */}
                {showQuickDropdown && (
                  <div className="quick-hubs-dropdown">
                    <div className="quick-dropdown-header">
                      <span>Quick Target Locations</span>
                    </div>
                    {PRESET_LOCATIONS.map(hub => {
                      const isActive = desiredLocation.id === hub.id;
                      return (
                        <button
                          key={hub.id}
                          type="button"
                          className={`quick-hub-option ${isActive ? 'active' : ''}`}
                          onClick={() => {
                            onQuickChangeLocation(hub);
                            setShowQuickDropdown(false);
                          }}
                        >
                          <span className="quick-hub-flag">{hub.flag}</span>
                          <span className="quick-hub-name">{hub.shortName}</span>
                          {isActive && <Check size={14} className="quick-hub-check" />}
                        </button>
                      );
                    })}
                    <div className="quick-dropdown-footer">
                      <button
                        type="button"
                        className="btn-open-full-modal"
                        onClick={() => {
                          setShowQuickDropdown(false);
                          onOpenLocationModal();
                        }}
                      >
                        More options & search...
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Commute & Radius Meta */}
            <div className="loc-meta-row">
              <span className="loc-radius-text">
                Radius: <strong>{isWorldwide ? 'Global / Anywhere' : desiredLocation.radiusKm === 'all' ? 'Worldwide' : `${desiredLocation.radiusKm} km`}</strong>
              </span>
              <span className="loc-meta-divider">•</span>
              <span className="loc-matched-stat">
                <strong>{matchingJobsCount}</strong> of {totalJobsCount} jobs in target range
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="loc-bar-actions-block">
          {/* 1. Determine by Current Location (GPS) */}
          <button
            type="button"
            className={`btn-loc-action btn-gps-trigger ${isDetectingGPS ? 'loading' : ''}`}
            onClick={onDetectCurrentLocation}
            disabled={isDetectingGPS}
            title="Determine target location using your current GPS"
          >
            <Navigation size={14} className={isDetectingGPS ? 'spin-slow' : ''} />
            <span>{isDetectingGPS ? 'Detecting...' : 'Use Current GPS'}</span>
          </button>

          {/* 2. Change / Customize Location */}
          <button
            type="button"
            className="btn-loc-action btn-change-loc"
            onClick={onOpenLocationModal}
            title="Change desired location, custom city, or radius"
          >
            <Edit3 size={14} />
            <span>Change Location</span>
          </button>

          {/* 3. Filter strictly by radius toggle */}
          <button
            type="button"
            className={`btn-loc-action btn-toggle-filter ${desiredLocation.filterOnlyWithinRadius ? 'active' : ''}`}
            onClick={onToggleFilterRadius}
            title={desiredLocation.filterOnlyWithinRadius ? 'Showing only jobs in desired location' : 'Show all jobs with proximity'}
          >
            <SlidersHorizontal size={14} />
            <span>{desiredLocation.filterOnlyWithinRadius ? 'Strict Filter: ON' : 'Filter by Radius'}</span>
          </button>

          {/* 4. Sort Nearest toggle */}
          <button
            type="button"
            className={`btn-loc-action btn-sort-nearest ${isNearestSorted ? 'active' : ''}`}
            onClick={onToggleSortNearest}
            title="Sort jobs by nearest distance to desired location"
          >
            <ArrowUpDown size={14} />
            <span>{isNearestSorted ? 'Sorted: Nearest' : 'Sort Nearest'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
