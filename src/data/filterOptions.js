export const ROLE_CATEGORIES = [
  { id: 'all', label: 'All Roles', icon: 'Layers' },
  { id: 'frontend', label: 'Frontend Engineer', icon: 'Layout' },
  { id: 'backend', label: 'Backend Engineer', icon: 'Server' },
  { id: 'fullstack', label: 'Full Stack Engineer', icon: 'Code' },
  { id: 'mobile', label: 'Mobile (iOS / Android / Flutter)', icon: 'Smartphone' },
  { id: 'cloud-devops', label: 'DevOps / Cloud & Infra', icon: 'Cloud' },
  { id: 'ai-data', label: 'AI, ML & Data Science', icon: 'Brain' },
  { id: 'product-design', label: 'Product & UI/UX Design', icon: 'Palette' },
  { id: 'qa-testing', label: 'QA & Automation Engineer', icon: 'CheckCircle2' },
  { id: 'cybersecurity', label: 'Cybersecurity / SecOps', icon: 'ShieldCheck' },
  { id: 'marketing-growth', label: 'Growth, Marketing & SEO', icon: 'TrendingUp' }
];

export const EXPERIENCE_LEVELS = [
  { id: 'all', label: 'All Experience', desc: 'Any career stage' },
  { id: 'entry', label: 'Entry / Fresh Grad', desc: '0 - 1 year' },
  { id: 'junior', label: 'Junior', desc: '1 - 3 years' },
  { id: 'mid', label: 'Mid-Level', desc: '3 - 5 years' },
  { id: 'senior', label: 'Senior', desc: '5 - 8 years' },
  { id: 'lead', label: 'Lead / Principal / Architect', desc: '8+ years' }
];

export const LANGUAGE_REQUIREMENTS = [
  { id: 'all', label: 'Any Language' },
  { id: 'thai', label: '🇹🇭 Thai Native / Fluent' },
  { id: 'english-work', label: '🇬🇧 English (Conversational / Working)' },
  { id: 'english-fluent', label: '🇬🇧 English (Fluent / Native Level)' },
  { id: 'japanese', label: '🇯🇵 Japanese (N1 / N2 / N3 Required)' },
  { id: 'bilingual-th-en', label: '🌐 Bilingual (Thai + English)' }
];

export const EMPLOYMENT_TYPES = [
  { id: 'all', label: 'All Types' },
  { id: 'fulltime', label: 'Full-time Permanent', badge: 'Permanent' },
  { id: 'outsource', label: 'Outsource / Staff Augmentation', badge: 'Outsource' },
  { id: 'contract', label: 'Contract (Fixed Term / Project)', badge: 'Contract' },
  { id: 'freelance', label: 'Freelance / B2B Contractor', badge: 'Freelance' },
  { id: 'internship', label: 'Internship', badge: 'Intern' }
];

export const WORK_MODES = [
  { id: 'all', label: 'All Modes' },
  { id: 'remote', label: '100% Remote', icon: 'Home' },
  { id: 'hybrid', label: 'Hybrid (Flex Days)', icon: 'Shuffle' },
  { id: 'onsite', label: 'On-site Office', icon: 'Building2' }
];

export const SCOPES = [
  { id: 'all', label: 'All Scopes (Thai & Global)' },
  { id: 'thai', label: '🇹🇭 Thai Local Jobs' },
  { id: 'foreign', label: '🌏 Foreign & International' }
];

export const REGIONS = [
  { id: 'all', label: 'All Locations' },
  // Thai Regions
  { id: 'thai-bkk', label: 'Bangkok, Thailand (CBD / Sukhumvit / Rama 9)', group: 'Thailand' },
  { id: 'thai-cnx', label: 'Chiang Mai, Thailand (Nomad Tech Hub)', group: 'Thailand' },
  { id: 'thai-phuket', label: 'Phuket, Thailand', group: 'Thailand' },
  { id: 'thai-eec', label: 'Chonburi / EEC Industrial Zone', group: 'Thailand' },
  { id: 'thai-remote', label: 'Thailand - 100% Work from Anywhere in TH', group: 'Thailand' },
  // International Regions
  { id: 'foreign-sg', label: 'Singapore (APAC Hub)', group: 'International' },
  { id: 'foreign-jp', label: 'Tokyo, Japan', group: 'International' },
  { id: 'foreign-us', label: 'United States / Silicon Valley (Remote/HQ)', group: 'International' },
  { id: 'foreign-eu', label: 'Europe (UK, Germany, Netherlands)', group: 'International' },
  { id: 'foreign-remote', label: 'Worldwide Global Remote (Anywhere)', group: 'International' }
];

