import React from 'react';
import { 
  MapPin, 
  Heart, 
  Scale, 
  ExternalLink, 
  Eye, 
  Navigation, 
  Globe2,
  Sparkles,
  Trash2
} from 'lucide-react';
import { getJobLocationInfo } from '../utils/locationUtils';

export function JobCard({ 
  job, 
  desiredLocation,
  isBookmarked, // or isFavorited
  onToggleBookmark, 
  isCompared, 
  onToggleCompare, 
  onSelectJob,
  onDeleteCustomJob,
  viewMode = 'grid'
}) {
  const getEmploymentBadge = (type) => {
    switch(type) {
      case 'outsource':
        return { label: 'Outsource', className: 'tag-outsource' };
      case 'contract':
        return { label: 'Contract', className: 'tag-contract' };
      case 'freelance':
        return { label: 'Freelance', className: 'tag-freelance' };
      case 'internship':
        return { label: 'Internship', className: 'tag-intern' };
      default:
        return { label: 'Full-time', className: 'tag-fulltime' };
    }
  };

  const getWorkModeBadge = (mode) => {
    switch(mode) {
      case 'remote': return 'Remote';
      case 'hybrid': return 'Hybrid';
      default: return 'On-site';
    }
  };

  const getExperienceLabel = (exp) => {
    switch(exp) {
      case 'entry': return 'Entry / Fresh';
      case 'junior': return 'Junior (1-3y)';
      case 'mid': return 'Mid (3-5y)';
      case 'senior': return 'Senior (5-8y)';
      case 'lead': return 'Lead (8+y)';
      default: return exp;
    }
  };

  const empInfo = getEmploymentBadge(job.employmentType);
  const locInfo = getJobLocationInfo(job, desiredLocation);

  // LIST VIEW LAYOUT
  if (viewMode === 'list') {
    return (
      <div className={`job-list-row ${isCompared ? 'is-compared' : ''} ${job.isCustomImport ? 'is-custom-job' : ''}`}>
        <div className="list-col-company">
          <div className="company-logo-box">
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
          <div>
            <div className="list-title-row">
              <h3 className="job-list-title" onClick={() => onSelectJob(job)}>
                {job.title}
              </h3>
              {job.isCustomImport && (
                <span className="list-custom-badge" title="Imported by you">
                  ✨ Custom Import
                </span>
              )}
              {job.scope === 'foreign' && <span className="list-scope-tag">Global</span>}
            </div>
            <div className="list-company-meta">
              <span className="company-name">{job.company}</span>
              <span className="meta-separator">•</span>
              <span className="location-text">
                <MapPin size={12} />
                {job.location.split('(')[0].trim()}
              </span>
              <span className="meta-separator">•</span>
              {/* Proximity / Distance Badge */}
              <span className={`list-proximity-badge ${locInfo.badgeClass}`} title={locInfo.commuteText}>
                {locInfo.isRemote ? <Globe2 size={11} /> : <Navigation size={11} />}
                <span>{locInfo.badgeLabel}</span>
              </span>
              <span className="meta-separator">•</span>
              <span className="posted-time">{job.postedAt}</span>
            </div>
          </div>
        </div>

        <div className="list-col-details">
          <div className="list-badges">
            <span className={`clean-tag ${empInfo.className}`}>{empInfo.label}</span>
            <span className="clean-tag tag-workmode">{getWorkModeBadge(job.workMode)}</span>
            <span className="clean-tag tag-exp">{getExperienceLabel(job.experienceLevel)}</span>
          </div>
          <div className="list-tech-tags">
            {job.techStack.slice(0, 3).map(tech => (
              <span key={tech} className="tech-badge">{tech}</span>
            ))}
          </div>
        </div>

        <div className="list-col-bottom">
          <div className="list-col-salary">
            <span className="salary-highlight">{job.salary.text.split('/')[0].trim()}</span>
            <span className="salary-period">{job.salary.period === 'monthly' ? '/ month' : '/ year'}</span>
          </div>

          <div className="list-col-actions">
            <button 
              type="button" 
              className={`btn-icon btn-fav-icon ${isBookmarked ? 'favorited' : ''}`}
              onClick={() => onToggleBookmark(job)}
              title={isBookmarked ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart 
                size={16} 
                fill={isBookmarked ? '#f43f5e' : 'none'} 
                color={isBookmarked ? '#f43f5e' : 'currentColor'} 
              />
            </button>
            <button 
              type="button" 
              className={`btn-icon ${isCompared ? 'saved' : ''}`}
              onClick={() => onToggleCompare(job)}
              title={isCompared ? 'Remove from compare' : 'Compare job'}
            >
              <Scale size={15} />
            </button>
            {job.isCustomImport && onDeleteCustomJob && (
              <button
                type="button"
                className="btn-icon btn-trash-custom"
                onClick={() => onDeleteCustomJob(job.id)}
                title="Delete imported job"
              >
                <Trash2 size={15} />
              </button>
            )}
            <button 
              type="button" 
              className="btn-details-sm"
              onClick={() => onSelectJob(job)}
            >
              <Eye size={13} />
              <span>Details</span>
            </button>
            <a 
              href={job.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-apply-sm"
            >
              <span>Apply</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // GRID CARD VIEW LAYOUT
  return (
    <div className={`clean-job-card ${isCompared ? 'is-compared' : ''} ${job.isCustomImport ? 'is-custom-job' : ''}`}>
      {/* 1. Header: Company Logo, Name, Location, Source */}
      <div className="card-header">
        <div className="company-info">
          <div className="company-logo-box">
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
          <div>
            <h4 className="company-name">{job.company}</h4>
            <div className="company-location">
              <MapPin size={12} />
              <span>{job.location.split('(')[0].trim()}</span>
            </div>
          </div>
        </div>

        <div className="header-badges">
          {job.isCustomImport && (
            <span className="custom-import-pill" title="Imported by you">
              <Sparkles size={11} />
              <span>Custom Import</span>
            </span>
          )}
          <span className="source-pill">{job.sourcePlatform}</span>
          <span className={`scope-pill ${job.scope === 'foreign' ? 'global' : 'th'}`}>
            {job.scope === 'thai' ? '🇹🇭 TH' : '🌏 Global'}
          </span>
        </div>
      </div>

      {/* Proximity / Desired Location Distance Banner */}
      <div className={`card-proximity-banner ${locInfo.badgeClass}`} title={locInfo.matchSummary}>
        <div className="proximity-left">
          {locInfo.isRemote ? <Globe2 size={12} /> : <Navigation size={12} />}
          <span className="proximity-title">{locInfo.badgeLabel}</span>
        </div>
        <span className="proximity-commute-preview">{locInfo.commuteText.split('(')[0]}</span>
      </div>

      {/* 2. Job Title */}
      <div className="card-title-wrap">
        <h3 className="job-title" onClick={() => onSelectJob(job)}>
          {job.title}
        </h3>
      </div>

      {/* 3. Matter Data: Salary Highlight */}
      <div className="salary-bar">
        <div className="salary-amount">{job.salary.text}</div>
        <span className="posted-label">{job.postedAt}</span>
      </div>

      {/* 4. Matter Badges (Work Mode, Employment Type, Level) */}
      <div className="matter-badges-row">
        <span className={`clean-tag ${empInfo.className}`}>{empInfo.label}</span>
        <span className="clean-tag tag-workmode">{getWorkModeBadge(job.workMode)}</span>
        <span className="clean-tag tag-exp">{getExperienceLabel(job.experienceLevel)}</span>
      </div>

      {/* 5. Tech Stack Pills */}
      <div className="tech-tags-row">
        {job.techStack.slice(0, 4).map(tech => (
          <span key={tech} className="tech-badge">{tech}</span>
        ))}
        {job.techStack.length > 4 && (
          <span className="tech-badge more">+{job.techStack.length - 4}</span>
        )}
      </div>

      {/* 6. Card Actions */}
      <div className="card-actions-bar">
        <div className="action-buttons-left">
          <button 
            type="button" 
            className={`btn-icon btn-fav-icon ${isBookmarked ? 'favorited' : ''}`}
            onClick={() => onToggleBookmark(job)}
            title={isBookmarked ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart 
              size={16} 
              fill={isBookmarked ? '#f43f5e' : 'none'} 
              color={isBookmarked ? '#f43f5e' : 'currentColor'} 
            />
          </button>
          <button 
            type="button" 
            className={`btn-icon ${isCompared ? 'saved' : ''}`}
            onClick={() => onToggleCompare(job)}
            title={isCompared ? 'Remove from compare' : 'Compare job'}
          >
            <Scale size={15} />
          </button>
          {job.isCustomImport && onDeleteCustomJob && (
            <button
              type="button"
              className="btn-icon btn-trash-custom"
              onClick={() => onDeleteCustomJob(job.id)}
              title="Delete imported job"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>

        <div className="action-buttons-right">
          <button 
            type="button" 
            className="btn-details"
            onClick={() => onSelectJob(job)}
          >
            <Eye size={14} />
            <span>Details</span>
          </button>
          <a 
            href={job.sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-apply"
          >
            <span>Apply</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
