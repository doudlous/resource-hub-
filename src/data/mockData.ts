import { AcademicResource, Opportunity, LearningRoadmap, CommunityEvent, ForumQuestion } from '../types';

export const UNIVERSITY_LIST = [
  { code: 'ALL', name: 'All Kenyan Universities' },
  { code: 'UoN', name: 'University of Nairobi (UoN)' },
  { code: 'JKUAT', name: 'Jomo Kenyatta University of Agriculture and Technology (JKUAT)' },
  { code: 'KU', name: 'Kenyatta University (KU)' },
  { code: 'Strathmore', name: 'Strathmore University' },
  { code: 'Moi', name: 'Moi University' },
  { code: 'Egerton', name: 'Egerton University' },
  { code: 'TUK', name: 'Technical University of Kenya (TUK)' },
  { code: 'USIU', name: 'United States International University - Africa (USIU)' },
];

export const FACULTIES = [
  'ALL',
  'Computer Science & IT',
  'Engineering & Technology',
  'Business & Economics',
  'Health Sciences & Medicine',
  'Law & Governance',
  'Applied Sciences',
] as const;

export const INITIAL_ACADEMIC_RESOURCES: AcademicResource[] = [
  {
    id: 'res-uon-csc211',
    title: 'CSC 211: Data Structures and Algorithms End of Semester Exam with Marking Scheme',
    courseCode: 'CSC 211',
    courseTitle: 'Data Structures & Algorithms',
    university: 'UoN',
    faculty: 'Computer Science & IT',
    yearOfStudy: 2,
    semester: 1,
    academicYear: '2025/2026',
    type: 'Past Exam Paper',
    fileFormat: 'PDF',
    fileSize: '1.8 MB',
    downloadsCount: 1420,
    contributor: 'Brian Omondi (UoN Chiromo Campus)',
    verified: true,
    summary: 'Comprehensive past paper covering Big-O analysis, balanced AVL trees, graph traversal algorithms (Dijkstra, BFS, DFS), and dynamic programming knapsack implementation.',
    keyTopics: ['AVL Trees', 'Dynamic Programming', 'Dijkstra Shortest Path', 'Hash Tables Collision Handling', 'Complexity Analysis'],
    sampleQuestions: [
      'Question 1(a): Differentiate between an adjacency matrix and adjacency list representation of a directed graph with 10,000 vertices (6 marks).',
      'Question 2(c): Implement an AVL self-balancing tree insertion rotation algorithm in pseudo-code (10 marks).',
      'Question 3: Prove why comparison-based sorting algorithms have a lower bound of O(n log n) (8 marks).'
    ]
  },
  {
    id: 'res-jkuat-eee210',
    title: 'EEE 2102: Analog Electronics II Lecture Notes & Worked Examples Compilation',
    courseCode: 'EEE 2102',
    courseTitle: 'Analog Electronics II',
    university: 'JKUAT',
    faculty: 'Engineering & Technology',
    yearOfStudy: 2,
    semester: 2,
    academicYear: '2025/2026',
    type: 'Lecture Revision Notes',
    fileFormat: 'PDF',
    fileSize: '3.4 MB',
    downloadsCount: 980,
    contributor: 'Eng. Kevin Kiprop (JKUAT Main Campus)',
    verified: true,
    summary: 'Structured lecture notes covering Operational Amplifier configurations, feedback topology, frequency response, Bode plots, and active filter design for Kenyan engineering students.',
    keyTopics: ['Inverting & Non-inverting Op-Amps', 'Bode Plots & Gain Margins', 'Active Butterworth Filters', 'Oscillators', 'Noise Calculations'],
    sampleQuestions: [
      'Design a second-order low-pass Butterworth filter with a cut-off frequency of 2.5 kHz and passband gain of 4 (12 marks).',
      'Explain the significance of Gain Bandwidth Product (GBWP) in high-frequency amplifier design (6 marks).'
    ]
  },
  {
    id: 'res-ku-ecn101',
    title: 'ECN 101: Principles of Microeconomics Past Exam Paper & Solutions Booklet',
    courseCode: 'ECN 101',
    courseTitle: 'Principles of Microeconomics',
    university: 'KU',
    faculty: 'Business & Economics',
    yearOfStudy: 1,
    semester: 1,
    academicYear: '2024/2025',
    type: 'Past Exam Paper',
    fileFormat: 'PDF',
    fileSize: '1.2 MB',
    downloadsCount: 2150,
    contributor: 'Grace Wanjiku (KU School of Business)',
    verified: true,
    summary: 'Standard foundational microeconomics exam paper touching on elasticity of demand, consumer equilibrium, indifference curves, and market structures in developing economies.',
    keyTopics: ['Price Elasticity of Demand', 'Indifference Curves & Budget Constraints', 'Monopoly vs Perfect Competition', 'Externalities in Kenya'],
    sampleQuestions: [
      'Calculate the cross-price elasticity between Unga wa Mahindi and Unga wa Ngano given price changes (8 marks).',
      'Using appropriate diagrams, illustrate how a price ceiling below equilibrium creates deadweight loss (10 marks).'
    ]
  },
  {
    id: 'res-strath-acc202',
    title: 'BAC 2201: Financial Accounting for Decision Makers - Complete Cheatsheet & Formulas',
    courseCode: 'BAC 2201',
    courseTitle: 'Financial Accounting & Reporting',
    university: 'Strathmore',
    faculty: 'Business & Economics',
    yearOfStudy: 2,
    semester: 1,
    academicYear: '2025/2026',
    type: 'Lecture Revision Notes',
    fileFormat: 'PDF',
    fileSize: '2.1 MB',
    downloadsCount: 1640,
    contributor: 'Wambui Karanja (Strathmore Business School)',
    verified: true,
    summary: 'Condensed revision guide for IFRS compliance, cash flow statement direct vs indirect reconciliation, ratio analysis, and corporate balance sheet preparation.',
    keyTopics: ['IFRS 16 Leases', 'Statement of Cash Flows', 'Liquidity & Solvency Ratios', 'Depreciation Schedules', 'Impairment of Assets']
  },
  {
    id: 'res-moi-med301',
    title: 'MED 310: Clinical Pharmacology & Therapeutics Case Studies Revision Pack',
    courseCode: 'MED 310',
    courseTitle: 'Pharmacology for Medical Students',
    university: 'Moi',
    faculty: 'Health Sciences & Medicine',
    yearOfStudy: 3,
    semester: 1,
    academicYear: '2025/2026',
    type: 'Lecture Revision Notes',
    fileFormat: 'PDF',
    fileSize: '4.7 MB',
    downloadsCount: 890,
    contributor: 'Dr. Kipchumba Lagat (Moi College of Health Sciences)',
    verified: true,
    summary: 'High-yield pharmacology notes aligned with Kenya Essential Medicines List (KEML), covering antimicrobial regimens, malaria management (Artemether-Lumefantrine), hypertension, and autonomic nervous system drugs.',
    keyTopics: ['Antimicrobial Stewardship', 'Antimalarial Regimens', 'Cardiovascular Therapeutics', 'Pharmacokinetics & Bioavailability', 'Toxicology']
  },
  {
    id: 'res-tuk-cit302',
    title: 'CIT 3204: Database Systems & SQL Optimization Practical Lab Manual',
    courseCode: 'CIT 3204',
    courseTitle: 'Database Systems & SQL Optimization',
    university: 'TUK',
    faculty: 'Computer Science & IT',
    yearOfStudy: 3,
    semester: 2,
    academicYear: '2025/2026',
    type: 'Practical Lab Guide',
    fileFormat: 'PDF',
    fileSize: '2.8 MB',
    downloadsCount: 1110,
    contributor: 'Dennis Mutua (TUK School of Computing)',
    verified: true,
    summary: 'Hands-on lab manual covering relational normalization (1NF through BCNF), PostgreSQL indexing, transaction isolation levels (ACID), and query plan execution analysis.',
    keyTopics: ['PostgreSQL & B-Tree Indexes', 'Normalization (1NF-BCNF)', 'ACID Transactions', 'EXPLAIN ANALYZE', 'Stored Procedures']
  },
  {
    id: 'res-egerton-agr201',
    title: 'AGR 212: Soil Chemistry and Plant Nutrition Past Exam & Marking Guide',
    courseCode: 'AGR 212',
    courseTitle: 'Soil Science & Plant Nutrition',
    university: 'Egerton',
    faculty: 'Applied Sciences',
    yearOfStudy: 2,
    semester: 1,
    academicYear: '2024/2025',
    type: 'Past Exam Paper',
    fileFormat: 'PDF',
    fileSize: '1.5 MB',
    downloadsCount: 750,
    contributor: 'Eunice Cherotich (Egerton Njoro Campus)',
    verified: true,
    summary: 'Past paper evaluating cation exchange capacity (CEC), soil pH amendment with agricultural lime, nitrogen fixation cycles in East African agro-ecosystems.',
    keyTopics: ['Cation Exchange Capacity', 'Soil Acidity & Liming', 'Macronutrients N-P-K', 'Soil Organic Matter Dynamics']
  },
  {
    id: 'res-uon-law110',
    title: 'GPR 102: Kenya Legal Systems & Methods Comprehensive Examination Notes',
    courseCode: 'GPR 102',
    courseTitle: 'Kenyan Legal Systems & Methods',
    university: 'UoN',
    faculty: 'Law & Governance',
    yearOfStudy: 1,
    semester: 2,
    academicYear: '2025/2026',
    type: 'Lecture Revision Notes',
    fileFormat: 'PDF',
    fileSize: '3.1 MB',
    downloadsCount: 1330,
    contributor: 'Advocate J. Mwangi (UoN Parklands Campus)',
    verified: true,
    summary: 'Exhaustive legal methods manual analyzing Sources of Law in Kenya (Constitution 2010, Legislation, Common Law, African Customary Law, Treaties), court hierarchy, and doctrine of precedent.',
    keyTopics: ['Constitution of Kenya 2010', 'Stare Decisis', 'Court of Appeal vs Supreme Court', 'Statutory Interpretation', 'Judicial Review']
  }
];

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-safaricom-intern-2026',
    title: 'Safaricom PLC Undergraduate Tech & Engineering Internship',
    organization: 'Safaricom PLC',
    type: 'Internship',
    location: 'Nairobi / Hybrid (Waiyaki Way HQ)',
    stipendOrCoverage: 'KES 45,000 / month + Medical Cover',
    isPaidOrFunded: true,
    deadline: 'April 15, 2026',
    eligibility: [
      'Continuing 2nd, 3rd, or 4th year undergraduate student in a recognized Kenyan university',
      'Studying Computer Science, IT, Telecommunications, Electrical Engineering, or Data Science',
      'Minimum GPA of 3.0 / Second Class Upper division or equivalent',
      'Valid student ID and NITA attachment introduction letter from university'
    ],
    description: '3-month immersive internship working directly with Safaricom engineering teams on M-PESA architecture, cloud infrastructure, AI customer agents, and cybersecurity.',
    applicationLink: 'https://www.safaricom.co.ke/careers',
    targetStudents: 'Engineering, IT & Computing Undergrads',
    verified: true,
    featured: true
  },
  {
    id: 'opp-equity-leaders-2026',
    title: 'Equity Leaders Program (ELP) University Innovation & Study Grant',
    organization: 'Equity Group Foundation',
    type: 'Scholarship',
    location: 'Kenya Nationwide & Global Partner Universities',
    stipendOrCoverage: '100% Tuition + Living Stipend + Global Mentorship',
    isPaidOrFunded: true,
    deadline: 'May 30, 2026',
    eligibility: [
      'Kenyan citizens enrolled in accredited public or private universities',
      'Demonstrated high academic standing (Mean Grade A or A- in KCSE or First Class honors track)',
      'Proven record of leadership, student initiatives, or community service'
    ],
    description: 'Premier scholarship and mentorship program providing full educational support, leadership retreats, internships at Equity Bank branches, and support for study abroad.',
    applicationLink: 'https://equitygroupfoundation.com/scholarships',
    targetStudents: 'High-achieving Undergraduate Students',
    verified: true,
    featured: true
  },
  {
    id: 'opp-nita-attachment-kengen',
    title: 'KenGen Industrial Attachment Program (NITA Authorized)',
    organization: 'Kenya Electricity Generating Company (KenGen)',
    type: 'Industrial Attachment',
    location: 'Olkaria (Naivasha) / Seven Forks (Embu) / Nairobi',
    stipendOrCoverage: 'Monthly Allowance + Field Protective Equipment',
    isPaidOrFunded: true,
    deadline: 'May 10, 2026',
    eligibility: [
      '3rd or 4th year student requiring mandatory industrial attachment for graduation',
      'Engineering (Mechanical, Electrical, Mechatronic, Geothermal) or Environmental Science',
      'Possession of valid NITA attachment letter and Student Personal Accident Insurance'
    ],
    description: 'Practical 12-week industrial attachment providing real hands-on experience in Africa’s largest geothermal and hydroelectric power generation plants.',
    applicationLink: 'https://www.kengen.co.ke/careers',
    targetStudents: 'Engineering & Physical Science Students',
    verified: true
  },
  {
    id: 'opp-kcb-tech-trainee',
    title: 'KCB Bank Tech Talent & Fintech Graduate Trainee 2026',
    organization: 'KCB Group',
    type: 'Graduate Trainee',
    location: 'Kencom House, Nairobi',
    stipendOrCoverage: 'Competitive Salary + Full Corporate Benefits',
    isPaidOrFunded: true,
    deadline: 'June 20, 2026',
    eligibility: [
      'Graduating in 2025/2026 or recently graduated within the past 12 months',
      'Degree in Computer Science, Software Engineering, Economics, or Actuarial Science',
      'Knowledge of Python, Java, SQL, or digital banking architectures'
    ],
    description: 'Accelerated 18-month rotational leadership track across Core Banking, Cyber Defense, Mobile Lending Algorithms, and Enterprise Architecture.',
    applicationLink: 'https://kcbgroup.com/careers',
    targetStudents: 'Final Year Students & Recent Graduates',
    verified: true
  },
  {
    id: 'opp-mastercard-usiu',
    title: 'Mastercard Foundation Scholars Program at USIU-Africa',
    organization: 'Mastercard Foundation',
    type: 'Scholarship',
    location: 'Nairobi, Kenya',
    stipendOrCoverage: 'Full Tuition, Accommodation, Laptops & Monthly Living Allowance',
    isPaidOrFunded: true,
    deadline: 'June 15, 2026',
    eligibility: [
      'Economically disadvantaged youth, refugees, or persons living with disabilities',
      'Admitted or eligible for admission to undergraduate programs at USIU-Africa',
      'Demonstrated commitment to give back to their community'
    ],
    description: 'Comprehensive scholarship program covering 100% of university costs, personalized mentorship, laptops, and entrepreneurship incubator seed grants.',
    applicationLink: 'https://www.usiu.ac.ke/mastercard-scholars-program',
    targetStudents: 'Undergraduate Applicants & Continuing Students',
    verified: true,
    featured: true
  },
  {
    id: 'opp-nairobi-hackathon',
    title: 'Nairobi Student AI & Climate Innovation Hackathon 2026',
    organization: 'iHub Nairobi & Google Developer Groups Kenya',
    type: 'Hackathon',
    location: 'iHub Senteu Plaza, Kilimani, Nairobi & Virtual',
    stipendOrCoverage: 'KES 750,000 Grand Prize Pool + Cloud Credits + Incubation',
    isPaidOrFunded: true,
    deadline: 'April 28, 2026',
    eligibility: [
      'Teams of 2 to 4 registered university or TVET students across East Africa',
      'Submissions must address local challenges in Agriculture, FinTech, or Clean Energy'
    ],
    description: '48-hour student hackathon to prototype practical AI, mobile, and IoT solutions for Kenyan communities. Free meals, mentorship, and pitch access to angel investors.',
    applicationLink: 'https://ihub.co.ke/events/student-hackathon-2026',
    targetStudents: 'All University Developers, Designers & Founders',
    verified: true
  },
  {
    id: 'opp-helb-smart-bursary',
    title: 'HELB Affirmative Action & Undergraduate Bursary Scheme',
    organization: 'Higher Education Loans Board (HELB)',
    type: 'Bursary',
    location: 'Nationwide Kenya',
    stipendOrCoverage: 'KES 20,000 to KES 60,000 Non-Repayable Grant',
    isPaidOrFunded: true,
    deadline: 'July 31, 2026',
    eligibility: [
      'Direct-entry KUCCPS-placed university or TVET students from vulnerable backgrounds',
      'Applicants must have registered on the Higher Education Portal (HEF)',
      'Priority given to orphans, single-parent households, and arid/semi-arid regions'
    ],
    description: 'Direct bursaries and government scholarship allocations under the New Higher Education Funding Model administered via HEF / HELB smart disbursement.',
    applicationLink: 'https://www.hef.co.ke',
    targetStudents: 'All KUCCPS & Public/Private University Students',
    verified: true
  }
];