export const SOURCE_PLATFORMS = [
  { id: 'all', label: 'All Sources', color: '#6366f1' },
  { id: 'linkedin', label: 'LinkedIn', color: '#0a66c2', icon: 'Linkedin' },
  { id: 'jobsdb', label: 'JobsDB (Thailand/Asia)', color: '#ff6600', icon: 'Briefcase' },
  { id: 'jobthai', label: 'JobThai', color: '#e11d48', icon: 'Globe' },
  { id: 'facebook', label: 'Facebook Tech Groups', color: '#1877f2', icon: 'Users' },
  { id: 'x', label: 'X (Twitter)', color: '#0f1419', icon: 'Twitter' },
  { id: 'remoteok', label: 'RemoteOK / Global Boards', color: '#10b981', icon: 'Wifi' },
  { id: 'github', label: 'GitHub Jobs / Tech Portals', color: '#8b5cf6', icon: 'GitBranch' }
];

export const QUANTITY_OPTIONS = [
  { value: 10, label: '10 Jobs' },
  { value: 20, label: '20 Jobs' },
  { value: 50, label: '50 Jobs' },
  { value: 100, label: '100 Jobs' },
  { value: 'all', label: 'Show All' }
];

export const PRESET_PACKS = [
  {
    id: 'preset-thai-giants',
    name: '🚀 Thai Tech Giants',
    description: 'Full-time roles at Agoda, LINE MAN, KBTG, Bitkub & SCB TechX in Bangkok',
    filters: {
      scope: 'thai',
      region: 'thai-bkk',
      role: 'all',
      experience: 'all',
      language: 'all',
      employmentType: 'fulltime',
      source: 'all',
      workMode: 'all',
      keyword: ''
    }
  },
  {
    id: 'preset-foreign-usd',
    name: '💵 High-Paying Remote (USD)',
    description: 'Global remote jobs paying $80k–$220k USD from Stripe, GitLab, Wise, Automattic',
    filters: {
      scope: 'foreign',
      region: 'all',
      role: 'all',
      experience: 'all',
      language: 'all',
      employmentType: 'all',
      source: 'all',
      workMode: 'remote',
      keyword: ''
    }
  },
  {
    id: 'preset-fresh-junior',
    name: '🌱 Fresh Grad & Junior Friendly',
    description: 'Roles requiring 0–2 years experience with mentorship & junior development pathways',
    filters: {
      scope: 'all',
      region: 'all',
      role: 'all',
      experience: 'entry',
      language: 'all',
      employmentType: 'all',
      source: 'all',
      workMode: 'all',
      keyword: ''
    }
  },
  {
    id: 'preset-japanese-it',
    name: '🇯🇵 Japanese IT Bilingual',
    description: 'Companies in BKK & Tokyo requiring Japanese N1-N3 with attractive language allowances & relocation',
    filters: {
      scope: 'all',
      region: 'all',
      role: 'all',
      experience: 'all',
      language: 'japanese',
      employmentType: 'all',
      source: 'all',
      workMode: 'all',
      keyword: ''
    }
  },
  {
    id: 'preset-outsource-contract',
    name: '💼 High-Rate Outsource / Contractor',
    description: 'Staff augmentation & fast-paced project contracts with top daily/monthly compensation',
    filters: {
      scope: 'all',
      region: 'all',
      role: 'all',
      experience: 'all',
      language: 'all',
      employmentType: 'outsource',
      source: 'all',
      workMode: 'all',
      keyword: ''
    }
  },
  {
    id: 'preset-facebook-community',
    name: '📱 Facebook & X Community Finds',
    description: 'Direct hiring posts from Thai Dev Facebook groups and founder tweets on X',
    filters: {
      scope: 'all',
      region: 'all',
      role: 'all',
      experience: 'all',
      language: 'all',
      employmentType: 'all',
      source: 'facebook',
      workMode: 'all',
      keyword: ''
    }
  },
  {
    id: 'preset-digital-nomad',
    name: '🏖️ 100% Remote / Digital Nomad',
    description: 'Anywhere in Thailand or Worldwide with asynchronous and flexible hours',
    filters: {
      scope: 'all',
      region: 'all',
      role: 'all',
      experience: 'all',
      language: 'all',
      employmentType: 'all',
      source: 'all',
      workMode: 'remote',
      keyword: ''
    }
  }
];

export const POPULAR_KEYWORDS = [
  'React', 'Node.js', 'Golang', 'Python', 'AWS', 'Flutter', 'Next.js', 
  'TypeScript', 'DevOps', 'Docker', 'Kubernetes', 'Product Manager', 
  'UI/UX', 'Remote', 'Bangkok', 'Agoda', 'KBTG', 'Bitkub'
];
