import type {
  Project,
  SkillCategory,
  CodingProfile,
  ExperienceItem,
  EducationItem,
  LeadershipItem,
} from '../types/portfolio';

export const personalInfo = {
  name: 'Sumit Karkhile',
  location: 'Pune, Maharashtra, India',
  email: 'karkhilesumit5654@gmail.com',
  phone: '+91 8767000474',
  profilePhoto: '/self.jpeg',
  resumeUrl: '/Sumit-Karkhile-Resume.pdf',
  currentRole: 'Computer Engineering Student & SDE Aspirant',
  institution: 'Pune Institute of Computer Technology (PICT)',
  headline: 'I build secure backend systems, full-stack products, and AI-powered applications.',
  subheadline: 'Computer Engineering student at PICT with a strong foundation in data structures, algorithms, Java, Spring Boot, and full-stack development. I enjoy turning real-world problems into reliable software.',
  aboutBio: [
    'I am a Computer Engineering undergraduate at PICT Pune with a deep focus on Java backend architecture, system design, and competitive programming.',
    'My core engineering experience spans production-grade Spring Boot microservices, high-concurrency transactional systems, secure token-based authentication workflows, and modern React frontends.',
    'Beyond traditional software engineering, I explore pragmatic AI integrations—including retrieval-augmented generation (RAG) with Google Gemini and semantic text embeddings with Sentence-BERT to build high-utility document intelligence platforms.',
    'As a LeetCode Knight with over 700 DSA problems solved, I approach software challenges with rigorous algorithmic thinking, clean code discipline, and an obsession with reliability and performance.'
  ],
  stats: [
    { label: 'Academic CGPA', value: '9.45 / 10', detail: 'PICT Computer Engineering' },
    { label: 'LeetCode Knight', value: '1950', detail: 'Top Competitive Rank' },
    { label: 'DSA Solved', value: '700+', detail: 'LeetCode & CodeChef' },
    { label: 'CodeChef Rating', value: '1650 (3★)', detail: 'Division 2 Contender' },
  ],
  socials: {
    github: 'https://github.com/Sai600858',
    linkedin: 'https://www.linkedin.com/in/sumit-karkhile-73019a290',
    leetcode: 'https://leetcode.com/u/sumit_307/',
    codechef: 'https://www.codechef.com/users/sai_812',
    email: 'mailto:karkhilesumit5654@gmail.com',
  }
};

export const educationData: EducationItem = {
  degree: 'Bachelor of Engineering — Computer Engineering',
  institution: 'Pune Institute of Computer Technology (PICT), Pune',
  period: '2023 – 2027',
  location: 'Pune, Maharashtra',
  cgpa: '9.45 / 10.0',
  status: 'Final-year student · Expected Graduation 2027',
  highlights: [
    'Top academic percentile with 9.45 CGPA across core engineering semesters',
    'Active competitive programming representative and campus event coordinator',
    'Specialized focus on backend engineering, distributed databases, and algorithms'
  ],
  coursework: [
    'Data Structures & Algorithms',
    'Object-Oriented Programming (Java/C++)',
    'Database Management Systems (RDBMS)',
    'Operating Systems',
    'Computer Networks',
    'System Design & Microservices'
  ]
};

export const experienceData: ExperienceItem[] = [
  {
    role: 'Developer & Researcher — AI/ML Resume Parser',
    company: 'In-House Internship, PICT',
    type: 'Academic Research & Engineering Internship',
    period: 'Jan 2026 – Apr 2026',
    location: 'Pune, India',
    description: 'Spearheaded research and full-stack implementation of an automated resume intelligence system combining NLP transformers with dense semantic matching algorithms.',
    contributions: [
      'Engineered an AI-based resume parsing pipeline utilizing NLP and transformer models to accurately extract structured entities (skills, education, contact info, and work history) from unstructured PDF files.',
      'Implemented semantic resume-job description matching using Sentence-BERT contextual embeddings and cosine similarity ranking.',
      'Architected a modern React-based interface allowing streamlined resume uploads, candidate profiling visualization, and interactive similarity scoring.'
    ],
    technologies: ['Python', 'NLP', 'Sentence-BERT', 'Transformers', 'Cosine Similarity', 'React.js', 'REST APIs']
  }
];

