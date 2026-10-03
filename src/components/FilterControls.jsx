import React, { useState } from 'react';
import { 
  Search, 
  X, 
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { 
  ROLE_CATEGORIES, 
  EXPERIENCE_LEVELS, 
  LANGUAGE_REQUIREMENTS, 
  EMPLOYMENT_TYPES, 
  WORK_MODES, 
  SCOPES, 
  REGIONS, 
  SOURCE_PLATFORMS, 
  POPULAR_KEYWORDS 
} from '../data/filterOptions';

export function FilterControls({
  filters,
  onFilterChange,
  onResetFilters,
  totalMatchingCount,
  displayedCount
}) {
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const handleKeywordChange = (e) => {
    onFilterChange('keyword', e.target.value);
  };

  const clearKeyword = () => {
    onFilterChange('keyword', '');
  };

  const handleQuickKeyword = (kw) => {
    if (filters.keyword.toLowerCase().includes(kw.toLowerCase())) {
      onFilterChange('keyword', '');
    } else {
      onFilterChange('keyword', kw);
    }
  };

  // Check active filters count
  const activeCount = [
    filters.scope !== 'all',
    filters.role !== 'all',
    filters.region !== 'all',
    filters.experience !== 'all',
    filters.language !== 'all',
    filters.employmentType !== 'all',
    filters.workMode !== 'all',
    filters.source !== 'all',
    filters.keyword.trim() !== ''
  ].filter(Boolean).length;

  const hasAdvancedActive = [
    filters.source !== 'all',
    filters.language !== 'all',
    filters.region !== 'all'
  ].some(Boolean);

  return (
    <div className="filter-card">
      {/* Row 1: Search Bar & Scope Switcher */}
      <div className="filter-search-row">
        <div className="search-bar-wrap">
          <Search size={18} className="search-icon" />
          <input 
            type="text"
            className="search-input"
            placeholder="Search job title, skills, or company (e.g. React, Agoda, Golang)..."
            value={filters.keyword}
            onChange={handleKeywordChange}
          />
          {filters.keyword && (
            <button className="search-clear-btn" onClick={clearKeyword} title="Clear search">
              <X size={15} />
            </button>
          )}
        </div>

        {/* Scope Tabs */}
        <div className="scope-tabs">
          {SCOPES.map(scope => (
            <button
              key={scope.id}
              type="button"
              className={`scope-tab-btn ${filters.scope === scope.id ? 'active' : ''}`}
              onClick={() => onFilterChange('scope', scope.id)}
            >
              {scope.id === 'all' ? 'All Roles' : scope.id === 'thai' ? '🇹🇭 Thailand' : '🌏 Global / Remote'}
            </button>
          ))}
        </div>
      </div>

      {/* Row 2: Core 4 Essential Filters */}
      <div className="filter-dropdowns-row">
        {/* 1. Role */}
        <div className="filter-select-wrap">
          <label className="select-label">Role</label>
          <select 
            className="clean-select"
            value={filters.role}
            onChange={(e) => onFilterChange('role', e.target.value)}
          >
            {ROLE_CATEGORIES.map(r => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>
        </div>

        {/* 2. Work Mode */}
        <div className="filter-select-wrap">
          <label className="select-label">Work Mode</label>
          <select 
            className="clean-select"
            value={filters.workMode}
            onChange={(e) => onFilterChange('workMode', e.target.value)}
          >
            {WORK_MODES.map(m => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
        </div>

        {/* 3. Experience */}
        <div className="filter-select-wrap">
          <label className="select-label">Experience</label>
          <select 
            className="clean-select"
            value={filters.experience}
            onChange={(e) => onFilterChange('experience', e.target.value)}
          >
            {EXPERIENCE_LEVELS.map(exp => (
              <option key={exp.id} value={exp.id}>{exp.label}</option>
            ))}
          </select>
        </div>

        {/* 4. Employment Type */}
        <div className="filter-select-wrap">
          <label className="select-label">Job Type</label>
          <select 
            className="clean-select"
            value={filters.employmentType}
            onChange={(e) => onFilterChange('employmentType', e.target.value)}
          >
            {EMPLOYMENT_TYPES.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.label}</option>
            ))}
          </select>
        </div>

        {/* More Filters Toggle */}
        <div className="filter-actions-wrap">
          <button 
            type="button"
            className={`btn-more-filters ${showMoreFilters || hasAdvancedActive ? 'active' : ''}`}
            onClick={() => setShowMoreFilters(prev => !prev)}
          >
            <SlidersHorizontal size={14} />
            <span>More Filters</span>
            {hasAdvancedActive && <span className="active-dot" />}
            {showMoreFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {activeCount > 0 && (
            <button 
              type="button" 
              className="btn-reset-clean" 
              onClick={onResetFilters}
              title="Reset all filters"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Row 2.5: Expandable Secondary Filters */}
      {showMoreFilters && (
        <div className="filter-expanded-row">
          {/* Source Platform */}
          <div className="filter-select-wrap">
            <label className="select-label">Platform Source</label>
            <select 
              className="clean-select"
              value={filters.source}
              onChange={(e) => onFilterChange('source', e.target.value)}
            >
              {SOURCE_PLATFORMS.map(p => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
          </div>

          {/* Language */}
          <div className="filter-select-wrap">
            <label className="select-label">Language</label>
            <select 
              className="clean-select"
              value={filters.language}
              onChange={(e) => onFilterChange('language', e.target.value)}
            >
              {LANGUAGE_REQUIREMENTS.map(l => (
                <option key={l.id} value={l.id}>{l.label}</option>
              ))}
            </select>
          </div>

          {/* Region */}
          <div className="filter-select-wrap">
            <label className="select-label">Location / Region</label>
            <select 
              className="clean-select"
              value={filters.region}
              onChange={(e) => onFilterChange('region', e.target.value)}
            >
              <option value="all">All Locations</option>
              <optgroup label="Thailand">
                {REGIONS.filter(r => r.group === 'Thailand').map(r => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </optgroup>
              <optgroup label="Global">
                {REGIONS.filter(r => r.group === 'International').map(r => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      )}

      {/* Row 3: Quick Keyword Tags */}
      <div className="quick-tags-bar">
        <span className="quick-tags-title">Popular:</span>
        <div className="quick-tags-list">
          {POPULAR_KEYWORDS.slice(0, 9).map(kw => {
            const isSelected = filters.keyword.toLowerCase().includes(kw.toLowerCase());
            return (
              <button
                key={kw}
                type="button"
                className={`quick-chip ${isSelected ? 'active' : ''}`}
                onClick={() => handleQuickKeyword(kw)}
              >
                {kw}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
