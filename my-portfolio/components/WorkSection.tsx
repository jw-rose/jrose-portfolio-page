import { projects } from '@/lib/projectsData';
import ProjectRow from './ProjectRow';
import Reveal from './Reveal';

export default function WorkSection() {
  return (
    <section id="work" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-[clamp(40px,5vw,72px)]">
        <h2 className="font-display font-semibold text-paper text-[clamp(2.5rem,6vw,6rem)] leading-[0.95] tracking-[-0.05em]">
          Selected
          <br />
          work<span className="text-lime">.</span>
        </h2>
        <div className="max-w-[340px]">
          <p className="text-base leading-[1.55] text-muted mb-3">
            Four products built during my full stack training, from a React
            front end to full-stack apps with auth, real-time data and a
            database.
          </p>
        </div>
      </Reveal>

      <div className="flex flex-col">
        {projects.map((project, index) => (
          <Reveal key={project.id}>
            <ProjectRow project={project} index={index} total={projects.length} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
