/**
 * JobFinder - Universal Job Extractor & Smart Importer
 * Automatically extracts job information from any job link or raw description text.
 */

// Supported platforms metadata
export const SUPPORTED_PLATFORMS = [
  { id: 'linkedin', name: 'LinkedIn', domain: 'linkedin.com', color: '#0a66c2' },
  { id: 'greenhouse', name: 'Greenhouse', domain: 'greenhouse.io', color: '#24a159' },
  { id: 'lever', name: 'Lever', domain: 'lever.co', color: '#1565c0' },
  { id: 'jobsdb', name: 'JobsDB', domain: 'jobsdb.com', color: '#ff6600' },
  { id: 'indeed', name: 'Indeed', domain: 'indeed.com', color: '#003a9b' },
  { id: 'workable', name: 'Workable', domain: 'workable.com', color: '#2557a7' },
  { id: 'ashby', name: 'Ashby', domain: 'ashbyhq.com', color: '#5433ff' },
  { id: 'jobthai', name: 'JobThai', domain: 'jobthai.com', color: '#e11d48' },
  { id: 'wellfound', name: 'Wellfound (AngelList)', domain: 'wellfound.com', color: '#000000' },
  { id: 'remoteok', name: 'RemoteOK', domain: 'remoteok.com', color: '#ff4742' },
  { id: 'weworkremotely', name: 'WeWorkRemotely', domain: 'weworkremotely.com', color: '#e04f5f' },
  { id: 'glassdoor', name: 'Glassdoor', domain: 'glassdoor.com', color: '#0caa41' },
];

// Tech stack dictionary for automatic keyword mining
const TECH_KEYWORDS = [
  'React', 'TypeScript', 'JavaScript', 'Next.js', 'Node.js', 'Python', 'Golang', 
  'Java', 'Kotlin', 'Swift', 'Flutter', 'AWS', 'GCP', 'Azure', 'Docker', 
  'Kubernetes', 'GraphQL', 'REST API', 'PostgreSQL', 'MySQL', 'MongoDB', 
  'Redis', 'Kafka', 'Tailwind', 'Vue', 'Angular', 'C++', 'C#', '.NET', 
  'Terraform', 'CI/CD', 'Git', 'Linux', 'Microservices', 'FastAPI', 'Django', 
  'Spring Boot', 'Elasticsearch', 'RabbitMQ', 'Supabase', 'Firebase', 'Figma'
];

/**
 * Detect platform from URL domain
 */
export function detectPlatformFromUrl(url) {
  if (!url) return { id: 'web', name: 'Web', color: '#3b82f6' };
  try {
    const host = new URL(url).hostname.toLowerCase();
    for (const p of SUPPORTED_PLATFORMS) {
      if (host.includes(p.domain)) {
        return p;
      }
    }
    // Generic domain extraction
    const parts = host.replace(/^www\./, '').split('.');
    const brand = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : 'Web';
    return { id: parts[0] || 'web', name: brand, color: '#3b82f6' };
  } catch (e) {
    return { id: 'web', name: 'Web', color: '#3b82f6' };
  }
}

/**
 * Extract clean company name and title hints from URL slugs
 */
