import HeroSection from '@/components/HeroSection';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/lib/projectsData';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <HeroSection />

      <section className="mb-20">
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl p-8">
          <h2 className="text-gray-900 dark:text-[#F1F5F9] text-2xl font-medium mb-4">Who I am</h2>
          <p className="text-gray-600 dark:text-[#94A3B8] leading-relaxed">
            I'm a passionate full stack developer with expertise in building dynamic, 
            user-friendly web applications. With a strong foundation in both frontend 
            and backend technologies, I thrive on creating seamless digital experiences. 
            From crafting beautiful interfaces with React and Tailwind to building robust 
            APIs with Node.js and Express, I bring ideas to life with clean, maintainable code.
          </p>
        </div>
      </section>

      <section id="projects" className="mb-20">
        <h2 className="text-gray-900 dark:text-[#F1F5F9] text-3xl font-medium mb-8">My work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}