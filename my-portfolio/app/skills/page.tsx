import SkillCard from '@/components/SkillCard';
import { frontendSkills, backendSkills, otherSkills } from '@/lib/skillsData';

export default function SkillsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-medium text-gray-900 dark:text-[#F1F5F9] mb-4">
          My skills & expertise
        </h1>
        <p className="text-gray-600 dark:text-[#94A3B8] text-lg max-w-2xl mx-auto">
          Technologies I work with to build modern, scalable web applications
        </p>
      </div>

      <section className="mb-16">
        <h2 className="text-[#06B6D4] text-lg font-medium uppercase tracking-wide mb-6">
          Frontend Technologies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {frontendSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-[#06B6D4] text-lg font-medium uppercase tracking-wide mb-6">
          Backend Technologies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {backendSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-[#06B6D4] text-lg font-medium uppercase tracking-wide mb-6">
          Additional Skills
        </h2>
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherSkills.map((skill, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#06B6D4] rounded-full" />
                <span className="text-gray-900 dark:text-[#F1F5F9] text-sm">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}