function extractHintsFromUrl(urlStr) {
  try {
    const url = new URL(urlStr);
    const host = url.hostname.toLowerCase();
    const pathname = decodeURIComponent(url.pathname);
    const segments = pathname.split('/').filter(Boolean);

    let companyHint = '';
    let titleHint = '';

    // Greenhouse pattern: boards.greenhouse.io/{company}/jobs/{id}
    if (host.includes('greenhouse.io') && segments.length >= 1) {
      companyHint = segments[0];
      if (segments.length >= 3 && segments[1] === 'jobs') {
        titleHint = segments[2].replace(/[-_]/g, ' ');
      }
    } 
    // Lever pattern: jobs.lever.co/{company}/{id}
    else if (host.includes('lever.co') && segments.length >= 1) {
      companyHint = segments[0];
      if (segments.length >= 2) {
        titleHint = segments[1].replace(/[-_]/g, ' ');
      }
    }
    // Ashby pattern: jobs.ashbyhq.com/{company}/{id}
    else if (host.includes('ashbyhq.com') && segments.length >= 1) {
      companyHint = segments[0];
      if (segments.length >= 2) {
        titleHint = segments[1].replace(/[-_]/g, ' ');
      }
    }
    // LinkedIn pattern: linkedin.com/jobs/view/{slug-with-title-company-id}
    else if (host.includes('linkedin.com') && pathname.includes('/jobs/view/')) {
      const slug = segments[segments.indexOf('view') + 1] || '';
      const cleanSlug = slug.replace(/-\d+$/, '').replace(/[-_]/g, ' ');
      titleHint = cleanSlug;
    }
    // JobsDB: /job/{title-company-id}
    else if (host.includes('jobsdb.com') && segments.includes('job')) {
      const slug = segments[segments.indexOf('job') + 1] || '';
      titleHint = slug.replace(/[-_]/g, ' ');
    }
    // Workable: apply.workable.com/{company}/j/{id}
    else if (host.includes('workable.com') && segments.length >= 1) {
      companyHint = segments[0];
    }
    // Generic fallback: use subdomain or main domain
    if (!companyHint) {
      const parts = host.replace(/^www\./, '').split('.');
      if (parts.length > 2 && !['jobs', 'apply', 'boards', 'careers'].includes(parts[0])) {
        companyHint = parts[0];
      } else if (parts.length >= 2 && !['com', 'co', 'io', 'org', 'net', 'ai'].includes(parts[0])) {
        companyHint = parts[0];
      }
    }

    // Capitalize hints
    const cleanCompany = companyHint
      ? companyHint.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      : '';
    const cleanTitle = titleHint
      ? titleHint.replace(/\d+/g, '').replace(/\b\w/g, c => c.toUpperCase()).trim()
      : '';

    return { companyHint: cleanCompany, titleHint: cleanTitle };
  } catch (e) {
    return { companyHint: '', titleHint: '' };
  }
}

/**
 * Extract JSON-LD JobPosting schema from HTML
 */
function parseJsonLd(html) {
  try {
    const jsonLdRegex = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    while ((match = jsonLdRegex.exec(html)) !== null) {
      try {
        const rawContent = match[1].trim();
        const data = JSON.parse(rawContent);

        // Find JobPosting in single object, graph array, or nested
        let job = null;
        if (data['@type'] === 'JobPosting') {
          job = data;
        } else if (Array.isArray(data['@graph'])) {
          job = data['@graph'].find(item => item['@type'] === 'JobPosting');
        } else if (Array.isArray(data)) {
          job = data.find(item => item['@type'] === 'JobPosting');
        }

        if (job) {
          // Format company
          let company = '';
          let companyLogo = '';
          if (typeof job.hiringOrganization === 'string') {
            company = job.hiringOrganization;
          } else if (job.hiringOrganization) {
            company = job.hiringOrganization.name || '';
            companyLogo = job.hiringOrganization.logo || '';
          }

          // Format location
          let location = '';
          if (job.jobLocation) {
            if (typeof job.jobLocation === 'string') {
              location = job.jobLocation;
            } else if (job.jobLocation.address) {
              const addr = job.jobLocation.address;
              const parts = [
                addr.addressLocality,
                addr.addressRegion,
                addr.addressCountry
              ].filter(Boolean);
              location = parts.join(', ');
            }
          }

          // Remote check
          const isRemote = job.jobLocationType === 'TELECOMMUTE' || 
            (typeof location === 'string' && /remote|anywhere/i.test(location));

          if (isRemote && !location) {
            location = 'Worldwide (Remote)';
          }

          // Format salary
          let salary = null;
          if (job.baseSalary) {
            const bs = job.baseSalary;
            const val = bs.value;
            const currency = bs.currency || 'THB';
            let min = 0, max = 0;
            if (typeof val === 'number') {
              min = val;
              max = val;
            } else if (val) {
              min = Number(val.minValue || val.value || 0);
              max = Number(val.maxValue || val.value || min);
            }
            if (max > 0) {
              const curSymbol = currency === 'THB' ? '฿' : currency === 'USD' ? '$' : currency;
              const period = (bs.unitText || 'MONTH').toLowerCase().includes('year') ? 'yearly' : 'monthly';
              salary = {
                min,
                max,
                currency,
                period,
                text: min === max 
                  ? `${curSymbol}${min.toLocaleString()} / ${period === 'monthly' ? 'month' : 'year'}`
                  : `${curSymbol}${min.toLocaleString()} - ${curSymbol}${max.toLocaleString()} / ${period === 'monthly' ? 'month' : 'year'}`
              };
            }
          }

          return {
            title: job.title || '',
            company,
            companyLogo,
            location: location || '',
            description: cleanHtmlText(job.description || ''),
            datePosted: job.datePosted || '',
            employmentType: mapEmploymentType(job.employmentType),
            isRemote,
            salary,
            skills: Array.isArray(job.skills) ? job.skills : []
          };
        }
      } catch (err) {
        // continue searching next script tag
      }
    }
  } catch (e) {
    // ignore
  }
  return null;
}

