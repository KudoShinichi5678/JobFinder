import React, { useState, useMemo } from 'react';
import { 
  X, 
  Heart, 
  Trash2, 
  ExternalLink, 
  Eye, 
  Search, 
  Clock,
  Send,
  Trophy
} from 'lucide-react';

const STATUS_OPTIONS = [
  { id: 'saved', label: 'Favorited', color: 'badge-gray', icon: Heart },
  { id: 'applied', label: 'Applied', color: 'badge-blue', icon: Send },
  { id: 'interviewing', label: 'Interviewing', color: 'badge-amber', icon: Clock },
  { id: 'offer', label: 'Offer Received', color: 'badge-emerald', icon: Trophy }
];

export function BookmarksDrawer({ 
  isOpen, 
  onClose, 
  savedJobs = [], 
  onRemoveBookmark, 
  onClearAll,
  onSelectJob,
  onUpdateJobStatus
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter favorite jobs by search query and status
  const filteredFavorites = useMemo(() => {
    return savedJobs.filter(job => {
      if (statusFilter !== 'all' && (job.applicationStatus || 'saved') !== statusFilter) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = job.title.toLowerCase().includes(q);
        const matchCompany = job.company.toLowerCase().includes(q);
        const matchLocation = job.location.toLowerCase().includes(q);
        return matchTitle || matchCompany || matchLocation;
      }
      return true;
    });
  }, [savedJobs, searchQuery, statusFilter]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-bookmarks modal-favorites" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bookmarks-header">
          <div className="bookmarks-title-wrap">
            <div className="favorites-icon-wrap">
              <Heart size={22} className="text-rose" fill="currentColor" />
            </div>
            <div>
              <h3 className="bookmarks-title">Favorite Jobs</h3>
              <p className="bookmarks-subtitle">
                {savedJobs.length} job{savedJobs.length !== 1 ? 's' : ''} saved in your personal collection
              </p>
            </div>
          </div>
          <div className="bookmarks-actions">
            {savedJobs.length > 0 && (
              <button 
                type="button"
                className="btn-clear-compare"
                onClick={onClearAll}
                title="Remove all favorite jobs"
              >
                <Trash2 size={14} />
                <span>Clear All</span>
              </button>
            )}
            <button type="button" className="modal-close-btn" onClick={onClose} title="Close drawer">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Search & Filter Bar (visible if there are saved jobs) */}
        {savedJobs.length > 2 && (
          <div className="favorites-search-bar">
            <div className="fav-search-box">
              <Search size={14} className="fav-search-icon" />
              <input 
                type="text"
                placeholder="Search favorite jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="fav-search-input"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="fav-clear-btn" 
                  onClick={() => setSearchQuery('')}
                >
                  <X size={12} />
                </button>
              )}
            </div>

            <div className="fav-status-pills">
              <button 
                type="button" 
                className={`fav-status-pill ${statusFilter === 'all' ? 'active' : ''}`}
                onClick={() => setStatusFilter('all')}
              >
                All ({savedJobs.length})
              </button>
              {STATUS_OPTIONS.map(opt => {
                const count = savedJobs.filter(j => (j.applicationStatus || 'saved') === opt.id).length;
                if (count === 0 && statusFilter !== opt.id) return null;
                return (
                  <button 
                    key={opt.id}
                    type="button" 
                    className={`fav-status-pill ${statusFilter === opt.id ? 'active' : ''}`}
                    onClick={() => setStatusFilter(opt.id)}
                  >
                    {opt.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Favorite Jobs List */}
        {savedJobs.length === 0 ? (
          <div className="compare-empty-state favorites-empty-state">
            <div className="empty-heart-circle">
              <Heart size={44} className="empty-icon text-rose" />
            </div>
            <h4>No favorite jobs yet</h4>
            <p>
              Click the heart icon on any job card in the feed or import new jobs via links to curate your wishlist!
            </p>
          </div>
        ) : filteredFavorites.length === 0 ? (
          <div className="compare-empty-state">
            <h4>No matching favorites</h4>
            <p>Try clearing your search query or status filter.</p>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="saved-jobs-list">
            {filteredFavorites.map(job => {
              const currentStatus = job.applicationStatus || 'saved';
              return (
                <div key={job.id} className="saved-job-item">
                  <div className="saved-item-left">
                    <div className="saved-item-avatar">
                      <img 
                        src={job.companyLogo} 
                        alt={job.company} 
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <span className="logo-fallback" style={{ display: 'none' }}>
                        {job.company.slice(0, 2).toUpperCase()}
                      </span>
                    </div>

                    <div className="saved-item-details">
                      <div className="saved-title-row">
                        <h4 className="saved-item-title" onClick={() => onSelectJob(job)}>
                          {job.title}
                        </h4>
                        {job.isCustomImport && (
                          <span className="pill-small pill-custom-import" title="Imported by you">
                            ✨ Custom Import
                          </span>
                        )}
                      </div>

                      <div className="saved-item-meta">
                        <span className="saved-company">{job.company}</span>
                        <span className="meta-dot">•</span>
                        <span className="saved-salary">{job.salary.text}</span>
                        <span className="meta-dot">•</span>
                        <span className="saved-location">{job.location.split('(')[0]}</span>
                      </div>

                      <div className="saved-item-tags">
                        <span className={`pill-small ${job.employmentType === 'outsource' ? 'pill-amber' : 'pill-green'}`}>
                          {job.employmentType === 'outsource' ? 'Outsource' : 'Full-time'}
                        </span>
                        <span className="pill-small pill-source">{job.sourcePlatform}</span>

                        {/* Status dropdown if supported */}
                        {onUpdateJobStatus && (
                          <select 
                            className={`pill-status-select status-${currentStatus}`}
                            value={currentStatus}
                            onChange={(e) => onUpdateJobStatus(job.id, e.target.value)}
                            title="Update application status"
                          >
                            <option value="saved">❤️ Wishlist</option>
                            <option value="applied">✉️ Applied</option>
                            <option value="interviewing">🕒 Interviewing</option>
                            <option value="offer">🎉 Offer</option>
                          </select>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="saved-item-actions">
                    <button 
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={() => onSelectJob(job)}
                      title="View full details"
                    >
                      <Eye size={14} />
                      <span>Details</span>
                    </button>
                    <a 
                      href={job.sourceUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="btn btn-apply-primary btn-sm"
                      title="Apply on original source"
                    >
                      <span>Apply</span>
                      <ExternalLink size={12} />
                    </a>
                    <button 
                      type="button"
                      className="btn-trash-item"
                      onClick={() => onRemoveBookmark(job.id)}
                      title="Remove from favorites"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
