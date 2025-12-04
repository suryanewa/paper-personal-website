export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  location: string;
  year: string;
  details: string[]; // Changed to array for coursework/activities
}

export interface ProjectItem {
  id: string;
  title: string;
  role?: string; // e.g. "Product Lead & Developer"
  period: string;
  tech: string[];
  logo?: string;
  description: string[]; // Changed to array
  link?: string;
  location?: string;
}

export interface CompetitionItem {
  id: string;
  award: string; // "Best Undergraduate Team"
  event: string; // "National Product Case Competition"
  role: string;
  location: string;
  date: string;
  link?: string;
  description: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface PublicationItem {
  id: string;
  title: string;
  publisher: string;
  date: string;
  link?: string;
  description: string[];
}

export interface ResumeData {
  name: string;
  title: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    website: string;
    social: { name: string; url: string }[];
  };
  summary: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  competitions: CompetitionItem[];
  projects: ProjectItem[];
  skills: SkillCategory[];
  publications: PublicationItem[];
}
