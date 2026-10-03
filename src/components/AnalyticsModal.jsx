import React from 'react';
import { X, BarChart3, TrendingUp, DollarSign, Globe, Briefcase, Code, Shield } from 'lucide-react';

export function AnalyticsModal({ isOpen, onClose, allJobs }) {
  if (!isOpen) return null;

  // Calculate statistics
  const total = allJobs.length;
  const thaiJobs = allJobs.filter(j => j.scope === 'thai').length;
  const foreignJobs = allJobs.filter(j => j.scope === 'foreign').length;
  const outsourceJobs = allJobs.filter(j => j.employmentType === 'outsource' || j.employmentType === 'contract').length;
  const remoteJobs = allJobs.filter(j => j.workMode === 'remote').length;

  // Platform breakdown
  const platforms = allJobs.reduce((acc, job) => {
    acc[job.sourcePlatform] = (acc[job.sourcePlatform] || 0) + 1;
    return acc;
  }, {});

  // Tech stack ranking
  const skillCounts = allJobs.reduce((acc, job) => {
    job.techStack.forEach(skill => {
      acc[skill] = (acc[skill] || 0) + 1;
    });
    return acc;
  }, {});

  const topSkills = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-analytics" onClick={(e) => e.stopPropagation()}>
        <div className="analytics-header">
          <div className="analytics-title-wrap">
            <BarChart3 size={24} className="text-sky" />
            <div>
              <h3 className="analytics-title">Tech Hiring Market Trends & Salary Insights</h3>
              <p className="analytics-subtitle">Real-time statistics synthesized from {total} aggregated listings</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Quick Numbers Row */}
        <div className="analytics-stats-grid">
          <div className="stat-card">
            <span className="stat-label">Thai Local Market</span>
            <strong className="stat-val text-sky">{thaiJobs}</strong>
            <span className="stat-desc">{Math.round((thaiJobs/total)*100)}% of total listings</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Foreign & USD Remote</span>
            <strong className="stat-val text-green">{foreignJobs}</strong>
            <span className="stat-desc">{Math.round((foreignJobs/total)*100)}% international</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Outsource & Contract</span>
            <strong className="stat-val text-amber">{outsourceJobs}</strong>
            <span className="stat-desc">Staff Aug & high-rate vendor roles</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">100% Remote Positions</span>
            <strong className="stat-val text-purple">{remoteJobs}</strong>
            <span className="stat-desc">Work from anywhere</span>
          </div>
        </div>

        {/* Salary Benchmark Matrix */}
        <div className="analytics-section">
          <div className="section-header-row">
            <DollarSign size={18} className="text-green" />
            <h4 className="section-title">Estimated Monthly Salary Benchmark (Bangkok Tech Market)</h4>
          </div>
          <div className="salary-benchmark-bars">
            <div className="benchmark-bar-row">
              <span className="bar-label">Entry / Fresh Grad (0-1y)</span>
              <div className="bar-track">
                <div className="bar-fill fill-entry" style={{ width: '25%' }}></div>
              </div>
              <span className="bar-value">฿35,000 - ฿55,000</span>
            </div>

            <div className="benchmark-bar-row">
              <span className="bar-label">Junior Developer (1-3y)</span>
              <div className="bar-track">
                <div className="bar-fill fill-junior" style={{ width: '40%' }}></div>
              </div>
              <span className="bar-value">฿50,000 - ฿85,000</span>
            </div>

            <div className="benchmark-bar-row">
              <span className="bar-label">Mid-Level Software Eng (3-5y)</span>
              <div className="bar-track">
                <div className="bar-fill fill-mid" style={{ width: '65%' }}></div>
              </div>
              <span className="bar-value">฿85,000 - ฿140,000</span>
            </div>

            <div className="benchmark-bar-row">
              <span className="bar-label">Senior Software Eng (5-8y)</span>
              <div className="bar-track">
                <div className="bar-fill fill-senior" style={{ width: '85%' }}></div>
              </div>
              <span className="bar-value">฿130,000 - ฿220,000</span>
            </div>

            <div className="benchmark-bar-row">
              <span className="bar-label">Tech Lead / Architect (8+y)</span>
              <div className="bar-track">
                <div className="bar-fill fill-lead" style={{ width: '100%' }}></div>
              </div>
              <span className="bar-value">฿180,000 - ฿300,000+</span>
            </div>
          </div>
        </div>

        {/* Top In-Demand Tech Skills */}
        <div className="analytics-section">
          <div className="section-header-row">
            <Code size={18} className="text-sky" />
            <h4 className="section-title">Top 8 In-Demand Technologies Across Thai & Foreign Listings</h4>
          </div>
          <div className="top-skills-grid">
            {topSkills.map(([skill, count], i) => (
              <div key={skill} className="skill-card">
                <span className="skill-rank">#{i+1}</span>
                <span className="skill-name">{skill}</span>
                <span className="skill-badge">{count} mentions</span>
              </div>
            ))}
          </div>
        </div>

        {/* Source Platform Breakdown */}
        <div className="analytics-section">
          <div className="section-header-row">
            <Globe size={18} className="text-purple" />
            <h4 className="section-title">Aggregated Source Share</h4>
          </div>
          <div className="platform-share-grid">
            {Object.entries(platforms).map(([platform, count]) => (
              <div key={platform} className="platform-stat-item">
                <span className="platform-name capitalize">{platform}</span>
                <strong className="platform-count">{count} jobs</strong>
                <span className="platform-pct">({Math.round((count/total)*100)}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