/**
 * Parse Open Graph and Meta Tags from HTML
 */
function parseMetaTags(html) {
  const getTag = (propOrName, val) => {
    const regex = new RegExp(`<meta\\b[^>]*(?:property|name)=["']${val}["'][^>]*content=["']([\\s\\S]*?)["']`, 'i');
    const match = regex.exec(html);
    if (match) return match[1];
    
    // Reverse attribute order check: content="..." property="..."
    const revRegex = new RegExp(`<meta\\b[^>]*content=["']([\\s\\S]*?)["'][^>]*(?:property|name)=["']${val}["']`, 'i');
    const revMatch = revRegex.exec(html);
    return revMatch ? revMatch[1] : '';
  };

  const ogTitle = getTag('property', 'og:title') || getTag('name', 'twitter:title') || '';
  const ogDesc = getTag('property', 'og:description') || getTag('name', 'description') || getTag('name', 'twitter:description') || '';
  const ogImage = getTag('property', 'og:image') || getTag('name', 'twitter:image') || '';
  const ogSiteName = getTag('property', 'og:site_name') || '';

  // Extract <title> tag
  const titleMatch = /<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  const docTitle = titleMatch ? cleanHtmlText(titleMatch[1]) : '';

  return {
    ogTitle,
    ogDesc,
    ogImage,
    ogSiteName,
    docTitle
  };
}

/**
 * Remove HTML tags, unescape entities, and clean whitespace
 */
export function cleanHtmlText(htmlStr) {
  if (!htmlStr) return '';
  return htmlStr
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Map raw employment type string to system types
 */
function mapEmploymentType(raw) {
  if (!raw) return 'fulltime';
  const str = String(raw).toLowerCase();
  if (str.includes('contract') || str.includes('fixed')) return 'contract';
  if (str.includes('outsource') || str.includes('staff')) return 'outsource';
  if (str.includes('freelance') || str.includes('b2b')) return 'freelance';
  if (str.includes('intern')) return 'internship';
  return 'fulltime';
}

/**
 * Mine tech stack tags from text
 */
export function extractTechStack(text) {
  if (!text) return ['React', 'TypeScript', 'Node.js'];
  const found = new Set();
  const lower = text.toLowerCase();

  for (const tech of TECH_KEYWORDS) {
    const escaped = tech.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(text)) {
      found.add(tech);
    }
  }

  // Common aliases
  if (/\bgolang\b/i.test(text) || /\bgo\s+developer\b/i.test(text)) found.add('Golang');
  if (/\bpostgres\b/i.test(text)) found.add('PostgreSQL');
  if (/\bnextjs\b/i.test(text)) found.add('Next.js');
  if (/\bnodejs\b/i.test(text)) found.add('Node.js');
  if (/\bvuejs\b/i.test(text)) found.add('Vue');
  if (/\bci\/cd\b/i.test(text)) found.add('CI/CD');

  const result = Array.from(found);
  return result.length > 0 ? result.slice(0, 7) : ['React', 'TypeScript', 'Node.js'];
}

/**
 * Mine salary info from text
 */
