'use client';

import { useEffect, useState } from 'react';
import { timeline } from '@/lib/cvData';
import type { TimelineEntry } from '@/types/cv';

const allIds = timeline.map((entry) => entry.id);
const defaultOpenIds = timeline.filter((entry) => entry.defaultOpen).map((entry) => entry.id);
const initialStage = timeline.find((entry) => entry.defaultOpen)?.id ?? allIds[0];

function MonogramTile({ letter }: { letter: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex-none w-11 h-11 rounded-lg border border-hairline bg-[#181818] flex items-center justify-center font-display font-semibold text-lime"
    >
      {letter}
    </span>
  );
}

function AccordionPanel({
  entry,
  isOpen,
  onToggle,
}: {
  entry: TimelineEntry;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const headerId = `timeline-${entry.id}-header`;
  const panelId = `timeline-${entry.id}-panel`;

  return (
    <div
      id={`timeline-${entry.id}`}
      className="border-t border-hairline print:break-inside-avoid"
    >
      <button
        type="button"
        id={headerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full flex items-center gap-4 py-6 min-h-[44px] text-left"
      >
        <MonogramTile letter={entry.monogram} />
        <span className="flex-1">
          <span className="block font-display font-semibold text-xl sm:text-2xl text-paper">
            {entry.heading}
          </span>
          {entry.dates && (
            <span className="block font-mono text-xs text-muted2 mt-1">{entry.dates}</span>
          )}
        </span>
        <span
          aria-hidden="true"
          className={`flex-none font-mono text-2xl text-muted2 transition-transform duration-300 print:hidden ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
        className="cv-accordion-content grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out"
      >
        <div className="overflow-hidden min-h-0 pb-8 pl-0 sm:pl-[60px] flex flex-col gap-4 max-w-[640px]">
          {(entry.role || entry.org || entry.orgLink || entry.location) && (
            <p className="text-[17px] text-body leading-relaxed">
              {entry.role}
              {entry.role && (entry.org || entry.orgLink) && ' · '}
              {entry.orgLink ? (
                <a
                  href={entry.orgLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime hover:text-paper transition-colors"
                >
                  {entry.orgLink.label}
                </a>
              ) : (
                entry.org
              )}
              {entry.location && ` · ${entry.location}`}
            </p>
          )}

          {entry.statusNote && (
            <span className="inline-flex items-center self-start font-mono text-xs uppercase tracking-wider text-lime border border-[rgba(199,255,101,.45)] bg-[rgba(199,255,101,.06)] rounded-full px-3 py-1.5">
              {entry.statusNote}
            </span>
          )}

          {entry.whatIDid && (
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-muted2 mb-2">
                What I did
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5 text-[17px] text-body leading-relaxed">
                {entry.whatIDid.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          )}

          {entry.teachingRoles && (
            <ul className="flex flex-col gap-4">
              {entry.teachingRoles.map((role) => (
                <li key={role.org}>
                  <p className="font-display font-medium text-paper">
                    {role.org} <span className="font-mono text-xs text-muted2">{role.dates}</span>
                  </p>
                  <p className="text-[17px] text-body leading-relaxed">{role.detail}</p>
                </li>
              ))}
            </ul>
          )}

          {entry.subjects && (
            <p className="font-mono text-xs uppercase tracking-wider text-muted2">
              Subjects: {entry.subjects}
            </p>
          )}

          {entry.evidenceProjects && (
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-muted2 mb-2">
                {entry.evidenceLabel}
              </p>
              <ul className="flex flex-col gap-2">
                {entry.evidenceProjects.map((project) => (
                  <li key={project.project} className="flex flex-wrap items-baseline gap-3">
                    <span className="text-[17px] text-paper">{project.project}</span>
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="inline-flex items-center gap-1 font-display text-sm text-lime hover:text-paper transition-colors"
                      >
                        {link.label} <span aria-hidden="true">→</span>
                      </a>
                    ))}
                  </li>
                ))}
              </ul>
              {entry.evidenceNote && (
                <p className="text-sm text-muted mt-2">{entry.evidenceNote}</p>
              )}
            </div>
          )}

          {entry.extraLine && <p className="text-sm text-muted">{entry.extraLine}</p>}
        </div>
      </div>
    </div>
  );
}

export default function CareerTimeline() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpenIds));
  const [selectedStage, setSelectedStage] = useState<string>(initialStage);

  useEffect(() => {
    function openAllForPrint() {
      setOpenIds(new Set(allIds));
    }
    window.addEventListener('beforeprint', openAllForPrint);
    return () => window.removeEventListener('beforeprint', openAllForPrint);
  }, []);

  function togglePanel(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function selectStage(id: string) {
    setSelectedStage(id);
    setOpenIds((prev) => new Set(prev).add(id));
    document.getElementById(`timeline-${id}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  const allOpen = allIds.every((id) => openIds.has(id));

  function toggleAll() {
    setOpenIds(allOpen ? new Set() : new Set(allIds));
  }

  return (
    <div>
      <noscript>
        <style>{'.cv-accordion-content { grid-template-rows: 1fr !important; }'}</style>
      </noscript>
      <div className="mb-10">
        <p className="font-mono uppercase text-xs tracking-wider text-muted2 mb-1">
          Career at a glance
        </p>
        <p className="text-sm text-muted mb-4">Select a stage to open it</p>
        <div className="flex flex-wrap gap-3 print:hidden">
          {timeline.map((entry) => {
            const isSelected = selectedStage === entry.id;
            return (
              <button
                key={entry.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => selectStage(entry.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 min-h-[44px] font-mono text-sm transition-colors ${
                  isSelected
                    ? 'border-[rgba(199,255,101,.45)] bg-[rgba(199,255,101,.06)] text-paper'
                    : 'border-hairline text-muted hover:text-paper'
                }`}
              >
                {entry.liveDot && (
                  <span className="w-1.5 h-1.5 rounded-full bg-lime" aria-hidden="true" />
                )}
                {entry.stageLabel}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between mb-2 print:hidden">
        <h2 className="font-display font-semibold text-2xl text-paper">Timeline</h2>
        <button
          type="button"
          onClick={toggleAll}
          className="font-mono text-xs uppercase tracking-wider text-muted hover:text-paper transition-colors min-h-[44px] px-2"
        >
          {allOpen ? 'Collapse' : 'Expand all'}
        </button>
      </div>

      <div>
        {timeline.map((entry) => (
          <AccordionPanel
            key={entry.id}
            entry={entry}
            isOpen={openIds.has(entry.id)}
            onToggle={() => togglePanel(entry.id)}
          />
        ))}
      </div>
    </div>
  );
}