export const projectsData: Project[] = [
  {
    id: 'pageforge',
    title: 'PageForge — AI-Powered PDF Toolkit',
    tagline: 'Enterprise-grade PDF manipulation and conversational RAG document intelligence platform.',
    category: 'Full-Stack',
    year: '2026',
    statusBadge: 'Featured Engineering Project',
    githubUrl: 'https://github.com/Sai600858/Page-Forge',
    description: 'A comprehensive, full-stack PDF manipulation and AI document platform built using Spring Boot 3.3, Java 21, React 19, and MySQL. Features an integrated conversational RAG system alongside high-performance document processing pipelines.',
    technologies: [
      'Java 21',
      'Spring Boot 3.3',
      'React 19',
      'MySQL',
      'Google Gemini API',
      'Apache PDFBox',
      'Apache POI',
      'AWS S3',
      'Docker',
      'AWS EC2',
      'GitHub Actions',
      'Nginx'
    ],
    features: [
      'Document manipulation engine for PDF merging, splitting, page reordering, AES encryption, and Word/PDF format conversions.',
      'Conversational RAG-based document chat and automated summarization powered by Google Gemini API integration.',
      'Secured backend authentication with JWT token lifecycle and MySQL operation-history audit logging.',
      'Scalable cloud asset storage integrated with Amazon AWS S3.',
      'Automated CI/CD pipeline using GitHub Actions building multi-stage Docker containers deployed to AWS EC2 behind an Nginx reverse proxy.'
    ],
    architecture: [
      'Client: React 19 single-page application with responsive file drop zones and streaming AI responses.',
      'API Gateway / Reverse Proxy: Nginx handling SSL termination and proxying requests to Spring Boot container.',
      'Core Engine: Spring Boot 3.3 running Java 21 with Apache PDFBox and Apache POI streaming pipelines.',
      'AI Layer: Google Gemini API integration implementing context-aware RAG summarization.',
      'Storage: Amazon S3 bucket for ephemeral and persisted documents, MySQL for user auth & audit histories.'
    ]
  },
  {
    id: 'canteen-system',
    title: 'Canteen Management System',
    tagline: 'Full-stack cafeteria platform with role-based access and QR voucher verification.',
    category: 'Full-Stack',
    year: '2026',
    statusBadge: 'Core Enterprise Project',
    githubUrl: 'https://github.com/Sai600858/CanteenSystem',
    description: 'A robust campus cafeteria management platform engineered to eliminate meal counter queues and enforce transactional integrity under high concurrent student orders.',
    technologies: [
      'Spring Boot',
      'React.js',
      'Spring Security',
      'JWT Authentication',
      'MySQL',
      'JPA / Hibernate',
      'QR Code Scanning API'
    ],
    features: [
      'Fine-grained Role-Based Access Control (RBAC) supporting distinct portals for Admin, Canteen Manager, and Meal Coordinator.',
      'Cryptographically secure authentication using Spring Security with dual JWT access/refresh tokens in HTTP-only cookies.',
      'Automated food coupon generation and instantaneous QR-code validation at the counter, preventing double-redemption.',
      'High-performance normalized MySQL schema designed with strict JPA transactional isolation to handle peak lunchtime concurrency.'
    ],
    architecture: [
      'Frontend: React.js role-switched dashboard with live status updates and embedded mobile QR scanner.',
      'Security Filter Chain: Stateless Spring Security filter intercepting incoming requests, validating JWT signatures.',
      'Service Layer: Transactional Spring services coordinating order placements, voucher lifecycle, and inventory deductions.',
      'Persistence: Relational MySQL schema with foreign key integrity and optimized indexed lookups.'
    ]
  },
  {
    id: 'resume-parser',
    title: 'AI/ML Resume Parser & Matcher',
    tagline: 'Semantic candidate profiling and contextual job description matching engine.',
    category: 'AI / ML',
    year: '2026',
    statusBadge: 'Research & Applied AI',
    description: 'An AI-based parsing and semantic ranking platform developed during an in-house internship at PICT to automate technical candidate evaluation from unstructured resumes.',
    technologies: [
      'Python',
      'NLP Transformers',
      'Sentence-BERT',
      'Cosine Similarity',
      'React.js',
      'FastAPI / REST'
    ],
    features: [
      'Automated entity extraction pipeline extracting technical skill tokens, academic credentials, and work duration.',
      'Contextual dense embeddings generated via Sentence-BERT models to capture true semantic relevance beyond naive keyword matching.',
      'Cosine similarity ranking metric providing recruiters with an explainable percentage score for candidate suitability.',
      'Modern web UI for drag-and-drop resume ingestion and instant visual profiling.'
    ],
    architecture: [
      'Ingestion: PDF/DOCX text extraction engine with OCR and token normalization.',
      'Embedding Model: Sentence-BERT (all-MiniLM-L6-v2) generating 384-dimensional dense semantic vectors.',
      'Vector Distance: Cosine similarity calculation engine comparing candidate vectors against job requirements.',
      'Presentation: React interactive candidate scorecards and skill match breakdown.'
    ]
  },
  {
    id: 'aluminate',
    title: 'Aluminate — SIH 2025',
    tagline: 'Centralized institutional alumni engagement and mentorship management platform.',
    category: 'Systems',
    year: '2025',
    statusBadge: 'Smart India Hackathon 2025',
    description: 'Designed for the Smart India Hackathon 2025, Aluminate provides a centralized platform to bridge the communication gap between educational institutions and their alumni network.',
    technologies: [
      'Full-Stack Architecture',
      'System Design',
      'REST APIs',
      'Relational Database',
      'User Management'
    ],
    features: [
      'Centralized alumni registry with searchable directory by graduation year, industry, and location.',
      'Structured institutional communication channel for campus events, guest lectures, and placement mentorship.',
      'Designed for scalability across multiple academic departments and administrative tiers.'
    ],
    architecture: [
      'System Design: Clean tiered client-server architecture with decoupled services.',
      'Data Modeling: Comprehensive schema accounting for alumni career progression, event logs, and messaging.'
    ]
  }
];

