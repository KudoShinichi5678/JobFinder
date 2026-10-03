export const INITIAL_JOBS = [
  {
    id: 'job-01',
    title: 'Senior Frontend Engineer (React / Next.js / Design System)',
    company: 'Agoda',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#005af0',
    location: 'Bangkok, Thailand (CentralWorld Offices)',
    region: 'thai-bkk',
    roleCategory: 'frontend',
    experienceLevel: 'senior',
    languageReq: 'english-fluent',
    employmentType: 'fulltime',
    workMode: 'hybrid',
    sourcePlatform: 'linkedin',
    scope: 'thai',
    salary: {
      min: 130000,
      max: 210000,
      currency: 'THB',
      period: 'monthly',
      text: '฿130,000 - ฿210,000 / month'
    },
    techStack: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Tailwind', 'Jest'],
    postedAt: '25m ago',
    featured: true,
    urgent: false,
    applicantsCount: 42,
    sourceSnippet: 'LinkedIn Easy Apply • 42 applicants • Verified Enterprise Employer',
    sourceUrl: 'https://www.linkedin.com/jobs/view/agoda-senior-frontend',
    description: 'Agoda is looking for a Senior Frontend Engineer to build high-performance, customer-facing web applications serving over 50 million monthly global travelers. You will collaborate with product designers and backend engineers to optimize checkout funnels, micro-frontends, and core web vitals.',
    responsibilities: [
      'Architect, develop, and maintain high-scale React/Next.js web applications across APAC.',
      'Lead web performance initiatives, targeting sub-second LCP and FID improvements.',
      'Contribute to our internal Design System component library used by 120+ engineers.',
      'Mentor junior and mid-level frontend engineers through code reviews and design sessions.'
    ],
    requirements: [
      '5+ years of production experience in React, TypeScript, and modern state management.',
      'Solid understanding of Web Performance, SSR/SSG patterns, and accessibility standards.',
      'Fluent English communication skills (Agoda is an international workplace with 90+ nationalities).',
      'Experience in A/B testing and analytics-driven experimentation.'
    ],
    benefits: [
      'Competitive salary + annual performance bonus',
      'Relocation assistance & work permit for expats',
      'Provident Fund up to 10% matching',
      'Hybrid flex: 2 days office / 3 days remote',
      'Top-tier comprehensive medical insurance with dental & optical'
    ]
  },
  {
    id: 'job-02',
    title: 'Staff / Principal Backend Engineer (Golang / High Concurrency)',
    company: 'LINE MAN Wongnai',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#00c300',
    location: 'Bangkok, Thailand (T-One Building, Thong Lo)',
    region: 'thai-bkk',
    roleCategory: 'backend',
    experienceLevel: 'lead',
    languageReq: 'bilingual-th-en',
    employmentType: 'fulltime',
    workMode: 'hybrid',
    sourcePlatform: 'jobsdb',
    scope: 'thai',
    salary: {
      min: 160000,
      max: 260000,
      currency: 'THB',
      period: 'monthly',
      text: '฿160,000 - ฿260,000 / month'
    },
    techStack: ['Golang', 'Kubernetes', 'Kafka', 'PostgreSQL', 'Redis', 'gRPC'],
    postedAt: '1h ago',
    featured: true,
    urgent: true,
    applicantsCount: 19,
    sourceSnippet: 'JobsDB Thailand Hot Job • Food Delivery & FinTech Core Engine Team',
    sourceUrl: 'https://th.jobsdb.com/job/lineman-staff-backend',
    description: 'Join Thailand’s #1 on-demand lifestyle super-app! We process millions of orders daily across food delivery, ride-hailing, grocery, and merchant POS systems. As a Staff Backend Engineer, you will design distributed transaction architectures capable of handling massive peak surges during meal hours.',
    responsibilities: [
      'Design fault-tolerant microservices in Golang handling 50k+ QPS with p99 latency < 50ms.',
      'Optimize event streaming pipelines on Apache Kafka and distributed database replication.',
      'Establish technical roadmaps, engineering guidelines, and disaster-recovery drills.',
      'Drive architectural decisions for cross-functional super-app initiatives.'
    ],
    requirements: [
      '7+ years of backend engineering experience with strong mastery of Golang or Java/Kotlin.',
      'Deep expertise in distributed systems, message queues (Kafka/RabbitMQ), and caching strategies.',
      'Thai fluency and professional English capability for international vendor coordination.',
      'Proven track record scaling consumer internet platforms.'
    ],
    benefits: [
      'Annual bonus (averaging 3-5 months)',
      'Free food delivery credits & rider discounts',
      'Flexible working hours & hybrid 3 days remote',
      'MacBook Pro M3 Max provided',
      'Annual health checkup and premium health insurance covering OPD/IPD'
    ]
  },
  {
    id: 'job-03',
    title: 'Senior Cloud DevOps & Platform Engineer (100% Global Remote)',
    company: 'GitLab',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#fc6d26',
    location: 'Worldwide Remote (Work anywhere in Thailand or APAC)',
    region: 'foreign-remote',
    roleCategory: 'cloud-devops',
    experienceLevel: 'senior',
    languageReq: 'english-fluent',
    employmentType: 'fulltime',
    workMode: 'remote',
    sourcePlatform: 'remoteok',
    scope: 'foreign',
    salary: {
      min: 110000,
      max: 165000,
      currency: 'USD',
      period: 'yearly',
      text: '$110,000 - $165,000 / year (USD)'
    },
    techStack: ['Terraform', 'Kubernetes', 'AWS', 'GCP', 'Prometheus', 'CI/CD', 'Go'],
    postedAt: '2h ago',
    featured: true,
    urgent: false,
    applicantsCount: 68,
    sourceSnippet: 'RemoteOK Top Pick • All-remote company pioneer • USD B2B / EOR Contract',
    sourceUrl: 'https://remoteok.com/remote-jobs/gitlab-devops-platform',
    description: 'GitLab is completely all-remote. We are seeking a Senior Cloud Platform Engineer based in Thailand or SE Asia timezone to build, maintain, and automate our multi-region Kubernetes infrastructure spanning thousands of nodes.',
    responsibilities: [
      'Manage multi-cloud infrastructure as code using Terraform across AWS and Google Cloud.',
      'Enhance automated deployment pipelines, canary releases, and zero-downtime upgrades.',
      'Collaborate asynchronously across time zones using GitLab issues and merge requests.',
      'Participate in on-call rotation with world-class blameless post-mortem culture.'
    ],
    requirements: [
      '5+ years managing production Kubernetes and cloud native infrastructure.',
      'Fluent written and verbal English communication; self-starter with async discipline.',
      'Strong scripting capability in Golang, Python, or Ruby.',
      'Deep understanding of GitOps, observability (Prometheus/Grafana/OpenTelemetry).'
    ],
    benefits: [
      '100% Remote forever - work from Bangkok, Chiang Mai, or anywhere',
      'Home office setup budget ($2,500 USD)',
      'Annual wellness & coworking reimbursement',
      'Uncapped paid time off (minimum 25 days encouraged)',
      'Equity stock options package'
    ]
  },
  {
    id: 'job-04',
    title: 'Junior Fullstack Developer (Node.js & Vue / React - Fresh Grad OK)',
    company: 'Sertis AI',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#7c3aed',
    location: 'Bangkok, Thailand (Near BTS Asok)',
    region: 'thai-bkk',
    roleCategory: 'fullstack',
    experienceLevel: 'entry',
    languageReq: 'thai',
    employmentType: 'fulltime',
    workMode: 'hybrid',
    sourcePlatform: 'jobthai',
    scope: 'thai',
    salary: {
      min: 38000,
      max: 55000,
      currency: 'THB',
      period: 'monthly',
      text: '฿38,000 - ฿55,000 / month'
    },
    techStack: ['JavaScript', 'TypeScript', 'Node.js', 'Vue.js', 'React', 'PostgreSQL'],
    postedAt: '3h ago',
    featured: false,
    urgent: false,
    applicantsCount: 31,
    sourceSnippet: 'JobThai Hot Listing • Welcomes Fresh Graduates & Bootcamp Alumni',
    sourceUrl: 'https://www.jobthai.com/job/sertis-junior-fullstack',
    description: 'Looking to kickstart your tech career in AI and data-driven software? Sertis is looking for Junior Fullstack Developers with passion for modern web technologies. You will be paired with a dedicated Senior Mentor and work on enterprise AI portals and dashboards.',
    responsibilities: [
      'Develop modern web applications using Node.js and React / Vue under senior guidance.',
      'Write clean, maintainable code and unit tests.',
      'Collaborate with AI researchers to visualize machine learning models and reports.',
      'Participate in daily standups and agile sprint retrospectives.'
    ],
    requirements: [
      'Bachelor’s degree in Computer Science, Software Engineering, or proven portfolio projects.',
      '0 - 2 years of experience (Fresh grads graduating in 2025/2026 welcome!).',
      'Good fundamental knowledge of JavaScript, HTTP REST APIs, and relational databases.',
      'Eager to learn modern cloud and AI technologies; Thai native communication.'
    ],
    benefits: [
      'Structured 6-month engineering mentorship program',
      'Provident fund + Health insurance with OPD coverage',
      'Free snacks, gourmet coffee, and Friday board game socials',
      'Hybrid work: 3 days office / 2 days WFH',
      'Annual tech training and certification allowance'
    ]
  },
  {
    id: 'job-05',
    title: 'Senior Contract React Native Developer (6-Month Outsource to Top Bank)',
    company: 'SoftSquare Tech Consulting',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#ea580c',
    location: 'Bangkok, Thailand (Silom / Work from Home)',
    region: 'thai-bkk',
    roleCategory: 'mobile',
    experienceLevel: 'senior',
    languageReq: 'thai',
    employmentType: 'outsource',
    workMode: 'hybrid',
    sourcePlatform: 'facebook',
    scope: 'thai',
    salary: {
      min: 110000,
      max: 150000,
      currency: 'THB',
      period: 'monthly',
      text: '฿110,000 - ฿150,000 / month (Outsource Contract)'
    },
    techStack: ['React Native', 'TypeScript', 'Redux Toolkit', 'iOS', 'Android', 'Mobile Security'],
    postedAt: '4h ago',
    featured: false,
    urgent: true,
    applicantsCount: 15,
    sourceSnippet: 'โพสต์จากกลุ่ม Facebook สมาคมโปรแกรมเมอร์ไทย • ด่วน! สัญญา Outsource 6 เดือน ต่อสัญญาได้',
    sourceUrl: 'https://facebook.com/groups/thaiprogrammer/posts/1029384756',
    description: 'หาด่วน! บริษัท SoftSquare กำลังมองหา Senior React Native Developer ประจำโครงการพัฒนาระบบ Mobile Banking ของสถาบันการเงินชั้นนำในไทย สัญญา Outsource 6 เดือนแรก (พิจารณาต่อสัญญาประจำปี หรือบรรจุประจำได้) ค่าตอบแทนสูง เริ่มงานได้ทันที!',
    responsibilities: [
      'พัฒนาฟีเจอร์ใหม่บน Mobile Banking Application ด้วย React Native & TypeScript',
      'เชื่อมต่อ Secure API ตามมาตรฐานความปลอดภัยระดับธนาคาร (OWASP Mobile, Biometric Auth)',
      'ทำ Performance Optimization ลดเวลา Startup และ Render Time',
      'แก้ไข Defect และสนับสนุนการ Deploy ขึ้น App Store & Google Play Store'
    ],
    requirements: [
      'มีประสบการณ์พัฒนา Mobile App ด้วย React Native อย่างน้อย 4 ปีขึ้นไป',
      'เข้าใจเรื่อง State Management, Native Modules (Bridging), และ Mobile Security',
      'สื่อสารภาษาไทยได้ดี สามารถเข้าออฟฟิศย่านสีลมสัปดาห์ละ 1-2 วันได้',
      'พร้อมเริ่มงานภายใน 15-30 วัน'
    ],
    benefits: [
      'ค่าตอบแทนสูงตามความสามารถ จ่ายตรงเวลาทุกสิ้นเดือน',
      'ประกันอุบัติเหตุและประกันสุขภาพกลุ่ม',
      'โอกาสต่อสัญญาระยะยาวหรือปรับเป็นสัญญาประจำ',
      'โบนัสตามการจบเฟสโครงการ (Project Completion Bonus)'
    ]
  },
  {
    id: 'job-06',
    title: 'Japanese Bilingual IT Project Coordinator / Software Engineer',
    company: 'Toyota Connected Thailand',
    companyLogo: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#dc2626',
    location: 'Bangkok, Thailand (Near MRT Rama 9)',
    region: 'thai-bkk',
    roleCategory: 'fullstack',
    experienceLevel: 'mid',
    languageReq: 'japanese',
    employmentType: 'fulltime',
    workMode: 'hybrid',
    sourcePlatform: 'jobsdb',
    scope: 'thai',
    salary: {
      min: 80000,
      max: 130000,
      currency: 'THB',
      period: 'monthly',
      text: '฿80,000 - ฿130,000 / month + JP Allowance'
    },
    techStack: ['Python', 'AWS', 'IoT', 'Microservices', 'Jira', 'Japanese N2/N1'],
    postedAt: '5h ago',
    featured: false,
    urgent: false,
    applicantsCount: 12,
    sourceSnippet: 'JobsDB Thailand • Japanese Language Allowance up to 25,000 THB/mo',
    sourceUrl: 'https://th.jobsdb.com/job/toyota-connected-jp-bilingual',
    description: 'Toyota Connected is pioneering connected vehicle telematics, mobility services, and in-car AI. We are looking for an IT Engineer or Technical Coordinator with Japanese fluency (JLPT N2 or N1) to bridge technical teams between Bangkok and Tokyo.',
    responsibilities: [
      'Facilitate technical communication and requirements alignment between Japan HQ and Thailand devs.',
      'Participate in cloud telemetry platform development and IoT data pipeline verification.',
      'Translate technical architecture specifications (Japanese <-> English/Thai).',
      'Assist in sprint planning, feature demos, and system acceptance tests.'
    ],
    requirements: [
      'Japanese proficiency level JLPT N2 or N1 (Verbal and written business level).',
      '3+ years in IT software development, QA, or technical project coordination.',
      'Familiarity with cloud computing (AWS) and web architectures.',
      'Cross-cultural mindset with excellent interpersonal communication.'
    ],
    benefits: [
      'Generous Japanese Language Allowance (N1: ฿25,000 / N2: ฿15,000 extra per month)',
      'Annual bonus (typically 4-6 months based on company performance)',
      'Provident fund, medical insurance covering spouse and children',
      'Opportunity for short-term and long-term business trips to Tokyo HQ'
    ]
  },
  {
    id: 'job-07',
    title: 'Founding AI Full-Stack Engineer (Direct Tweet Hiring)',
    company: 'CognitiveWave (YC W25 Stealth)',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#000000',
    location: 'Worldwide Remote / Bangkok Hub',
    region: 'foreign-remote',
    roleCategory: 'ai-data',
    experienceLevel: 'senior',
    languageReq: 'english-fluent',
    employmentType: 'fulltime',
    workMode: 'remote',
    sourcePlatform: 'x',
    scope: 'foreign',
    salary: {
      min: 120000,
      max: 180000,
      currency: 'USD',
      period: 'yearly',
      text: '$120,000 - $180,000 / yr + 1.5% Equity'
    },
    techStack: ['Python', 'FastAPI', 'PyTorch', 'Next.js', 'LangGraph', 'Tailwind', 'VectorDB'],
    postedAt: '45m ago',
    featured: true,
    urgent: true,
    applicantsCount: 24,
    sourceSnippet: 'Tweet from @sam_founder: We just raised $4.2M and looking for our 3rd engineer! DM open for direct chat.',
    sourceUrl: 'https://x.com/tech_founder_hiring/status/189283726',
    description: 'We are building autonomous AI agents for enterprise workflows, backed by top Silicon Valley VCs. Looking for a high-velocity Founding Full-Stack & AI Engineer who loves shipping fast, testing hypotheses, and working directly with founders.',
    responsibilities: [
      'Design, build, and deploy agentic AI pipelines with LangGraph, LLM fine-tuning, and RAG.',
      'Ship polished user interfaces in Next.js 15, React 19, and Tailwind.',
      'Own end-to-end features from customer interview to production rollout.',
      'Scale vector database indexing and inference caching pipelines.'
    ],
    requirements: [
      '4+ years building full-stack applications with strong proficiency in Python and TypeScript.',
      'Hands-on experience deploying LLM applications, RAG pipelines, or autonomous agent frameworks.',
      'High agency, bias for action, and ability to thrive in ambiguity.',
      'Native or fluent English proficiency.'
    ],
    benefits: [
      'Generous early-stage equity (1.0% - 2.0%)',
      'Top-of-market USD salary paid via Deel / Wise directly to your bank account',
      'Annual team retreats (Past: Bali, Tokyo, Lisbon)',
      'Unlimited hardware and OpenAI / Anthropic API playground credits'
    ]
  },
  {
    id: 'job-08',
    title: 'Senior Blockchain & Smart Contract Auditor',
    company: 'Bitkub Chain',
    companyLogo: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#00dc82',
    location: 'Bangkok, Thailand (AIA Sathorn Tower)',
    region: 'thai-bkk',
    roleCategory: 'cybersecurity',
    experienceLevel: 'senior',
    languageReq: 'bilingual-th-en',
    employmentType: 'fulltime',
    workMode: 'hybrid',
    sourcePlatform: 'linkedin',
    scope: 'thai',
    salary: {
      min: 140000,
      max: 220000,
      currency: 'THB',
      period: 'monthly',
      text: '฿140,000 - ฿220,000 / month'
    },
    techStack: ['Solidity', 'Rust', 'EVM', 'Hardhat', 'Foundry', 'Slither', 'Security'],
    postedAt: '6h ago',
    featured: false,
    urgent: false,
    applicantsCount: 18,
    sourceSnippet: 'LinkedIn Job • Thailand’s Leading Web3 Ecosystem & Digital Asset Exchange',
    sourceUrl: 'https://www.linkedin.com/jobs/view/bitkub-blockchain-auditor',
    description: 'Bitkub Chain is Thailand’s premier enterprise blockchain infrastructure. We are seeking a passionate Senior Smart Contract Auditor to audit decentralized protocols, cross-chain bridges, and tokenized real-world assets.',
    responsibilities: [
      'Perform rigorous security audits on Solidity and Rust smart contracts.',
      'Identify reentrancy vulnerabilities, arithmetic overflows, and flash loan attack vectors.',
      'Author comprehensive security assessment reports and remediations.',
      'Build automated fuzzing and formal verification suites using Foundry and Slither.'
    ],
    requirements: [
      '4+ years in software engineering with 2+ years specialized in Web3 smart contract security.',
      'Deep mastery of EVM internals, gas optimization, and DeFi primitives.',
      'Proficiency in both Thai and English for collaboration with international DeFi partners.'
    ],
    benefits: [
      'Crypto token incentives & annual performance bonus',
      'Provident Fund up to 10%',
      'Flexible working style with 2-3 days WFH',
      'Private health care with psychiatric and dental support'
    ]
  },
  {
    id: 'job-09',
    title: 'Product Design Lead (UI/UX & Mobile Fintech Experience)',
    company: 'Kasikorn Business-Technology Group (KBTG)',
    companyLogo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#137e40',
    location: 'Bangkok / Nonthaburi (KBTG Innovation Campus)',
    region: 'thai-bkk',
    roleCategory: 'product-design',
    experienceLevel: 'lead',
    languageReq: 'thai',
    employmentType: 'fulltime',
    workMode: 'hybrid',
    sourcePlatform: 'jobsdb',
    scope: 'thai',
    salary: {
      min: 120000,
      max: 190000,
      currency: 'THB',
      period: 'monthly',
      text: '฿120,000 - ฿190,000 / month'
    },
    techStack: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Design Ops'],
    postedAt: '7h ago',
    featured: false,
    urgent: false,
    applicantsCount: 28,
    sourceSnippet: 'JobsDB • K PLUS & MAKE by KBank Innovation Lab',
    sourceUrl: 'https://th.jobsdb.com/job/kbtg-product-design-lead',
    description: 'KBTG powers K PLUS, serving more than 21 million Thais every single day. We are looking for a Product Design Lead to guide our UX/UI design squads, elevate digital banking experiences, and pioneer AI-powered conversational banking interfaces.',
    responsibilities: [
      'Lead design strategy and user research for core financial products.',
      'Manage and expand our multi-brand design tokens and Figma component ecosystem.',
      'Champion accessibility (WCAG 2.2) and seamless micro-interactions.',
      'Coach a team of 6 UI/UX designers and coordinate with product owners and tech leads.'
    ],
    requirements: [
      '6+ years of UI/UX product design experience in consumer mobile apps or fintech.',
      'Impressive portfolio showcasing end-to-end design thinking and quantifiable impact.',
      'Fluent Thai speaker with good technical English comprehension.'
    ],
    benefits: [
      'Top-tier banking bonus (historically 4-7 months)',
      'Subsidized low-interest housing and personal loans for staff',
      'Modern campus with fitness center, rooftop sports court, and free shuttle vans',
      'Flexible WFH arrangement (2 days office)'
    ]
  },
  {
    id: 'job-10',
    title: 'Senior QA Automation Engineer (Cypress / Playwright / Go)',
    company: 'Shopee Thailand',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#ee4d2d',
    location: 'Bangkok, Thailand (Singha Complex, Asoke)',
    region: 'thai-bkk',
    roleCategory: 'qa-testing',
    experienceLevel: 'senior',
    languageReq: 'english-work',
    employmentType: 'fulltime',
    workMode: 'onsite',
    sourcePlatform: 'linkedin',
    scope: 'thai',
    salary: {
      min: 90000,
      max: 145000,
      currency: 'THB',
      period: 'monthly',
      text: '฿90,000 - ฿145,000 / month'
    },
    techStack: ['Playwright', 'Cypress', 'Python', 'Go', 'Docker', 'Jenkins', 'Postman'],
    postedAt: '8h ago',
    featured: false,
    urgent: false,
    applicantsCount: 37,
    sourceSnippet: 'LinkedIn Easy Apply • Sea Group / Shopee E-Commerce Logistics Squad',
    sourceUrl: 'https://www.linkedin.com/jobs/view/shopee-qa-automation',
    description: 'Shopee is the leading e-commerce platform in Southeast Asia and Taiwan. We are hiring a Senior QA Automation Engineer to build reliable end-to-end testing frameworks for our regional supply chain and payment gateway services.',
    responsibilities: [
      'Design, execute, and maintain automated UI and API regression test suites.',
      'Integrate automated tests into continuous integration (CI/CD) release cycles.',
      'Perform stress, load, and concurrency testing before mega shopping campaigns (9.9, 11.11, 12.12).',
      'Identify root causes of regressions and collaborate closely with developers.'
    ],
    requirements: [
      '4+ years in automated software testing with Playwright, Cypress, or Selenium.',
      'Proficiency in JavaScript/TypeScript, Python, or Go.',
      'Good working English proficiency to collaborate with regional engineering teams in Singapore and Shenzhen.'
    ],
    benefits: [
      'Competitive compensation with annual salary adjustments',
      'Shopee employee vouchers & seasonal shopping discounts',
      'Premium medical insurance including outpatient care',
      'Pantry stocked with unlimited snacks, drinks, and fresh fruit'
    ]
  },
  {
    id: 'job-11',
    title: 'Senior Outsource Golang Developer (Long-term Outsource Vendor)',
    company: 'FPT Software Thailand',
    companyLogo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#0284c7',
    location: 'Bangkok, Thailand (Huai Khwang / Hybrid)',
    region: 'thai-bkk',
    roleCategory: 'backend',
    experienceLevel: 'senior',
    languageReq: 'english-work',
    employmentType: 'outsource',
    workMode: 'hybrid',
    sourcePlatform: 'facebook',
    scope: 'thai',
    salary: {
      min: 100000,
      max: 140000,
      currency: 'THB',
      period: 'monthly',
      text: '฿100,000 - ฿140,000 / month (Outsource Contract)'
    },
    techStack: ['Golang', 'PostgreSQL', 'Docker', 'Kubernetes', 'RabbitMQ', 'REST API'],
    postedAt: '9h ago',
    featured: false,
    urgent: true,
    applicantsCount: 14,
    sourceSnippet: 'Facebook Group Tech Post • สัญญา Outsource 1 ปี ต่อสัญญาอัตโนมัติ สวัสดิการครบ',
    sourceUrl: 'https://facebook.com/groups/jobsforprogrammers/posts/991283',
    description: 'FPT Software Thailand เปิดรับ Senior Golang Developer ในรูปแบบ Outsource ร่วมงานกับทีมพัฒนาระบบ Cloud ERP ให้กับองค์กรพลังงานชั้นนำของไทย สัญญา 1 ปี (ต่อสัญญาทุกปี หรือโอกาสย้ายสังกัดลูกค้าโดยตรง)',
    responsibilities: [
      'พัฒนา RESTful และ gRPC API ด้วยภาษา Golang ตามความต้องการของลูกค้าองค์กร',
      'Optimize Database Queries บน PostgreSQL และจัดการ Caching ด้วย Redis',
      'ทำ Unit Test และ Integration Test ให้ครอบคลุม Code Coverage > 80%',
      'เข้าร่วมประชุม Daily Scrum และประสานงานกับ Solution Architect'
    ],
    requirements: [
      'มีประสบการณ์พัฒนา Golang ระดับ Production อย่างน้อย 3-4 ปี',
      'เข้าใจ Microservices Architecture และ Clean Architecture',
      'สามารถสื่อสารภาษาอังกฤษเบื้องต้นได้ในการอ่านเอกสาร Specification',
      'ทำงานแบบ Hybrid (เข้าออฟฟิศย่านห้วยขวาง 2 วันต่อสัปดาห์)'
    ],
    benefits: [
      'เงินเดือนตามตกลง จ่ายตรงเวลา',
      'มีประกันสุขภาพ ประกันอุบัติเหตุ และตรวจสุขภาพประจำปี',
      'มีวันลาพักร้อน 12 วันต่อปี',
      'โอกาสเทรนนิ่งคลาวด์และการสอบใบรับรอง AWS / GCP โดยบริษัทออกค่าใช้จ่ายให้'
    ]
  },
  {
    id: 'job-12',
    title: 'Growth & Performance Marketing Specialist (SEO & Paid Ads)',
    company: 'Central Tech',
    companyLogo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#dc2626',
    location: 'Bangkok, Thailand (Central Chidlom Offices)',
    region: 'thai-bkk',
    roleCategory: 'marketing-growth',
    experienceLevel: 'mid',
    languageReq: 'thai',
    employmentType: 'fulltime',
    workMode: 'hybrid',
    sourcePlatform: 'jobthai',
    scope: 'thai',
    salary: {
      min: 60000,
      max: 95000,
      currency: 'THB',
      period: 'monthly',
      text: '฿60,000 - ฿95,000 / month'
    },
    techStack: ['Google Ads', 'Meta Ads', 'SEO', 'Google Analytics 4', 'Ahrefs', 'SQL'],
    postedAt: '10h ago',
    featured: false,
    urgent: false,
    applicantsCount: 22,
    sourceSnippet: 'JobThai • Retail Giant Central Group Tech Arm',
    sourceUrl: 'https://www.jobthai.com/job/central-tech-growth-marketer',
    description: 'Central Tech drives the omnichannel digital future of Central Retail. We are looking for a Performance Marketer to scale user acquisition for the Central App through data-driven performance campaigns and technical SEO optimization.',
    responsibilities: [
      'Plan and execute high-ROI performance marketing campaigns on Google, Meta, and TikTok.',
      'Spearhead technical SEO audits, site speed optimization, and high-ranking content hubs.',
      'Analyze customer lifetime value (LTV) and CAC across marketing channels.',
      'Coordinate with product designers to run continuous conversion rate optimization (CRO) A/B tests.'
    ],
    requirements: [
      '3+ years in growth marketing or performance media buying in e-commerce.',
      'Proven hands-on track record managing multi-million Baht ad budgets with profitable ROAS.',
      'Solid experience with GA4, Looker Studio, and SEO analytics tools.',
      'Thai native speaker with good conversational English.'
    ],
    benefits: [
      'Staff shopping discount card (10-20% off across Central Group department stores & Tops)',
      'Provident fund + Health & Life insurance',
      'Flexible working hours & hybrid 2 days WFH',
      'Performance bonus and Central Group annual rewards'
    ]
  },
  {
    id: 'job-13',
    title: 'Senior Software Engineer - Distributed Systems (Tokyo Relocation / Visa)',
    company: 'Rakuten Symphony',
    companyLogo: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#bf0000',
    location: 'Tokyo, Japan (Crimson House HQ - Full Visa Sponsorship)',
    region: 'foreign-jp',
    roleCategory: 'backend',
    experienceLevel: 'senior',
    languageReq: 'english-fluent',
    employmentType: 'fulltime',
    workMode: 'hybrid',
    sourcePlatform: 'linkedin',
    scope: 'foreign',
    salary: {
      min: 9000000,
      max: 13500000,
      currency: 'JPY',
      period: 'yearly',
      text: '¥9,000,000 - ¥13,500,000 / year (approx. ฿2.1M - ฿3.2M THB)'
    },
    techStack: ['Go', 'C++', 'Kubernetes', 'Linux Kernel', 'gRPC', 'Docker'],
    postedAt: '11h ago',
    featured: true,
    urgent: false,
    applicantsCount: 54,
    sourceSnippet: 'LinkedIn Verified • Full Relocation Package + Japan Work Visa Provided',
    sourceUrl: 'https://www.linkedin.com/jobs/view/rakuten-distributed-systems',
    description: 'Rakuten Symphony is revolutionizing telecom networks through Open RAN cloud-native architectures. We are hiring Senior Distributed Systems Engineers to relocate to our Tokyo headquarters. English is our official internal language—Japanese is NOT mandatory!',
    responsibilities: [
      'Build edge cloud orchestration platforms supporting 5G telecom networks worldwide.',
      'Write ultra-low latency backend services in Golang and modern C++.',
      'Profile memory allocations, CPU caches, and Linux kernel networking (eBPF).',
      'Collaborate with global teams in Tokyo, San Diego, and Bengaluru.'
    ],
    requirements: [
      '5+ years of software engineering in systems programming (Go, C++, or Rust).',
      'Strong grasp of computer networking, concurrency primitives, and Linux system calls.',
      'Fluent English (Rakuten official company language is English).',
      'Willingness to relocate to Tokyo, Japan.'
    ],
    benefits: [
      'Full Japan Engineer Visa sponsorship for employee and dependents',
      'Relocation flight tickets + 1 month temporary furnished Tokyo apartment',
      'Free breakfast, lunch, and dinner 3 times daily at Rakuten Tokyo cafeteria',
      'Japanese language lessons provided during working hours',
      'Commuter train pass fully covered'
    ]
  },
  {
    id: 'job-14',
    title: 'Senior Full Stack Engineer (Fintech Payments - USD Remote)',
    company: 'Wise (formerly TransferWise)',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#9fe870',
    location: 'Singapore / Remote Thailand (APAC Hours)',
    region: 'foreign-sg',
    roleCategory: 'fullstack',
    experienceLevel: 'senior',
    languageReq: 'english-fluent',
    employmentType: 'fulltime',
    workMode: 'remote',
    sourcePlatform: 'remoteok',
    scope: 'foreign',
    salary: {
      min: 120000,
      max: 170000,
      currency: 'SGD',
      period: 'yearly',
      text: 'S$120,000 - S$170,000 / year (SGD)'
    },
    techStack: ['Java', 'Spring Boot', 'React', 'TypeScript', 'Kafka', 'PostgreSQL', 'AWS'],
    postedAt: '12h ago',
    featured: true,
    urgent: false,
    applicantsCount: 47,
    sourceSnippet: 'RemoteOK • International Cross-Border Fintech Giant • B2B / Remote Contract',
    sourceUrl: 'https://remoteok.com/remote-jobs/wise-fullstack-payments',
    description: 'Wise is building money without borders. Join our APAC payments team to expand instant cross-border transfers into Thailand, Singapore, and across ASEAN. You will take ownership of autonomous squads with zero bureaucracy.',
    responsibilities: [
      'Develop resilient payment processing pipelines integrated with local central bank rails (PromptPay, FAST).',
      'Build customer interfaces in React with a focus on crystal-clear pricing and accessibility.',
      'Ensure 99.999% availability for critical transaction routing and real-time fraud monitoring.',
      'Own systems end-to-end: from discovery, architecture, coding, testing to production monitoring.'
    ],
    requirements: [
      '5+ years building distributed web applications in Java/Kotlin or Go + React/TypeScript.',
      'Solid experience with financial transaction integrity, idempotency, and asynchronous event streams.',
      'Fluent English communication in an autonomous, outcome-driven culture.'
    ],
    benefits: [
      'Stock options package in Wise plc',
      '6-week paid sabbatical after 4 years of service',
      'Flexible annual learning & wellness budget',
      'Annual team missions in Europe or Singapore'
    ]
  },
  {
    id: 'job-15',
    title: 'Freelance UI/UX & Webflow Designer (Project-Based)',
    company: 'Bangkok Creative Digital Nomad Studio',
    companyLogo: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#ec4899',
    location: 'Chiang Mai, Thailand / Remote',
    region: 'thai-cnx',
    roleCategory: 'product-design',
    experienceLevel: 'mid',
    languageReq: 'bilingual-th-en',
    employmentType: 'freelance',
    workMode: 'remote',
    sourcePlatform: 'facebook',
    scope: 'thai',
    salary: {
      min: 45000,
      max: 85000,
      currency: 'THB',
      period: 'monthly',
      text: '฿45,000 - ฿85,000 / project'
    },
    techStack: ['Figma', 'Webflow', 'HTML/CSS', 'Spline 3D', 'Relume'],
    postedAt: '13h ago',
    featured: false,
    urgent: false,
    applicantsCount: 16,
    sourceSnippet: 'Facebook Community: Chiang Mai Digital Nomads & Freelance TH • จ่ายงวดตรง',
    sourceUrl: 'https://facebook.com/groups/chiangmaitech/posts/882194',
    description: 'สตูดิโอดิจิทัลในเชียงใหม่ รับสมัคร Freelance UI/UX Designer + Webflow Developer ร่วมงานโปรเจกต์ทำ Website Redesign ให้กับแบรนด์โรงแรมและสตาร์ทอัพต่างชาติ จ่ายเงินเป็นงวดตาม Milestone สามารถทำงานจากที่ไหนก็ได้ในไทย!',
    responsibilities: [
      'ออกแบบ UI/UX เว็บไซต์บน Figma ตาม Brand Guidelines',
      'ขึ้นงานเว็บไซต์บน Webflow พร้อมทำ Responsive และ CMS Collection',
      'สร้าง Micro-interactions และ Animation ด้วย CSS / GSAP / Spline 3D',
      'ส่งมอบงานตรงเวลาและประสานงานกับทีมการตลาด'
    ],
    requirements: [
      'มีผลงานเว็บไซต์จริงบน Webflow หรือ Figma Portfolio ที่โดดเด่น',
      'เข้าใจเรื่อง SEO, Responsive Design และ Clean Layout Structure',
      'สื่อสารภาษาไทยและอังกฤษได้พอสมควร'
    ],
    benefits: [
      'ทำงานแบบ Flexible Hours 100% Remote',
      'ค่าจ้างแบ่งจ่าย 3 งวดตามสัญญาชัดเจน (30% มัดจำ / 40% พรีวิว / 30% ส่งมอบ)',
      'โอกาสมีงานต่อโปรเจกต์ระยะยาวต่อเนื่อง'
    ]
  },
  {
    id: 'job-16',
    title: 'Lead Software Architect - Core Banking Modernization',
    company: 'SCB TechX',
    companyLogo: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#4f46e5',
    location: 'Bangkok, Thailand (SCB Park Plaza, Ratchayothin)',
    region: 'thai-bkk',
    roleCategory: 'fullstack',
    experienceLevel: 'lead',
    languageReq: 'bilingual-th-en',
    employmentType: 'fulltime',
    workMode: 'hybrid',
    sourcePlatform: 'linkedin',
    scope: 'thai',
    salary: {
      min: 190000,
      max: 290000,
      currency: 'THB',
      period: 'monthly',
      text: '฿190,000 - ฿290,000 / month'
    },
    techStack: ['Java', 'Golang', 'Spring Cloud', 'Kafka', 'Kubernetes', 'Enterprise Architecture'],
    postedAt: '14h ago',
    featured: true,
    urgent: false,
    applicantsCount: 11,
    sourceSnippet: 'LinkedIn Verified • Joint Venture of Siam Commercial Bank & Publicis Sapient',
    sourceUrl: 'https://www.linkedin.com/jobs/view/scb-techx-lead-architect',
    description: 'SCB TechX is the technology powerhouse behind Siam Commercial Bank. We are looking for a visionary Lead Software Architect to guide the next generation of cloud-native banking, instant settlement, and open finance APIs.',
    responsibilities: [
      'Define enterprise architecture blueprints for core transaction ledgers and microservices.',
      'Lead technology evaluations (Proof of Concepts) on emerging cloud, database, and event streaming platforms.',
      'Guide 15+ engineering squads on architectural patterns, API contracts, and security policies.',
      'Represent the technology division in executive steering committee presentations.'
    ],
    requirements: [
      '10+ years in software engineering with 4+ years in software architecture leadership.',
      'Extensive background in high-volume transaction systems, financial services, or e-commerce.',
      'Fluent Thai and strong professional English presentation skills.'
    ],
    benefits: [
      'Executive-tier compensation package and variable performance bonuses',
      'Provident fund matched up to 12%',
      'Executive health checkups and private health plan for family',
      'Flexible working model with luxury office amenities at SCB Park'
    ]
  },
  {
    id: 'job-17',
    title: 'Junior Mobile Developer (Flutter / Dart - Thai Remote)',
    company: 'Fintech Hub Chiang Mai',
    companyLogo: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#0284c7',
    location: 'Chiang Mai / Anywhere in Thailand (100% Remote)',
    region: 'thai-remote',
    roleCategory: 'mobile',
    experienceLevel: 'junior',
    languageReq: 'thai',
    employmentType: 'fulltime',
    workMode: 'remote',
    sourcePlatform: 'facebook',
    scope: 'thai',
    salary: {
      min: 35000,
      max: 52000,
      currency: 'THB',
      period: 'monthly',
      text: '฿35,000 - ฿52,000 / month'
    },
    techStack: ['Flutter', 'Dart', 'BLoC', 'REST API', 'Firebase', 'Git'],
    postedAt: '15h ago',
    featured: false,
    urgent: false,
    applicantsCount: 20,
    sourceSnippet: 'Facebook Group: Flutter Developer Thailand • รับ Junior / มีพี่เลี้ยงสอนงาน',
    sourceUrl: 'https://facebook.com/groups/flutterthailand/posts/77621',
    description: 'เปิดรับ Junior Flutter Developer เข้าร่วมทีมพัฒนาแอปพลิเคชันจัดการการเงินส่วนบุคคล มีรุ่นพี่ Senior คอยประกบและ Code Review ทำงาน Remote 100% จากที่ไหนก็ได้ในประเทศไทย มีเบิกค่าอินเทอร์เน็ตและอุปกรณ์ทำงานให้',
    responsibilities: [
      'พัฒนาฟีเจอร์ UI ด้วย Flutter และ State Management (BLoC หรือ Riverpod)',
      'เชื่อมต่อ RESTful API และ Firebase Cloud Messaging',
      'ทดสอบและแก้ไข Bug บนระบบ iOS และ Android',
      'เข้าร่วมประชุม Sprint และอัปเดตงานประจำวัน'
    ],
    requirements: [
      'มีประสบการณ์พัฒนาแอป Flutter 1-2 ปี หรือมีผลงานโปรเจกต์จบ / แอปพลิเคชันบน Store',
      'เข้าใจเรื่อง State Management และ Responsive Layout บนอุปกรณ์หน้าจอต่างๆ',
      'มีความรับผิดชอบ สามารถทำงานแบบ Remote ได้อย่างมีวินัย',
      'สื่อสารภาษาไทยได้อย่างคล่องแคล่ว'
    ],
    benefits: [
      'ทำงานจากที่บ้าน 100% (WFH)',
      'เบิกค่าอินเทอร์เน็ตรายเดือน ฿1,000',
      'มีงบซื้อหนังสือและคอร์สอบรมออนไลน์ปีละ ฿10,000',
      'ประกันสุขภาพและประกันอุบัติเหตุกลุ่ม'
    ]
  },
  {
    id: 'job-18',
    title: 'Senior Outsource DevOps Consultant (EEC Industrial Cloud Setup)',
    company: 'Accenture Thailand',
    companyLogo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#a855f7',
    location: 'Chonburi / Rayong / Hybrid Bangkok',
    region: 'thai-eec',
    roleCategory: 'cloud-devops',
    experienceLevel: 'senior',
    languageReq: 'english-work',
    employmentType: 'outsource',
    workMode: 'hybrid',
    sourcePlatform: 'jobsdb',
    scope: 'thai',
    salary: {
      min: 120000,
      max: 175000,
      currency: 'THB',
      period: 'monthly',
      text: '฿120,000 - ฿175,000 / month (1-Year Contract)'
    },
    techStack: ['AWS', 'Azure', 'Kubernetes', 'Terraform', 'Ansible', 'GitLab CI'],
    postedAt: '16h ago',
    featured: false,
    urgent: true,
    applicantsCount: 9,
    sourceSnippet: 'JobsDB Thailand • Smart Manufacturing EEC Transformation Program',
    sourceUrl: 'https://th.jobsdb.com/job/accenture-devops-eec',
    description: 'Accenture Thailand is staffing a specialized cloud consulting engagement for a major automotive and manufacturing consortium in the EEC (Eastern Economic Corridor). 1-year contract with competitive monthly rate and travel allowances.',
    responsibilities: [
      'Deploy and harden hybrid-cloud infrastructure linking on-premise factory IoT with AWS & Azure.',
      'Write reusable Terraform modules and automated infrastructure provisioning blueprints.',
      'Implement zero-trust security postures and network segregation for industrial automation.',
      'Train internal client engineers on container operations and monitoring.'
    ],
    requirements: [
      '5+ years in DevOps / Cloud infrastructure consulting.',
      'Certifications in AWS (Solutions Architect) or Azure (DevOps Expert) preferred.',
      'Ability to travel to EEC site (Chonburi/Rayong) 1-2 days per week; hybrid otherwise.',
      'Conversational English for stakeholder presentations.'
    ],
    benefits: [
      'High monthly contract compensation + site travel allowances',
      'Accenture technical learning portal access and certification reimbursement',
      'Comprehensive outpatient medical plan'
    ]
  },
  {
    id: 'job-19',
    title: 'Senior AI Engineer - Large Language Models & Agentic Systems',
    company: 'Stripe',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#635bff',
    location: 'Worldwide Remote (US / APAC Timezone Flexibility)',
    region: 'foreign-remote',
    roleCategory: 'ai-data',
    experienceLevel: 'senior',
    languageReq: 'english-fluent',
    employmentType: 'fulltime',
    workMode: 'remote',
    sourcePlatform: 'x',
    scope: 'foreign',
    salary: {
      min: 150000,
      max: 220000,
      currency: 'USD',
      period: 'yearly',
      text: '$150,000 - $220,000 / year (USD)'
    },
    techStack: ['Python', 'PyTorch', 'LLMs', 'OpenAI API', 'Ray', 'CUDA', 'Vector Embeddings'],
    postedAt: '1h ago',
    featured: true,
    urgent: false,
    applicantsCount: 89,
    sourceSnippet: 'Tweet from @stripe_jobs: Scaling Stripe Assistant and automated dispute AI. Fully remote opportunity!',
    sourceUrl: 'https://x.com/stripe_jobs/status/192837465',
    description: 'Stripe is an economic infrastructure platform for the internet. Millions of companies use Stripe to accept payments and manage their businesses. We are expanding our Applied AI team to develop autonomous agents for merchant onboarding, fraud mitigation, and dispute automation.',
    responsibilities: [
      'Build and productionize state-of-the-art LLM pipelines and autonomous agents.',
      'Develop evaluation harnesses, guardrails, and automated red-teaming benchmarks.',
      'Collaborate with payments infrastructure teams to safely integrate agent decisions.',
      'Optimize latency and token costs across multi-tenant inference clusters.'
    ],
    requirements: [
      '5+ years of software engineering with strong focus on machine learning and NLP.',
      'Deep practical experience with transformer architectures, fine-tuning, and prompt optimization.',
      'High autonomy, exceptional written English, and ability to thrive in remote teams.'
    ],
    benefits: [
      'Top-tier global USD compensation + Stripe equity RSUs',
      'Home office stipend ($2,000 initial setup + monthly internet allowance)',
      'Comprehensive health coverage for you and your family',
      'Generous parental leave and continuous learning fund'
    ]
  },
  {
    id: 'job-20',
    title: 'Software Engineer - Intern (Summer 2026 Batch - Backend / Web)',
    company: 'LINE MAN Wongnai',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#00c300',
    location: 'Bangkok, Thailand (Thong Lo)',
    region: 'thai-bkk',
    roleCategory: 'backend',
    experienceLevel: 'entry',
    languageReq: 'thai',
    employmentType: 'internship',
    workMode: 'hybrid',
    sourcePlatform: 'jobsdb',
    scope: 'thai',
    salary: {
      min: 15000,
      max: 25000,
      currency: 'THB',
      period: 'monthly',
      text: '฿15,000 - ฿25,000 / month (Paid Internship)'
    },
    techStack: ['Golang', 'Node.js', 'MySQL', 'Git', 'Docker'],
    postedAt: '18h ago',
    featured: false,
    urgent: false,
    applicantsCount: 75,
    sourceSnippet: 'JobsDB • LINE MAN Wongnai Junior Developer Internship Batch 2026',
    sourceUrl: 'https://th.jobsdb.com/job/lineman-internship-2026',
    description: 'โครงการฝึกงานพัฒนาซอฟต์แวร์สำหรับนิสิต/นักศึกษาที่กำลังศึกษาอยู่ชั้นปีที่ 3-4 หรือผู้ที่กำลังเปลี่ยนสายงาน เปิดโอกาสให้ได้ลงมือเขียนโค้ดจริงบนระบบที่มีผู้ใช้งานหลายล้านคน พร้อมมีพี่เลี้ยงระดับ Senior ดูแลอย่างใกล้ชิด',
    responsibilities: [
      'ร่วมพัฒนาฟีเจอร์และแก้ไข Bug บนระบบ Backend ร่วมกับทีมงานจริง',
      'เขียนโค้ดตามมาตรฐาน Clean Code และทำ Unit Testing',
      'เรียนรู้การใช้งาน Docker, CI/CD และระบบ Cloud Microservices',
      'นำเสนอโปรเจกต์การฝึกงาน (Demo Day) ในวันสุดท้าย'
    ],
    requirements: [
      'กำลังศึกษาในสาขาวิทยาการคอมพิวเตอร์ วิศวกรรมคอมพิวเตอร์ หรือสาขาที่เกี่ยวข้อง',
      'มีความรู้พื้นฐานด้าน Data Structures, Algorithms และการเขียนโปรแกรม (Golang, Python, JS, etc.)',
      'มีความกระตือรือร้น ชอบเรียนรู้สิ่งใหม่ๆ และทำงานร่วมกับผู้อื่นได้ดี'
    ],
    benefits: [
      'เบี้ยเลี้ยงการฝึกงานรายเดือน',
      'คูปองส่วนลดสั่งอาหารบนแอป LINE MAN ฟรี',
      'โอกาสได้รับการบรรจุเป็นพนักงานประจำทันทีหลังสำเร็จการศึกษา',
      'อุปกรณ์โน้ตบุ๊กสำหรับการทำงานตลอดระยะเวลาฝึกงาน'
    ]
  },
  {
    id: 'job-21',
    title: 'Lead Cybersecurity Architect / CISO Advisor',
    company: 'True Digital Group',
    companyLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#ef4444',
    location: 'Bangkok, Thailand (True Digital Park, BTS Punnawithi)',
    region: 'thai-bkk',
    roleCategory: 'cybersecurity',
    experienceLevel: 'lead',
    languageReq: 'bilingual-th-en',
    employmentType: 'fulltime',
    workMode: 'hybrid',
    sourcePlatform: 'linkedin',
    scope: 'thai',
    salary: {
      min: 170000,
      max: 270000,
      currency: 'THB',
      period: 'monthly',
      text: '฿170,000 - ฿270,000 / month'
    },
    techStack: ['Zero Trust', 'SOC', 'SIEM', 'Cloud Security', 'ISO 27001', 'Threat Hunting'],
    postedAt: '19h ago',
    featured: false,
    urgent: false,
    applicantsCount: 10,
    sourceSnippet: 'LinkedIn Verified • True Digital Park Innovation Campus',
    sourceUrl: 'https://www.linkedin.com/jobs/view/true-digital-security-lead',
    description: 'True Digital Group provides digital solutions across telecom, healthtech, and media. We are seeking an accomplished Lead Cybersecurity Architect to orchestrate defense-in-depth, zero-trust cloud architectures, and incident response readiness.',
    responsibilities: [
      'Formulate cybersecurity strategy across digital healthcare, OTT streaming, and IoT platforms.',
      'Lead red team exercises, penetration test audits, and third-party vendor risk assessments.',
      'Ensure compliance with PDPA (Thailand Personal Data Protection Act) and international standards.',
      'Coordinate with executive leadership on enterprise security governance.'
    ],
    requirements: [
      '8+ years in cybersecurity engineering and governance.',
      'Certifications such as CISSP, CISM, or CCSP strongly preferred.',
      'Fluency in Thai and business-level English proficiency.'
    ],
    benefits: [
      'Competitive corporate compensation & executive bonus',
      'Free True 5G mobile package and TrueVisions subscription',
      'State-of-the-art office facilities at True Digital Park with fitness & pool',
      'Comprehensive family medical coverage'
    ]
  },
  {
    id: 'job-22',
    title: 'Senior Frontend Developer (Remote Thailand / Phuket / Bangkok)',
    company: 'Canva',
    companyLogo: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#00c4cc',
    location: 'Remote Thailand (Phuket, Chiang Mai, or Bangkok)',
    region: 'thai-phuket',
    roleCategory: 'frontend',
    experienceLevel: 'senior',
    languageReq: 'english-fluent',
    employmentType: 'fulltime',
    workMode: 'remote',
    sourcePlatform: 'linkedin',
    scope: 'foreign',
    salary: {
      min: 140000,
      max: 200000,
      currency: 'THB',
      period: 'monthly',
      text: '฿140,000 - ฿200,000 / month'
    },
    techStack: ['TypeScript', 'React', 'WebGL', 'Canvas API', 'RxJS', 'WebAssembly'],
    postedAt: '20h ago',
    featured: true,
    urgent: false,
    applicantsCount: 63,
    sourceSnippet: 'LinkedIn Hot Job • Canva International Team • Work from Anywhere in Thailand',
    sourceUrl: 'https://www.linkedin.com/jobs/view/canva-senior-frontend',
    description: 'Canva makes visual communication effortless for over 180 million users. We are hiring a Senior Frontend Engineer to work on our web-based graphic editor engine. You can work 100% remotely from Phuket, Bangkok, or any beach in Thailand!',
    responsibilities: [
      'Engineer high-performance graphics rendering pipelines using HTML5 Canvas, WebGL, and WebAssembly.',
      'Build intuitive, buttery-smooth drag-and-drop design tools in TypeScript and React.',
      'Collaborate asynchronously with design squads in Sydney and around the globe.',
      'Benchmark and minimize frame drops and memory consumption during complex vector manipulations.'
    ],
    requirements: [
      '5+ years of in-depth frontend experience with modern TypeScript and reactive architectures.',
      'Prior exposure to graphics programming, WebGL, Canvas 2D, or rich-text editors is a big plus.',
      'Fluent spoken and written English.'
    ],
    benefits: [
      '100% Remote flexibility in Thailand with local entity benefits',
      'Generous equity plan (Canva employee options)',
      'Annual wellness allowance and home office gear stipend',
      'Paid time off: 25 days annual leave + company-wide recharge days'
    ]
  },
  {
    id: 'job-23',
    title: 'Senior Data Engineer (Snowflake / dbt / Databricks)',
    company: 'Central Retail Digital',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#b91c1c',
    location: 'Bangkok, Thailand (Ploenchit)',
    region: 'thai-bkk',
    roleCategory: 'ai-data',
    experienceLevel: 'senior',
    languageReq: 'bilingual-th-en',
    employmentType: 'fulltime',
    workMode: 'hybrid',
    sourcePlatform: 'jobsdb',
    scope: 'thai',
    salary: {
      min: 110000,
      max: 165000,
      currency: 'THB',
      period: 'monthly',
      text: '฿110,000 - ฿165,000 / month'
    },
    techStack: ['Python', 'SQL', 'Snowflake', 'dbt', 'Databricks', 'Airflow', 'Spark'],
    postedAt: '21h ago',
    featured: false,
    urgent: false,
    applicantsCount: 21,
    sourceSnippet: 'JobsDB • Big Data & Customer 360 Analytics Platform',
    sourceUrl: 'https://th.jobsdb.com/job/central-senior-data-engineer',
    description: 'Central Retail is Southeast Asia’s retail leader. We operate massive real-time omnichannel data pipelines connecting millions of offline store transactions and e-commerce shopping baskets into our Snowflake and Databricks lakehouse.',
    responsibilities: [
      'Architect robust ELT pipelines using dbt, Python, and Apache Airflow.',
      'Model high-scale data warehouses powering BI dashboards and personalized recommendation engines.',
      'Implement data governance, automated data quality tests, and schema evolution rules.',
      'Optimize Snowflake compute credit consumption and query performance.'
    ],
    requirements: [
      '4+ years building production data pipelines and analytics engineering.',
      'Mastery of advanced SQL and modern data stack (Snowflake, dbt, Databricks).',
      'Good communication in Thai and English for collaboration with business analysts.'
    ],
    benefits: [
      'Competitive salary + annual group bonus',
      'Central employee discount privileges',
      'Provident fund up to 10%',
      'Hybrid work: 2-3 days WFH'
    ]
  },
  {
    id: 'job-24',
    title: 'Outsource Fullstack React & Node.js Developer (Urgent Project)',
    company: 'Siam Dev Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#2563eb',
    location: 'Bangkok, Thailand / Remote',
    region: 'thai-bkk',
    roleCategory: 'fullstack',
    experienceLevel: 'mid',
    languageReq: 'thai',
    employmentType: 'outsource',
    workMode: 'remote',
    sourcePlatform: 'facebook',
    scope: 'thai',
    salary: {
      min: 75000,
      max: 105000,
      currency: 'THB',
      period: 'monthly',
      text: '฿75,000 - ฿105,000 / month (Outsource 6-12 Months)'
    },
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Docker', 'REST API'],
    postedAt: '22h ago',
    featured: false,
    urgent: true,
    applicantsCount: 17,
    sourceSnippet: 'โพสต์ด่วน Facebook สมาคมโปรแกรมเมอร์ไทย • เริ่มงานได้ทันที สัญญา Outsource 6 เดือน+',
    sourceUrl: 'https://facebook.com/groups/thaiprogrammer/posts/1102948',
    description: 'เปิดรับด่วน! Fullstack Developer (React + Node.js) ประจำโปรเจกต์ลูกค้าระบบบริหารจัดการคลังสินค้าและ E-Commerce สัญญา Outsource 6 เดือน (มีต่อสัญญา) ทำงาน Remote เป็นหลัก เข้าออฟฟิศเดือนละ 1-2 ครั้งเพื่อประชุมใหญ่',
    responsibilities: [
      'พัฒนา Web Application ส่วน Frontend ด้วย React และ Backend ด้วย Node.js / Express',
      'ออกแบบ Database Schema บน MongoDB / PostgreSQL',
      'เขียน API Documentation บน Postman / Swagger',
      'แก้ไข Issue และประสานงานกับทีม QA'
    ],
    requirements: [
      'มีประสบการณ์พัฒนา Fullstack (React + Node) อย่างน้อย 3 ปี',
      'เข้าใจเรื่อง Authentication (JWT), State Management, และ RESTful APIs',
      'สื่อสารภาษาไทยได้ดีเยี่ยม พร้อมเริ่มงานได้ทันที'
    ],
    benefits: [
      'ค่าจ้างจ่ายตรงเวลาทุกวันที่ 28 ของเดือน',
      'ทำงานจากที่บ้าน (Remote)',
      'มีประกันอุบัติเหตุให้ตลอดอายุสัญญา'
    ]
  },
  {
    id: 'job-25',
    title: 'Senior iOS Engineer (Swift / SwiftUI / Audio Streaming)',
    company: 'Spotify (Global Remote - Asia Timezone)',
    companyLogo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#1ed760',
    location: 'Worldwide Remote (Thailand / Singapore base)',
    region: 'foreign-remote',
    roleCategory: 'mobile',
    experienceLevel: 'senior',
    languageReq: 'english-fluent',
    employmentType: 'fulltime',
    workMode: 'remote',
    sourcePlatform: 'remoteok',
    scope: 'foreign',
    salary: {
      min: 130000,
      max: 180000,
      currency: 'USD',
      period: 'yearly',
      text: '$130,000 - $180,000 / year (USD)'
    },
    techStack: ['Swift', 'SwiftUI', 'Combine', 'CoreAudio', 'CI/CD', 'Unit Testing'],
    postedAt: '1d ago',
    featured: true,
    urgent: false,
    applicantsCount: 52,
    sourceSnippet: 'RemoteOK • Spotify Work From Anywhere Program • USD Contractor / EOR',
    sourceUrl: 'https://remoteok.com/remote-jobs/spotify-senior-ios',
    description: 'At Spotify, our mission is to unlock the potential of human creativity. We are hiring a Senior iOS Engineer to craft delightful, low-latency audio listening experiences, offline synchronization, and lyrics integration on iOS and watchOS.',
    responsibilities: [
      'Build polished native iOS experiences using modern Swift, SwiftUI, and Combine.',
      'Optimize audio caching, network buffering, and battery consumption on mobile devices.',
      'Participate in company-wide iOS guild architecture discussions.',
      'Contribute to open-source developer tooling and modular component libraries.'
    ],
    requirements: [
      '5+ years building native iOS apps in Swift shipped to the App Store.',
      'Deep knowledge of memory management, concurrency (async/await), and architectural patterns (MVVM/TCA).',
      'Fluent in written and spoken English.'
    ],
    benefits: [
      'Spotify "Work From Anywhere" policy',
      'Employee stock purchase plan and RSUs',
      'Generous parental leave and comprehensive international wellness coverage',
      'Home office ergonomic stipend + Spotify Premium for life'
    ]
  },
  {
    id: 'job-26',
    title: 'Japanese Speaking Bridge SE / Tech Project Manager',
    company: 'LINE Fukuoka / LINE Thailand',
    companyLogo: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#00c300',
    location: 'Bangkok, Thailand (Gaysorn Tower, Chidlom)',
    region: 'thai-bkk',
    roleCategory: 'fullstack',
    experienceLevel: 'senior',
    languageReq: 'japanese',
    employmentType: 'fulltime',
    workMode: 'hybrid',
    sourcePlatform: 'jobsdb',
    scope: 'thai',
    salary: {
      min: 120000,
      max: 180000,
      currency: 'THB',
      period: 'monthly',
      text: '฿120,000 - ฿180,000 / month'
    },
    techStack: ['Project Management', 'Agile', 'Jira', 'Japanese N1', 'System Architecture'],
    postedAt: '1d ago',
    featured: false,
    urgent: false,
    applicantsCount: 8,
    sourceSnippet: 'JobsDB • Bridge Engineer connecting Tokyo, Fukuoka & Bangkok Engineering Hubs',
    sourceUrl: 'https://th.jobsdb.com/job/line-bridge-se-japanese',
    description: 'LINE connects over 200 million people across Japan, Thailand, and Taiwan. We are seeking a Bridge Software Engineer or Technical Project Manager with fluent Japanese (JLPT N1) to harmonize cross-border engineering initiatives between our Bangkok and Japan offices.',
    responsibilities: [
      'Facilitate technical discussions and align architecture requirements between Japan and Thai engineers.',
      'Translate technical documentation, system specifications, and API blueprints (Japanese <-> Thai/English).',
      'Manage sprint milestones, resolve cross-team blockers, and coordinate release deployments.',
      'Promote collaborative engineering culture and knowledge sharing across borders.'
    ],
    requirements: [
      'JLPT N1 certified with native or near-native business Japanese proficiency.',
      '4+ years background as a Software Engineer, Tech Lead, or Bridge SE.',
      'Solid grasp of modern web/mobile architectures and Agile/Scrum practices.',
      'Excellent interpersonal diplomacy and cross-cultural communication.'
    ],
    benefits: [
      'High-tier compensation and generous annual bonuses',
      'Language allowance and continuous career development funds',
      'Hybrid working style (2-3 days remote per week)',
      'Office perks: massage room, barista bar, and breakfast catered'
    ]
  },
  {
    id: 'job-27',
    title: 'Founding DevRel & Technical Content Creator (Bilingual TH / EN)',
    company: 'Siam Web3 Labs',
    companyLogo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#8b5cf6',
    location: 'Bangkok, Thailand / Hybrid',
    region: 'thai-bkk',
    roleCategory: 'marketing-growth',
    experienceLevel: 'junior',
    languageReq: 'bilingual-th-en',
    employmentType: 'fulltime',
    workMode: 'hybrid',
    sourcePlatform: 'x',
    scope: 'thai',
    salary: {
      min: 50000,
      max: 80000,
      currency: 'THB',
      period: 'monthly',
      text: '฿50,000 - ฿80,000 / month + Token Grants'
    },
    techStack: ['Technical Writing', 'YouTube', 'X / Twitter', 'Solidity', 'React', 'DevRel'],
    postedAt: '1d ago',
    featured: false,
    urgent: false,
    applicantsCount: 14,
    sourceSnippet: 'Tweet from @siam_web3: Looking for a DevRel / Creator to help Thai devs build on Web3!',
    sourceUrl: 'https://x.com/siam_web3/status/193029482',
    description: 'We are expanding the Thai developer community building decentralized apps and smart contracts. We are hiring a Developer Relations & Technical Content Creator who loves writing code tutorials, hosting workshops, and engaging with devs on X, Discord, and YouTube.',
    responsibilities: [
      'Produce high-quality developer tutorials, sample code repos, and walkthrough videos in Thai & English.',
      'Organize developer hackathons, meetups, and university outreach sessions across Thailand.',
      'Act as the primary bridge between developer feedback and our core protocol engineering team.',
      'Manage developer social channels and Discord technical support.'
    ],
    requirements: [
      '1-3 years of developer advocacy, software engineering, or technical content creation.',
      'Able to code basic applications in JavaScript/TypeScript or Python.',
      'Charismatic speaker in Thai with strong written English capability.',
      'Enthusiastic about open source, AI, or Web3 technologies.'
    ],
    benefits: [
      'Attractive salary + token grants allocation',
      'Sponsored international travel to global tech conferences (Devcon, Token2049, ETHGlobal)',
      'High-spec recording equipment and MacBook Pro provided',
      'Flexible working hours and hybrid schedule'
    ]
  },
  {
    id: 'job-28',
    title: 'Senior Solutions Architect - Cloud Modernization (Thoughtworks TH)',
    company: 'Thoughtworks Thailand',
    companyLogo: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#f97316',
    location: 'Bangkok, Thailand (Sathorn Square)',
    region: 'thai-bkk',
    roleCategory: 'cloud-devops',
    experienceLevel: 'senior',
    languageReq: 'bilingual-th-en',
    employmentType: 'fulltime',
    workMode: 'hybrid',
    sourcePlatform: 'linkedin',
    scope: 'thai',
    salary: {
      min: 150000,
      max: 230000,
      currency: 'THB',
      period: 'monthly',
      text: '฿150,000 - ฿230,000 / month'
    },
    techStack: ['Microservices', 'Kubernetes', 'AWS', 'GCP', 'TDD', 'Pair Programming', 'CI/CD'],
    postedAt: '1d ago',
    featured: false,
    urgent: false,
    applicantsCount: 29,
    sourceSnippet: 'LinkedIn Verified • Global Technology Consultancy Leader',
    sourceUrl: 'https://www.linkedin.com/jobs/view/thoughtworks-solutions-architect',
    description: 'Thoughtworks is a leading global technology consultancy that integrates strategy, design, and software engineering to enable enterprise innovation. We are hiring a Senior Solutions Architect in Bangkok to pioneer modern digital platforms.',
    responsibilities: [
      'Lead evolutionary architecture design for enterprise digital transformations.',
      'Champion engineering excellence: Test-Driven Development (TDD), continuous delivery, and pair programming.',
      'Advise C-level executives on technology strategy, cloud adoption, and organizational restructuring.',
      'Cultivate an inclusive engineering community through tech talks and open-source contributions.'
    ],
    requirements: [
      '7+ years in enterprise software development and distributed architecture.',
      'Deep mastery of cloud platforms (AWS/GCP), microservices patterns, and DevOps best practices.',
      'Bilingual proficiency in Thai and English for local and global client engagements.'
    ],
    benefits: [
      'Generous professional development budget and book allowances',
      'Comprehensive healthcare for employee and family with outpatient coverage',
      'Generous parental leave and sabbatical options',
      'Collaborative culture with no individual billable hours targets'
    ]
  },
  {
    id: 'job-29',
    title: 'Senior Outsource Full Stack Engineer (Fintech Core - 1 Year Renewable)',
    company: 'TechOutsource Asia',
    companyLogo: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#059669',
    location: 'Bangkok, Thailand (BTS Ari / Hybrid 3 days WFH)',
    region: 'thai-bkk',
    roleCategory: 'fullstack',
    experienceLevel: 'senior',
    languageReq: 'thai',
    employmentType: 'outsource',
    workMode: 'hybrid',
    sourcePlatform: 'facebook',
    scope: 'thai',
    salary: {
      min: 115000,
      max: 160000,
      currency: 'THB',
      period: 'monthly',
      text: '฿115,000 - ฿160,000 / month (Outsource Contract)'
    },
    techStack: ['Node.js', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'Redis'],
    postedAt: '1d ago',
    featured: false,
    urgent: true,
    applicantsCount: 16,
    sourceSnippet: 'Facebook Group โพสต์หางานไอที & โปรแกรมเมอร์ • เริ่มงานได้ทันที สัญญา 12 เดือน การันตีโบนัสจบโปรเจกต์',
    sourceUrl: 'https://facebook.com/groups/thaidevjobs/posts/448291',
    description: 'รับด่วน! Senior Full Stack Engineer ในสังกัด Outsource เพื่อประจำโปรเจกต์พัฒนาระบบ Payment Gateway & Core Banking ของธนาคารพาณิชย์ชั้นนำ สัญญา 12 เดือน สามารถต่อสัญญาได้เรื่อยๆ หรือมีโอกาสโอนย้ายเป็นพนักงานประจำของธนาคาร',
    responsibilities: [
      'พัฒนาและปรับปรุงระบบ Core Payment Microservices ด้วย Node.js และ TypeScript',
      'พัฒนา Web Portal สำหรับ Merchant Dashboard ด้วย React & Next.js',
      'ทำ Unit Test และ Integration Test ตามมาตรฐาน Bank Compliance',
      'ประสานงานกับทีม System Analyst และ Tester อย่างใกล้ชิด'
    ],
    requirements: [
      'ประสบการณ์ Full Stack Development อย่างน้อย 4 ปี',
      'เชี่ยวชาญ Node.js (NestJS / Express) และ React / TypeScript',
      'เข้าใจเรื่อง Relational Database (PostgreSQL / MySQL) และ Transaction Concurrency',
      'สามารถเริ่มงานได้ภายใน 30 วัน'
    ],
    benefits: [
      'เงินเดือนสูง จ่ายตรงทุกสิ้นเดือน',
      'ประกันสุขภาพกลุ่ม OPD/IPD + ประกันอุบัติเหตุ',
      'โบนัสจบโปรเจกต์ (Completion Bonus 1 เดือน)',
      'วันหยุดพักร้อน 12 วันต่อปี'
    ]
  },
  {
    id: 'job-30',
    title: 'Staff Infrastructure / SRE (USD Global Remote)',
    company: 'Automattic (WordPress.com / WooCommerce)',
    companyLogo: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#0073aa',
    location: 'Worldwide 100% Remote (Anywhere in Thailand or Global)',
    region: 'foreign-remote',
    roleCategory: 'cloud-devops',
    experienceLevel: 'lead',
    languageReq: 'english-fluent',
    employmentType: 'fulltime',
    workMode: 'remote',
    sourcePlatform: 'remoteok',
    scope: 'foreign',
    salary: {
      min: 140000,
      max: 195000,
      currency: 'USD',
      period: 'yearly',
      text: '$140,000 - $195,000 / year (USD)'
    },
    techStack: ['Kubernetes', 'Linux', 'Go', 'Python', 'Terraform', 'Puppet', 'Kafka'],
    postedAt: '1d ago',
    featured: true,
    urgent: false,
    applicantsCount: 44,
    sourceSnippet: 'RemoteOK • Pioneer of Remote Work Since 2005 • Work From Any Country',
    sourceUrl: 'https://remoteok.com/remote-jobs/automattic-staff-sre',
    description: 'Automattic powers over 43% of the web through WordPress and WooCommerce. We are seeking a Staff Site Reliability Engineer to keep millions of web pages accessible and lightning-fast around the clock, distributed across 90+ countries.',
    responsibilities: [
      'Scale global edge network handling over 25 billion page views each month.',
      'Automate datacenter operations, BGP routing, and Kubernetes cluster orchestration.',
      'Mentor senior engineers in incident triage and post-incident learning.',
      'Lead cross-organizational initiatives for latency reduction and disaster resiliency.'
    ],
    requirements: [
      '8+ years in Systems Engineering, SRE, or Linux Infrastructure at high scale.',
      'Deep fluency in systems automation, networking, and kernel tuning.',
      'Strong async written English capability.'
    ],
    benefits: [
      'Open vacation policy (no set number of days)',
      'Home office setup and annual coworking allowance',
      'Paid company retreats to exotic locations once a year',
      'Life coaching, wellness budget, and hardware upgrades every 2 years'
    ]
  },
  {
    id: 'job-31',
    title: 'Junior QA Manual & Automation Tester (Thai Speaker)',
    company: 'Bitkub Online',
    companyLogo: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#00dc82',
    location: 'Bangkok, Thailand (Sathorn)',
    region: 'thai-bkk',
    roleCategory: 'qa-testing',
    experienceLevel: 'junior',
    languageReq: 'thai',
    employmentType: 'fulltime',
    workMode: 'hybrid',
    sourcePlatform: 'jobthai',
    scope: 'thai',
    salary: {
      min: 36000,
      max: 52000,
      currency: 'THB',
      period: 'monthly',
      text: '฿36,000 - ฿52,000 / month'
    },
    techStack: ['Postman', 'Robot Framework', 'Python', 'Jira', 'SQL', 'Git'],
    postedAt: '2d ago',
    featured: false,
    urgent: false,
    applicantsCount: 39,
    sourceSnippet: 'JobThai Hot Pick • Bitkub Exchange Quality Engineering Team',
    sourceUrl: 'https://www.jobthai.com/job/bitkub-junior-qa-tester',
    description: 'Bitkub Online กำลังมองหา Junior QA Engineer มาร่วมทดสอบระบบเทรดคริปโทเคอร์เรนซีระดับประเทศ เพื่อให้มั่นใจว่าการฝาก ถอน และจับคู่ออร์เดอร์ทำงานได้อย่างถูกต้อง แม่นยำ และปลอดภัย',
    responsibilities: [
      'ออกแบบ Test Case, Test Scenario จาก Requirement Spec',
      'ทำการทดสอบ Functional Testing, Regression Testing และ API Testing ด้วย Postman',
      'เริ่มเขียน Automated Script ด้วย Robot Framework / Python เบื้องต้น',
      'บันทึกและติดตาม Defect บน Jira ประสานงานกับ Developer'
    ],
    requirements: [
      'ประสบการณ์ด้าน Software Testing 1 - 2 ปี (ยินดีรับเด็กจบใหม่ที่มีผลงาน/โปรเจกต์)',
      'เข้าใจขั้นตอน SDLC, STLC และมีความละเอียดรอบคอบสูง',
      'สื่อสารภาษาไทยได้ดีเยี่ยม'
    ],
    benefits: [
      'กองทุนสำรองเลี้ยงชีพและประกันสุขภาพกลุ่ม',
      'โบนัสประจำปีตามผลประกอบการ',
      'อาหารกลางวันและของว่างฟรีที่ออฟฟิศ',
      'ทำงานแบบ Hybrid สัปดาห์ละ 2-3 วัน'
    ]
  },
  {
    id: 'job-32',
    title: 'Senior Product Manager - SuperApp Ecosystem',
    company: 'Grab Thailand',
    companyLogo: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#00b14f',
    location: 'Bangkok, Thailand (Thanapoom Tower, New Petchburi)',
    region: 'thai-bkk',
    roleCategory: 'product-design',
    experienceLevel: 'senior',
    languageReq: 'bilingual-th-en',
    employmentType: 'fulltime',
    workMode: 'hybrid',
    sourcePlatform: 'linkedin',
    scope: 'thai',
    salary: {
      min: 130000,
      max: 190000,
      currency: 'THB',
      period: 'monthly',
      text: '฿130,000 - ฿190,000 / month'
    },
    techStack: ['Product Management', 'Data Analytics', 'A/B Testing', 'SQL', 'Figma', 'Agile'],
    postedAt: '2d ago',
    featured: false,
    urgent: false,
    applicantsCount: 35,
    sourceSnippet: 'LinkedIn Easy Apply • Grab Financial Services & Deliveries',
    sourceUrl: 'https://www.linkedin.com/jobs/view/grab-senior-product-manager',
    description: 'Grab is Southeast Asia’s leading superapp. We are hiring a Senior Product Manager in Bangkok to lead consumer growth, loyalty programs, and localized merchant fintech tools across Thailand.',
    responsibilities: [
      'Formulate and execute the product roadmap for Thailand’s high-frequency users.',
      'Work alongside data scientists to optimize dynamic pricing, driver dispatching, and checkout conversion.',
      'Coordinate with regional product leadership in Singapore and local operations teams.',
      'Conduct qualitative user interviews and quantitative data experiments.'
    ],
    requirements: [
      '4+ years in product management with experience in consumer internet apps.',
      'Proficiency with product metrics, SQL queries, and experimentation methodologies.',
      'Bilingual fluency in Thai and English.'
    ],
    benefits: [
      'Grab transport & food delivery staff allowance',
      'Stock purchase plan and performance bonus',
      'Premium global medical insurance for staff and family',
      'Hybrid work model (3 days office / 2 days WFH)'
    ]
  },
  {
    id: 'job-33',
    title: 'Bilingual Japanese IT Helpdesk & Infrastructure Support',
    company: 'SCSK Thailand (Sumitomo Group)',
    companyLogo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#0369a1',
    location: 'Bangkok, Thailand (Asoke)',
    region: 'thai-bkk',
    roleCategory: 'fullstack',
    experienceLevel: 'junior',
    languageReq: 'japanese',
    employmentType: 'fulltime',
    workMode: 'onsite',
    sourcePlatform: 'jobthai',
    scope: 'thai',
    salary: {
      min: 50000,
      max: 75000,
      currency: 'THB',
      period: 'monthly',
      text: '฿50,000 - ฿75,000 / month (inc. JP Allowance)'
    },
    techStack: ['Windows Server', 'Active Directory', 'Networking', 'Japanese N3/N2', 'ITIL'],
    postedAt: '2d ago',
    featured: false,
    urgent: false,
    applicantsCount: 15,
    sourceSnippet: 'JobThai • Japanese IT Solutions Leader • JLPT Allowance included',
    sourceUrl: 'https://www.jobthai.com/job/scsk-japanese-helpdesk',
    description: 'SCSK Thailand เป็นบริษัทในเครือ Sumitomo Corporation ให้บริการโซลูชัน IT แก่บริษัทสัญชาติญี่ปุ่นในไทย เปิดรับสมัครเจ้าหน้าที่ IT Support / Helpdesk สื่อสารภาษาญี่ปุ่น (JLPT N3 หรือ N2) เพื่อดูแลระบบและประสานงานกับผู้บริหารชาวญี่ปุ่น',
    responsibilities: [
      'ดูแลแก้ปัญหา IT Support (Hardware, Software, Network) ให้แก่พนักงานและลูกค้าชาวญี่ปุ่น',
      'ประสานงานและแปลเอกสารทางเทคนิคระหว่างวิศวกรไทยและทีมงานที่ญี่ปุ่น',
      'บริหารจัดการ User Account บน Active Directory และ Microsoft 365',
      'สนับสนุนการติดตั้งและตั้งค่าคอมพิวเตอร์ใหม่อย่างเป็นระบบ'
    ],
    requirements: [
      'ความสามารถภาษาญี่ปุ่นระดับ JLPT N3 หรือ N2 (สามารถสื่อสารทางธุรกิจได้)',
      'ประสบการณ์ด้าน IT Support / Helpdesk อย่างน้อย 1-2 ปี',
      'มีใจรักงานบริการ และมนุษยสัมพันธ์ดี'
    ],
    benefits: [
      'ค่าภาษาญี่ปุ่นประจำเดือน (N3: ฿8,000 / N2: ฿15,000 / N1: ฿25,000)',
      'โบนัสประจำปีเฉลี่ย 3-4 เดือน',
      'ประกันสุขภาพและประกันชีวิตกลุ่ม',
      'ตรวจสุขภาพประจำปี'
    ]
  },
  {
    id: 'job-34',
    title: 'Senior Backend Engineer (Go / Rust / Microservices - Singapore Relocation)',
    company: 'Sea Limited / Garena HQ',
    companyLogo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#ea580c',
    location: 'Singapore (Fusionopolis HQ - Relocation Provided)',
    region: 'foreign-sg',
    roleCategory: 'backend',
    experienceLevel: 'senior',
    languageReq: 'english-fluent',
    employmentType: 'fulltime',
    workMode: 'onsite',
    sourcePlatform: 'linkedin',
    scope: 'foreign',
    salary: {
      min: 110000,
      max: 160000,
      currency: 'SGD',
      period: 'yearly',
      text: 'S$110,000 - S$160,000 / year (SGD)'
    },
    techStack: ['Go', 'Rust', 'Kafka', 'Redis', 'Kubernetes', 'gRPC'],
    postedAt: '2d ago',
    featured: false,
    urgent: false,
    applicantsCount: 48,
    sourceSnippet: 'LinkedIn • Singapore Employment Pass (EP) Sponsorship + Relocation Flight & Housing',
    sourceUrl: 'https://www.linkedin.com/jobs/view/sea-garena-backend-singapore',
    description: 'Sea Limited is Singapore’s tech giant behind Shopee and Garena. We are hiring Senior Backend Engineers to relocate to Singapore and build ultra-high throughput gaming platform backends and live matchmaking engines.',
    responsibilities: [
      'Design low-latency game services serving hundreds of millions of active players.',
      'Optimize network protocol buffers, memory footprint, and server CPU usage.',
      'Participate in high-scale architectural design reviews and live operations.',
      'Write highly maintainable microservices in Golang and Rust.'
    ],
    requirements: [
      '4+ years in backend development with high-concurrency systems.',
      'Strong grasp of TCP/UDP networking, algorithms, and data structures.',
      'Fluent English communication skills; ready to relocate to Singapore.'
    ],
    benefits: [
      'Full Singapore Employment Pass sponsorship for candidate & family',
      'Flight tickets + 1 month paid service apartment in Singapore',
      'Annual equity grant and performance bonus',
      'Free gourmet meals and gym in Garena Singapore HQ'
    ]
  },
  {
    id: 'job-35',
    title: 'Remote Digital Nomad Technical Writer & API Docs Specialist',
    company: 'Postman (Global Community)',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#ff6c37',
    location: 'Remote Thailand (Chiang Mai / Phuket / Bangkok)',
    region: 'thai-remote',
    roleCategory: 'marketing-growth',
    experienceLevel: 'mid',
    languageReq: 'english-fluent',
    employmentType: 'contract',
    workMode: 'remote',
    sourcePlatform: 'remoteok',
    scope: 'foreign',
    salary: {
      min: 65000,
      max: 95000,
      currency: 'USD',
      period: 'yearly',
      text: '$65,000 - $95,000 / year (USD)'
    },
    techStack: ['Markdown', 'OpenAPI / Swagger', 'JavaScript', 'Git', 'Technical Documentation'],
    postedAt: '3d ago',
    featured: false,
    urgent: false,
    applicantsCount: 26,
    sourceSnippet: 'RemoteOK • Fully Remote Async Role • Perfect for Digital Nomads',
    sourceUrl: 'https://remoteok.com/remote-jobs/postman-technical-writer',
    description: 'Postman is used by over 30 million developers to build APIs. We are looking for a Technical Writer to author comprehensive API reference guides, interactive tutorials, and documentation portals. Work from anywhere in Thailand on your own schedule.',
    responsibilities: [
      'Write clear, concise, and developer-friendly documentation for API collections and SDKs.',
      'Create interactive code samples in JavaScript, Python, and cURL.',
      'Collaborate with developer advocates and engineering squads to document new features.',
      'Review developer feedback and continuously improve documentation clarity.'
    ],
    requirements: [
      '3+ years of experience writing technical documentation or developer tutorials.',
      'Familiarity with REST APIs, JSON schemas, and Git workflows.',
      'Exceptional written English proficiency with an eye for detail.'
    ],
    benefits: [
      '100% Remote with complete calendar autonomy',
      'Hardware and coworking space budget',
      'USD contractor payments via Wise or direct bank wire',
      'Annual company meetup'
    ]
  },
  {
    id: 'job-36',
    title: 'Senior Outsource Cloud Security Engineer (3-Month Initial Bank Audit)',
    company: 'CyberGuard Consulting Thailand',
    companyLogo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&h=100&fit=crop&crop=faces',
    brandColor: '#0ea5e9',
    location: 'Bangkok, Thailand (Sathorn / Remote 50%)',
    region: 'thai-bkk',
    roleCategory: 'cybersecurity',
    experienceLevel: 'senior',
    languageReq: 'thai',
    employmentType: 'outsource',
    workMode: 'hybrid',
    sourcePlatform: 'facebook',
    scope: 'thai',
    salary: {
      min: 130000,
      max: 180000,
      currency: 'THB',
      period: 'monthly',
      text: '฿130,000 - ฿180,000 / month (Outsource High Rate)'
    },
    techStack: ['AWS Security', 'CSPM', 'Terraform', 'Vault', 'Kubernetes Security', 'CIS Benchmarks'],
    postedAt: '3d ago',
    featured: false,
    urgent: true,
    applicantsCount: 11,
    sourceSnippet: 'Facebook กลุ่ม Thai Cyber Security Community • ต้องการด่วน สัญญา Outsource ค่าตัวสูง',
    sourceUrl: 'https://facebook.com/groups/thaicybersec/posts/102948',
    description: 'บริษัทที่ปรึกษาด้านความมั่นคงปลอดภัยไซเบอร์ CyberGuard เปิดรับ Senior Cloud Security Engineer ประจำสัญญา Outsource พิเศษ 3 เดือนแรก (มีโอกาสต่อสัญญาขยายผลทั้งปี) เพื่อทำ Cloud Security Hardening และ Audit ตามเกณฑ์ ธปท.',
    responsibilities: [
      'ตรวจสอบและตั้งค่า Hardening บน AWS & Azure ตามมาตรฐาน CIS Benchmark',
      'ตั้งค่า HashiCorp Vault และระบบ Key Management สำหรับจัดการ Secret ในระดับองค์กร',
      'ทำ Vulnerability Scanning บน Kubernetes Cluster และ Container Images',
      'จัดทำรายงานสรุปผลและคำแนะนำแก่ทีม Security ของธนาคาร'
    ],
    requirements: [
      'ประสบการณ์ Cloud Security อย่างน้อย 5 ปี',
      'มีใบรับรอง AWS Certified Security Specialty หรือเทียบเท่า',
      'สามารถเริ่มงานได้ทันที สื่อสารภาษาไทยได้อย่างคล่องแคล่ว'
    ],
    benefits: [
      'อัตราค่าตอบแทนพิเศษสำหรับสัญญาเร่งด่วน',
      'มีความยืดหยุ่นในการทำงานแบบ Hybrid',
      'มีโอกาสรับงานโปรเจกต์ถัดไปอย่างต่อเนื่อง'
    ]
  }
];

