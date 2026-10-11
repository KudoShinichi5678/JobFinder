import React, { useState, useEffect } from 'react';
import { 
  X, 
  Radar, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  ArrowRight,
  Globe,
  Database,
  Key,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  fetchUnifiedLiveJobs, 
  getStoredRapidApiKey, 
  setStoredRapidApiKey 
} from '../services/jobService';

export function LiveSyncModal({ isOpen, onClose, onSyncComplete }) {
  const [rapidApiKey, setRapidApiKey] = useState(() => getStoredRapidApiKey() || '');
  const [isKeySaved, setIsKeySaved] = useState(() => Boolean(getStoredRapidApiKey()));
  const [showKeyInput, setShowKeyInput] = useState(() => !getStoredRapidApiKey());
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const [syncSummary, setSyncSummary] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Reset transient feedback when opening
  useEffect(() => {
    if (isOpen) {
      const stored = getStoredRapidApiKey();
      setRapidApiKey(stored || '');
      setIsKeySaved(Boolean(stored));
      setShowKeyInput(!stored);
      setSyncSummary(null);
      setErrorMsg('');
    }
  }, [isOpen]);

  const handleSaveKey = () => {
    setStoredRapidApiKey(rapidApiKey);
    setIsKeySaved(Boolean(rapidApiKey.trim()));
    setShowKeyInput(false);
  };

  const handleClearKey = () => {
    setStoredRapidApiKey('');
    setRapidApiKey('');
    setIsKeySaved(false);
    setShowKeyInput(true);
  };

  const handleTriggerSync = async () => {
    setIsLoading(true);
    setErrorMsg('');
    setCurrentStep('Connecting to live job feeds...');

    try {
      const result = await fetchUnifiedLiveJobs({
        forceRefresh: true,
        rapidApiKey: rapidApiKey.trim(),
        onProgress: (status) => {
          if (status.step) setCurrentStep(status.step);
        }
      });

      setSyncSummary(result.sources);
      setIsLoading(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 65,
          spread: 55,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      if (onSyncComplete) {
        onSyncComplete(result.jobs, result.sources);
      }
    } catch (err) {
      console.error('Sync failed:', err);
      setIsLoading(false);
      setErrorMsg(err.message || 'Sync failed. Please check network connection.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-sync" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sync-modal-header">
          <div className="sync-radar-icon-wrap">
            <Radar className={isLoading ? "spinning" : ""} size={26} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 className="sync-title">Hybrid Live Job Aggregator</h3>
            <p className="sync-subtitle">
              Fetch real-time developer jobs combining Free Public Remote APIs + JSearch Local Feed
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Source 1: Free Public Remote APIs */}
        <div className="sync-source-card">
          <div className="sync-source-top">
            <div className="sync-source-badge-wrap">
              <Globe size={16} className="text-emerald-400" />
              <span className="sync-source-name">Source 1: Free Public Remote Feeds</span>
            </div>
            <span className="sync-status-badge badge-active">
              <CheckCircle2 size={12} /> Active (Free)
            </span>
          </div>
          <p className="sync-source-desc">
            Directly pulls live remote software engineering & data jobs from <strong>Remotive</strong> and <strong>Jobicy</strong> without burning any API limits.
          </p>
        </div>

        {/* Source 2: JSearch (Thailand & Bangkok Local Jobs) */}
        <div className="sync-source-card">
          <div className="sync-source-top">
            <div className="sync-source-badge-wrap">
              <Database size={16} className="text-blue-400" />
              <span className="sync-source-name">Source 2: JSearch Thailand (LinkedIn / Indeed)</span>
            </div>
            <span className={`sync-status-badge ${isKeySaved ? 'badge-connected' : 'badge-optional'}`}>
              {isKeySaved ? 'Key Saved' : 'Optional Key'}
            </span>
          </div>
          <p className="sync-source-desc">
            Aggregates live job postings across Bangkok and Thailand (LinkedIn, JobsDB, Glassdoor). Requires a free RapidAPI key (500 free requests/mo).
          </p>

          {showKeyInput ? (
            <div className="sync-key-input-box">
              <div className="sync-input-row">
                <Key size={15} className="text-muted" />
                <input 
                  type="password"
                  placeholder="Paste your RapidAPI Key (e.g. 5a1b...)"
                  value={rapidApiKey}
                  onChange={(e) => setRapidApiKey(e.target.value)}
                  className="sync-key-input"
                />
                <button 
                  type="button" 
                  className="btn btn-primary-sm"
                  onClick={handleSaveKey}
                  disabled={!rapidApiKey.trim()}
                >
                  Save
                </button>
              </div>
              <div className="sync-key-help">
                <a 
                  href="https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch" 
                  target="_blank" 
                  rel="noreferrer"
                  className="sync-help-link"
                >
                  Get free key on RapidAPI (500 free calls/mo) <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ) : (
            <div className="sync-key-saved-row">
              <div className="saved-key-indicator">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>RapidAPI Key configured (••••••••{rapidApiKey.slice(-4)})</span>
              </div>
              <div className="saved-key-actions">
                <button 
                  type="button" 
                  className="btn-text-sm" 
                  onClick={() => setShowKeyInput(true)}
                >
                  Change
                </button>
                <button 
                  type="button" 
                  className="btn-text-sm text-rose" 
                  onClick={handleClearKey}
                  title="Remove Key"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sync Summary or Progress State */}
        {isLoading && (
          <div className="sync-loading-box">
            <Loader2 size={18} className="spinning text-blue-400" />
            <span>{currentStep || 'Fetching and normalizing live positions...'}</span>
          </div>
        )}

        {errorMsg && (
          <div className="sync-error-banner">
            <span>{errorMsg}</span>
          </div>
        )}

        {syncSummary && (
          <div className="sync-result-summary">
            <div className="sync-result-header">
              <Sparkles size={16} className="text-yellow" />
              <span>Live Sync Successful!</span>
            </div>
            <div className="sync-pills-row">
              <span className="sync-pill">Remotive: +{syncSummary.remotive || 0}</span>
              <span className="sync-pill">Jobicy: +{syncSummary.jobicy || 0}</span>
              {syncSummary.jsearch > 0 && (
                <span className="sync-pill pill-jsearch">JSearch TH: +{syncSummary.jsearch}</span>
              )}
              <span className="sync-pill pill-total">Total Live: {syncSummary.total} jobs</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="sync-footer">
          <button 
            type="button" 
            className="btn btn-apply-primary w-full"
            onClick={syncSummary ? onClose : handleTriggerSync}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="spinning" />
                <span>Aggregating Feeds...</span>
              </>
            ) : syncSummary ? (
              <>
                <span>View Updated Jobs ({syncSummary.total})</span>
                <ArrowRight size={16} />
              </>
            ) : (
              <>
                <RefreshCw size={16} />
                <span>Sync Real-Time Jobs Now</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
