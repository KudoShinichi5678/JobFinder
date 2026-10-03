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
  Search,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function LiveSyncModal({ isOpen, onClose, onSyncComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const steps = [
    { name: 'Connecting to LinkedIn Jobs APAC API', status: 'Fetching Thai & Global engineering feeds...', icon: Globe, count: 18 },
    { name: 'Querying JobsDB Thailand & JobThai Portals', status: 'Extracting latest enterprise banking & retail postings...', icon: Database, count: 15 },
    { name: 'Scanning Facebook Thai Developer Communities', status: 'Parsing posts from "สมาคมโปรแกรมเมอร์ไทย" & Freelance TH...', icon: Search, count: 9 },
    { name: 'Polling X (Twitter) Tech Founders & Stealth Startups', status: 'Aggregating direct founder tweets and stealth hiring threads...', icon: Cpu, count: 7 },
    { name: 'Synchronizing RemoteOK & Global USD Boards', status: 'Filtering international remote roles with competitive packages...', icon: Globe, count: 12 }
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setProgress(0);
      setIsFinished(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsFinished(true);
          // Trigger confetti
          try {
            confetti({
              particleCount: 70,
              spread: 60,
              origin: { y: 0.6 }
            });
          } catch(e) {}
          return 100;
        }
        const next = prev + 4;
        const stepIndex = Math.min(Math.floor((next / 100) * steps.length), steps.length - 1);
        setCurrentStep(stepIndex);
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-sync" onClick={(e) => e.stopPropagation()}>
        <div className="sync-modal-header">
          <div className="sync-radar-icon-wrap">
            <Radar className="spinning" size={28} />
          </div>
          <div>
            <h3 className="sync-title">Multi-Source Live Aggregator Engine</h3>
            <p className="sync-subtitle">
              Live crawler scanning across LinkedIn, JobsDB, JobThai, Facebook Groups, X, & RemoteOK
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="sync-progress-container">
          <div className="sync-progress-header">
            <span>Overall Scraping & Normalization Progress</span>
            <span className="sync-pct">{progress}%</span>
          </div>
          <div className="sync-progress-track">
            <div className="sync-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Live Step Tracker */}
        <div className="sync-steps-list">
          {steps.map((step, idx) => {
            const isCompleted = currentStep > idx || isFinished;
            const isCurrent = currentStep === idx && !isFinished;
            const StepIcon = step.icon;

            return (
              <div 
                key={idx} 
                className={`sync-step-item ${isCompleted ? 'completed' : isCurrent ? 'current' : 'pending'}`}
              >
                <div className="step-icon-wrap">
                  {isCompleted ? (
                    <CheckCircle2 size={18} className="text-green" />
                  ) : isCurrent ? (
                    <Loader2 size={18} className="spinning text-sky" />
                  ) : (
                    <StepIcon size={18} className="text-muted" />
                  )}
                </div>
                <div className="step-content">
                  <div className="step-title-wrap">
                    <span className="step-name">{step.name}</span>
                    {isCompleted && (
                      <span className="step-badge">+{step.count} Jobs Verified</span>
                    )}
                  </div>
                  <p className="step-status">{step.status}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sync Summary or Done Action */}
        <div className="sync-footer">
          {isFinished ? (
            <div className="sync-finished-box">
              <div className="sync-finished-msg">
                <Sparkles size={20} className="text-yellow" />
                <span>Sync Complete! Total 61 active jobs refreshed with zero stale listings.</span>
              </div>
              <button 
                className="btn btn-apply-primary"
                onClick={() => {
                  onSyncComplete();
                  onClose();
                }}
              >
                <span>View Updated Feed</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="sync-loading-indicator">
              <Loader2 size={16} className="spinning" />
              <span>Normalizing salary currencies (THB / USD / JPY) and de-duplicating cross-posts...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
