import React from 'react';
import { X, Bookmark, Trash2, ExternalLink, Eye, Briefcase } from 'lucide-react';

export function BookmarksDrawer({ 
  isOpen, 
  onClose, 
  savedJobs, 
  onRemoveBookmark, 
  onClearAll,
  onSelectJob
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-bookmarks" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bookmarks-header">
          <div className="bookmarks-title-wrap">
            <Bookmark size={22} className="text-yellow" fill="currentColor" />
            <div>
              <h3 className="bookmarks-title">Saved Bookmarks</h3>
              <p className="bookmarks-subtitle">{savedJobs.length} job{savedJobs.length !== 1 ? 's' : ''} saved locally</p>
            </div>
          </div>
          <div className="bookmarks-actions">
            {savedJobs.length > 0 && (
              <button 
                className="btn-clear-compare"
                onClick={onClearAll}
                title="Remove all saved jobs"
              >
                <Trash2 size={14} />
                <span>Clear All</span>
              </button>
            )}
            <button className="modal-close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Saved Jobs List */}
        {savedJobs.length === 0 ? (
          <div className="compare-empty-state">
            <Bookmark size={48} className="empty-icon" />
            <h4>No saved jobs yet</h4>
            <p>Click the bookmark icon on any job card to save it for later review.</p>
          </div>
        ) : (
          <div className="saved-jobs-list">
            {savedJobs.map(job => (
              <div key={job.id} className="saved-job-item">
                <div className="saved-item-left">
                  <div className="saved-item-avatar">
                    <img src={job.companyLogo} alt={job.company} />
                  </div>
                  <div className="saved-item-details">
                    <h4 className="saved-item-title" onClick={() => onSelectJob(job)}>
                      {job.title}
                    </h4>
                    <div className="saved-item-meta">
                      <span className="saved-company">{job.company}</span>
                      <span className="meta-dot">•</span>
                      <span className="saved-salary">{job.salary.text}</span>
                      <span className="meta-dot">•</span>
                      <span className="saved-location">{job.location}</span>
                    </div>
                    <div className="saved-item-tags">
                      <span className={`pill-small ${job.employmentType === 'outsource' ? 'pill-amber' : 'pill-green'}`}>
                        {job.employmentType === 'outsource' ? 'Outsource' : 'Full-time'}
                      </span>
                      <span className="pill-small pill-source">{job.sourcePlatform}</span>
                    </div>
                  </div>
                </div>

                <div className="saved-item-actions">
                  <button 
                    className="btn btn-ghost btn-sm"
                    onClick={() => onSelectJob(job)}
                    title="View full details"
                  >
                    <Eye size={14} />
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
                    className="btn-trash-item"
                    onClick={() => onRemoveBookmark(job.id)}
                    title="Remove from saved"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
