'use client';

import { useState } from 'react';
import { skillGroupsStructure, skillEvidence, defaultSkill } from '@/lib/cvData';
import { useLanguage } from '../LanguageProvider';

export default function TechnicalProfile() {
  const { t } = useLanguage();
  const [selectedSkill, setSelectedSkill] = useState<string>(defaultSkill);

  const evidence = skillEvidence[selectedSkill] ?? [];

  return (
    <div>
      <p className="text-sm text-muted mb-6">{t.cvPage.technicalProfileHint}</p>

      <div className="flex flex-col gap-6 mb-8">
        {skillGroupsStructure.map((group) => (
          <div key={group.id}>
            <p className="font-mono text-xs uppercase tracking-wider text-muted2 mb-3">
              {t.cvPage.skillGroups[group.id]}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {group.skills.map((skill) =>
                group.clickable ? (
                  <button
                    key={skill}
                    type="button"
                    aria-pressed={selectedSkill === skill}
                    onClick={() => setSelectedSkill(skill)}
                    className={`font-mono text-xs rounded-full px-3 py-2 min-h-[36px] border transition-colors ${
                      selectedSkill === skill
                        ? 'border-[rgba(199,255,101,.45)] bg-[rgba(199,255,101,.06)] text-paper'
                        : 'border-[rgba(245,245,240,0.16)] text-[#D8D8D2] hover:text-paper'
                    }`}
                  >
                    {skill}
                  </button>
                ) : (
                  <span
                    key={skill}
                    className="font-mono text-xs rounded-full px-3 py-2 border border-[rgba(245,245,240,0.10)] text-muted2"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      <div
        aria-live="polite"
        className="border border-hairline rounded-[20px] p-6 sm:p-8 bg-[#181818]"
      >
        <p className="font-display font-medium text-lg text-paper mb-4">
          {t.cvPage.evidenceForPrefix} {selectedSkill}
        </p>
        {evidence.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {evidence.map((project) => (
              <li key={project.project} className="flex flex-wrap items-baseline gap-3">
                <span className="text-[17px] text-body">{project.project}</span>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-display text-sm text-lime hover:text-paper transition-colors"
                  >
                    {t.work.liveDemo} <span aria-hidden="true">↗</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-display text-sm text-lime hover:text-paper transition-colors"
                  >
                    {t.work.github} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted">{t.cvPage.noProjectLinked}</p>
        )}
      </div>
    </div>
  );
}
