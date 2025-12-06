export interface SocialLink {
  platform: string;
  url: string;
}

export interface Profile {
  name: string;
  title: string;
  summary: string;
  summary2: string;
  summary3: string;
  yearsexperience: number;
  location: string;
  email: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  image: string;
  demourl?: string;
  repourl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface PortfolioData {
  profile: Profile;
  socials: SocialLink[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
}
