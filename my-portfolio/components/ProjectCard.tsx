import { Project } from '@/types/project';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden hover:border-[#06B6D4]/50 transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-gray-900 dark:text-[#F1F5F9] text-lg font-medium mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-[#94A3B8] text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="bg-[#06B6D4]/20 text-[#06B6D4] text-xs px-3 py-1 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4">
          <Link
            href={project.liveUrl}
            target="_blank"
            className="text-[#06B6D4] text-sm font-medium hover:text-[#0891b2] transition-colors"
          >
            Live Demo →
          </Link>
          <Link
            href={project.githubUrl}
            target="_blank"
            className="text-gray-600 dark:text-[#94A3B8] text-sm hover:text-gray-900 dark:hover:text-[#F1F5F9] transition-colors"
          >
            GitHub →
          </Link>
        </div>
      </div>
    </div>
  );
}