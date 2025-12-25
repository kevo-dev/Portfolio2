
import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Nexus',
    description: 'A high-performance marketplace with real-time inventory management and global payment gateway integration.',
    tags: ['React', 'Next.js', 'Stripe', 'Node.js'],
    imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200',
    link: '#',
    github: '#',
    featured: true
  },
  {
    id: '2',
    title: 'HealthTrack AI',
    description: 'Predictive health analytics dashboard using machine learning to monitor patient vital signs.',
    tags: ['Python', 'TensorFlow', 'React', 'FastAPI'],
    imageUrl: 'https://images.unsplash.com/photo-1504813184591-01592fd03cfd?auto=format&fit=crop&q=80&w=1200',
    link: '#',
    github: '#',
    featured: true
  },
  {
    id: '3',
    title: 'Crypto Pulse',
    description: 'Real-time cryptocurrency tracking platform with sentiment analysis from social media feeds.',
    tags: ['Vue', 'D3.js', 'WebSockets', 'Firebase'],
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=1200',
    link: '#',
    github: '#'
  },
  {
    id: '4',
    title: 'TaskFlow OS',
    description: 'A collaborative productivity suite designed for remote engineering teams with Kanban and Gantt views.',
    tags: ['TypeScript', 'GraphQL', 'PostgreSQL'],
    imageUrl: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80&w=1200',
    link: '#',
    github: '#'
  }
];

export const SKILLS: Skill[] = [
  { name: 'React', category: 'Frontend', level: 95 },
  { name: 'TypeScript', category: 'Frontend', level: 90 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 98 },
  { name: 'Node.js', category: 'Backend', level: 85 },
  { name: 'PostgreSQL', category: 'Backend', level: 80 },
  { name: 'Docker', category: 'DevOps', level: 75 },
  { name: 'AWS', category: 'DevOps', level: 70 },
  { name: 'Python', category: 'Tools', level: 82 }
];

export const BIO = {
  name: "Kev O'Wino",
  role: "Full-Stack Software Engineer",
  location: "Nairobi, Kenya",
  about: "I'm a passionate full-stack developer with over 5 years of experience building scalable web applications. My expertise lies in creating seamless user experiences through modern technologies and robust architecture. I love solving complex problems and contributing to open-source projects.",
  email: "hello@kevowino.dev",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  }
};
