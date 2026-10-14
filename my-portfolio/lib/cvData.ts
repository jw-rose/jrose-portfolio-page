import { projects } from '@/lib/projectsData';
import type {
  ProfileFact,
  TimelineEntry,
  Strength,
  SkillGroup,
  EvidenceProject,
} from '@/types/cv';

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/**
 * Project titles come from lib/projectsData.ts so these stay valid if a
 * title there ever changes; the anchors themselves don't exist on
 * /skills yet (no case-study route/sections there today).
 */
const caseStudyHref = (title: string) => `/skills#${slugify(title)}`;

const projectByTitle = (title: string) => {
  const project = projects.find((p) => p.title === title);
  if (!project) throw new Error(`cvData: unknown project "${title}"`);
  return project;
};

function caseStudyEvidence(title: string): EvidenceProject {
  projectByTitle(title);
  return {
    project: title,
    links: [{ label: 'Case study', href: caseStudyHref(title) }],
  };
}

const QUE_FAIRE_A_PARIS: EvidenceProject = {
  project: 'Que faire à Paris ?',
  links: [
    { label: 'Live demo', href: 'https://paris-events-wheat.vercel.app' },
    { label: 'GitHub', href: 'https://github.com/jw-rose/Paris-Events' },
  ],
};

export const profileFacts: ProfileFact[] = [
  { label: 'Name', value: 'Joshua Rose' },
  { label: 'Role', value: 'Full-stack web developer' },
  { label: 'Based in', value: 'Paris, France' },
  { label: 'Languages', value: 'English (native), French (C1)' },
  { label: 'Teaching', value: '10 years, France' },
];

export const timeline: TimelineEntry[] = [
  {
    id: 'hypto',
    stageLabel: 'Hypto',
    monogram: 'H',
    liveDot: true,
    heading: 'Hypto (Professional)',
    orgLink: { label: 'hyptopro.fr', href: 'https://hyptopro.fr' },
    role: 'Full-stack Developer',
    location: 'Paris',
    dates: 'June to July 2026',
    whatIDid: [
      'Built KPI dashboards and multi-tenant RBAC for a construction-industry SaaS.',
      'Built the cross-tenant interface and roles.',
      'Wrote code documentation.',
    ],
    defaultOpen: true,
  },
  {
    id: 'training',
    stageLabel: 'Training',
    monogram: 'A',
    heading: 'Training',
    role: "Concepteur développeur d'applications (RNCP Level 6)",
    org: 'Ada Tech School',
    dates: 'September 2025 to October 2026',
    statusNote: 'RNCP 6, validated',
    evidenceLabel: 'Projects built — evidence',
    evidenceProjects: [
      caseStudyEvidence('Personality Page'),
      caseStudyEvidence('Task Management App'),
      caseStudyEvidence('Social Post'),
      caseStudyEvidence('Party Up'),
    ],
    evidenceNote: 'Party Up is the RNCP 6 certification project.',
    extraLine:
      'Earlier: University of Plymouth, 2008-2012 — BA Modern Foreign Languages with Business Studies.',
    defaultOpen: false,
  },
  {
    id: 'teaching',
    stageLabel: 'Teaching',
    monogram: 'T',
    heading: 'Teaching',
    role: 'English teacher, universities and business schools, France',
    teachingRoles: [
      {
        dates: '2022 to 2026',
        org: 'ICP, Paris',
        detail: 'Designed a digital curriculum on Moodle.',
      },
      {
        dates: '2019 to 2022',
        org: 'ISTC, Lille',
        detail: 'Led student multimedia projects; managed schedules and deliverables.',
      },
    ],
    subjects: 'English',
    defaultOpen: false,
  },
];

export const strengths: Strength[] = [
  {
    number: '01',
    title: 'Communication',
    body: 'Explaining decisions clearly to teammates, clients and non-technical people.',
  },
  {
    number: '02',
    title: 'Structured thinking',
    body: 'Breaking a large subject into ordered, manageable parts.',
  },
  {
    number: '03',
    title: 'Organisation & leadership',
    body: 'Planning, running and owning work across a full academic year.',
  },
  {
    number: '04',
    title: 'Explaining complex ideas',
    body: 'Turning difficult material into something people can follow and use.',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    clickable: true,
    skills: ['JavaScript', 'TypeScript', 'React', 'React Router', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: 'backend-data',
    label: 'Backend & data',
    clickable: true,
    skills: ['Node.js', 'MongoDB', 'Drizzle ORM', 'Socket.io'],
  },
  {
    id: 'auth-email-testing',
    label: 'Auth, email & testing',
    clickable: true,
    skills: ['Better Auth', 'Resend', 'Vitest', 'Playwright'],
  },
  {
    id: 'also-on-cv',
    label: 'Also on my CV (no project linked yet)',
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

/**
 * Skill -> projects that prove it. Hand-written from the explicit map in the
 * brief (not inferred) — a skill not listed here simply has no evidence yet,
 * even if it's a clickable chip (see Node.js).
 */
export const skillEvidence: Record<string, EvidenceProject[]> = {
  JavaScript: [
    caseStudyEvidence('Personality Page'),
    caseStudyEvidence('Task Management App'),
    caseStudyEvidence('Social Post'),
    caseStudyEvidence('Party Up'),
    QUE_FAIRE_A_PARIS,
  ],
  TypeScript: [caseStudyEvidence('Personality Page')],
  React: [caseStudyEvidence('Personality Page')],
  'React Router': [caseStudyEvidence('Personality Page')],
  'Next.js': [
    caseStudyEvidence('Task Management App'),
    caseStudyEvidence('Social Post'),
    caseStudyEvidence('Party Up'),
  ],
  'Tailwind CSS': [
    caseStudyEvidence('Personality Page'),
    caseStudyEvidence('Task Management App'),
    caseStudyEvidence('Social Post'),
    caseStudyEvidence('Party Up'),
  ],
  MongoDB: [caseStudyEvidence('Task Management App')],
  'Drizzle ORM': [caseStudyEvidence('Party Up')],
  'Socket.io': [caseStudyEvidence('Task Management App')],
  'Better Auth': [caseStudyEvidence('Social Post'), caseStudyEvidence('Party Up')],
  Resend: [caseStudyEvidence('Social Post')],
  Vitest: [caseStudyEvidence('Party Up')],
  Playwright: [caseStudyEvidence('Party Up')],
};

export const defaultSkill = 'Next.js';
