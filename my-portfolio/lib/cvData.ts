import { projects } from '@/lib/projectsData';

function projectByTitle(title: string) {
  const project = projects.find((p) => p.title === title);
  if (!project) throw new Error(`cvData: unknown project "${title}"`);
  return project;
}

function projectLiveUrl(title: string): string {
  return projectByTitle(title).liveUrl;
}

// Profile facts: the order the labels/values are rendered in. Labels and
// values are translated copy, kept in locales/{en,fr}.ts under cvPage.profileFacts.
export const profileFactKeys = ['name', 'role', 'basedIn', 'languages', 'teaching'] as const;

interface TimelineLinkRef {
  label: string;
  href: string;
}

export interface TimelineStructureEntry {
  id: 'hypto' | 'training' | 'teaching';
  monogram: string;
  liveDot?: boolean;
  orgLink?: TimelineLinkRef;
  org?: string;
  defaultOpen: boolean;
  evidenceProjectTitles?: string[];
  teachingOrgOrder?: string[];
  // Organisation names are proper nouns and are not translated.
  teachingOrgs?: Record<string, string>;
}

// Structural/non-text timeline data. Translated copy (heading, role, dates,
// whatIDid, teachingRoles details, statusNote, evidenceNote, extraLine, ...)
// lives in locales/{en,fr}.ts under cvPage.timeline, keyed by the same ids.
export const timelineStructure: TimelineStructureEntry[] = [
  {
    id: 'hypto',
    monogram: 'H',
    liveDot: true,
    orgLink: { label: 'hyptopro.fr', href: 'https://hyptopro.fr' },
    defaultOpen: true,
  },
  {
    id: 'training',
    monogram: 'A',
    org: 'Ada Tech School',
    defaultOpen: false,
    evidenceProjectTitles: ['Personality Page', 'Task Management App', 'Social Post', 'Party Up'],
  },
  {
    id: 'teaching',
    monogram: 'T',
    defaultOpen: false,
    teachingOrgOrder: ['icp', 'istc'],
    teachingOrgs: { icp: 'ICP, Paris', istc: 'ISTC, Lille' },
  },
];

// Strengths: render order. Title/body copy lives in locales/{en,fr}.ts under cvPage.strengths.
export const strengthKeys = ['communication', 'structuredThinking', 'organisation', 'explaining'] as const;

export interface SkillGroupStructure {
  id: 'frontend' | 'backendData' | 'authEmailTesting' | 'alsoOnCv';
  clickable: boolean;
  skills: string[];
}

// Skill group labels live in locales/{en,fr}.ts under cvPage.skillGroups; the
// skill names themselves are technology names and are never translated.
export const skillGroupsStructure: SkillGroupStructure[] = [
  {
    id: 'frontend',
    clickable: true,
    skills: ['JavaScript', 'TypeScript', 'React', 'React Router', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: 'backendData',
    clickable: true,
    skills: ['Node.js', 'MongoDB', 'Drizzle ORM', 'Socket.io'],
  },
  {
    id: 'authEmailTesting',
    clickable: true,
    skills: ['Better Auth', 'Resend', 'Vitest', 'Playwright'],
  },
  {
    id: 'alsoOnCv',
    clickable: false,
    skills: [
      'Express',
      'Fastify',
      'MySQL',
      'PostgreSQL',
      'Docker',
      'CI/CD',
      'Agile/Scrum',
      'unit testing',
      'cloud deployment',
      'web security',
      'GDPR',
    ],
  },
];

export const defaultSkill = 'Next.js';

export interface EvidenceProjectRef {
  project: string;
  liveUrl?: string;
  githubUrl?: string;
}

const QUE_FAIRE_A_PARIS = {
  project: 'Que faire à Paris ?',
  liveUrl: 'https://paris-events-wheat.vercel.app',
  githubUrl: 'https://github.com/jw-rose/Paris-Events',
};

/**
 * Skill -> projects that prove it. Hand-written from the explicit map in the
 * brief (not inferred) — a skill not listed here simply has no evidence yet,
 * even if it's a clickable chip (see Node.js).
 */
export const skillEvidence: Record<string, EvidenceProjectRef[]> = {
  JavaScript: [
    { project: 'Personality Page', liveUrl: projectLiveUrl('Personality Page') },
    { project: 'Task Management App', liveUrl: projectLiveUrl('Task Management App') },
    { project: 'Social Post', liveUrl: projectLiveUrl('Social Post') },
    { project: 'Party Up', liveUrl: projectLiveUrl('Party Up') },
    QUE_FAIRE_A_PARIS,
  ],
  TypeScript: [{ project: 'Personality Page', liveUrl: projectLiveUrl('Personality Page') }],
  React: [{ project: 'Personality Page', liveUrl: projectLiveUrl('Personality Page') }],
  'React Router': [{ project: 'Personality Page', liveUrl: projectLiveUrl('Personality Page') }],
  'Next.js': [
    { project: 'Task Management App', liveUrl: projectLiveUrl('Task Management App') },
    { project: 'Social Post', liveUrl: projectLiveUrl('Social Post') },
    { project: 'Party Up', liveUrl: projectLiveUrl('Party Up') },
  ],
  'Tailwind CSS': [
    { project: 'Personality Page', liveUrl: projectLiveUrl('Personality Page') },
    { project: 'Task Management App', liveUrl: projectLiveUrl('Task Management App') },
    { project: 'Social Post', liveUrl: projectLiveUrl('Social Post') },
    { project: 'Party Up', liveUrl: projectLiveUrl('Party Up') },
  ],
  MongoDB: [{ project: 'Task Management App', liveUrl: projectLiveUrl('Task Management App') }],
  'Drizzle ORM': [{ project: 'Party Up', liveUrl: projectLiveUrl('Party Up') }],
  'Socket.io': [{ project: 'Task Management App', liveUrl: projectLiveUrl('Task Management App') }],
  'Better Auth': [
    { project: 'Social Post', liveUrl: projectLiveUrl('Social Post') },
    { project: 'Party Up', liveUrl: projectLiveUrl('Party Up') },
  ],
  Resend: [{ project: 'Social Post', liveUrl: projectLiveUrl('Social Post') }],
  Vitest: [{ project: 'Party Up', liveUrl: projectLiveUrl('Party Up') }],
  Playwright: [{ project: 'Party Up', liveUrl: projectLiveUrl('Party Up') }],
};
