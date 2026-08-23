import type { ReactNode } from 'react';

export interface FileNode {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  description?: string;
  size?: string;
  permissions?: string;
  updatedAt?: string;
  children?: { [key: string]: FileNode };
}

export interface CommandHistoryItem {
  id: string;
  command: string;
  output: ReactNode | string;
  cwd: string;
  timestamp: string;
  isError?: boolean;
  exitCode?: number;
}

export interface ProjectItem {
  title: string;
  tagline: string;
  description: string;
  category: string;
  tech: string[];
  features: string[];
  metrics?: string;
  github?: string;
  demo?: string;
  status: 'Completed' | 'Active' | 'Production';
}

export interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  skills: string[];
  verifyUrl: string;
  featured?: boolean;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  grade: string;
  location: string;
  highlights: string[];
  coursework: string[];
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: { name: string; level: number; tag: string }[];
}

export type TerminalTheme = 'sophisticated-dark' | 'ubuntu' | 'matrix' | 'dracula' | 'monokai' | 'cyberpunk' | 'retro-amber';
