import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/projectsData';
import { Project } from '@/types/project';
import Reveal from './Reveal';

function getHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-wider">
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lime hover:text-paper transition-colors"
      >
        Live demo <span aria-hidden="true">↗</span>
      </a>
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted hover:text-paper transition-colors"
      >
        GitHub <span aria-hidden="true">↗</span>
      </a>
      <span className="text-muted2">{getHost(project.liveUrl)}</span>
    </div>
  );
}

function Tags({ technologies }: { technologies: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <span
          key={tech}
          className="font-mono text-[11px] uppercase tracking-wider text-muted2 border border-hairline rounded-full px-2.5 py-1"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

function IndexLabel({ index }: { index: number }) {
  return (
    <span className="font-mono text-xs text-muted2">
      {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
    </span>
  );
}

export default function WorkSection() {
  const [p1, p2, p3, p4] = projects;

  return (
    <section id="work" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
        <h2 className="font-display font-semibold text-3xl sm:text-4xl text-paper">
          Selected work<span className="text-lime">.</span>
        </h2>
        <div className="max-w-md">
          <p className="text-body text-sm sm:text-base leading-relaxed mb-3">
            Four products built during my full stack training, from a React
            front end to full-stack apps with auth, real-time data and a
            database.
          </p>
          <Link
            href="/skills"
            className="font-mono text-xs uppercase tracking-wider text-lime hover:text-paper transition-colors inline-flex items-center gap-1"
          >
            All case studies <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Reveal>

      <div className="flex flex-col gap-10">
        {/* 01 — image left, text right */}
        {p1 && (
          <Reveal className="grid grid-cols-1 lg:grid-cols-5 gap-6 border border-hairline rounded-xl p-6 sm:p-8">
            <div className="lg:col-span-2 relative aspect-[4/3] rounded-lg overflow-hidden border border-hairline">
              <Image
                src={p1.image}
                alt={`${p1.title} screenshot`}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-3 flex flex-col justify-center gap-4">
              <IndexLabel index={0} />
              <h3 className="font-display font-semibold text-xl sm:text-2xl text-paper">
                {p1.title}
              </h3>
              <p className="text-body text-sm sm:text-base leading-relaxed">{p1.description}</p>
              <Tags technologies={p1.technologies} />
              <ProjectLinks project={p1} />
            </div>
          </Reveal>
        )}

        {/* 02 — text left, image right */}
        {p2 && (
          <Reveal className="grid grid-cols-1 lg:grid-cols-5 gap-6 border border-hairline rounded-xl p-6 sm:p-8">
            <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col justify-center gap-4">
              <IndexLabel index={1} />
              <h3 className="font-display font-semibold text-xl sm:text-2xl text-paper">
                {p2.title}
              </h3>
              <p className="text-body text-sm sm:text-base leading-relaxed">{p2.description}</p>
              <Tags technologies={p2.technologies} />
              <ProjectLinks project={p2} />
            </div>
            <div className="lg:col-span-2 order-1 lg:order-2 relative aspect-[4/3] rounded-lg overflow-hidden border border-hairline">
              <Image
                src={p2.image}
                alt={`${p2.title} screenshot`}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        )}

        {/* 03 — stacked, image on top */}
        {p3 && (
          <Reveal className="border border-hairline rounded-xl overflow-hidden">
            <div className="relative aspect-[16/7] border-b border-hairline">
              <Image
                src={p3.image}
                alt={`${p3.title} screenshot`}
                fill
                sizes="90vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <IndexLabel index={2} />
                <Tags technologies={p3.technologies} />
              </div>
              <h3 className="font-display font-semibold text-xl sm:text-2xl text-paper">
                {p3.title}
              </h3>
              <p className="text-body text-sm sm:text-base leading-relaxed max-w-2xl">
                {p3.description}
              </p>
              <ProjectLinks project={p3} />
            </div>
          </Reveal>
        )}

        {/* 04 — large image left, compact text right */}
        {p4 && (
          <Reveal className="grid grid-cols-1 lg:grid-cols-5 gap-6 border border-lime/30 rounded-xl p-6 sm:p-8">
            <div className="lg:col-span-3 relative aspect-[4/3] rounded-lg overflow-hidden border border-hairline">
              <Image
                src={p4.image}
                alt={`${p4.title} screenshot`}
                fill
                sizes="(min-width: 1024px) 55vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-2 flex flex-col justify-center gap-4">
              <IndexLabel index={3} />
              <h3 className="font-display font-semibold text-xl sm:text-2xl text-paper">
                {p4.title}
              </h3>
              <p className="text-body text-sm sm:text-base leading-relaxed">{p4.description}</p>
              <Tags technologies={p4.technologies} />
              <ProjectLinks project={p4} />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
