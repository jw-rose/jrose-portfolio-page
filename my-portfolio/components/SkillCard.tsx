import { Skill } from '@/types/skill';
import { iconComponents } from '@/lib/skillsData';
import { IconType } from 'react-icons';

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const IconComponent = iconComponents[skill.icon as keyof typeof iconComponents] as IconType;

  return (
    <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl p-6 text-center hover:border-[#06B6D4]/50 transition-all duration-300">
      <div className="flex justify-center mb-3">
        {IconComponent && (
          <IconComponent 
            className={`text-5xl ${getIconColor(skill.name)}`}
          />
        )}
      </div>
      
      <div className="text-gray-900 dark:text-[#F1F5F9] font-medium mb-3">{skill.name}</div>
      
      <div className="bg-gray-300 dark:bg-white/10 h-1.5 rounded-full overflow-hidden mb-2">
        <div
          className="bg-[#06B6D4] h-full transition-all duration-500"
          style={{ width: `${skill.proficiency}%` }}
        />
      </div>
      
      <div className="text-gray-600 dark:text-[#94A3B8] text-xs">
        {skill.proficiency >= 90 ? 'Advanced' : 'Proficient'}
      </div>
    </div>
  );
}

function getIconColor(skillName: string): string {
  const colorMap: { [key: string]: string } = {
    'HTML': 'text-[#E34F26]',
    'CSS': 'text-[#1572B6]',
    'JavaScript': 'text-[#F7DF1E]',
    'Typescript': 'text-[#F7DF1E]',
    'React': 'text-[#61DAFB]',
    'Next.js': 'text-gray-900 dark:text-[#F1F5F9]',
    'Tailwind CSS': 'text-[#06B6D4]',
    'Node.js': 'text-[#339933]',
    'Express': 'text-gray-900 dark:text-[#F1F5F9]',
    'Better Auth': 'text-[#06B6D4]',
  };
  
  return colorMap[skillName] || 'text-[#06B6D4]';
}