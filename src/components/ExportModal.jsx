import React from 'react';
import { X, Download, FileSpreadsheet, FileCode, Check } from 'lucide-react';
import { exportJobsToCSV, exportJobsToJSON } from '../utils/exportUtils';

export function ExportModal({ isOpen, onClose, filteredJobs, savedJobs }) {
  if (!isOpen) return null;

  const handleExport = (format, dataset) => {
    const data = dataset === 'saved' ? savedJobs : filteredJobs;
    const name = `jobradar-${dataset}-${new Date().toISOString().slice(0, 10)}`;
    if (format === 'csv') {
      exportJobsToCSV(data, `${name}.csv`);
    } else {
      exportJobsToJSON(data, `${name}.json`);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-export" onClick={(e) => e.stopPropagation()}>
        <div className="export-header">
          <div className="export-title-wrap">
            <Download size={22} className="text-sky" />
            <div>
              <h3 className="export-title">Export Job Records</h3>
              <p className="export-subtitle">Download your filtered results or saved bookmarks</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="export-options-grid">
          {/* Option 1: CSV Export */}
          <div className="export-option-card">
            <div className="opt-icon-wrap">
              <FileSpreadsheet size={28} className="text-green" />
            </div>
            <h4>Excel / CSV Format</h4>
            <p>Formatted spreadsheet compatible with Microsoft Excel, Google Sheets, and Numbers.</p>
            
            <div className="opt-btn-group">
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => handleExport('csv', 'filtered')}
                disabled={filteredJobs.length === 0}
              >
                Export Current Filtered ({filteredJobs.length})
              </button>
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => handleExport('csv', 'saved')}
                disabled={savedJobs.length === 0}
              >
                Export Bookmarks ({savedJobs.length})
              </button>
            </div>
          </div>

          {/* Option 2: JSON Export */}
          <div className="export-option-card">
            <div className="opt-icon-wrap">
              <FileCode size={28} className="text-sky" />
            </div>
            <h4>JSON Data Format</h4>
            <p>Raw structured JSON data ideal for developer scripts, API integrations, and analysis.</p>
            
            <div className="opt-btn-group">
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => handleExport('json', 'filtered')}
                disabled={filteredJobs.length === 0}
              >
                Export Current Filtered ({filteredJobs.length})
              </button>
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => handleExport('json', 'saved')}
                disabled={savedJobs.length === 0}
              >
                Export Bookmarks ({savedJobs.length})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
