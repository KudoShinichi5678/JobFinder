import React, { useState } from 'react';
import { 
  X, 
  Link2, 
  Sparkles, 
  FileText, 
  Check, 
  AlertCircle, 
  Loader2, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Building2, 
  MapPin, 
  DollarSign, 
  Globe2, 
  Briefcase,
  Compass,
  ArrowRight,
  ClipboardPaste
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { extractJobData, SUPPORTED_PLATFORMS } from '../utils/jobExtractor';

const SAMPLE_LINKS = [
  {
    name: 'LinkedIn (Agoda)',
    url: 'https://www.linkedin.com/jobs/view/agoda-senior-frontend-developer-react-nextjs-3810293849',
    platform: 'linkedin'
  },
  {
    name: 'Greenhouse (Stripe)',
    url: 'https://boards.greenhouse.io/stripe/jobs/6049281-backend-infrastructure-engineer',
    platform: 'greenhouse'
  },
  {
    name: 'JobsDB (Bangkok)',
    url: 'https://th.jobsdb.com/job/lineman-wongnai-fullstack-engineer-golang-react-9281938',
    platform: 'jobsdb'
  },
  {
    name: 'Lever (Canva)',
    url: 'https://jobs.lever.co/canva/7b8c9d0e-lead-frontend-engineer',
    platform: 'lever'
  }
];

export function ImportJobModal({ isOpen, onClose, onJobImported }) {
  const [activeTab, setActiveTab] = useState('link'); // 'link' | 'text'
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [extractedJob, setExtractedJob] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [newTagInput, setNewTagInput] = useState('');

  if (!isOpen) return null;

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        if (activeTab === 'link') {
          setUrlInput(text.trim());
        } else {
          setTextInput(text.trim());
        }
      }
    } catch (e) {
      // clipboard access denied
    }
  };

  const handleStartExtraction = async () => {
    const input = activeTab === 'link' ? urlInput.trim() : textInput.trim();
    if (!input) {
      setErrorMessage(activeTab === 'link' ? 'Please enter a valid job link URL.' : 'Please paste some job post text.');
      return;
    }

    setErrorMessage('');
    setIsExtracting(true);
    setProgressMsg('Initiating smart job parser...');

    try {
      const result = await extractJobData(input, (step) => {
        setProgressMsg(step);
      });

      if (result) {
        setExtractedJob(result);
      } else {
        setErrorMessage('Could not automatically parse this job. Please check the link or paste the job description text.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to extract job data. You can paste the job description directly.');
    } finally {
      setIsExtracting(false);
      setProgressMsg('');
    }
  };

  const handleSampleClick = (url) => {
    setUrlInput(url);
    setErrorMessage('');
  };

  // Modify Extracted Job Fields
  const handleFieldChange = (field, value) => {
    setExtractedJob(prev => ({ ...prev, [field]: value }));
  };

  const handleSalaryChange = (field, value) => {
    setExtractedJob(prev => {
      const updatedSalary = { ...prev.salary, [field]: value };
      if (field === 'text') {
        updatedSalary.text = value;
      }
      return { ...prev, salary: updatedSalary };
    });
  };

  const handleAddTechTag = () => {
    if (!newTagInput.trim()) return;
    const tag = newTagInput.trim();
    if (!extractedJob.techStack.includes(tag)) {
      setExtractedJob(prev => ({
        ...prev,
        techStack: [...prev.techStack, tag]
      }));
    }
    setNewTagInput('');
  };

  const handleRemoveTechTag = (tagToRemove) => {
    setExtractedJob(prev => ({
      ...prev,
      techStack: prev.techStack.filter(t => t !== tagToRemove)
    }));
  };

  const handleConfirmImport = () => {
    if (!extractedJob) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    onJobImported(extractedJob);
    onClose();
  };

  const handleReset = () => {
    setExtractedJob(null);
    setErrorMessage('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content modal-import-job" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="import-modal-header">
          <div className="import-title-group">
            <div className="import-icon-badge">
              <Sparkles size={20} className="text-cyan" />
            </div>
            <div>
              <h3 className="import-modal-title">Import Job Opportunity</h3>
              <p className="import-modal-subtitle">
                Found a job somewhere else? Paste the link and we'll automatically extract the details into your feed.
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close">
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="import-modal-body">
          {!extractedJob ? (
            /* STEP 1: INPUT URL OR TEXT */
            <div className="import-input-step">
              {/* Tab Switcher */}
              <div className="import-tabs-bar">
                <button 
                  type="button" 
                  className={`import-tab-btn ${activeTab === 'link' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('link'); setErrorMessage(''); }}
                >
                  <Link2 size={15} />
                  <span>Import via Link (Any URL)</span>
                </button>
                <button 
                  type="button" 
                  className={`import-tab-btn ${activeTab === 'text' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('text'); setErrorMessage(''); }}
                >
                  <FileText size={15} />
                  <span>Paste Job Description Text</span>
                </button>
              </div>

              {activeTab === 'link' ? (
                <div className="import-tab-content">
                  <div className="import-input-wrapper">
                    <label className="import-field-label">
                      Paste Job Link (LinkedIn, Indeed, JobsDB, Greenhouse, Lever, or any website)
                    </label>
                    <div className="import-input-row">
                      <div className="import-input-box">
                        <Link2 size={16} className="input-link-icon" />
                        <input 
                          type="url"
                          className="import-url-input"
                          placeholder="https://www.linkedin.com/jobs/view/... or any career page link"
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleStartExtraction()}
                          autoFocus
                        />
                        {urlInput && (
                          <button 
                            type="button" 
                            className="input-clear-btn" 
                            onClick={() => setUrlInput('')}
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                      <button 
                        type="button" 
                        className="btn-paste-clipboard"
                        onClick={handlePasteClipboard}
                        title="Paste from clipboard"
                      >
                        <ClipboardPaste size={15} />
                        <span>Paste</span>
                      </button>
                    </div>
                  </div>

                  {/* Sample Quick Try Links */}
                  <div className="sample-links-bar">
                    <span className="sample-links-title">Try real-world sample:</span>
                    <div className="sample-chips">
                      {SAMPLE_LINKS.map(sample => (
                        <button
                          key={sample.name}
                          type="button"
                          className="sample-chip"
                          onClick={() => handleSampleClick(sample.url)}
                        >
                          <span>{sample.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Supported Sources Preview */}
                  <div className="supported-platforms-tray">
                    <span className="platforms-title">Supported sources & boards:</span>
                    <div className="platform-badges">
                      {SUPPORTED_PLATFORMS.slice(0, 8).map(p => (
                        <span key={p.id} className="platform-mini-pill">
                          {p.name}
                        </span>
                      ))}
                      <span className="platform-mini-pill more">+ Any Company Site</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* TAB: PASTE TEXT */
                <div className="import-tab-content">
                  <div className="import-input-wrapper">
                    <div className="paste-text-header">
                      <label className="import-field-label">
                        Paste Job Post Text (Requirements, salary, responsibilities)
                      </label>
                      <button 
                        type="button" 
                        className="btn-paste-clipboard-sm"
                        onClick={handlePasteClipboard}
                      >
                        <ClipboardPaste size={13} />
                        <span>Paste Clipboard</span>
                      </button>
                    </div>
                    <textarea 
                      className="import-textarea"
                      rows={7}
                      placeholder="e.g.&#10;Agoda is hiring Senior React Developer in Bangkok.&#10;Salary: ฿120,000 - ฿180,000 / month&#10;Work Mode: Hybrid (2 days office)&#10;Tech Stack: React, TypeScript, Next.js, Node.js&#10;Requirements: 4+ years frontend..."
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="import-error-banner">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Action Button */}
              <div className="import-step1-actions">
                <button 
                  type="button" 
                  className="btn-extract-primary"
                  onClick={handleStartExtraction}
                  disabled={isExtracting}
                >
                  {isExtracting ? (
                    <>
                      <Loader2 size={16} className="spinning" />
                      <span>{progressMsg || 'Extracting job data...'}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>Extract & Import Job</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* STEP 2: REVIEW & EDIT EXTRACTED JOB */
            <div className="import-review-step">
              <div className="review-banner-success">
                <div className="review-banner-left">
                  <Check size={18} className="text-green" />
                  <div>
                    <strong>Data Extracted Successfully!</strong>
                    <p>Review and adjust any fields below before importing to your JobFinder feed.</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="btn-start-over"
                  onClick={handleReset}
                >
                  Start Over
                </button>
              </div>

              {/* Form Grid */}
              <div className="review-form-grid">
                {/* Title */}
                <div className="review-field col-full">
                  <label className="field-lbl">Job Title *</label>
                  <input 
                    type="text" 
                    className="review-input"
                    value={extractedJob.title} 
                    onChange={(e) => handleFieldChange('title', e.target.value)} 
                    placeholder="e.g. Senior Frontend Engineer"
                  />
                </div>

                {/* Company & Logo */}
                <div className="review-field">
                  <label className="field-lbl">Company Name *</label>
                  <div className="input-with-icon">
                    <Building2 size={15} className="field-icon" />
                    <input 
                      type="text" 
                      className="review-input pl-icon"
                      value={extractedJob.company} 
                      onChange={(e) => handleFieldChange('company', e.target.value)} 
                      placeholder="e.g. Agoda"
                    />
                  </div>
                </div>

                <div className="review-field">
                  <label className="field-lbl">Location / City *</label>
                  <div className="input-with-icon">
                    <MapPin size={15} className="field-icon" />
                    <input 
                      type="text" 
                      className="review-input pl-icon"
                      value={extractedJob.location} 
                      onChange={(e) => handleFieldChange('location', e.target.value)} 
                      placeholder="e.g. Bangkok, Thailand"
                    />
                  </div>
                </div>

                {/* Salary Highlight */}
                <div className="review-field">
                  <label className="field-lbl">Salary / Compensation Text</label>
                  <div className="input-with-icon">
                    <DollarSign size={15} className="field-icon" />
                    <input 
                      type="text" 
                      className="review-input pl-icon"
                      value={extractedJob.salary?.text || ''} 
                      onChange={(e) => handleSalaryChange('text', e.target.value)} 
                      placeholder="e.g. ฿120,000 - ฿180,000 / month"
                    />
                  </div>
                </div>

                {/* Work Mode */}
                <div className="review-field">
                  <label className="field-lbl">Work Mode</label>
                  <select 
                    className="review-select"
                    value={extractedJob.workMode}
                    onChange={(e) => handleFieldChange('workMode', e.target.value)}
                  >
                    <option value="remote">Remote (Work from Anywhere)</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">On-site Office</option>
                  </select>
                </div>

                {/* Employment Type */}
                <div className="review-field">
                  <label className="field-lbl">Employment Type</label>
                  <select 
                    className="review-select"
                    value={extractedJob.employmentType}
                    onChange={(e) => handleFieldChange('employmentType', e.target.value)}
                  >
                    <option value="fulltime">Full-time Permanent</option>
                    <option value="contract">Contract Fixed-Term</option>
                    <option value="outsource">Outsource / Staff Aug</option>
                    <option value="freelance">Freelance / Project</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                {/* Experience Level */}
                <div className="review-field">
                  <label className="field-lbl">Experience Level</label>
                  <select 
                    className="review-select"
                    value={extractedJob.experienceLevel}
                    onChange={(e) => handleFieldChange('experienceLevel', e.target.value)}
                  >
                    <option value="lead">Lead / Staff (8+ yrs)</option>
                    <option value="senior">Senior (5-8 yrs)</option>
                    <option value="mid">Mid-level (3-5 yrs)</option>
                    <option value="junior">Junior (1-3 yrs)</option>
                    <option value="entry">Entry / Fresh Grad</option>
                  </select>
                </div>

                {/* Scope */}
                <div className="review-field">
                  <label className="field-lbl">Job Scope</label>
                  <select 
                    className="review-select"
                    value={extractedJob.scope}
                    onChange={(e) => handleFieldChange('scope', e.target.value)}
                  >
                    <option value="thai">🇹🇭 Thailand Local / Expat</option>
                    <option value="foreign">🌏 Global / International Remote</option>
                  </select>
                </div>

                {/* Source URL */}
                <div className="review-field">
                  <label className="field-lbl">Original Application Link</label>
                  <div className="input-with-icon">
                    <Globe2 size={15} className="field-icon" />
                    <input 
                      type="url" 
                      className="review-input pl-icon"
                      value={extractedJob.sourceUrl} 
                      onChange={(e) => handleFieldChange('sourceUrl', e.target.value)} 
                    />
                  </div>
                </div>

                {/* Tech Stack Chips & Tag Input */}
                <div className="review-field col-full">
                  <label className="field-lbl">Tech Stack Tags</label>
                  <div className="review-tags-box">
                    <div className="review-chips-list">
                      {extractedJob.techStack.map(tag => (
                        <span key={tag} className="tech-chip-item">
                          <span>{tag}</span>
                          <button 
                            type="button" 
                            onClick={() => handleRemoveTechTag(tag)}
                            title="Remove tag"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="add-tag-row">
                      <input 
                        type="text" 
                        className="add-tag-input"
                        placeholder="Add technology (e.g. Next.js, Docker)..."
                        value={newTagInput}
                        onChange={(e) => setNewTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTechTag();
                          }
                        }}
                      />
                      <button 
                        type="button" 
                        className="btn-add-tag"
                        onClick={handleAddTechTag}
                      >
                        <Plus size={14} />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Description Preview */}
                <div className="review-field col-full">
                  <label className="field-lbl">Job Summary / Description</label>
                  <textarea 
                    className="review-textarea"
                    rows={3}
                    value={extractedJob.description}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                  />
                </div>
              </div>

              {/* Review Actions */}
              <div className="review-footer-bar">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-import-confirm"
                  onClick={handleConfirmImport}
                >
                  <Sparkles size={16} />
                  <span>Import Job to My Feed</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
