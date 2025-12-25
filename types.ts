
export interface Comment {
  id: string;
  userName: string;
  text: string;
  timestamp: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content?: string;
  url: string;
  date: string;
  category: string;
  likes: number;
  comments: Comment[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
  github?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Tools';
  level: number; // 1-100
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export enum SectionId {
  Hero = 'hero',
  About = 'about',
  Projects = 'projects',
  Blog = 'blog',
  Skills = 'skills',
  Contact = 'contact'
}
