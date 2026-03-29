export interface Skill {
  id: string;
  name: string;
  icon: string; // This will be the icon component name
  proficiency: number;
  category: 'frontend' | 'backend' | 'other';
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}