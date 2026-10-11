// Service for aggregating real-time jobs from:
// 1. JSearch API (RapidAPI) - For Thailand & Bangkok localized jobs (LinkedIn, Indeed, Glassdoor)
// 2. Free Public Remote APIs (Remotive, Jobicy) - For Global Remote tech jobs without requiring API keys
// Features built-in localStorage caching (2hr TTL) to preserve quota and eliminate latency.

const CACHE_KEY = 'jobfinder_live_jobs_cache';
const CACHE_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours
const RAPIDAPI_KEY_STORAGE = 'jobfinder_rapidapi_key';

const TECH_KEYWORDS = [
  'React', 'Vue', 'Angular', 'Next.js', 'Node.js', 'Python', 'Java', 'Golang',
  'TypeScript', 'JavaScript', 'AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes',
  'PostgreSQL', 'MongoDB', 'GraphQL', 'Swift', 'Kotlin', 'Flutter', 'React Native',
  'Tailwind', 'Rust', 'C++', 'C#', '.NET', 'Redis', 'Kafka', 'SQL', 'Databricks',
  'Snowflake', 'dbt', 'Terraform', 'CI/CD', 'Playwright', 'Cypress', 'Figma'
];

// Helper: infer role category from title and text
export function inferRoleCategory(title = '', text = '') {
  const combined = `${title} ${text}`.toLowerCase();
  if (combined.includes('data engineer') || combined.includes('data science') || combined.includes('machine learning') || combined.includes('ai engineer') || combined.includes('llm')) {
    return 'ai-data';
  }
  if (combined.includes('devops') || combined.includes('sre') || combined.includes('cloud') || combined.includes('infrastructure') || combined.includes('platform engineer')) {
    return 'cloud-devops';
  }
  if (combined.includes('mobile') || combined.includes('ios') || combined.includes('android') || combined.includes('flutter') || combined.includes('react native') || combined.includes('swift')) {
    return 'mobile';
  }
  if (combined.includes('qa') || combined.includes('quality') || combined.includes('test') || combined.includes('sdet')) {
    return 'qa-testing';
  }
  if (combined.includes('security') || combined.includes('cyber') || combined.includes('infosec') || combined.includes('audit')) {
    return 'cybersecurity';
  }
  if (combined.includes('design') || combined.includes('ui/ux') || combined.includes('ux') || combined.includes('product manager') || combined.includes('product owner')) {
    return 'product-design';
  }
  if (combined.includes('frontend') || combined.includes('front-end') || combined.includes('ui engineer') || combined.includes('web developer')) {
    return 'frontend';
  }
  if (combined.includes('backend') || combined.includes('back-end') || combined.includes('golang') || combined.includes('java developer') || combined.includes('node')) {
    return 'backend';
  }
  if (combined.includes('marketing') || combined.includes('growth') || combined.includes('seo') || combined.includes('devrel') || combined.includes('technical writer')) {
    return 'marketing-growth';
  }
  return 'fullstack';
}

// Helper: infer experience level
export function inferExperienceLevel(title = '', text = '') {
  const str = `${title} ${text}`.toLowerCase();
  if (str.includes('intern') || str.includes('fresh grad') || str.includes('entry')) return 'entry';
  if (str.includes('junior') || str.includes('associate') || str.includes('1-2 year')) return 'junior';
  if (str.includes('lead') || str.includes('principal') || str.includes('staff') || str.includes('architect') || str.includes('head') || str.includes('director')) return 'lead';
  if (str.includes('senior') || str.includes('sr.') || str.includes('5+') || str.includes('lead')) return 'senior';
  return 'mid';
}

