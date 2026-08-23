import { FileNode } from '../types';
import {
  USER_PROFILE,
  EDUCATION_DATA,
  SKILL_CATEGORIES,
  PROJECTS_DATA,
  CERTIFICATES_DATA,
  CONTACT_DATA
} from '../data/portfolioData';

// Generate text representations for file contents
export function getSkillsText(): string {
  let out = `========================================================================
             TECHNICAL SKILLS INVENTORY - VIMAL SINGH
========================================================================\n\n`;

  SKILL_CATEGORIES.forEach((cat) => {
    out += `[ ${cat.category.toUpperCase()} ]\n`;
    cat.skills.forEach((s) => {
      const barFilled = '█'.repeat(Math.round(s.level / 10));
      const barEmpty = '░'.repeat(10 - Math.round(s.level / 10));
      const paddedName = s.name.padEnd(28, ' ');
      out += `  ${paddedName} [${barFilled}${barEmpty}] ${s.level}% (${s.tag})\n`;
    });
    out += '\n';
  });

  out += `💡 Tip: Run 'cat projects.txt' to see these skills applied in projects.`;
  return out;
}

export function getProjectsText(): string {
  let out = `========================================================================
             PROJECTS & ENGINEERING WORK - VIMAL SINGH
========================================================================\n\n`;

  PROJECTS_DATA.forEach((p, index) => {
    out += `[${index + 1}] ${p.title.toUpperCase()}\n`;
    out += `    Tagline    : ${p.tagline}\n`;
    out += `    Domain     : ${p.category} | Status: ${p.status}\n`;
    out += `    Tech Stack : ${p.tech.join(', ')}\n`;
    if (p.metrics) {
      out += `    Key Focus  : ⚡ ${p.metrics}\n`;
    }
    out += `    Summary    : ${p.description}\n`;
    out += `    Key Features:\n`;
    p.features.forEach((f) => {
      out += `      • ${f}\n`;
    });
    out += `    Repository : ${p.github}\n\n`;
    out += '─'.repeat(72) + '\n\n';
  });

  return out;
}

export function getEducationText(): string {
  let out = `========================================================================
             ACADEMIC BACKGROUND & EDUCATION
========================================================================\n\n`;

  EDUCATION_DATA.forEach((edu) => {
    out += `🎓 ${edu.degree.toUpperCase()}\n`;
    out += `   Institution : ${edu.institution}\n`;
    out += `   Period      : ${edu.period} | Location: ${edu.location}\n`;
    out += `   Performance : ${edu.grade}\n\n`;

    out += `   Key Highlights & Focus:\n`;
    edu.highlights.forEach((h) => {
      out += `     ★ ${h}\n`;
    });
    out += `\n   Core Coursework:\n`;
    out += `     ${edu.coursework.join(' • ')}\n\n`;
  });

  return out;
}

export function getCertificatesText(): string {
  let out = `========================================================================
             CERTIFICATIONS & ACCREDITATIONS
========================================================================\n\n`;

  CERTIFICATES_DATA.forEach((cert, i) => {
    out += `[${i + 1}] ${cert.title.toUpperCase()}\n`;
    out += `    Issuing Org : ${cert.issuer}\n`;
    out += `    Issue Date  : ${cert.date}\n`;
    out += `    Credential  : ${cert.credentialId}\n`;
    out += `    Skills      : ${cert.skills.join(', ')}\n`;
    out += `    Verify URL  : ${cert.verifyUrl}\n\n`;
  });

  out += `💡 Verified online credentials.`;
  return out;
}

export function getStrengthsText(): string {
  return `========================================================================
             CORE STRENGTHS & WORK ETHIC - VIMAL SINGH
========================================================================

${USER_PROFILE.strengths.map((s, idx) => `[${idx + 1}] ★ ${s}`).join('\n\n')}

💡 Ready to contribute actively to engineering teams and real-world projects.
`;
}

export function getAchievementsText(): string {
  return `========================================================================
             HONOURS & ACHIEVEMENTS - VIMAL SINGH
========================================================================

${USER_PROFILE.achievements.map((a, idx) => `[${idx + 1}] 🏆 ${a}`).join('\n\n')}

Institution: Chhatrapati Shahu Ji Maharaj University (CSJMU), Kanpur
`;
}

export function getContactText(): string {
  return `========================================================================
             GET IN TOUCH / CONTACT DETAILS - VIMAL SINGH
========================================================================

  Name        : ${CONTACT_DATA.name}
  College     : ${CONTACT_DATA.college}
  Degree      : ${CONTACT_DATA.degree}
  Location    : ${CONTACT_DATA.location}
  Phone       : ${CONTACT_DATA.phone}
  Email       : ${CONTACT_DATA.email}  (Primary)
  GitHub      : ${CONTACT_DATA.github}
  LinkedIn    : ${CONTACT_DATA.linkedin}
  Status      : ${CONTACT_DATA.status}

  Preferred Roles:
${CONTACT_DATA.preferredRoles.map((r) => `    • ${r}`).join('\n')}

  Quick Actions:
    → Type 'mail' or 'email' to open default mail client to ${CONTACT_DATA.email}
    → Type 'github' or 'linkedin' to visit profiles
    → Type 'resume' or 'gui' to view printable graphical viewer
`;
}

