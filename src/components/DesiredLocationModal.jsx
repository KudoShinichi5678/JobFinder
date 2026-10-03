import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Navigation, 
  Compass, 
  Search, 
  Check, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { 
  PRESET_LOCATIONS, 
  SEARCHABLE_CITIES, 
  RADIUS_OPTIONS, 
  detectCurrentLocation,
  getJobLocationInfo
} from '../utils/locationUtils';

export function DesiredLocationModal({
  isOpen,
  onClose,
  currentLocation,
  onApplyLocation,
  allJobs = []
}) {
  const [selectedLocation, setSelectedLocation] = useState(currentLocation);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [detectionError, setDetectionError] = useState(null);
  const [detectionSuccess, setDetectionSuccess] = useState(null);

  if (!isOpen) return null;

  // Filter searchable cities based on search query
  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : SEARCHABLE_CITIES.filter(city => 
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.country.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Handle GPS detection
  const handleDetectGPS = async () => {
    setIsDetectingGps(true);
    setDetectionError(null);
    setDetectionSuccess(null);

    try {
      const detected = await detectCurrentLocation();
      setSelectedLocation(prev => ({
        ...prev,
        id: 'current-gps',
        name: detected.name,
        shortName: detected.shortName,
        type: 'current',
        coords: detected.coords,
        isWorldwide: false
      }));
      setDetectionSuccess(`Detected your location: ${detected.name}`);
    } catch (err) {
      setDetectionError(err.message || 'Unable to retrieve your current location.');
    } finally {
      setIsDetectingGps(false);
    }
  };

  // Select a preset location
  const handleSelectPreset = (preset) => {
    setSelectedLocation(prev => ({
      ...prev,
      id: preset.id,
      name: preset.name,
      shortName: preset.shortName,
      type: preset.id === 'current-gps' ? 'current' : 'preset',
      coords: preset.coords,
      isWorldwide: Boolean(preset.isWorldwide)
    }));
    setSearchQuery('');
    setDetectionSuccess(null);
    setDetectionError(null);
  };

  // Change radius
  const handleRadiusChange = (radius) => {
    setSelectedLocation(prev => ({ ...prev, radiusKm: radius }));
  };

  // Toggle filter strictness
  const handleToggleFilterStrictness = () => {
    setSelectedLocation(prev => ({
      ...prev,
      filterOnlyWithinRadius: !prev.filterOnlyWithinRadius
    }));
  };

  // Toggle remote inclusion
  const handleToggleIncludeRemote = () => {
    setSelectedLocation(prev => ({
      ...prev,
      includeRemote: !prev.includeRemote
    }));
  };

  // Count matching jobs for the currently selected location preview
  const matchingJobsCount = allJobs.filter(job => {
    const info = getJobLocationInfo(job, selectedLocation);
    if (selectedLocation.isWorldwide) return true;
    if (info.isRemote && selectedLocation.includeRemote) return true;
    return info.isWithinRadius;
  }).length;

  const handleApply = () => {
    onApplyLocation(selectedLocation);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content modal-location" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-loc-header">
          <div className="modal-loc-title-group">
            <div className="modal-loc-icon-wrap">
              <MapPin size={22} />
            </div>
            <div>
              <h2 className="modal-loc-title">Set Desired Location</h2>
              <p className="modal-loc-subtitle">
                Filter jobs and calculate real commute distances based on your target area.
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>

        <div className="modal-loc-body">
          {/* Active Target Preview Banner */}
          <div className="loc-active-banner">
            <div className="loc-banner-left">
              <span className="loc-banner-tag">ACTIVE DESIRED LOCATION</span>
              <div className="loc-banner-name-row">
                <span className="loc-banner-name">{selectedLocation.name}</span>
                <span className={`loc-type-pill ${selectedLocation.type === 'current' ? 'gps' : 'custom'}`}>
                  {selectedLocation.type === 'current' ? 'GPS Detected' : 'Custom Target'}
                </span>
              </div>
            </div>
            <div className="loc-banner-right">
              <div className="loc-stat-box">
                <span className="loc-stat-num">{matchingJobsCount}</span>
                <span className="loc-stat-lbl">Jobs in Range</span>
              </div>
            </div>
          </div>

          {/* Section 1: Determine by Current Location (GPS) */}
          <div className="loc-section">
            <div className="loc-section-header">
              <span className="loc-step-num">1</span>
              <h3 className="loc-section-heading">Determine by Current Location</h3>
            </div>

            <div className="loc-gps-box">
              <div className="loc-gps-content">
                <div className="loc-gps-icon-circle">
                  <Compass size={22} className={isDetectingGps ? 'spin-slow' : ''} />
                </div>
                <div className="loc-gps-texts">
                  <span className="loc-gps-title">Use My Real-Time GPS Location</span>
                  <span className="loc-gps-desc">
                    Instantly finds your coordinates and matches nearby tech positions in Thailand or abroad.
                  </span>
                </div>
              </div>

              <button 
                type="button"
                className={`btn-detect-gps ${isDetectingGps ? 'loading' : ''}`}
                onClick={handleDetectGPS}
                disabled={isDetectingGps}
              >
                <Navigation size={15} />
                <span>{isDetectingGps ? 'Detecting GPS...' : 'Auto-Detect Current'}</span>
              </button>
            </div>

            {/* GPS Feedback Banners */}
            {detectionSuccess && (
              <div className="loc-feedback-banner success">
                <Check size={16} />
                <span>{detectionSuccess}</span>
              </div>
            )}

            {detectionError && (
              <div className="loc-feedback-banner error">
                <AlertCircle size={16} />
                <span>{detectionError}</span>
              </div>
            )}
          </div>

          {/* Section 2: Or Change to Any Desired Hub / City */}
          <div className="loc-section">
            <div className="loc-section-header">
              <span className="loc-step-num">2</span>
              <h3 className="loc-section-heading">Or Change Target City / Hub</h3>
            </div>

            {/* Search Input for Custom Cities */}
            <div className="loc-search-bar">
              <Search size={16} className="loc-search-icon" />
              <input 
                type="text" 
                className="loc-search-input"
                placeholder="Search city, province, or region (e.g. Bangkok, Chiang Mai, Nonthaburi, Tokyo)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="loc-clear-search" 
                  onClick={() => setSearchQuery('')}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Custom Search Results if typing */}
            {searchQuery.trim() !== '' && (
              <div className="loc-search-results">
                {searchResults.length === 0 ? (
                  <div className="loc-search-empty">
                    <span>No predefined city matches "{searchQuery}". You can select from popular hubs below.</span>
                  </div>
                ) : (
                  searchResults.map(city => (
                    <button
                      key={city.id}
                      type="button"
                      className={`loc-search-result-item ${selectedLocation.name.startsWith(city.shortName) ? 'selected' : ''}`}
                      onClick={() => handleSelectPreset(city)}
                    >
                      <span className="loc-res-flag">{city.flag}</span>
                      <div className="loc-res-text">
                        <strong>{city.name}</strong>
                        <span>{city.subtitle}</span>
                      </div>
                      {selectedLocation.name.startsWith(city.shortName) && (
                        <Check size={16} className="loc-res-check" />
                      )}
                    </button>
                  ))
                )}
              </div>
            )}

            {/* Popular Presets Grid */}
            <div className="loc-presets-grid">
              {PRESET_LOCATIONS.map(preset => {
                const isSelected = selectedLocation.id === preset.id || 
                  (preset.isWorldwide && selectedLocation.isWorldwide) ||
                  (!selectedLocation.isWorldwide && selectedLocation.name.startsWith(preset.shortName));

                return (
                  <button
                    key={preset.id}
                    type="button"
                    className={`loc-preset-card ${isSelected ? 'active' : ''}`}
                    onClick={() => handleSelectPreset(preset)}
                  >
                    <div className="preset-card-top">
                      <span className="preset-flag">{preset.flag}</span>
                      {preset.badge && <span className="preset-badge">{preset.badge}</span>}
                      {isSelected && (
                        <div className="preset-active-indicator">
                          <Check size={13} />
                        </div>
                      )}
                    </div>
                    <div className="preset-card-name">{preset.shortName}</div>
                    <div className="preset-card-sub">{preset.subtitle}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Commute Distance & Radius Preferences */}
          <div className="loc-section">
            <div className="loc-section-header">
              <span className="loc-step-num">3</span>
              <h3 className="loc-section-heading">Commute Radius Tolerance</h3>
            </div>

            <div className="loc-radius-buttons">
              {RADIUS_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  className={`loc-radius-pill ${selectedLocation.radiusKm === opt.value ? 'active' : ''}`}
                  onClick={() => handleRadiusChange(opt.value)}
                >
                  <span className="radius-pill-label">{opt.label}</span>
                  <span className="radius-pill-desc">{opt.desc}</span>
                </button>
              ))}
            </div>

            {/* Options Checkboxes */}
            <div className="loc-options-list">
              <label className="loc-option-checkbox">
                <input 
                  type="checkbox" 
                  checked={selectedLocation.filterOnlyWithinRadius}
                  onChange={handleToggleFilterStrictness}
                />
                <div className="checkbox-text-wrap">
                  <strong>Strict Filter: Only show jobs within this radius</strong>
                  <span>Hides positions located further than {selectedLocation.radiusKm === 'all' ? 'anywhere' : `${selectedLocation.radiusKm} km`}</span>
                </div>
              </label>

              <label className="loc-option-checkbox">
                <input 
                  type="checkbox" 
                  checked={selectedLocation.includeRemote}
                  onChange={handleToggleIncludeRemote}
                />
                <div className="checkbox-text-wrap">
                  <strong>Always Include 100% Remote Jobs</strong>
                  <span>Keep global and remote positions visible since you can work them from anywhere</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-loc-footer">
          <div className="modal-loc-footer-info">
            <Sparkles size={16} className="text-amber" />
            <span>Targeting <strong>{selectedLocation.shortName || selectedLocation.name}</strong> • {matchingJobsCount} matching positions</span>
          </div>

          <div className="modal-loc-footer-actions">
            <button 
              type="button" 
              className="btn-loc-secondary" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn-loc-primary" 
              onClick={handleApply}
            >
              <span>Apply Desired Location</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