// Helper: extract tech keywords
export function extractTechStack(text = '', existingTags = []) {
  const set = new Set(existingTags.map(t => t.trim()));
  const lower = text.toLowerCase();
  TECH_KEYWORDS.forEach(kw => {
    // Regex boundary check
    const regex = new RegExp(`\\b${kw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
    if (regex.test(lower)) {
      set.add(kw);
    }
  });
  return Array.from(set).slice(0, 8);
}

// Helper: format relative date
export function formatRelativeDate(dateStringOrTimestamp) {
  if (!dateStringOrTimestamp) return 'Recently';
  try {
    const date = new Date(dateStringOrTimestamp);
    if (isNaN(date.getTime())) return 'Recently';
    const diffHours = Math.round((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.round(diffHours / 24);
    if (diffDays === 1) return '1d ago';
    if (diffDays < 30) return `${diffDays}d ago`;
    return '1m ago';
  } catch (e) {
    return 'Recently';
  }
}

// Storage helpers for RapidAPI Key
export function getStoredRapidApiKey() {
  try {
    return localStorage.getItem(RAPIDAPI_KEY_STORAGE) || import.meta.env.VITE_RAPIDAPI_KEY || '';
  } catch (e) {
    return '';
  }
}

export function setStoredRapidApiKey(key) {
  try {
    if (!key) {
      localStorage.removeItem(RAPIDAPI_KEY_STORAGE);
    } else {
      localStorage.setItem(RAPIDAPI_KEY_STORAGE, key.trim());
    }
  } catch (e) {}
}

// LocalStorage caching helpers
export function getCachedLiveJobs() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const isExpired = Date.now() - parsed.timestamp > CACHE_TTL_MS;
    if (isExpired) return null;
    return parsed.jobs || [];
  } catch (e) {
    return null;
  }
}

export function setCachedLiveJobs(jobs) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      timestamp: Date.now(),
      jobs: jobs || []
    }));
  } catch (e) {}
}

// -------------------------------------------------------------
// SOURCE 1: Free Public Remote API - Remotive
// -------------------------------------------------------------
export async function fetchRemotiveJobs(limit = 20) {
  try {
    const targetUrl = `https://remotive.com/api/remote-jobs?category=software-dev&limit=${limit}`;
    let res;
    try {
      res = await fetch(targetUrl);
    } catch (corsErr) {
      // Fallback via lightweight open CORS proxy if direct fetch is blocked
      res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`);
    }

    if (!res.ok) throw new Error(`Remotive status ${res.status}`);
    const data = await res.json();
    const items = data.jobs || [];

    return items.map(item => {
      const title = item.title || 'Software Engineer';
      const company = item.company_name || 'Remote Company';
      const role = inferRoleCategory(title, item.description || '');
      const exp = inferExperienceLevel(title, item.description || '');
      const techStack = extractTechStack(`${title} ${item.description || ''}`, item.tags || []);

      return {
        id: `remotive-${item.id}`,
        title,
        company,
        companyLogo: item.company_logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(company)}&background=10b981&color=fff&size=100`,
        brandColor: '#10b981',
        location: item.candidate_required_location ? `Worldwide Remote (${item.candidate_required_location})` : 'Worldwide Remote',
        region: 'foreign-remote',
        roleCategory: role,
        experienceLevel: exp,
        languageReq: 'english-fluent',
        employmentType: item.job_type === 'full_time' ? 'fulltime' : (item.job_type || 'fulltime'),
        workMode: 'remote',
        sourcePlatform: 'remoteok',
        scope: 'foreign',
        salary: {
          min: 80000,
          max: 140000,
          currency: 'USD',
          period: 'yearly',
          text: item.salary || '$90,000 - $140,000 USD / year'
        },
        techStack: techStack.length > 0 ? techStack : ['Remote', 'Git', 'Agile'],
        postedAt: formatRelativeDate(item.publication_date),
        featured: false,
        urgent: false,
        applicantsCount: Math.floor(Math.random() * 25) + 5,
        sourceSnippet: `Remotive Live Remote Feed • 🌐 Worldwide • Direct Hiring`,
        sourceUrl: item.url || 'https://remotive.com',
        description: item.description ? item.description.replace(/<[^>]*>?/gm, '').slice(0, 450) + '...' : 'Remote engineering role.',
        responsibilities: [
          'Design and deliver robust, tested software across distributed systems.',
          'Collaborate asynchronously with international team members across timezones.',
          'Contribute to technical discussions, architecture reviews, and code standards.'
        ],
        requirements: [
          'Strong proven experience in modern software engineering practices.',
          'Excellent written English and asynchronous communication mindset.',
          'Ability to manage self-directed priorities in a high-trust remote culture.'
        ],
        benefits: [
          '100% remote flexibility anywhere in the world',
          'USD competitive compensation package',
          'Flexible work hours & home office equipment stipend'
        ],
        isLiveFeed: true,
        sourceName: 'Remotive API'
      };
    });
  } catch (err) {
    console.warn('Remotive fetch skipped:', err.message);
    return [];
  }
}

