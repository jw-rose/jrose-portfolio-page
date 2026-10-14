'use client';

import { useState } from 'react';
import { skillGroups, skillEvidence, defaultSkill } from '@/lib/cvData';

export default function TechnicalProfile() {
  const [selectedSkill, setSelectedSkill] = useState<string>(defaultSkill);

  const evidence = skillEvidence[selectedSkill] ?? [];

  return (
    <div>
      <p className="text-sm text-muted mb-6">Select a skill to see the projects that prove it.</p>

      <div className="flex flex-col gap-6 mb-8">
        {skillGroups.map((group) => (
          <div key={group.id}>
            <p className="font-mono text-xs uppercase tracking-wider text-muted2 mb-3">
              {group.label}
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
          Evidence for {selectedSkill}
        </p>
        {evidence.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {evidence.map((project) => (
              <li key={project.project} className="flex flex-wrap items-baseline gap-3">
                <span className="text-[17px] text-body">{project.project}</span>
                {project.links.map((link) => {
                  const isExternal = !link.href.startsWith('/');
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="inline-flex items-center gap-1 font-display text-sm text-lime hover:text-paper transition-colors"
                    >
                      {link.label}{' '}
                      <span aria-hidden="true">{isExternal ? '↗' : '→'}</span>
                    </a>
                  );
                })}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted">No project linked on this site yet.</p>
        )}
      </div>
    </div>
  );
}