export function getAboutText(): string {
  return `========================================================================
             PROFILE & CAREER OBJECTIVE - VIMAL SINGH
========================================================================

Profile:
${USER_PROFILE.about}

Career Objective:
${USER_PROFILE.careerObjective}

Core Strengths:
${USER_PROFILE.strengths.map((s) => `• ${s}`).join('\n')}

Achievements:
${USER_PROFILE.achievements.map((a) => `• ${a}`).join('\n')}
`;
}

export function getReadmeText(): string {
  return `Welcome to the Linux Terminal Portfolio of Vimal Singh!
B.Tech Information Technology — CSJMU Kanpur

QUICK START INSTRUCTIONS:
-------------------------
1. Enter 'cd portfolio' to enter the portfolio workspace.
2. Type 'ls' to inspect available files and directories.
3. Type 'cat <filename>' (e.g. 'cat skills.txt', 'cat projects.txt', 'cat education.txt').
4. Type 'help' for a full list of supported commands (neofetch, theme, clear, gui, etc.).
5. You can also click directly on any file or directory name on screen!

Enjoy exploring the interactive terminal portfolio!
`;
}

export function getNeofetchText(): string {
  return `
       /\\_          vimal@csjmu-portfolio
      /  _\\         -------------------------
     /  /  \\        OS      : Arch Linux x86_64
    /  /    \\       Host    : ThinkPad / Workstation
   /  /  /\\  \\      Kernel  : 6.10.8-arch1-1-zen
  /  /  /  \\  \\     Uptime  : 3 days, 8 hours, 24 mins
 /  /__/    \\  \\    Shell   : zsh 5.9 (x86_64-pc-linux-gnu)
/___/        \\__\\   WM      : i3-gaps (Wayland / Sway)
                    Terminal: Kitty Terminal Emulator
                    User    : Vimal Singh
                    College : CSJMU Kanpur (B.Tech IT 2023-2027)
                    Skills  : Python, Java, C++, JS/TS, AWS, Linux, DevOps
                    Projects: Habit Tracker, UFDR Analyzer, GreenWipe
                    Status  : Seeking SDE / Cloud / DevOps Internships
`;
}

// Initial Virtual File System
export const INITIAL_FILE_SYSTEM: FileNode = {
  name: '~',
  type: 'directory',
  permissions: 'drwxr-xr-x',
  updatedAt: 'Aug 22 10:00',
  children: {
    'README.txt': {
      name: 'README.txt',
      type: 'file',
      size: '512B',
      permissions: '-rw-r--r--',
      updatedAt: 'Aug 22 10:00',
      content: getReadmeText(),
      description: 'Quick start guide'
    },
    'portfolio': {
      name: 'portfolio',
      type: 'directory',
      size: '4.0K',
      permissions: 'drwxr-xr-x',
      updatedAt: 'Aug 22 10:05',
      description: 'Main portfolio directory with all resume sections',
      children: {
        'about.txt': {
          name: 'about.txt',
          type: 'file',
          size: '1.2K',
          permissions: '-rw-r--r--',
          updatedAt: 'Aug 22 10:05',
          content: getAboutText(),
          description: 'Profile summary and career objective'
        },
        'education.txt': {
          name: 'education.txt',
          type: 'file',
          size: '1.4K',
          permissions: '-rw-r--r--',
          updatedAt: 'Aug 22 10:05',
          content: getEducationText(),
          description: 'B.Tech IT (CSJMU Kanpur) & UP Board education'
        },
        'skills.txt': {
          name: 'skills.txt',
          type: 'file',
          size: '2.1K',
          permissions: '-rw-r--r--',
          updatedAt: 'Aug 22 10:05',
          content: getSkillsText(),
          description: 'Programming, Web, Cloud/DevOps (AWS) & Tools'
        },
        'projects.txt': {
          name: 'projects.txt',
          type: 'file',
          size: '3.8K',
          permissions: '-rw-r--r--',
          updatedAt: 'Aug 22 10:05',
          content: getProjectsText(),
          description: 'Habit Tracker, UFDR Analyzer, GreenWipe'
        },
        'certificates.txt': {
          name: 'certificates.txt',
          type: 'file',
          size: '1.5K',
          permissions: '-rw-r--r--',
          updatedAt: 'Aug 22 10:05',
          content: getCertificatesText(),
          description: 'AWS Solutions Architecture (Forage), Java Spring'
        },
        'achievements.txt': {
          name: 'achievements.txt',
          type: 'file',
          size: '640B',
          permissions: '-rw-r--r--',
          updatedAt: 'Aug 22 10:05',
          content: getAchievementsText(),
          description: 'HackShodh Hackathon Runner-up, Front-End Competition'
        },
        'strengths.txt': {
          name: 'strengths.txt',
          type: 'file',
          size: '520B',
          permissions: '-rw-r--r--',
          updatedAt: 'Aug 22 10:05',
          content: getStrengthsText(),
          description: 'Core strengths & ownership mindset'
        },
        'contact.txt': {
          name: 'contact.txt',
          type: 'file',
          size: '890B',
          permissions: '-rw-r--r--',
          updatedAt: 'Aug 22 10:05',
          content: getContactText(),
          description: 'Phone, Email, GitHub, LinkedIn links'
        }
      }
    }
  }
};