export const INITIAL_ROADMAPS: LearningRoadmap[] = [
  {
    id: 'roadmap-fullstack-dev',
    title: 'Full-Stack Software Engineering for African Tech Careers',
    domain: 'Software Engineering',
    level: 'Beginner',
    duration: '12 Weeks (Self-Paced)',
    certificateOffered: true,
    provider: 'Curated Open Source Track (CS50 + The Odin Project + freeCodeCamp)',
    description: 'A bulletproof roadmap taking beginner Kenyan university students with zero coding knowledge to building full-stack web apps and landing tech internships.',
    kenyanRelevanceTip: 'Most Kenyan tech companies (Safaricom, Cellulant, Andela, local startups) prioritize React/Next.js and Node.js or Python. Focus heavily on building 3 portfolio projects solving local problems (e.g. M-Pesa Daraja API integration).',
    modules: [
      {
        title: 'Module 1: Web Foundations (HTML5, Modern CSS, Responsive Design)',
        description: 'Semantic markup, accessibility, CSS Grid, Flexbox, and mobile-first layouts.',
        link: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
        freeStatus: '100% Free'
      },
      {
        title: 'Module 2: JavaScript & TypeScript Fundamentals',
        description: 'DOM manipulation, asynchronous JavaScript (Promises, async/await), ES6+ syntax, and TypeScript types.',
        link: 'https://javascript.info/',
        freeStatus: '100% Free'
      },
      {
        title: 'Module 3: React & Modern Component Architecture',
        description: 'Hooks (useState, useEffect, useMemo), state management, Tailwind CSS, and API data fetching.',
        link: 'https://react.dev/learn',
        freeStatus: '100% Free'
      },
      {
        title: 'Module 4: Backend & Database (Node.js, Express, PostgreSQL)',
        description: 'RESTful API design, database schemas, authentication (JWT), and Daraja M-Pesa sandbox integration.',
        link: 'https://www.theodinproject.com/paths/full-stack-javascript',
        freeStatus: '100% Free'
      }
    ]
  },
  {
    id: 'roadmap-data-ai',
    title: 'Practical Data Science & Machine Learning with Python',
    domain: 'Data & Artificial Intelligence',
    level: 'Intermediate',
    duration: '10 Weeks',
    certificateOffered: true,
    provider: 'DeepLearning.AI, Kaggle & Google Cloud Skills',
    description: 'Master data analysis, pandas, data visualization, predictive modeling, and applied machine learning geared toward African economic and agricultural datasets.',
    kenyanRelevanceTip: 'Explore open datasets from Kenya Open Data Initiative (KNBS) and Zindi Africa competitions to build standout resumes for regional research and telecom roles.',
    modules: [
      {
        title: 'Module 1: Python for Data Analysis & Visualization',
        description: 'NumPy, Pandas data wrangling, Matplotlib, Seaborn, and exploratory data analysis.',
        link: 'https://www.kaggle.com/learn/python',
        freeStatus: '100% Free'
      },
      {
        title: 'Module 2: Applied Machine Learning Algorithms',
        description: 'Linear & logistic regression, decision trees, random forests, and model evaluation metrics (ROC-AUC).',
        link: 'https://www.kaggle.com/learn/intro-to-machine-learning',
        freeStatus: '100% Free'
      },
      {
        title: 'Module 3: Feature Engineering & Real-world Datasets',
        description: 'Handling missing Kenyan demographic data, encoding categorical variables, and pipeline optimization.',
        link: 'https://www.kaggle.com/learn/feature-engineering',
        freeStatus: '100% Free'
      }
    ]
  },
  {
    id: 'roadmap-finance-kenya',
    title: 'Student Financial Literacy & Wealth Building in Kenya',
    domain: 'Personal Finance & Economics',
    level: 'Beginner',
    duration: '4 Weeks',
    certificateOffered: false,
    provider: 'Nairobi Securities Exchange (NSE) & Money Market Academy',
    description: 'Crucial life skills for Kenyan university students: stretching HELB loans, budgeting campus living costs, understanding Money Market Funds (MMFs), and beginner stock investing.',
    kenyanRelevanceTip: 'Never leave HELB disbursement sitting in standard M-Pesa. Learn how low-risk CMA-regulated MMFs (e.g., CIC, Sanlam, Stanbic, Co-op) earn 11-13% annual compound interest on your semester upkeep.',
    modules: [
      {
        title: 'Module 1: Campus Budgeting & The 50/30/20 Rule for Students',
        description: 'How to manage rent in Rongai, Juja, Kahawa Wendani, or Parklands while eating balanced meals on KES 150/day.',
        link: '#tools-budget',
        freeStatus: '100% Free'
      },
      {
        title: 'Module 2: Money Market Funds (MMFs) & Treasury Bills Explained',
        description: 'CMA regulation, compounding interest, inflation hedging, and setting up emergency funds with KES 1,000.',
        link: 'https://www.cma.or.ke',
        freeStatus: '100% Free'
      },
      {
        title: 'Module 3: NSE Investment Challenge & Stock Market Basics',
        description: 'Participate in the nationwide university student trading competition with virtual capital and win real prizes.',
        link: 'https://www.nse.co.ke',
        freeStatus: '100% Free'
      }
    ]
  },
  {
    id: 'roadmap-career-cv',
    title: 'Resume Mastery & Attachment Job Hunting for Kenyan Students',
    domain: 'Career & Professional Growth',
    level: 'Beginner',
    duration: '2 Weeks',
    certificateOffered: false,
    provider: 'Kenyan Career Mentors Collective',
    description: 'Transform a blank student CV into an ATS-friendly, high-impact resume that secures NITA industrial attachments and graduate trainee positions.',
    kenyanRelevanceTip: 'Kenyan HR screening tools look for demonstrable coursework projects, verified GitHub or portfolio links, and clearly stated university graduation dates rather than high school accomplishments.',
    modules: [
      {
        title: 'Module 1: The NITA-Compliant Attachment CV Structure',
        description: 'Proper formatting, personal details, career objective, academic coursework highlights, and referee protocols in Kenya.',
        link: '#tools-cv',
        freeStatus: '100% Free'
      },
      {
        title: 'Module 2: LinkedIn Optimization & Cold Outreach to Recruiters',
        description: 'Crafting compelling messages to alumni from your campus who work at target companies.',
        link: 'https://www.linkedin.com',
        freeStatus: '100% Free'
      }
    ]
  }
];

