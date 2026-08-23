import { EducationItem, ProjectItem, CertificateItem, SkillCategory } from '../types';

export const USER_PROFILE = {
  name: 'Vimal Singh',
  title: 'B.Tech IT Student | Cloud & DevOps Enthusiast',
  tagline: 'Aspiring Software Engineer passionate about Cloud Computing (AWS), DevOps & Full-Stack Development.',
  email: 'cvimal144@gmail.com',
  phone: '9569944197',
  github: 'https://github.com/vimal-singh-dev',
  linkedin: 'https://linkedin.com/in/vimal-singh-it',
  location: 'Kanpur, India',
  availability: 'Seeking Internships in Software Engineering, Cloud, or DevOps',
  about: `Motivated IT student at Chhatrapati Shahu Ji Maharaj University (CSJMU), Kanpur with a strong interest in software development, cloud computing, and DevOps. Looking for an internship to apply skills, work on real projects, and learn from engineering teams.`,
  careerObjective: `To secure an internship in Software Engineering, Cloud, or DevOps where I can contribute to real projects, improve my fundamentals, and gain practical industry experience.`,
  strengths: [
    'Fast learner with strong ownership mindset',
    'Good communication and teamwork',
    'Problem-solving and analytical thinking'
  ],
  achievements: [
    'Runner-up in "HackShodh" Hackathon — CSJMU Kanpur',
    'Participated in Front-End Development Competition — CSJMU Kanpur'
  ]
};

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'B.Tech — Information Technology',
    institution: 'Chhatrapati Shahu Ji Maharaj University (CSJMU), Kanpur',
    period: '2023 – 2027',
    grade: 'CGPA: 6.52 (Ongoing)',
    location: 'Kanpur, India',
    highlights: [
      'Runner-up in "HackShodh" Hackathon — CSJMU Kanpur',
      'Participated in Front-End Development Competition — CSJMU Kanpur',
      'Core focus on Software Development, Cloud Computing (AWS), and DevOps fundamentals'
    ],
    coursework: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (Java / C++)',
      'Cloud Computing & Architecture (AWS)',
      'Operating Systems & Linux Shell Scripting',
      'Database Management Systems & SQL',
      'Web Technologies & REST APIs'
    ]
  },
  {
    degree: 'Intermediate (12th)',
    institution: 'UP Board',
    period: 'Completed',
    grade: '78.6%',
    location: 'Uttar Pradesh, India',
    highlights: [
      'Strong academic foundation in Science & Mathematics'
    ],
    coursework: [
      'Physics',
      'Chemistry',
      'Mathematics',
      'Computer Science'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Programming Languages',
    iconName: 'Code',
    skills: [
      { name: 'Python', level: 90, tag: 'Proficient' },
      { name: 'Java', level: 85, tag: 'Proficient' },
      { name: 'C++', level: 80, tag: 'Core' },
      { name: 'JavaScript', level: 85, tag: 'Proficient' },
      { name: 'TypeScript', level: 80, tag: 'Intermediate' }
    ]
  },
  {
    category: 'Web Development',
    iconName: 'Layout',
    skills: [
      { name: 'HTML5', level: 92, tag: 'Advanced' },
      { name: 'CSS3', level: 88, tag: 'Proficient' },
      { name: 'REST APIs', level: 85, tag: 'Proficient' },
      { name: 'Frontend Architecture', level: 82, tag: 'Intermediate' }
    ]
  },
  {
    category: 'Cloud & DevOps',
    iconName: 'Server',
    skills: [
      { name: 'AWS (EC2, S3, IAM, VPC, Lambda)', level: 85, tag: 'Certified' },
      { name: 'Linux OS & Administration', level: 88, tag: 'Proficient' },
      { name: 'Docker (Basics)', level: 75, tag: 'Intermediate' },
      { name: 'Git & Version Control', level: 90, tag: 'Proficient' },
      { name: 'Bash Scripting', level: 82, tag: 'Proficient' }
    ]
  },
  {
    category: 'Developer Tools',
    iconName: 'Cpu',
    skills: [
      { name: 'GitHub', level: 90, tag: 'Proficient' },
      { name: 'VS Code', level: 92, tag: 'Expert' },
      { name: 'Postman', level: 85, tag: 'Proficient' },
      { name: 'Terminal / CLI', level: 88, tag: 'Proficient' }
    ]
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    title: 'Habit Tracker App',
    tagline: 'Productivity app to track habits and maintain streaks',
    description: 'A dedicated productivity application designed to empower users to establish positive routines, log daily completions, and maintain visual streaks.',
    category: 'Productivity & Web Application',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'REST APIs', 'Git', 'Local Storage'],
    features: [
      'Implemented intuitive habit creation, editing, deletion, and streak logic.',
      'Followed modular structure and utilized Git for professional version control.',
      'Responsive design ensuring seamless experience across mobile and desktop devices.',
      'Persistent tracking for daily habit consistency and streak counts.'
    ],
    metrics: 'Modular streak tracker with seamless offline support',
    github: 'https://github.com/vimal-singh-dev/habit-tracker-app',
    demo: 'https://github.com/vimal-singh-dev/habit-tracker-app',
    status: 'Completed'
  },
  {
    title: 'UFDR Analyzer',
    tagline: 'Automation script to analyze UFDR forensic reports',
    description: 'An automated forensic data extraction and parsing tool that processes Universal Forensic Data Reader (UFDR) reports to extract structured, actionable insights.',
    category: 'Automation & Data Extraction',
    tech: ['Python', 'Automation Scripts', 'Data Parsing', 'Bash', 'Regex'],
    features: [
      'Built parsing workflow to extract structured insights from UFDR forensic data files.',
      'Strengthened scripting, automation pipelines, and forensic debugging workflows.',
      'Automated repetitive manual review tasks, significantly reducing report analysis time.',
      'Generates clear, summarized forensic reports for efficient auditing.'
    ],
    metrics: 'Automated forensic parsing workflow',
    github: 'https://github.com/vimal-singh-dev/ufdr-analyzer',
    demo: 'https://github.com/vimal-singh-dev/ufdr-analyzer',
    status: 'Completed'
  },
  {
    title: 'GreenWipe — Secure Data Wiping',
    tagline: 'Group project focused on secure file deletion and anti-recovery',
    description: 'A cybersecurity utility developed as a collaborative group project focused on cryptographic file shredding, irreversible data overwriting, and anti-recovery defense.',
    category: 'Security & Systems Engineering',
    tech: ['Python', 'C++', 'Linux OS', 'Data Sanitization', 'Git Workflows'],
    features: [
      'Implemented overwrite-based wiping algorithms to drastically reduce data recovery chances.',
      'Collaborated using industry-standard Git workflows and team-based pull request reviews.',
      'Engineered partition-level and file-level sanitization options with safety verifications.',
      'Ensures compliance with basic data privacy and anti-forensic shredding standards.'
    ],
    metrics: 'Multi-pass overwrite sanitization protocol',
    github: 'https://github.com/vimal-singh-dev/greenwipe-secure-data-wiping',
    demo: 'https://github.com/vimal-singh-dev/greenwipe-secure-data-wiping',
    status: 'Completed'
  }
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    title: 'AWS Solutions Architecture Virtual Experience',
    issuer: 'Forage',
    date: '2024',
    credentialId: 'FORAGE-AWS-SA-VIMAL',
    skills: ['AWS Architecture', 'EC2 & S3', 'IAM Policies', 'VPC Networking', 'Lambda'],
    verifyUrl: 'https://www.theforage.com/virtual-internships/AWS',
    featured: true
  },
  {
    title: 'Web Development with Java Spring',
    issuer: 'Mind-Luster',
    date: '2024',
    credentialId: 'ML-JAVA-SPRING-VIMAL',
    skills: ['Java Spring', 'REST APIs', 'MVC Architecture', 'Backend Development', 'Web Services'],
    verifyUrl: 'https://www.mindluster.com/certificate/verify',
    featured: true
  },
  {
    title: 'Digital Strategy and Photo Editing',
    issuer: 'Mind-Luster',
    date: '2023',
    credentialId: 'ML-DIGITAL-STRAT-VIMAL',
    skills: ['Digital Strategy', 'Photo Editing', 'Visual Design Basics', 'Content Workflow'],
    verifyUrl: 'https://www.mindluster.com/certificate/verify',
    featured: false
  }
];

export const CONTACT_DATA = {
  name: 'Vimal Singh',
  email: 'cvimal144@gmail.com',
  phone: '9569944197',
  github: 'https://github.com/vimal-singh-dev',
  githubUsername: 'vimal-singh-dev',
  linkedin: 'https://linkedin.com/in/vimal-singh-it',
  linkedinUsername: 'vimal-singh-it',
  location: 'Kanpur, India',
  college: 'Chhatrapati Shahu Ji Maharaj University (CSJMU), Kanpur',
  degree: 'B.Tech — Information Technology (2023–2027)',
  timezone: 'IST (UTC+5:30)',
  status: '🟢 Seeking Internships in Software Engineering, Cloud, or DevOps',
  resumeUrl: '#download-resume',
  preferredRoles: [
    'Software Engineering Intern',
    'Cloud / DevOps Intern',
    'Full-Stack / Frontend Developer Intern'
  ]
};