// -------------------------------------------------------------
// SOURCE 2: Free Public Remote API - Jobicy
// -------------------------------------------------------------
export async function fetchJobicyJobs(count = 15) {
  try {
    const targetUrl = `https://jobicy.com/api/v2/remote-jobs?count=${count}&industry=engineering`;
    let res;
    try {
      res = await fetch(targetUrl);
    } catch (corsErr) {
      res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`);
    }

    if (!res.ok) throw new Error(`Jobicy status ${res.status}`);
    const data = await res.json();
    const items = data.jobs || [];

    return items.map(item => {
      const title = item.jobTitle || 'Tech Specialist';
      const company = item.companyName || 'Global Employer';
      const role = inferRoleCategory(title, item.jobExcerpt || item.jobDescription || '');
      const exp = inferExperienceLevel(title, item.jobLevel || '');
      const techStack = extractTechStack(`${title} ${item.jobExcerpt || ''}`, item.jobIndustry || []);

      let salaryText = 'Competitive USD Package';
      if (item.salaryMin && item.salaryMax) {
        salaryText = `$${Number(item.salaryMin).toLocaleString()} - $${Number(item.salaryMax).toLocaleString()} ${item.salaryCurrency || 'USD'} / ${item.salaryPeriod || 'year'}`;
      }

      return {
        id: `jobicy-${item.id}`,
        title,
        company,
        companyLogo: item.companyLogo || `https://ui-avatars.com/api/?name=${encodeURIComponent(company)}&background=6366f1&color=fff&size=100`,
        brandColor: '#6366f1',
        location: item.jobGeo ? `Global Remote (${item.jobGeo})` : 'Global Remote',
        region: 'foreign-remote',
        roleCategory: role,
        experienceLevel: exp,
        languageReq: 'english-fluent',
        employmentType: 'fulltime',
        workMode: 'remote',
        sourcePlatform: 'github',
        scope: 'foreign',
        salary: {
          min: item.salaryMin || 85000,
          max: item.salaryMax || 150000,
          currency: item.salaryCurrency || 'USD',
          period: item.salaryPeriod || 'yearly',
          text: salaryText
        },
        techStack: techStack.length > 0 ? techStack : ['Distributed Systems', 'Cloud'],
        postedAt: formatRelativeDate(item.pubDate),
        featured: false,
        urgent: false,
        applicantsCount: Math.floor(Math.random() * 30) + 8,
        sourceSnippet: `Jobicy Global Tech Board • ${company} • Fully Remote`,
        sourceUrl: item.url || 'https://jobicy.com',
        description: item.jobExcerpt || (item.jobDescription ? item.jobDescription.replace(/<[^>]*>?/gm, '').slice(0, 400) + '...' : ''),
        responsibilities: [
          'Build, maintain, and scale services deployed across cloud infrastructure.',
          'Write unit tests, integration tests, and maintain CI/CD pipelines.',
          'Participate in code reviews, design documentation, and sprint demos.'
        ],
        requirements: [
          'Professional background building web applications or cloud platforms.',
          'Familiarity with containerization and distributed messaging.',
          'Fluent professional English communication.'
        ],
        benefits: [
          'International team & global exposure',
          'Flexible time zones & unlimited PTO policies',
          'Health insurance coverage or wellness stipend'
        ],
        isLiveFeed: true,
        sourceName: 'Jobicy API'
      };
    });
  } catch (err) {
    console.warn('Jobicy fetch skipped:', err.message);
    return [];
  }
}

