import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Personality Page',
    description: 'Celebrity page built with React Router and custom integrated API.',
    image: '/images/projects/mia.jpg',
    technologies: ['React', 'React Router', 'Tailwind CSS',],
    liveUrl: 'https://personality-react.vercel.app/',
    githubUrl: 'https://github.com/jw-rose/Personality',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Advanced Todo list using fully intergrated front and back end stack.',
    image: '/images/projects/todo.jpg',
    technologies: ['Next.js', 'Tailwind', 'MongoDB', 'Socket.io'],
    liveUrl: 'https://todo-list-project-q83imkl4f-jw-roses-projects.vercel.app/',
    githubUrl: 'https://github.com/jw-rose/todo-list',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
  },
  {
    id: '3',
    title: 'Social Post',
    description: 'Simple Social Media app with secure login and ability to display many user posts.',
    image: '/images/projects/socialPost.jpg',
    technologies: ['Next.js', 'Tailwind CSS', 'Better Auth', 'Resend'],
    liveUrl: 'https://social-posts-app-chi.vercel.app/login',
    githubUrl: 'https://github.com/jw-rose/social-posts-app',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
  },
    {
    id: '4',
    title: 'In Development - Party App - Main School Project - RNCP 6',
    description: 'Personal Events management app to include messaging, photoupload and AI suggestion feature.',
    image: '/images/projects/party.jpg',
    technologies: ['React', 'API', 'Chart.js', 'Tailwind'],
    liveUrl: '',
    githubUrl: '',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
  },
  
];