export const skillsData: SkillCategory[] = [
  {
    title: 'Programming Languages',
    iconName: 'Code2',
    skills: [
      { name: 'Java', highlight: true },
      { name: 'C++', highlight: true },
      { name: 'Python' },
      { name: 'JavaScript' },
      { name: 'SQL', highlight: true }
    ]
  },
  {
    title: 'Backend Development',
    iconName: 'Server',
    skills: [
      { name: 'Spring Boot', highlight: true },
      { name: 'Spring MVC' },
      { name: 'Spring Security', highlight: true },
      { name: 'Spring AI', highlight: true },
      { name: 'Microservices', highlight: true },
      { name: 'RESTful APIs', highlight: true },
      { name: 'JWT Authentication', highlight: true },
      { name: 'OAuth2' },
      { name: 'JPA / Hibernate', highlight: true },
      { name: 'Maven' }
    ]
  },
  {
    title: 'Frontend Development',
    iconName: 'Layout',
    skills: [
      { name: 'React.js', highlight: true },
      { name: 'JavaScript (ES6+)' },
      { name: 'HTML5' },
      { name: 'CSS3 / Tailwind' }
    ]
  },
  {
    title: 'Databases',
    iconName: 'Database',
    skills: [
      { name: 'MySQL', highlight: true },
      { name: 'PostgreSQL' },
      { name: 'MongoDB' }
    ]
  },
  {
    title: 'Cloud & DevOps',
    iconName: 'Cloud',
    skills: [
      { name: 'Docker', highlight: true },
      { name: 'AWS (S3, EC2)', highlight: true },
      { name: 'Google Cloud' },
      { name: 'GitHub Actions (CI/CD)' },
      { name: 'Nginx' }
    ]
  },
  {
    title: 'Tools & Ecosystem',
    iconName: 'Wrench',
    skills: [
      { name: 'Git & GitHub', highlight: true },
      { name: 'IntelliJ IDEA', highlight: true },
      { name: 'VS Code' },
      { name: 'Postman' }
    ]
  },
  {
    title: 'Core Computer Science',
    iconName: 'Cpu',
    skills: [
      { name: 'Data Structures & Algorithms', highlight: true },
      { name: 'Object-Oriented Programming (OOP)', highlight: true },
      { name: 'DBMS & Query Optimization', highlight: true },
      { name: 'Operating Systems' },
      { name: 'Computer Networks' },
      { name: 'System Design Principles', highlight: true }
    ]
  }
];

