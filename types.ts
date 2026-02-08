
export interface Project {
  id: string;
  title: string;
  description: {
    en: string;
    it: string;
  };
  technologies: string[];
  tags?: string[];
  imageUrl: string;
  iconBgColor?: string;
  link?: string;
  github?: string;
  features?: string[];
  screenshots?: string[];
  fullDescription?: {
    en: string;
    it: string;
  };
}

export type Language = 'en' | 'it';

export interface Translations {
  nav: {
    about: string;
    projects: string;
  };
  hero: {
    greeting: string;
    description: string;
    roles: string[];
  };
  about: {
    title: string;
    content: string;
    skills: string[];
    bio: {
      personal: string;
      location: string;
      languagesTitle: string;
      languages: string[];
      interestsTitle: string;
      interests: string[];
      status: string;
      cta: string;
    };
  };
  projects: {
    title: string;
    active: string;
    privacyFirst: string;
    close: string;
  };
  footer: {
    builtWith: string;
  };
}