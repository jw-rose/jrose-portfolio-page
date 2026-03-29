import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Personality Page',
    description: 'Full-featured online store with cart, checkout, and payment integration using Stripe API.',
    image: '/images/projects/mia.jpg',
    technologies: ['React', 'React Router', 'Tailwind',],
    liveUrl: 'https://personality-react.vercel.app/',
    githubUrl: 'https://github.com/jw-rose/Personality',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative task manager with real-time updates and team workspaces.',
    image: '/images/projects/todo.jpg',
    technologies: ['Next.js', 'Tailwind', 'MongoDB', 'Socket.io'],
    liveUrl: 'https://todo-list-project-q83imkl4f-jw-roses-projects.vercel.app/',
    githubUrl: 'https://github.com/jw-rose/todo-list',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'Real-time weather data visualization with location search and forecasts.',
    image: '/images/projects/weather.jpg',
    technologies: ['React', 'API', 'Chart.js', 'Tailwind'],
    liveUrl: 'https://your-weather-app.vercel.app',
    githubUrl: 'https://github.com/yourusername/weather',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
  },
  
];