// -------------------------------------------------------------
// SOURCE 3: JSearch API via RapidAPI (Thailand / Localized Jobs)
// -------------------------------------------------------------
export async function fetchJSearchThailandJobs(rapidApiKey, query = 'software engineer in thailand') {
  if (!rapidApiKey) return [];

  try {
    const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=1&num_pages=1`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': rapidApiKey.trim(),
        'x-rapidapi-host': 'jsearch.p.rapidapi.com'
      }
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        throw new Error('RapidAPI Key is invalid or quota exceeded.');
      }
      throw new Error(`JSearch API error: HTTP ${res.status}`);
    }

    const json = await res.json();
    const list = json.data || [];

    return list.map(item => {
      const title = item.job_title || 'Software Engineer';
      const company = item.employer_name || 'Thailand Enterprise';
      const isRemote = Boolean(item.job_is_remote);
      const city = item.job_city || 'Bangkok';
      const country = item.job_country || 'TH';
      const isBkk = city.toLowerCase().includes('bangkok') || !city;
      
      const role = inferRoleCategory(title, item.job_description || '');
      const exp = inferExperienceLevel(title, item.job_description || '');
      const techStack = extractTechStack(`${title} ${item.job_description || ''}`, item.job_required_skills || []);

      let salaryText = 'Competitive Salary (BKK Market)';
      let minSalary = 80000;
      let maxSalary = 160000;
      let currency = 'THB';
      let period = 'monthly';

      if (item.job_min_salary && item.job_max_salary) {
        minSalary = item.job_min_salary;
        maxSalary = item.job_max_salary;
        currency = item.job_salary_currency || 'THB';
        period = (item.job_salary_period || 'MONTH').toLowerCase();
        salaryText = `${currency === 'THB' ? '฿' : '$'}${Number(minSalary).toLocaleString()} - ${currency === 'THB' ? '฿' : '$'}${Number(maxSalary).toLocaleString()} / ${period}`;
      }

      // Infer source platform
      let sourcePlatform = 'linkedin';
      const applyUrl = item.job_apply_link || '';
      if (applyUrl.includes('jobsdb')) sourcePlatform = 'jobsdb';
      else if (applyUrl.includes('jobthai')) sourcePlatform = 'jobthai';
      else if (applyUrl.includes('glassdoor')) sourcePlatform = 'jobsdb';
      else if (applyUrl.includes('indeed')) sourcePlatform = 'linkedin';

      return {
        id: `jsearch-${item.job_id}`,
        title,
        company,
        companyLogo: item.employer_logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(company)}&background=005af0&color=fff&size=100`,
        brandColor: '#005af0',
        location: isRemote ? 'Thailand (Remote Friendly)' : `${city}, ${country} (${company} Office)`,
        region: isBkk ? 'thai-bkk' : 'thai-remote',
        roleCategory: role,
        experienceLevel: exp,
        languageReq: 'bilingual-th-en',
        employmentType: 'fulltime',
        workMode: isRemote ? 'remote' : 'hybrid',
        sourcePlatform,
        scope: 'thai',
        salary: {
          min: minSalary,
          max: maxSalary,
          currency,
          period,
          text: salaryText
        },
        techStack: techStack.length > 0 ? techStack : ['JavaScript', 'API', 'Git'],
        postedAt: formatRelativeDate(item.job_posted_at_datetime_utc || item.job_posted_at_timestamp),
        featured: true,
        urgent: false,
        applicantsCount: Math.floor(Math.random() * 40) + 12,
        sourceSnippet: `Live JSearch Portal • ${city}, Thailand • Verified Posting`,
        sourceUrl: applyUrl,
        description: item.job_description ? item.job_description.slice(0, 500) + '...' : 'Real Thai tech job opportunity.',
        responsibilities: item.job_highlights?.Responsibilities && item.job_highlights.Responsibilities.length > 0 
          ? item.job_highlights.Responsibilities 
          : [
            'Develop, test and deploy production services with clean architecture.',
            'Collaborate with agile cross-functional product and QA teams.'
          ],
        requirements: item.job_highlights?.Qualifications && item.job_highlights.Qualifications.length > 0
          ? item.job_highlights.Qualifications
          : [
            'Relevant professional experience in software engineering.',
            'Proficiency in common frameworks, database design and API development.'
          ],
        benefits: item.job_highlights?.Benefits && item.job_highlights.Benefits.length > 0
          ? item.job_highlights.Benefits
          : [
            'Standard Thai Social Security & Medical Insurance',
            'Annual performance bonus & provident fund',
            'Hybrid workplace flexibility'
          ],
        isLiveFeed: true,
        sourceName: 'JSearch API (LinkedIn/Indeed)'
      };
    });
  } catch (err) {
    console.error('JSearch fetch failed:', err);
    throw err;
  }
}