export function extractSalaryFromText(text) {
  if (!text) return null;

  // 1. THB formats: e.g. ฿80,000 - ฿140,000 or 80,000 - 120,000 THB/month
  const thbMatch = text.match(/(?:฿|THB|thb)\s*([\d,]{4,7})\s*(?:-|to|–)\s*(?:฿|THB|thb)?\s*([\d,]{4,7})/i) ||
                   text.match(/([\d,]{4,7})\s*(?:-|to|–)\s*([\d,]{4,7})\s*(?:THB|baht|บาท)/i);
  if (thbMatch) {
    const min = parseInt(thbMatch[1].replace(/,/g, ''), 10);
    const max = parseInt(thbMatch[2].replace(/,/g, ''), 10);
    if (!isNaN(min) && !isNaN(max) && min < max) {
      return {
        min,
        max,
        currency: 'THB',
        period: 'monthly',
        text: `฿${min.toLocaleString()} - ฿${max.toLocaleString()} / month`
      };
    }
  }

  // 2. USD k formats: e.g. $120k - $160k or $120,000 - $160,000
  const usdMatch = text.match(/\$\s*(\d{2,3})[kK]\s*(?:-|to|–)\s*\$?\s*(\d{2,3})[kK]/i);
  if (usdMatch) {
    const min = parseInt(usdMatch[1], 10) * 1000;
    const max = parseInt(usdMatch[2], 10) * 1000;
    return {
      min,
      max,
      currency: 'USD',
      period: 'yearly',
      text: `$${min.toLocaleString()} - $${max.toLocaleString()} / year`
    };
  }

  const usdFullMatch = text.match(/\$\s*([\d,]{5,7})\s*(?:-|to|–)\s*\$?\s*([\d,]{5,7})/i);
  if (usdFullMatch) {
    const min = parseInt(usdFullMatch[1].replace(/,/g, ''), 10);
    const max = parseInt(usdFullMatch[2].replace(/,/g, ''), 10);
    return {
      min,
      max,
      currency: 'USD',
      period: 'yearly',
      text: `$${min.toLocaleString()} - $${max.toLocaleString()} / year`
    };
  }

  return null;
}

/**
 * Mine role category from title and text
 */
export function extractRoleCategory(title, text = '') {
  const combined = `${title} ${text}`.toLowerCase();
  if (combined.includes('frontend') || combined.includes('front-end') || combined.includes('ui developer')) return 'frontend';
  if (combined.includes('backend') || combined.includes('back-end') || combined.includes('api engineer')) return 'backend';
  if (combined.includes('fullstack') || combined.includes('full-stack') || combined.includes('full stack')) return 'fullstack';
  if (combined.includes('devops') || combined.includes('cloud') || combined.includes('infrastructure') || combined.includes('sre')) return 'devops';
  if (combined.includes('mobile') || combined.includes('ios') || combined.includes('android') || combined.includes('flutter')) return 'mobile';
  if (combined.includes('data engineer') || combined.includes('data scientist') || combined.includes('analytics')) return 'data';
  if (combined.includes('ai') || combined.includes('machine learning') || combined.includes('ml ') || combined.includes('llm')) return 'ai-ml';
  if (combined.includes('product manager') || combined.includes('product owner') || combined.includes('pm')) return 'product';
  if (combined.includes('qa') || combined.includes('test') || combined.includes('automation engineer')) return 'qa';
  if (combined.includes('ui/ux') || combined.includes('product designer') || combined.includes('designer')) return 'uiux';
  return 'fullstack';
}

/**
 * Mine experience level
 */
export function extractExperienceLevel(title, text = '') {
  const combined = `${title} ${text}`.toLowerCase();
  if (combined.includes('lead') || combined.includes('staff') || combined.includes('principal') || combined.includes('head') || combined.includes('director')) return 'lead';
  if (combined.includes('senior') || combined.includes('sr.') || combined.includes('sr ')) return 'senior';
  if (combined.includes('junior') || combined.includes('jr.') || combined.includes('associate')) return 'junior';
  if (combined.includes('intern') || combined.includes('trainee') || combined.includes('entry') || combined.includes('fresh')) return 'entry';
  return 'mid';
}

/**
 * Mine work mode
 */
export function extractWorkMode(text) {
  const lower = text.toLowerCase();
  if (lower.includes('remote') || lower.includes('work from anywhere') || lower.includes('wfa') || lower.includes('telecommute')) return 'remote';
  if (lower.includes('hybrid') || lower.includes('flexible days')) return 'hybrid';
  return 'onsite';
}

/**
 * Split text into bullet items
 */
export function extractBulletPoints(text, sectionHeaders) {
  if (!text) return [];
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const bullets = [];

  let inSection = false;
  for (const line of lines) {
    // Check if line is a header
    const isHeader = sectionHeaders.some(h => line.toLowerCase().includes(h.toLowerCase()));
    if (isHeader) {
      inSection = true;
      continue;
    }
    if (inSection) {
      // If encounters next section header, break
      if (/^[A-Z][\w\s]{2,25}:?$/.test(line) && !line.startsWith('-') && !line.startsWith('•')) {
        break;
      }
      const cleaned = line.replace(/^[-•*]\s*/, '').replace(/^\d+\.\s*/, '').trim();
      if (cleaned.length > 10 && cleaned.length < 250) {
        bullets.push(cleaned);
        if (bullets.length >= 5) break;
      }
    }
  }

  // Fallback: look for general bullet lines
  if (bullets.length === 0) {
    for (const line of lines) {
      if (line.startsWith('-') || line.startsWith('•') || line.startsWith('*')) {
        const cleaned = line.replace(/^[-•*]\s*/, '').trim();
        if (cleaned.length > 15 && cleaned.length < 250) {
          bullets.push(cleaned);
          if (bullets.length >= 4) break;
        }
      }
    }
  }

  return bullets;
}

