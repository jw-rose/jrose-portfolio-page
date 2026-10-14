export interface ProfileFact {
  label: string;
  value: string;
}

export interface TimelineLink {
  label: string;
  href: string;
}

export interface TeachingRole {
  dates: string;
  org: string;
  detail: string;
}

export interface EvidenceLink {
  label: string;
  href: string;
}

export interface EvidenceProject {
  project: string;
  links: EvidenceLink[];
}

export interface TimelineEntry {
  id: 'hypto' | 'training' | 'teaching';
  stageLabel: string;
  monogram: string;
  liveDot?: boolean;
  heading: string;
  orgLink?: TimelineLink;
  org?: string;
  role?: string;
  location?: string;
  dates?: string;
  statusNote?: string;
  whatIDid?: string[];
  teachingRoles?: TeachingRole[];
  subjects?: string;
  evidenceLabel?: string;
  evidenceProjects?: EvidenceProject[];
  evidenceNote?: string;
  extraLine?: string;
  defaultOpen: boolean;
}

export interface Strength {
  number: string;
  title: string;
  body: string;
}

export interface SkillGroup {
  id: string;
  label: string;
  skills: string[];
  clickable: boolean;
}
