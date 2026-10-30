export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Full-Stack' | 'AI / ML' | 'Systems';
  description: string;
  year: string;
  technologies: string[];
  features: string[];
  architecture: string[];
  githubUrl?: string;
  liveUrl?: string;
  statusBadge: string;
  isFeaturedBE?: boolean;
  bannerImage?: string;
  status?: 'in-progress' | 'completed';
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; highlight?: boolean }[];
}

export interface CodingProfile {
  platform: string;
  rating: string;
  badge: string;
  rank: string;
  problemsSolved: string;
  url: string;
  color: string;
  accentHex: string;
  highlights: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  type: string;
  period: string;
  location: string;
  description: string;
  contributions: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  cgpa: string;
  status: string;
  highlights: string[];
  coursework: string[];
}

export interface LeadershipItem {
  title: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  impact: string[];
}
