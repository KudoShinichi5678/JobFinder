import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { FilterControls } from './components/FilterControls';
import { DesiredLocationBar } from './components/DesiredLocationBar';
import { DesiredLocationModal } from './components/DesiredLocationModal';
import { JobCard } from './components/JobCard';
import { JobDetailModal } from './components/JobDetailModal';
import { LiveSyncModal } from './components/LiveSyncModal';
import { ComparisonDrawer } from './components/ComparisonDrawer';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { AnalyticsModal } from './components/AnalyticsModal';
import { INITIAL_JOBS } from './data/mockJobs';
import { 
  DEFAULT_DESIRED_LOCATION, 
  detectCurrentLocation, 
  getJobLocationInfo 
} from './utils/locationUtils';
import './App.css';
import { 
  SearchX, 
  RotateCcw, 
  BellRing,
  ArrowUp,
  LayoutGrid,
  List,
  ArrowUpDown
} from 'lucide-react';

const DEFAULT_FILTERS = {
  keyword: '',
  scope: 'all',
  role: 'all',
  region: 'all',
  experience: 'all',
  language: 'all',
  employmentType: 'all',
  workMode: 'all',
  source: 'all',
  quantity: 'all'
};

export default function App() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selectedJob, setSelectedJob] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'salary' | 'applicants' | 'nearest'

  // Desired Location state with localStorage persistence
  const [desiredLocation, setDesiredLocation] = useState(() => {
    try {
      const stored = localStorage.getItem('jobradar_desired_location');
      return stored ? JSON.parse(stored) : DEFAULT_DESIRED_LOCATION;
    } catch (e) {
      return DEFAULT_DESIRED_LOCATION;
    }
  });

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isDetectingGPS, setIsDetectingGPS] = useState(false);

  // Modals and Drawers
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  // Bookmarked Jobs state with localStorage persistence
  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      const stored = localStorage.getItem('jobradar_saved_jobs');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  // Compared Jobs state (max 3)
  const [compareJobs, setCompareJobs] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [notification, setNotification] = useState(null);

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('jobradar_saved_jobs', JSON.stringify(savedJobs));
    } catch (e) {}
  }, [savedJobs]);

  // Save desired location to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('jobradar_desired_location', JSON.stringify(desiredLocation));
    } catch (e) {}
  }, [desiredLocation]);

  // Scroll to top listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3200);
  };

  // Determine Location by GPS
  const handleDetectCurrentGPS = async () => {
    setIsDetectingGPS(true);
    showToast('Requesting GPS location from browser...', 'info');

    try {
      const detected = await detectCurrentLocation();
      setDesiredLocation(prev => ({
        ...prev,
        id: 'current-gps',
        name: detected.name,
        shortName: detected.shortName,
        type: 'current',
        coords: detected.coords,
        isWorldwide: false
      }));
      showToast(`📍 Location set to ${detected.name}!`, 'success');
    } catch (err) {
      showToast(err.message || 'GPS detection failed. Please choose your city manually.', 'warning');
      setIsLocationModalOpen(true);
    } finally {
      setIsDetectingGPS(false);
    }
  };

  // Apply location from modal
  const handleApplyDesiredLocation = (newLoc) => {
    setDesiredLocation(newLoc);
    showToast(`Target location updated to ${newLoc.shortName || newLoc.name}`, 'success');
  };

  // Quick switch location preset
  const handleQuickChangeLocation = (preset) => {
    setDesiredLocation(prev => ({
      ...prev,
      id: preset.id,
      name: preset.name,
      shortName: preset.shortName,
      type: preset.id === 'current-gps' ? 'current' : 'preset',
      coords: preset.coords,
      isWorldwide: Boolean(preset.isWorldwide)
    }));
    showToast(`Switched target location to ${preset.shortName}`, 'info');
  };

  // Toggle strict radius filtering
  const handleToggleFilterRadius = () => {
    setDesiredLocation(prev => {
      const nextVal = !prev.filterOnlyWithinRadius;
      showToast(nextVal ? `Showing only jobs within ${prev.radiusKm === 'all' ? 'area' : `${prev.radiusKm} km`}` : 'Radius filter disabled (showing all positions)', 'info');
      return { ...prev, filterOnlyWithinRadius: nextVal };
    });
  };

  // Toggle sort nearest
  const handleToggleSortNearest = () => {
    if (sortBy === 'nearest') {
      setSortBy('newest');
      showToast('Sort reset to newest', 'info');
    } else {
      setSortBy('nearest');
      showToast(`Jobs sorted by proximity to ${desiredLocation.shortName}`, 'success');
    }
  };

  // Filter change handler
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Reset all filters to default
  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSortBy('newest');
    setDesiredLocation(prev => ({
      ...prev,
      filterOnlyWithinRadius: false
    }));
    showToast('Filters reset to default');
  };

  // Toggle bookmark
  const handleToggleBookmark = (job) => {
    const exists = savedJobs.some(j => j.id === job.id);
    if (exists) {
      setSavedJobs(prev => prev.filter(j => j.id !== job.id));
      showToast('Removed from saved jobs');
    } else {
      setSavedJobs(prev => [job, ...prev]);
      showToast('Job saved to bookmarks', 'success');
    }
  };

  // Toggle compare job
  const handleToggleCompare = (job) => {
    const exists = compareJobs.some(j => j.id === job.id);
    if (exists) {
      setCompareJobs(prev => prev.filter(j => j.id !== job.id));
      showToast('Removed from compare list');
    } else {
      if (compareJobs.length >= 3) {
        showToast('You can compare a maximum of 3 jobs at a time.', 'warning');
        return;
      }
      setCompareJobs(prev => [...prev, job]);
      showToast(`Added to compare (${compareJobs.length + 1}/3)`, 'success');
    }
  };

  const handleClearBookmarks = () => {
    setSavedJobs([]);
    showToast('Saved bookmarks cleared');
  };

  const handleClearCompare = () => {
    setCompareJobs([]);
    showToast('Comparison list cleared');
  };

  // Filter & Sort evaluation logic with Desired Location integration
  const { matchingJobs, displayedJobs, locationMatchingCount } = useMemo(() => {
    // 1. Calculate how many total jobs match the desired location radius
    const locMatches = jobs.filter(job => {
      if (desiredLocation.isWorldwide) return true;
      const locInfo = getJobLocationInfo(job, desiredLocation);
      if (locInfo.isRemote && desiredLocation.includeRemote) return true;
      return locInfo.isWithinRadius;
    }).length;

    // 2. Filter matching jobs based on all user criteria + optional radius filter
    const matched = jobs.filter(job => {
      // Keyword search
      if (filters.keyword.trim() !== '') {
        const query = filters.keyword.toLowerCase();
        const inTitle = job.title.toLowerCase().includes(query);
        const inCompany = job.company.toLowerCase().includes(query);
        const inDesc = job.description.toLowerCase().includes(query);
        const inLocation = job.location.toLowerCase().includes(query);
        const inSnippet = job.sourceSnippet ? job.sourceSnippet.toLowerCase().includes(query) : false;
        const inTech = job.techStack.some(t => t.toLowerCase().includes(query));
        if (!inTitle && !inCompany && !inDesc && !inLocation && !inSnippet && !inTech) {
          return false;
        }
      }

      // Scope (Thai vs Foreign)
      if (filters.scope !== 'all' && job.scope !== filters.scope) {
        return false;
      }

      // Role Category
      if (filters.role !== 'all' && job.roleCategory !== filters.role) {
        return false;
      }

      // Region
      if (filters.region !== 'all' && job.region !== filters.region) {
        return false;
      }

      // Experience Level
      if (filters.experience !== 'all' && job.experienceLevel !== filters.experience) {
        return false;
      }

      // Language Requirement
      if (filters.language !== 'all' && job.languageReq !== filters.language) {
        return false;
      }

      // Employment Type
      if (filters.employmentType !== 'all' && job.employmentType !== filters.employmentType) {
        return false;
      }

      // Work Mode
      if (filters.workMode !== 'all' && job.workMode !== filters.workMode) {
        return false;
      }

      // Source Platform
      if (filters.source !== 'all' && job.sourcePlatform !== filters.source) {
        return false;
      }

      // Desired Location Radius Strict Filter
      if (desiredLocation.filterOnlyWithinRadius && !desiredLocation.isWorldwide) {
        const locInfo = getJobLocationInfo(job, desiredLocation);
        if (locInfo.isRemote && desiredLocation.includeRemote) {
          // 100% remote positions are included
        } else if (!locInfo.isWithinRadius) {
          return false;
        }
      }

      return true;
    });

    // 3. Sort jobs (Salary, Applicants, Nearest to Desired Location, Newest)
    const sorted = [...matched].sort((a, b) => {
      if (sortBy === 'nearest') {
        const aInfo = getJobLocationInfo(a, desiredLocation);
        const bInfo = getJobLocationInfo(b, desiredLocation);
        // Remote jobs are treated as 0 km or seamlessly at the top
        const aDist = aInfo.isRemote ? 0.1 : (aInfo.distanceKm ?? 99999);
        const bDist = bInfo.isRemote ? 0.1 : (bInfo.distanceKm ?? 99999);
        return aDist - bDist;
      }
      if (sortBy === 'salary') {
        const aVal = a.salary.currency === 'USD' ? a.salary.max * 35 / 12 : a.salary.max;
        const bVal = b.salary.currency === 'USD' ? b.salary.max * 35 / 12 : b.salary.max;
        return bVal - aVal;
      }
      if (sortBy === 'applicants') {
        return (b.applicantsCount || 0) - (a.applicantsCount || 0);
      }
      return 0; // default order
    });

    return { 
      matchingJobs: matched, 
      displayedJobs: sorted,
      locationMatchingCount: locMatches
    };
  }, [jobs, filters, sortBy, desiredLocation]);

  const handleSyncComplete = () => {
    showToast('Feeds synced! Positions refreshed.', 'success');
  };

  return (
    <div className="app-shell">
      {/* Toast Notification */}
      {notification && (
        <div className={`toast-notification toast-${notification.type}`}>
          <BellRing size={16} />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Clean Top Header */}
      <Header 
        onOpenSync={() => setIsSyncModalOpen(true)}
        isSyncing={isSyncModalOpen}
        savedJobsCount={savedJobs.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        compareJobsCount={compareJobs.length}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        desiredLocation={desiredLocation}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        totalJobsCount={jobs.length}
        filteredCount={displayedJobs.length}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Streamlined Search & Filter Controls */}
        <FilterControls 
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalMatchingCount={matchingJobs.length}
          displayedCount={displayedJobs.length}
        />

        {/* Desired Location Bar: Current Location & Quick Customization */}
        <DesiredLocationBar 
          desiredLocation={desiredLocation}
          onOpenLocationModal={() => setIsLocationModalOpen(true)}
          onDetectCurrentLocation={handleDetectCurrentGPS}
          isDetectingGPS={isDetectingGPS}
          onToggleFilterRadius={handleToggleFilterRadius}
          sortBy={sortBy}
          onToggleSortNearest={handleToggleSortNearest}
          matchingJobsCount={locationMatchingCount}
          totalJobsCount={jobs.length}
          onQuickChangeLocation={handleQuickChangeLocation}
        />

        {/* Jobs Feed Section */}
        <section className="jobs-feed-section">
          {/* Feed Controls Header */}
          <div className="feed-header-bar">
            <div className="feed-count-wrap">
              <span className="count-number">{displayedJobs.length}</span>
              <span className="count-label">
                {displayedJobs.length === 1 ? 'job found' : 'jobs found'}
              </span>
              {desiredLocation.filterOnlyWithinRadius && (
                <span className="location-filter-tag">
                  Near {desiredLocation.shortName} (&lt; {desiredLocation.radiusKm} km)
                </span>
              )}
              {filters.scope !== 'all' && (
                <span className="scope-indicator">
                  {filters.scope === 'thai' ? 'in Thailand' : 'Global Remote'}
                </span>
              )}
            </div>

            <div className="feed-toolbar-right">
              {/* Sort Dropdown */}
              <div className="sort-wrap">
                <ArrowUpDown size={14} className="sort-icon" />
                <select 
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Sort: Default / Newest</option>
                  <option value="nearest">📍 Sort: Nearest to {desiredLocation.shortName}</option>
                  <option value="salary">Sort: Highest Salary</option>
                  <option value="applicants">Sort: Most Applied</option>
                </select>
              </div>

              {/* View Switcher: Grid vs List */}
              <div className="view-mode-toggle">
                <button
                  type="button"
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  type="button"
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Jobs Feed / Empty State */}
          {displayedJobs.length === 0 ? (
            <div className="empty-state-clean">
              <SearchX size={44} className="empty-icon" />
              <h3>No jobs match your selected criteria</h3>
              <p>
                {desiredLocation.filterOnlyWithinRadius 
                  ? `There are no active openings within ${desiredLocation.radiusKm} km of ${desiredLocation.name}. Try expanding the radius or turning off strict location filter.` 
                  : 'Try clearing your keyword or resetting some criteria to see more positions.'}
              </p>
              <div className="empty-actions-row">
                {desiredLocation.filterOnlyWithinRadius && (
                  <button 
                    className="btn-clean-reset" 
                    onClick={handleToggleFilterRadius}
                    style={{ background: 'var(--accent-blue)', color: '#fff', borderColor: 'var(--accent-blue)' }}
                  >
                    <span>Expand Location Radius</span>
                  </button>
                )}
                <button className="btn-clean-reset" onClick={handleResetFilters}>
                  <RotateCcw size={14} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'clean-jobs-grid' : 'clean-jobs-list'}>
              {displayedJobs.map(job => (
                <JobCard 
                  key={job.id}
                  job={job}
                  desiredLocation={desiredLocation}
                  viewMode={viewMode}
                  isBookmarked={savedJobs.some(j => j.id === job.id)}
                  onToggleBookmark={handleToggleBookmark}
                  isCompared={compareJobs.some(j => j.id === job.id)}
                  onToggleCompare={handleToggleCompare}
                  onSelectJob={setSelectedJob}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Floating Scroll to Top */}
      {showScrollTop && (
        <button 
          className="scroll-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Back to top"
        >
          <ArrowUp size={16} />
        </button>
      )}

      {/* Footer */}
      <footer className="clean-footer">
        <p>© 2026 JobFinder • Tech Job Aggregator with Proximity & Desired Location Intelligence</p>
      </footer>

      {/* Modals & Drawers */}
      {selectedJob && (
        <JobDetailModal 
          job={selectedJob}
          desiredLocation={desiredLocation}
          onSetAsDesiredLocation={handleApplyDesiredLocation}
          onClose={() => setSelectedJob(null)}
          isBookmarked={savedJobs.some(j => j.id === selectedJob.id)}
          onToggleBookmark={handleToggleBookmark}
          isCompared={compareJobs.some(j => j.id === selectedJob.id)}
          onToggleCompare={handleToggleCompare}
        />
      )}

      {/* Desired Location Selection Modal */}
      <DesiredLocationModal 
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={desiredLocation}
        onApplyLocation={handleApplyDesiredLocation}
        allJobs={jobs}
      />

      <LiveSyncModal 
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        onSyncComplete={handleSyncComplete}
      />

      <ComparisonDrawer 
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        compareJobs={compareJobs}
        onRemoveCompare={(id) => setCompareJobs(prev => prev.filter(j => j.id !== id))}
        onClearCompare={handleClearCompare}
        onSelectJob={(job) => {
          setIsCompareOpen(false);
          setSelectedJob(job);
        }}
      />

      <BookmarksDrawer 
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedJobs={savedJobs}
        onRemoveBookmark={(id) => setSavedJobs(prev => prev.filter(j => j.id !== id))}
        onClearAll={handleClearBookmarks}
        onSelectJob={(job) => {
          setIsBookmarksOpen(false);
          setSelectedJob(job);
        }}
      />

      <AnalyticsModal 
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        allJobs={jobs}
      />
    </div>
  );
}