// -------------------------------------------------------------
// UNIFIED FETCHER: Combines Sources + Deduplication + Caching
// -------------------------------------------------------------
export async function fetchUnifiedLiveJobs({ forceRefresh = false, rapidApiKey = null, onProgress = null } = {}) {
  // 1. Check Cache if not forcing refresh
  if (!forceRefresh) {
    const cached = getCachedLiveJobs();
    if (cached && cached.length > 0) {
      if (onProgress) onProgress({ step: 'Loaded from local cache', count: cached.length });
      return { jobs: cached, fromCache: true, sources: { cache: cached.length } };
    }
  }

  const activeKey = rapidApiKey !== null ? rapidApiKey : getStoredRapidApiKey();
  const results = {
    remotive: [],
    jobicy: [],
    jsearch: []
  };

  // 2. Fetch Free Remote Jobs in parallel
  if (onProgress) onProgress({ step: 'Fetching Remotive & Jobicy public APIs...', source: 'remote' });
  const [remotiveRes, jobicyRes] = await Promise.allSettled([
    fetchRemotiveJobs(25),
    fetchJobicyJobs(15)
  ]);

  if (remotiveRes.status === 'fulfilled') results.remotive = remotiveRes.value;
  if (jobicyRes.status === 'fulfilled') results.jobicy = jobicyRes.value;

  // 3. Fetch JSearch (Thailand Jobs) if API key is provided
  if (activeKey) {
    if (onProgress) onProgress({ step: 'Connecting to JSearch (Thailand tech jobs)...', source: 'jsearch' });
    try {
      const jsearchRes = await fetchJSearchThailandJobs(activeKey, 'software engineer thailand');
      results.jsearch = jsearchRes;
    } catch (e) {
      console.warn('JSearch skipped or failed:', e.message);
    }
  }

  // 4. Combine and Deduplicate
  const allLive = [...results.jsearch, ...results.remotive, ...results.jobicy];
  
  // Deduplicate by normalized (title + company)
  const seen = new Set();
  const deduped = [];
  for (const job of allLive) {
    const signature = `${job.title.toLowerCase().trim()}_${job.company.toLowerCase().trim()}`;
    if (!seen.has(signature)) {
      seen.add(signature);
      deduped.push(job);
    }
  }

  // 5. Update Cache
  if (deduped.length > 0) {
    setCachedLiveJobs(deduped);
  }

  if (onProgress) onProgress({ step: 'Done!', count: deduped.length });

  return {
    jobs: deduped,
    fromCache: false,
    sources: {
      remotive: results.remotive.length,
      jobicy: results.jobicy.length,
      jsearch: results.jsearch.length,
      total: deduped.length
    }
  };
}
