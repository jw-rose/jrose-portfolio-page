import { Skill } from '@/types/skill';
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaReact, 
  FaNodeJs,
} from 'react-icons/fa';
import { 
  SiNextdotjs, 
  SiTailwindcss, 
  SiExpress,
  SiTypescript,
} from 'react-icons/si';
import { MdSecurity } from 'react-icons/md';

export const frontendSkills: Skill[] = [
  { id: '1', name: 'HTML', icon: 'FaHtml5', proficiency: 95, category: 'frontend' },
  { id: '2', name: 'CSS', icon: 'FaCss3Alt', proficiency: 90, category: 'frontend' },
  { id: '3', name: 'JavaScript', icon: 'FaJs', proficiency: 75, category: 'frontend' },
  { id: '4', name: 'TypeScript', icon: 'SiTypescript', proficiency: 60, category: 'frontend' },
  { id: '5', name: 'React', icon: 'FaReact', proficiency: 65, category: 'frontend' },
  { id: '6', name: 'Next.js', icon: 'SiNextdotjs', proficiency: 70, category: 'frontend' },
  { id: '7', name: 'Tailwind CSS', icon: 'SiTailwindcss', proficiency: 70, category: 'frontend' },
];

export const backendSkills: Skill[] = [
  { id: '8', name: 'Node.js', icon: 'FaNodeJs', proficiency: 80, category: 'backend' },
  { id: '9', name: 'Express', icon: 'SiExpress', proficiency: 75, category: 'backend' },
  { id: '10', name: 'Better Auth', icon: 'MdSecurity', proficiency: 55, category: 'backend' },
];

export const otherSkills: string[] = [
  'Git & Version Control',
  'RESTful API Development',
  'Responsive Web Design',
  'Database Management',
  'Deployment (Vercel)',
  'Authentication & Security',
  'Performance Optimization',
  'Testing & Debugging',
];

export const iconComponents = {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  FaNodeJs,
  SiExpress,
  MdSecurity,
};
