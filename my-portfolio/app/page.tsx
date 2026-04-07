import HeroSection from '@/components/HeroSection';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/lib/projectsData';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <HeroSection />

      <section className="mb-12 sm:mb-16 lg:mb-20">
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl p-6 sm:p-8">
          <h2 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-medium mb-3 sm:mb-4">
            Who I am
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            Hi! I'm Josh and I am currently studying to be a Fullstack Web Developer. I spent ten years 
teaching in some of the most prestigious universities and Business Schools in France. Today I 
really enjoy the creative process of building applications, bringing my years of experience in 
organisation and leadership, and a natural sense of curiosity. I am looking for an internship 
to help consolidate my knowledge and offering a proactive approach.
          </p>
        </div>
      </section>

      <section id="projects" className="mb-12 sm:mb-16 lg:mb-20">
        <h2 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-medium mb-6 sm:mb-8">
          My work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}