export const INITIAL_COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    id: 'event-gdsc-summit',
    title: 'Google Developer Student Clubs (GDSC) Kenya Campus Summit 2026',
    organizer: 'GDSC East Africa & Campus Leads',
    type: 'Hybrid',
    venue: 'UoN Towers, Chandaria Auditorium & YouTube Live',
    date: 'Saturday, April 18, 2026',
    time: '09:00 AM - 04:30 PM EAT',
    category: 'Tech & Coding',
    rsvpLink: 'https://gdg.community.dev/events',
    description: 'Join over 600 student developers, designers, and founders from 20+ Kenyan universities for keynotes on AI agents, Cloud computing, Android development, and open student showcase.',
    speakers: ['Lillian Nduati (Google Cloud Lead)', 'Timothy Osoro (GDSC Lead)', 'Winnie Gitau (Fintech Engineer)'],
    spotsRemaining: 42
  },
  {
    id: 'event-nairobi-ai-meetup',
    title: 'Nairobi AI Student Meetup: Building with Gemini & Open LLMs',
    organizer: 'Nairobi AI Community',
    type: 'In-Person',
    venue: 'iHub Nairobi, 6th Floor Senteu Plaza, Galana Rd',
    date: 'Thursday, April 23, 2026',
    time: '04:30 PM - 07:30 PM EAT',
    category: 'Innovation & Hackathon',
    rsvpLink: 'https://meetup.com/nairobi-ai',
    description: 'Hands-on practical session showing university students how to build real products using generative AI APIs, local vector databases, and prompt engineering.',
    speakers: ['David Kaniu (AI Research Scientist)', 'Mercy Chepkirui (ML Engineer, Twiga)'],
    spotsRemaining: 18
  },
  {
    id: 'event-attachment-masterclass',
    title: 'NITA Attachment & Career Preparation Masterclass for Continuing Students',
    organizer: 'Kenya University Student Career Guild',
    type: 'Virtual',
    venue: 'Google Meet (Link sent upon RSVP)',
    date: 'Wednesday, May 6, 2026',
    time: '06:00 PM - 08:00 PM EAT',
    category: 'Career & Mentorship',
    rsvpLink: 'https://meet.google.com/somahub-masterclass',
    description: 'Step-by-step walkthrough on securing attachment in government parastatals and private corporations, logbook assessment requirements, and insurance coverage rules.',
    speakers: ['Humphrey Otieno (Senior Talent Acquisition Partner)', 'Sarah Mwangi (NITA Coordinator)'],
    spotsRemaining: 115
  },
  {
    id: 'event-she-code-africa',
    title: 'She Code Africa Kenya University Hack & Mentorship Day',
    organizer: 'She Code Africa Nairobi Chapter',
    type: 'In-Person',
    venue: 'Strathmore University @iLabAfrica, Madaraka Campus',
    date: 'Saturday, May 16, 2026',
    time: '10:00 AM - 04:00 PM EAT',
    category: 'Tech & Coding',
    rsvpLink: 'https://shecodeafrica.org/events',
    description: 'Full-day celebration, coding workshops, and career panels dedicated to accelerating young women in STEM across Kenyan universities and colleges.',
    speakers: ['Faith Mutheu (Software Engineer, Microsoft ADC)', 'Cynthia Kerubo (Cybersecurity Specialist)'],
    spotsRemaining: 29
  }
];

