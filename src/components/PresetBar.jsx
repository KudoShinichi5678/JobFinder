import React from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
import { PRESET_PACKS } from '../data/filterOptions';

export function PresetBar({ activePresetId, onSelectPreset, onResetFilters }) {
  return (
    <div className="preset-bar-container">
      <div className="preset-bar-header">
        <div className="preset-label-wrap">
          <Sparkles size={16} className="sparkle-icon" />
          <span className="preset-title">Instant 1-Click Search Profiles:</span>
          <span className="preset-hint">Pre-defined criteria — click to apply instantly without typing!</span>
        </div>
        <button 
          className="btn-reset-filters" 
          onClick={onResetFilters}
          title="Reset all filters to default"
        >
          <RotateCcw size={13} />
          <span>Reset All</span>
        </button>
      </div>

      <div className="preset-scroll-track">
        {PRESET_PACKS.map(preset => {
          const isActive = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              className={`preset-pill ${isActive ? 'active' : ''}`}
              onClick={() => onSelectPreset(preset)}
              title={preset.description}
            >
              <span className="preset-pill-name">{preset.name}</span>
              <span className="preset-pill-desc">{preset.description.slice(0, 48)}...</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
