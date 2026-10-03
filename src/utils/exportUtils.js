export function exportJobsToJSON(jobs, filename = 'jobradar-export.json') {
  const jsonStr = JSON.stringify(jobs, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportJobsToCSV(jobs, filename = 'jobradar-export.csv') {
  if (!jobs || jobs.length === 0) return;

  const headers = [
    'ID',
    'Title',
    'Company',
    'Salary',
    'Location',
    'Scope',
    'Employment Type',
    'Work Mode',
    'Experience Level',
    'Language Requirement',
    'Source Platform',
    'Tech Stack',
    'Source URL'
  ];

  const rows = jobs.map(j => [
    `"${j.id}"`,
    `"${j.title.replace(/"/g, '""')}"`,
    `"${j.company.replace(/"/g, '""')}"`,
    `"${j.salary.text.replace(/"/g, '""')}"`,
    `"${j.location.replace(/"/g, '""')}"`,
    `"${j.scope}"`,
    `"${j.employmentType}"`,
    `"${j.workMode}"`,
    `"${j.experienceLevel}"`,
    `"${j.languageReq}"`,
    `"${j.sourcePlatform}"`,
    `"${j.techStack.join(', ')}"`,
    `"${j.sourceUrl}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