/**
 * Main Extract Function: Accepts a URL or Raw Text and extracts structured job object
 */
export async function extractJobData(input, onProgress = () => {}) {
  const isUrl = /^https?:\/\//i.test(input.trim()) || 
                /^(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(input.trim());

  if (isUrl) {
    return await extractJobFromUrl(input.trim(), onProgress);
  } else {
    onProgress('Parsing job description text...');
    return extractJobFromText(input);
  }
}

/**
 * Extract Job from URL with multi-tiered fetch & parsing
 */
export async function extractJobFromUrl(rawUrl, onProgress = () => {}) {
  let targetUrl = rawUrl.trim();
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = 'https://' + targetUrl;
  }

  const platform = detectPlatformFromUrl(targetUrl);
  const hints = extractHintsFromUrl(targetUrl);

  onProgress(`Connecting to ${platform.name}...`);

  let html = '';
  let fetchedUrl = targetUrl;

  // Tier 1: Try local Vite Dev Proxy endpoint
  try {
    const res = await fetch(`/api/extract-job?url=${encodeURIComponent(targetUrl)}`, {
      signal: AbortSignal.timeout(6000)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.html) {
        html = data.html;
        fetchedUrl = data.finalUrl || targetUrl;
        onProgress('Received webpage data, parsing structure...');
      }
    }
  } catch (e) {
    // continue to Tier 2
  }

  // Tier 2: Try public reader API (r.jina.ai - converts any web page to structured markdown)
  if (!html) {
    try {
      onProgress('Reading webpage via smart web proxy...');
      const jinaRes = await fetch(`https://r.jina.ai/${targetUrl}`, {
        headers: { 'Accept': 'text/plain' },
        signal: AbortSignal.timeout(6000)
      });
      if (jinaRes.ok) {
        const text = await jinaRes.text();
        if (text && text.length > 100) {
          onProgress('Analyzing extracted markdown content...');
          return parseJinaMarkdown(text, targetUrl, platform, hints);
        }
      }
    } catch (e) {
      // continue to Tier 3
    }
  }

  // Tier 3: AllOrigins CORS proxy
  if (!html) {
    try {
      const aoRes = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`, {
        signal: AbortSignal.timeout(6000)
      });
      if (aoRes.ok) {
        const aoData = await aoRes.json();
        if (aoData.contents) {
          html = aoData.contents;
        }
      }
    } catch (e) {
      // ignore
    }
  }

  // Parse HTML
  if (html) {
    onProgress('Extracting Schema.org & OpenGraph metadata...');
    return parseHtmlJob(html, fetchedUrl, platform, hints);
  }

  // Tier 4: Pure URL heuristics fallback (when pages are blocked or behind login)
  onProgress('Constructing job details from URL pattern...');
  return buildFromHintsOnly(targetUrl, platform, hints);
}

/**
 * Parse job from HTML string
 */
function parseHtmlJob(html, url, platform, hints) {
  // 1. Try JSON-LD
  const jsonLd = parseJsonLd(html);
  // 2. Try Meta tags
  const meta = parseMetaTags(html);

  // Determine Title
  let title = jsonLd?.title || '';
  if (!title && meta.ogTitle) {
    title = meta.ogTitle;
  }
  if (!title && meta.docTitle) {
    title = meta.docTitle;
  }
  if (!title && hints.titleHint) {
    title = hints.titleHint;
  }

  // Clean title (remove " | LinkedIn", " - Greenhouse", " at Company", etc.)
  title = title
    .replace(/\s*[-|•]\s*(LinkedIn|JobsDB|Indeed|Greenhouse|Lever|JobThai|Glassdoor).*$/i, '')
    .replace(/\s*\(m\/f\/d\)/i, '')
    .trim();

  // If title includes "Company hiring Title", parse both
  const hiringMatch = title.match(/^(.*?)\s+hiring\s+(.*)$/i);
  let parsedCompanyFromTitle = '';
  if (hiringMatch) {
    parsedCompanyFromTitle = hiringMatch[1].trim();
    title = hiringMatch[2].trim();
  }

  // If title has "Job Title at Company"
  const atMatch = title.match(/^(.*?)\s+at\s+([A-Za-z0-9\s&.,-]+)$/i);
  if (atMatch && !parsedCompanyFromTitle) {
    title = atMatch[1].trim();
    parsedCompanyFromTitle = atMatch[2].trim();
  }

  // Determine Company
  let company = jsonLd?.company || parsedCompanyFromTitle || meta.ogSiteName || hints.companyHint;
  if (!company) {
    company = platform.name;
  }
  company = company.replace(/\s*(Jobs|Careers|Portal|Hiring)\s*$/i, '').trim();

  // Determine Description
  const rawDesc = jsonLd?.description || meta.ogDesc || '';
  const cleanDesc = cleanHtmlText(rawDesc);

  // Determine Tech Stack
  const techStack = jsonLd?.skills?.length ? jsonLd.skills : extractTechStack(`${title} ${cleanDesc} ${html}`);

  // Determine Location
  let location = jsonLd?.location || '';
  if (!location) {
    if (/bangkok|thailand/i.test(cleanDesc) || /bangkok|thailand/i.test(title)) {
      location = 'Bangkok, Thailand';
    } else if (/remote/i.test(cleanDesc) || /remote/i.test(title)) {
      location = 'Worldwide (Remote)';
    } else {
      location = 'Thailand / Remote';
    }
  }

  // Determine Scope
  const isThai = /thailand|bangkok|chiang mai|phuket/i.test(location) || /thailand/i.test(cleanDesc);
  const scope = isThai ? 'thai' : 'foreign';
  const region = isThai ? 'thai-bkk' : 'global-remote';

  // Determine Salary
  let salary = jsonLd?.salary || extractSalaryFromText(cleanDesc) || extractSalaryFromText(html);
  if (!salary) {
    salary = {
      min: 90000,
      max: 150000,
      currency: isThai ? 'THB' : 'USD',
      period: isThai ? 'monthly' : 'yearly',
      text: isThai ? '฿90,000 - ฿150,000 / month (Est.)' : '$90k - $140k / year (Est.)'
    };
  }

  // Logo
  let companyLogo = jsonLd?.companyLogo || meta.ogImage || '';
  if (!companyLogo || companyLogo.includes('default') || companyLogo.includes('favicon')) {
    companyLogo = getRandomLogoForCompany(company);
  }

  // Work Mode & Experience
  const workMode = jsonLd?.isRemote ? 'remote' : extractWorkMode(`${location} ${cleanDesc} ${title}`);
  const roleCategory = extractRoleCategory(title, cleanDesc);
  const experienceLevel = extractExperienceLevel(title, cleanDesc);
  const employmentType = jsonLd?.employmentType || mapEmploymentType(cleanDesc);

  const responsibilities = extractBulletPoints(cleanDesc, ['Responsibilities', 'What you will do', 'Duties', 'Role overview']);
  const requirements = extractBulletPoints(cleanDesc, ['Requirements', 'Qualifications', 'Who you are', 'Skills required']);

  return {
    id: `custom-${Date.now()}`,
    title: title || 'Software Engineer',
    company: company || 'Tech Company',
    companyLogo,
    brandColor: platform.color || '#3b82f6',
    location,
    region,
    roleCategory,
    experienceLevel,
    languageReq: isThai ? 'bilingual-th-en' : 'english-fluent',
    employmentType,
    workMode,
    sourcePlatform: platform.id,
    scope,
    salary,
    techStack,
    postedAt: 'Just now',
    featured: false,
    urgent: false,
    applicantsCount: Math.floor(Math.random() * 20) + 1,
    sourceSnippet: `Imported from ${platform.name} • Active Opportunity`,
    sourceUrl: url,
    description: cleanDesc.length > 60 ? cleanDesc : `${company} is hiring a ${title}. Apply directly on their official posting.`,
    responsibilities: responsibilities.length > 0 ? responsibilities : [
      `Collaborate with cross-functional teams to build high-quality solutions.`,
      `Design, implement, and maintain scalable software services.`,
      `Participate in code reviews, technical architecture sessions, and sprint planning.`
    ],
    requirements: requirements.length > 0 ? requirements : [
      `Strong background in ${techStack.slice(0, 3).join(', ')}.`,
      `Demonstrated problem-solving abilities and clean code habits.`,
      `Good communication and teamwork skills.`
    ],
    benefits: [
      'Competitive compensation package',
      'Flexible remote / hybrid work culture',
      'Health insurance and professional development'
    ],
    isCustomImport: true
  };
}

/**
 * Parse job from Jina AI Markdown output
 */
function parseJinaMarkdown(markdown, url, platform, hints) {
  const lines = markdown.split('\n').map(l => l.trim()).filter(Boolean);

  // First line or H1 is usually the Title
  let title = '';
  const h1Match = markdown.match(/^#\s+(.+)$/m);
  if (h1Match) {
    title = h1Match[1].trim();
  } else if (lines.length > 0) {
    title = lines[0].replace(/^#+\s*/, '');
  }

  let company = hints.companyHint || platform.name;

  // Title extraction refinements
  if (title.includes(' at ')) {
    const parts = title.split(' at ');
    title = parts[0].trim();
    if (!hints.companyHint) company = parts[1].trim();
  }

  title = title
    .replace(/\s*[-|•]\s*(LinkedIn|JobsDB|Indeed|Greenhouse|Lever|JobThai).*$/i, '')
    .trim();

  if (!title) title = hints.titleHint || 'Tech Specialist';

  const techStack = extractTechStack(`${title} ${markdown}`);
  const salary = extractSalaryFromText(markdown) || {
    min: 80000,
    max: 140000,
    currency: 'THB',
    period: 'monthly',
    text: '฿80,000 - ฿140,000 / month (Est.)'
  };

  const isThai = /thailand|bangkok/i.test(markdown) || /thailand|bangkok/i.test(title);
  const location = isThai ? 'Bangkok, Thailand' : (/remote/i.test(markdown) ? 'Worldwide (Remote)' : 'Bangkok / Remote');

  const responsibilities = extractBulletPoints(markdown, ['Responsibilities', 'What you will do', 'Duties']);
  const requirements = extractBulletPoints(markdown, ['Requirements', 'Qualifications', 'Who you are']);

  return {
    id: `custom-${Date.now()}`,
    title,
    company: company.replace(/[-_]/g, ' '),
    companyLogo: getRandomLogoForCompany(company),
    brandColor: platform.color || '#3b82f6',
    location,
    region: isThai ? 'thai-bkk' : 'global-remote',
    roleCategory: extractRoleCategory(title, markdown),
    experienceLevel: extractExperienceLevel(title, markdown),
    languageReq: isThai ? 'bilingual-th-en' : 'english-fluent',
    employmentType: mapEmploymentType(markdown),
    workMode: extractWorkMode(`${location} ${markdown}`),
    sourcePlatform: platform.id,
    scope: isThai ? 'thai' : 'foreign',
    salary,
    techStack,
    postedAt: 'Just now',
    featured: false,
    urgent: false,
    applicantsCount: 5,
    sourceSnippet: `Imported from ${platform.name} via Job Link Reader`,
    sourceUrl: url,
    description: markdown.slice(0, 1000) + '...',
    responsibilities: responsibilities.length > 0 ? responsibilities : [
      'Design, build, and maintain efficient, reusable, and reliable code.',
      'Collaborate with product and design teams on feature specifications.',
      'Ensure high standards of performance, quality, and responsiveness.'
    ],
    requirements: requirements.length > 0 ? requirements : [
      `Hands-on experience in ${techStack.slice(0, 3).join(', ')}.`,
      'Solid analytical mindset and passion for building great products.'
    ],
    benefits: [
      'Comprehensive health coverage',
      'Flexible working arrangements',
      'Learning budget & career growth'
    ],
    isCustomImport: true
  };
}

/**
 * Fallback when URL cannot be fetched: derive cleanly from hints
 */
function buildFromHintsOnly(url, platform, hints) {
  const company = hints.companyHint || platform.name;
  const title = hints.titleHint || 'Senior Software Engineer';
  const techStack = extractTechStack(title);

  return {
    id: `custom-${Date.now()}`,
    title,
    company,
    companyLogo: getRandomLogoForCompany(company),
    brandColor: platform.color || '#3b82f6',
    location: 'Bangkok / Remote',
    region: 'thai-bkk',
    roleCategory: extractRoleCategory(title),
    experienceLevel: extractExperienceLevel(title),
    languageReq: 'english-fluent',
    employmentType: 'fulltime',
    workMode: 'hybrid',
    sourcePlatform: platform.id,
    scope: 'thai',
    salary: {
      min: 100000,
      max: 180000,
      currency: 'THB',
      period: 'monthly',
      text: '฿100,000 - ฿180,000 / month'
    },
    techStack,
    postedAt: 'Just now',
    featured: false,
    urgent: false,
    applicantsCount: 1,
    sourceSnippet: `Imported via direct link from ${platform.name}`,
    sourceUrl: url,
    description: `Position at ${company}. Open official link to review full job description and requirements.`,
    responsibilities: [
      'Design and build high-quality scalable software systems.',
      'Work alongside product and technical stakeholders to deliver new initiatives.'
    ],
    requirements: [
      `Strong foundation in software engineering and ${techStack[0] || 'modern tech'}.`,
      'Proven track record of shipping production code.'
    ],
    benefits: [
      'Competitive compensation package',
      'Flexible hybrid schedule'
    ],
    isCustomImport: true
  };
}

/**
 * Extract Job from raw pasted text (e.g. copied from chat or email)
 */
export function extractJobFromText(rawText) {
  const text = rawText.trim();
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  // Look for Title in first 3 lines
  let title = lines[0] || 'Software Engineer';
  let company = 'Imported Company';

  if (lines.length > 1 && lines[0].length < 40 && !lines[0].toLowerCase().includes('job')) {
    // Might be Company Name on line 1, Title on line 2
    if (/developer|engineer|manager|designer|lead|architect/i.test(lines[1])) {
      company = lines[0];
      title = lines[1];
    }
  }

  // Look for "at Company"
  const atMatch = title.match(/^(.*?)\s+at\s+([A-Za-z0-9\s&.,-]+)$/i);
  if (atMatch) {
    title = atMatch[1].trim();
    company = atMatch[2].trim();
  }

  const techStack = extractTechStack(text);
  const salary = extractSalaryFromText(text) || {
    min: 80000,
    max: 140000,
    currency: 'THB',
    period: 'monthly',
    text: '฿80,000 - ฿140,000 / month'
  };

  const isThai = /thailand|bangkok|chiang mai/i.test(text);
  const location = isThai ? 'Bangkok, Thailand' : (/remote/i.test(text) ? 'Worldwide (Remote)' : 'Bangkok, Thailand');

  const responsibilities = extractBulletPoints(text, ['Responsibilities', 'What you will do', 'Duties']);
  const requirements = extractBulletPoints(text, ['Requirements', 'Qualifications', 'Who you are']);

  return {
    id: `custom-${Date.now()}`,
    title,
    company,
    companyLogo: getRandomLogoForCompany(company),
    brandColor: '#3b82f6',
    location,
    region: isThai ? 'thai-bkk' : 'global-remote',
    roleCategory: extractRoleCategory(title, text),
    experienceLevel: extractExperienceLevel(title, text),
    languageReq: isThai ? 'bilingual-th-en' : 'english-fluent',
    employmentType: mapEmploymentType(text),
    workMode: extractWorkMode(`${location} ${text}`),
    sourcePlatform: 'direct',
    scope: isThai ? 'thai' : 'foreign',
    salary,
    techStack,
    postedAt: 'Just now',
    featured: false,
    urgent: false,
    applicantsCount: 1,
    sourceSnippet: 'Imported from custom text description',
    sourceUrl: '#',
    description: text.length > 50 ? text : `Job opening for ${title} at ${company}.`,
    responsibilities: responsibilities.length > 0 ? responsibilities : [
      'Lead feature development from concept to delivery.',
      'Ensure code maintainability, security, and test coverage.'
    ],
    requirements: requirements.length > 0 ? requirements : [
      `Experience with ${techStack.slice(0, 3).join(', ')}.`,
      'Ability to thrive in a fast-paced agile environment.'
    ],
    benefits: [
      'Competitive salary + performance incentive',
      'Flexible work location'
    ],
    isCustomImport: true
  };
}

/**
 * Generate a nice tech logo image for imported companies
 */
const CURATED_LOGOS = [
  'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=100&h=100&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=100&h=100&fit=crop&crop=faces'
];

export function getRandomLogoForCompany(companyName = '') {
  let hash = 0;
  for (let i = 0; i < companyName.length; i++) {
    hash = (hash << 5) - hash + companyName.charCodeAt(i);
  }
  const index = Math.abs(hash) % CURATED_LOGOS.length;
  return CURATED_LOGOS[index];
}