export const INITIAL_FORUM_POSTS: ForumQuestion[] = [
  {
    id: 'forum-1',
    title: 'How long does the NITA Industrial Attachment endorsement letter take to process?',
    author: 'Collins Kiprono',
    authorRole: '3rd Year Mechanical Engineering',
    university: 'JKUAT Main Campus',
    timestamp: '2 hours ago',
    category: 'Industrial Attachment',
    content: 'Hello comrades, I received an offer from KenGen Olkaria for attachment starting in June, but my university department is taking time with the official endorsement letter. How long does the Dean’s office usually take, and can I submit the provisional recommendation letter first?',
    upvotes: 19,
    answersCount: 2,
    answers: [
      {
        id: 'ans-1',
        author: 'Faith Waweru',
        authorRole: '4th Year Electrical Engineering',
        university: 'JKUAT',
        timestamp: '1 hour ago',
        content: 'Hi Collins, KenGen accepts the provisional introduction letter from your faculty attachment coordinator while the main NITA stamped contract is being processed. Make sure you get your Personal Accident Cover (usually KES 500 - 1,000 from Jubilee or CIC) ready immediately because they will ask for that alongside the letter on your reporting day.',
        isAccepted: true
      },
      {
        id: 'ans-2',
        author: 'Antony Kariuki',
        authorRole: 'Alumnus & Engineer',
        university: 'UoN',
        timestamp: '45 mins ago',
        content: 'Spot on! Also remember to register your logbook with your department liaison before traveling to Olkaria because faculty supervisors conduct random on-site visits between week 6 and week 8.'
      }
    ]
  },
  {
    id: 'forum-2',
    title: 'Can you appeal HELB loan allocation if you were assigned a lower band in the new HEF model?',
    author: 'Miriam Nyaboke',
    authorRole: '1st Year Health Sciences',
    university: 'Kenyatta University',
    timestamp: '5 hours ago',
    category: 'HELB & Scholarships',
    content: 'My family was placed in Band 4 under the New Higher Education Funding Model, but my father was recently retrenched and we cannot afford the household tuition balance of KES 58,000 per year. Is there a verified procedure for an appeal?',
    upvotes: 34,
    answersCount: 1,
    answers: [
      {
        id: 'ans-3',
        author: 'Brian Barasa',
        authorRole: 'Student Welfare Representative',
        university: 'KU Main Campus',
        timestamp: '3 hours ago',
        content: 'Yes Miriam! The HEF portal has an active "Appeals" tab. You need to prepare: 1) Letter of retrenchment/termination of employment from the company, 2) Chief’s verified letter from your home sub-county, 3) Death certificate or medical records if applicable, and 4) Current bank statement. Once uploaded, also visit the HELB desk at Huduma Centre (GPO or Kibera) for expedited processing.'
      }
    ]
  },
  {
    id: 'forum-3',
    title: 'Recommended projects for a Kenyan computer science 2nd year portfolio?',
    author: 'Dennis Maina',
    authorRole: '2nd Year Computer Science',
    university: 'University of Nairobi',
    timestamp: 'Yesterday',
    category: 'Career & Tech',
    content: 'I want to apply for tech internships at Safaricom and Microsoft ADC next semester. What kinds of projects actually impress recruiters in Nairobi rather than the typical todo apps or clones?',
    upvotes: 42,
    answersCount: 1,
    answers: [
      {
        id: 'ans-4',
        author: 'Joan Chebet',
        authorRole: 'Graduate Software Engineer',
        university: 'Strathmore University',
        timestamp: '20 hours ago',
        content: 'Recruiters here love seeing local utility: 1) An app integrating Safaricom Daraja API (STK Push, B2C payment handling), 2) A USSD service using Africa’s Talking sandbox (extremely common in Kenyan agribusiness/SACCOs), 3) A clean data visualization or scraper for Nairobi transport routes or open public data. Deploy them live on Vercel/Render with clean READMEs!'
      }
    ]
  }
];
