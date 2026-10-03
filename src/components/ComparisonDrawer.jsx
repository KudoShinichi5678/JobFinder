import React from 'react';
import { X, Scale, ExternalLink, Trash2, Check, ArrowRight } from 'lucide-react';

export function ComparisonDrawer({ 
  isOpen, 
  onClose, 
  compareJobs, 
  onRemoveCompare, 
  onClearCompare,
  onSelectJob 
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-compare" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="compare-header">
          <div className="compare-header-left">
            <Scale size={22} className="text-sky" />
            <div>
              <h3 className="compare-title">Job Comparison Matrix</h3>
              <p className="compare-subtitle">Compare up to 3 positions side-by-side to make the best decision</p>
            </div>
          </div>
          <div className="compare-header-actions">
            {compareJobs.length > 0 && (
              <button className="btn-clear-compare" onClick={onClearCompare}>
                <Trash2 size={14} />
                <span>Clear All ({compareJobs.length})</span>
              </button>
            )}
            <button className="modal-close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Matrix */}
        {compareJobs.length === 0 ? (
          <div className="compare-empty-state">
            <Scale size={48} className="empty-icon" />
            <h4>No jobs selected for comparison yet</h4>
            <p>Click the scale icon (<Scale size={13} style={{ display: 'inline' }} />) on any job card to add it to your comparison matrix.</p>
          </div>
        ) : (
          <div className="compare-table-wrapper">
            <table className="compare-table">
              <thead>
                <tr>
                  <th className="compare-criteria-col">Criteria</th>
                  {compareJobs.map(job => (
                    <th key={job.id} className="compare-job-col">
                      <div className="compare-job-header">
                        <button 
                          className="compare-remove-btn" 
                          onClick={() => onRemoveCompare(job.id)}
                          title="Remove from comparison"
                        >
                          <X size={14} />
                        </button>
                        <div className="compare-company-logo">
                          <img src={job.companyLogo} alt={job.company} />
                        </div>
                        <h4 className="compare-job-title" onClick={() => onSelectJob(job)}>
                          {job.title}
                        </h4>
                        <span className="compare-company-name">{job.company}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* 1. Compensation */}
                <tr>
                  <td className="criteria-label">Salary / Compensation</td>
                  {compareJobs.map(job => (
                    <td key={job.id} className="criteria-value">
                      <strong className="text-highlight">{job.salary.text}</strong>
                    </td>
                  ))}
                </tr>

                {/* 2. Employment Type (Outsource vs Fulltime) */}
                <tr>
                  <td className="criteria-label">Employment Type</td>
                  {compareJobs.map(job => (
                    <td key={job.id} className="criteria-value">
                      <span className={`pill-small ${job.employmentType === 'outsource' ? 'pill-amber' : 'pill-green'}`}>
                        {job.employmentType === 'outsource' ? 'Outsource / Staff Aug' : 
                         job.employmentType === 'contract' ? 'Contract' :
                         job.employmentType === 'freelance' ? 'Freelance' : 'Full-time'}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 3. Work Mode */}
                <tr>
                  <td className="criteria-label">Work Mode</td>
                  {compareJobs.map(job => (
                    <td key={job.id} className="criteria-value">
                      {job.workMode === 'remote' ? '🏠 100% Remote' : job.workMode === 'hybrid' ? '🔄 Hybrid' : '🏢 On-site'}
                    </td>
                  ))}
                </tr>

                {/* 4. Location & Region */}
                <tr>
                  <td className="criteria-label">Location</td>
                  {compareJobs.map(job => (
                    <td key={job.id} className="criteria-value">
                      <span>{job.location}</span>
                    </td>
                  ))}
                </tr>

                {/* 5. Experience */}
                <tr>
                  <td className="criteria-label">Experience</td>
                  {compareJobs.map(job => (
                    <td key={job.id} className="criteria-value capitalize">
                      {job.experienceLevel} Level
                    </td>
                  ))}
                </tr>

                {/* 6. Language Requirement */}
                <tr>
                  <td className="criteria-label">Language</td>
                  {compareJobs.map(job => (
                    <td key={job.id} className="criteria-value">
                      {job.languageReq === 'thai' ? '🇹🇭 Thai' :
                       job.languageReq === 'japanese' ? '🇯🇵 Japanese N1-N3' :
                       job.languageReq === 'english-fluent' ? '🇬🇧 English Fluent' :
                       job.languageReq === 'english-work' ? '🇬🇧 English Working' : '🌐 Bilingual'}
                    </td>
                  ))}
                </tr>

                {/* 7. Source Platform */}
                <tr>
                  <td className="criteria-label">Fetched From</td>
                  {compareJobs.map(job => (
                    <td key={job.id} className="criteria-value capitalize">
                      <span className="pill-small pill-source">
                        {job.sourcePlatform}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 8. Tech Stack */}
                <tr>
                  <td className="criteria-label">Tech Stack</td>
                  {compareJobs.map(job => (
                    <td key={job.id} className="criteria-value">
                      <div className="compare-tech-pills">
                        {job.techStack.map(t => (
                          <span key={t} className="tech-pill micro">{t}</span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 9. Action row */}
                <tr>
                  <td className="criteria-label">Action</td>
                  {compareJobs.map(job => (
                    <td key={job.id} className="criteria-value">
                      <div className="compare-action-btns">
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => onSelectJob(job)}
                        >
                          View Details
                        </button>
                        <a 
                          href={job.sourceUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="btn btn-apply-primary btn-sm"
                        >
                          <span>Apply</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