export const codingProfilesData: CodingProfile[] = [
  {
    platform: 'LeetCode',
    rating: '1950',
    badge: 'Knight Badge (Top 5%)',
    rank: 'Max Rating 1950',
    problemsSolved: '600+ Problems',
    url: 'https://leetcode.com/u/sumit_307/',
    color: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30',
    accentHex: '#f59e0b',
    highlights: [
      'Knight title achieved through consistent high-performance in weekly contests',
      'Strong proficiency in Graphs, Dynamic Programming, and Binary Search algorithms',
      'Daily problem-solving streak with clean, optimized time/space complexity'
    ]
  },
  {
    platform: 'CodeChef',
    rating: '1650',
    badge: '3-Star Coder',
    rank: 'Division 2 Competitor',
    problemsSolved: '100+ Problems',
    url: 'https://www.codechef.com/users/sai_812',
    color: 'from-sky-500/20 to-blue-500/10 text-sky-400 border-sky-500/30',
    accentHex: '#38bdf8',
    highlights: [
      '3-Star rating with top performance in Starters and Cook-Off rounds',
      'Proven contest speed, mathematical problem breakdown, and edge-case testing'
    ]
  },
  {
    platform: 'GitHub',
    rating: 'Active Contributor',
    badge: '@Sai600858',
    rank: 'Open Source & Projects',
    problemsSolved: 'Multiple Repositories',
    url: 'https://github.com/Sai600858',
    color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
    accentHex: '#10b981',
    highlights: [
      'Full codebase for PageForge AI PDF Toolkit and Canteen Management System',
      'Clean Git commit discipline with production Dockerfiles and GitHub Actions'
    ]
  },
  {
    platform: 'LinkedIn',
    rating: 'Professional Network',
    badge: 'Sumit Karkhile',
    rank: 'Connect & Endorsements',
    problemsSolved: 'Open for SDE Roles',
    url: 'https://www.linkedin.com/in/sumit-karkhile-73019a290',
    color: 'from-blue-600/20 to-indigo-500/10 text-blue-400 border-blue-500/30',
    accentHex: '#60a5fa',
    highlights: [
      'Official verified professional network profile',
      'Continuous updates on technical projects, PICT campus activities, and engineering learnings'
    ]
  }
];

export const leadershipData: LeadershipItem[] = [
  {
    title: 'Smart India Hackathon (SIH) 2025',
    role: 'Team Lead & Designer — Project Aluminate',
    organization: 'Ministry of Education & AICTE',
    period: '2025',
    description: 'Designed and conceptualized "Aluminate," a centralized alumni management platform engineered to strengthen institutional connectivity, placement mentorship, and alumni contributions.',
    impact: [
      'Created modular platform architecture addressing communication gaps in college alumni systems',
      'Structured technical proposals and user workflows for institutional evaluation'
    ]
  },
  {
    title: 'PICT INC 2025',
    role: 'Event Coordinator',
    organization: 'PICT Pune',
    period: '2025',
    description: 'Coordinated campus-wide technical competitions for PICT INC, one of Maharashtra’s premier inter-collegiate engineering symposiums.',
    impact: [
      'Managed end-to-end event logistics, scheduling, and participant management across student teams',
      'Collaborated directly with faculty coordinators and student leads to ensure smooth technical execution'
    ]
  }
];
