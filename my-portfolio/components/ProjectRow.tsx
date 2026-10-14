'use client';

import Image from 'next/image';
import { Project } from '@/types/project';
import { useLanguage } from './LanguageProvider';

function getHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function Tags({ technologies }: { technologies: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <span
          key={tech}
          className="font-mono text-xs text-[#D8D8D2] border border-[rgba(245,245,240,0.16)] rounded-full px-3 py-1.5"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

function ProjectLink({
  href,
  borderColorClass,
  children,
}: {
  href: string;
  borderColorClass: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 font-display font-medium text-[15px] text-paper border-b pb-[3px] transition-[gap] duration-[250ms] hover:gap-[14px] focus-visible:gap-[14px] ${borderColorClass}`}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

interface ProjectRowProps {
  project: Project;
  index: number;
  total: number;
}

export default function ProjectRow({ project, index, total }: ProjectRowProps) {
  const { t } = useLanguage();
  const host = getHost(project.liveUrl);
  const description = t.work.projects[project.id as keyof typeof t.work.projects]?.description;

  return (
    <article className="flex flex-wrap gap-[clamp(24px,4vw,64px)] py-[clamp(32px,4vw,56px)] border-t border-hairline">
      <div className="flex-[1_1_300px] min-w-0 flex flex-col gap-[18px]">
        <span className="font-mono text-[13px] text-lime">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <h3 className="font-display font-semibold text-[clamp(2rem,3.6vw,3.5rem)] leading-none tracking-[-0.04em] text-paper">
          {project.title}
        </h3>
        <p className="text-[17px] leading-[1.55] text-[#B4B4AD] max-w-[420px] [text-wrap:pretty]">
          {description}
        </p>
        <Tags technologies={project.technologies} />
        <div className="flex gap-6 mt-auto pt-3">
          <ProjectLink href={project.liveUrl} borderColorClass="border-lime">
            {t.work.liveDemo}
          </ProjectLink>
          <ProjectLink
            href={project.githubUrl}
            borderColorClass="border-[rgba(245,245,240,0.30)]"
          >
            {t.work.github}
          </ProjectLink>
        </div>
      </div>

      <div className="group flex-[1.7_1_460px] min-w-0 rounded-[20px] overflow-hidden border border-[rgba(245,245,240,0.12)] bg-[#181818]">
        <div className="h-9 flex items-center gap-[7px] px-3.5 border-b border-[rgba(245,245,240,0.08)]">
          <span className="w-[9px] h-[9px] rounded-full bg-[#2c2c2a]" />
          <span className="w-[9px] h-[9px] rounded-full bg-[#2c2c2a]" />
          <span className="w-[9px] h-[9px] rounded-full bg-[#2c2c2a]" />
          <span className="ml-2.5 font-mono text-[11px] text-muted2 whitespace-nowrap overflow-hidden text-ellipsis">
            {host}
          </span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} ${t.work.screenshotAltSuffix}`}
            fill
            sizes="(min-width: 1024px) 55vw, 90vw"
            priority={index === 0}
            loading={index === 0 ? undefined : 'lazy'}
            className="object-cover object-top block transition-transform duration-[800ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.035]"
          />
        </div>
      </div>
    </article>
  );
}
