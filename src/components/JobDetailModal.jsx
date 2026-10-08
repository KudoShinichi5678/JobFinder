import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Languages, 
  Briefcase, 
  Building2, 
  ExternalLink, 
  Heart, 
  Scale, 
  CheckCircle, 
  Gift, 
  Share2, 
  Check,
  Globe2,
  Users,
  Navigation,
  Compass,
  Map,
  Sparkles,
  Trash2
} from 'lucide-react';
import { getJobLocationInfo, getJobCoordinates } from '../utils/locationUtils';

export function JobDetailModal({ 
  job, 
  onClose, 
  desiredLocation,
  onSetAsDesiredLocation,
  isBookmarked, 
  onToggleBookmark, 
  isCompared, 
  onToggleCompare,
  onDeleteCustomJob
}) {
  const [copied, setCopied] = useState(false);
  const [showApplySuccess, setShowApplySuccess] = useState(false);
  const [adoptedLocationSuccess, setAdoptedLocationSuccess] = useState(false);

  if (!job) return null;

  const locInfo = getJobLocationInfo(job, desiredLocation);
  const jobCoords = getJobCoordinates(job);

  const handleCopy = () => {
    const text = `${job.title} at ${job.company} (${job.salary.text})\nLocation: ${job.location}\nSource: ${job.sourcePlatform.toUpperCase()}\nLink: ${job.sourceUrl}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSimulateApply = () => {
    setShowApplySuccess(true);
    setTimeout(() => {
      window.open(job.sourceUrl, '_blank', 'noopener,noreferrer');
    }, 1200);
  };

  const handleAdoptLocation = () => {
    if (onSetAsDesiredLocation) {
      const cityName = job.location.split('(')[0].trim();
      onSetAsDesiredLocation({
        id: `custom-${job.region}`,
        name: cityName,
        shortName: cityName.split(',')[0],
        type: 'custom',
        coords: { lat: jobCoords.lat, lng: jobCoords.lng },
        radiusKm: 35,
        filterOnlyWithinRadius: false,
        includeRemote: true,
        isWorldwide: false
      });
      setAdoptedLocationSuccess(true);
      setTimeout(() => setAdoptedLocationSuccess(false), 3000);
    }
  };

  const getSourceDisplay = (source) => {
    switch(source) {
      case 'linkedin':
        return { name: 'LinkedIn Jobs', color: '#0a66c2', desc: 'Direct application via LinkedIn Easy Apply' };
      case 'jobsdb':
        return { name: 'JobsDB Thailand', color: '#ff6600', desc: 'Verified listing on JobsDB Portal' };
      case 'jobthai':
        return { name: 'JobThai', color: '#e11d48', desc: 'Sourced from JobThai Career Network' };
      case 'facebook':
        return { name: 'Facebook Tech Group', color: '#1877f2', desc: 'Community hiring post on Facebook Dev Groups' };
      case 'x':
        return { name: 'X (Twitter)', color: '#0f1419', desc: 'Founder direct hiring tweet on X' };
      case 'remoteok':
        return { name: 'RemoteOK', color: '#10b981', desc: 'Worldwide remote developer feed' };
      default:
        return { name: 'Web Aggregator', color: '#6366f1', desc: 'Direct verified job portal' };
    }
  };

  const sourceMeta = getSourceDisplay(job.sourcePlatform);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.location)}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-detail" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} title="Close modal">
          <X size={20} />
        </button>

        {/* Source Attribution Alert Banner */}
        <div className="source-attribution-banner" style={{ borderLeftColor: sourceMeta.color }}>
          <div className="source-attr-left">
            <Globe2 size={16} style={{ color: sourceMeta.color }} />
            <div>
              <strong>Sourced from {sourceMeta.name}</strong>
              <p className="source-attr-desc">{sourceMeta.desc}</p>
            </div>
          </div>
          {job.sourceSnippet && (
            <span className="source-snippet-pill">
              "{job.sourceSnippet}"
            </span>
          )}
        </div>

        {/* Modal Header */}
        <div className="modal-job-header">
          <div className="modal-company-info">
            <div className="modal-avatar" style={{ borderColor: job.brandColor || '#38bdf8' }}>
              <img 
                src={job.companyLogo} 
                alt={job.company} 
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <span className="avatar-fallback" style={{ display: 'none' }}>
                {job.company.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="modal-company-meta">
                <span className="modal-company-name">{job.company}</span>
                <span className="modal-meta-dot">•</span>
                <span className="modal-posted-time">{job.postedAt}</span>
                <span className="modal-meta-dot">•</span>
                <span className="modal-applicants"><Users size={12} /> {job.applicantsCount} Applicants</span>
                {job.isCustomImport && (
                  <>
                    <span className="modal-meta-dot">•</span>
                    <span className="modal-custom-badge">
                      <Sparkles size={11} />
                      <span>Custom Import</span>
                    </span>
                  </>
                )}
              </div>
              <h2 className="modal-job-title">{job.title}</h2>
            </div>
          </div>

          {/* Salary Highlight Badge */}
          <div className="modal-salary-box">
            <span className="modal-salary-label">Estimated Compensation</span>
            <span className="modal-salary-amount">{job.salary.text}</span>
          </div>
        </div>

        {/* Proximity & Desired Location Match Highlight Card */}
        <div className="modal-location-match-card">
          <div className="loc-match-header">
            <div className="loc-match-title-row">
              <div className="loc-match-icon-circle">
                {locInfo.isRemote ? <Globe2 size={18} /> : <Navigation size={18} />}
              </div>
              <div>
                <span className="loc-match-kicker">DESIRED LOCATION ANALYSIS</span>
                <h4 className="loc-match-title">
                  {locInfo.isRemote ? '100% Remote Eligible' : `${locInfo.distanceFormatted} away from your target`}
                </h4>
              </div>
            </div>
            <span className={`loc-match-status-badge ${locInfo.badgeClass}`}>
              {locInfo.badgeLabel}
            </span>
          </div>

          <div className="loc-match-grid">
            <div className="loc-match-item">
              <span className="loc-match-item-lbl">Your Active Target:</span>
              <strong className="loc-match-item-val">{desiredLocation?.name || 'Default Hub'}</strong>
            </div>
            <div className="loc-match-item">
              <span className="loc-match-item-lbl">Office Location:</span>
              <strong className="loc-match-item-val">{job.location}</strong>
            </div>
            <div className="loc-match-item">
              <span className="loc-match-item-lbl">Commute Feasibility:</span>
              <strong className="loc-match-item-val">{locInfo.commuteText}</strong>
            </div>
            <div className="loc-match-item">
              <span className="loc-match-item-lbl">Radius Match:</span>
              <strong className={`loc-match-item-val ${locInfo.isWithinRadius ? 'text-green' : 'text-amber'}`}>
                {locInfo.isWithinRadius ? 'Within Selected Radius' : 'Outside Selected Radius'}
              </strong>
            </div>
          </div>

          {/* Location Actions inside Modal */}
          <div className="loc-match-actions">
            {!locInfo.isRemote && (
              <button 
                type="button" 
                className="btn-loc-subtle"
                onClick={handleAdoptLocation}
                title="Change your desired location to this job's city"
              >
                <Compass size={14} />
                <span>{adoptedLocationSuccess ? 'Target Location Updated!' : `Set "${job.location.split('(')[0].trim()}" as My Desired Location`}</span>
              </button>
            )}

            <a 
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-loc-subtle"
              title="Open directions in Google Maps"
            >
              <Map size={14} />
              <span>View in Google Maps</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Key Metrics / Criteria Grid */}
        <div className="modal-metrics-grid">
          <div className="metric-box">
            <span className="metric-label">Employment Type</span>
            <div className="metric-val-wrap">
              <Briefcase size={15} className="metric-icon" />
              <strong className={`metric-val ${job.employmentType === 'outsource' ? 'text-amber' : ''}`}>
                {job.employmentType === 'outsource' ? 'Outsource / Staff Aug' : 
                 job.employmentType === 'contract' ? 'Contract Fixed-Term' :
                 job.employmentType === 'freelance' ? 'Freelance / B2B' :
                 job.employmentType === 'internship' ? 'Paid Internship' : 'Full-time Permanent'}
              </strong>
            </div>
          </div>

          <div className="metric-box">
            <span className="metric-label">Work Mode</span>
            <div className="metric-val-wrap">
              <Building2 size={15} className="metric-icon" />
              <strong className="metric-val">
                {job.workMode === 'remote' ? '100% Remote' : job.workMode === 'hybrid' ? 'Hybrid (Flex)' : 'On-site Office'}
              </strong>
            </div>
          </div>

          <div className="metric-box">
            <span className="metric-label">Location</span>
            <div className="metric-val-wrap">
              <MapPin size={15} className="metric-icon" />
              <strong className="metric-val">{job.location}</strong>
            </div>
          </div>

          <div className="metric-box">
            <span className="metric-label">Experience Required</span>
            <div className="metric-val-wrap">
              <Clock size={15} className="metric-icon" />
              <strong className="metric-val capitalize">{job.experienceLevel} Level</strong>
            </div>
          </div>

          <div className="metric-box">
            <span className="metric-label">Language</span>
            <div className="metric-val-wrap">
              <Languages size={15} className="metric-icon" />
              <strong className="metric-val">
                {job.languageReq === 'thai' ? '🇹🇭 Thai Native' :
                 job.languageReq === 'english-work' ? '🇬🇧 English (Working)' :
                 job.languageReq === 'english-fluent' ? '🇬🇧 English (Fluent)' :
                 job.languageReq === 'japanese' ? '🇯🇵 Japanese (N1-N3)' : '🌐 Bilingual (TH/EN)'}
              </strong>
            </div>
          </div>

          <div className="metric-box">
            <span className="metric-label">Market Scope</span>
            <div className="metric-val-wrap">
              <Globe2 size={15} className="metric-icon" />
              <strong className="metric-val">
                {job.scope === 'thai' ? '🇹🇭 Thailand Local' : '🌏 Foreign / Expat'}
              </strong>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="modal-section">
          <h4 className="modal-section-title">Required Tech Stack & Skills</h4>
          <div className="modal-tech-chips">
            {job.techStack.map(tech => (
              <span key={tech} className="tech-pill large">{tech}</span>
            ))}
          </div>
        </div>

        {/* Job Description */}
        <div className="modal-section">
          <h4 className="modal-section-title">Job Overview</h4>
          <p className="modal-description-text">{job.description}</p>
        </div>

        {/* Responsibilities */}
        {job.responsibilities && job.responsibilities.length > 0 && (
          <div className="modal-section">
            <h4 className="modal-section-title">Key Responsibilities</h4>
            <ul className="modal-bullet-list">
              {job.responsibilities.map((resp, i) => (
                <li key={i}>
                  <CheckCircle size={15} className="bullet-icon check" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Requirements */}
        {job.requirements && job.requirements.length > 0 && (
          <div className="modal-section">
            <h4 className="modal-section-title">Requirements & Qualifications</h4>
            <ul className="modal-bullet-list">
              {job.requirements.map((req, i) => (
                <li key={i}>
                  <CheckCircle size={15} className="bullet-icon star" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Benefits & Perks */}
        {job.benefits && job.benefits.length > 0 && (
          <div className="modal-section">
            <h4 className="modal-section-title">Perks & Benefits</h4>
            <ul className="modal-bullet-list benefits-list">
              {job.benefits.map((benefit, i) => (
                <li key={i}>
                  <Gift size={15} className="bullet-icon gift" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Apply Success Banner */}
        {showApplySuccess && (
          <div className="apply-success-toast">
            <Check size={18} />
            <span>Redirecting to {sourceMeta.name} Application Portal...</span>
          </div>
        )}

        {/* Modal Action Footer */}
        <div className="modal-footer-actions">
          <div className="modal-secondary-buttons">
            <button 
              className={`btn btn-secondary ${isBookmarked ? 'btn-fav-active' : ''}`}
              onClick={() => onToggleBookmark(job)}
              title={isBookmarked ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart 
                size={16} 
                fill={isBookmarked ? '#f43f5e' : 'none'} 
                color={isBookmarked ? '#f43f5e' : 'currentColor'} 
              />
              <span>{isBookmarked ? 'In Favorites' : 'Add to Favorites'}</span>
            </button>

            {job.isCustomImport && onDeleteCustomJob && (
              <button 
                className="btn btn-secondary btn-trash-custom-modal"
                onClick={() => {
                  onDeleteCustomJob(job.id);
                  onClose();
                }}
                title="Delete this imported job"
              >
                <Trash2 size={15} />
                <span>Delete Job</span>
              </button>
            )}

            <button 
              className={`btn btn-secondary ${isCompared ? 'active' : ''}`}
              onClick={() => onToggleCompare(job)}
            >
              <Scale size={15} />
              <span>{isCompared ? 'In Compare List' : 'Compare'}</span>
            </button>

            <button 
              className="btn btn-ghost"
              onClick={handleCopy}
              title="Copy job summary and URL to clipboard"
            >
              {copied ? <Check size={15} className="text-green" /> : <Share2 size={15} />}
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
          </div>

          <div className="modal-primary-buttons">
            <button 
              className="btn btn-apply-primary"
              onClick={handleSimulateApply}
            >
              <span>Apply on {sourceMeta.name}</span>
              <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
