export type Education = {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string;
  github: string;
  liveUrl: string;
};

export type Personal = {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  github: string;
  website: string;
  summary: string;
};

export type Skills = {
  technical: string[];
  soft: string[];
  languages: string[];
  tools: string[];
};

export type ResumeData = {
  personal: Personal;
  education: Education[];
  experience: Experience[];
  skills: Skills;
  projects: Project[];
};

export const emptyResume: ResumeData = {
  personal: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    website: "",
    summary: "",
  },
  education: [],
  experience: [],
  skills: { technical: [], soft: [], languages: [], tools: [] },
  projects: [],
};
