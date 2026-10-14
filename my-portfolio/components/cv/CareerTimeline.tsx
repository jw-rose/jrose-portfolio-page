'use client';

import { useEffect, useState } from 'react';
import { timelineStructure, type TimelineStructureEntry } from '@/lib/cvData';
import { projects } from '@/lib/projectsData';
import { useLanguage } from '../LanguageProvider';
import type { Dictionary } from '@/locales/en';

function liveUrlForTitle(title: string): string | undefined {
  return projects.find((p) => p.title === title)?.liveUrl;
}

const allIds = timelineStructure.map((entry) => entry.id);
const defaultOpenIds = timelineStructure.filter((entry) => entry.defaultOpen).map((entry) => entry.id);
const initialStage = timelineStructure.find((entry) => entry.defaultOpen)?.id ?? allIds[0];

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
  structure,
  text,
  t,
  isOpen,
  onToggle,
}: {
  structure: TimelineStructureEntry;
  text: Dictionary['cvPage']['timeline'][TimelineStructureEntry['id']];
  t: Dictionary;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const headerId = `timeline-${structure.id}-header`;
  const panelId = `timeline-${structure.id}-panel`;

  const dates = 'dates' in text ? text.dates : undefined;
  const role = 'role' in text ? text.role : undefined;
  const location = 'location' in text ? text.location : undefined;
  const statusNote = 'statusNote' in text ? text.statusNote : undefined;
  const whatIDid = 'whatIDid' in text ? text.whatIDid : undefined;
  const subjects = 'subjects' in text ? text.subjects : undefined;
  const evidenceLabel = 'evidenceLabel' in text ? text.evidenceLabel : undefined;
  const evidenceNote = 'evidenceNote' in text ? text.evidenceNote : undefined;
  const extraLine = 'extraLine' in text ? text.extraLine : undefined;
  const teachingRolesText = 'teachingRoles' in text ? text.teachingRoles : undefined;

  return (
    <div
      id={`timeline-${structure.id}`}
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
        <MonogramTile letter={structure.monogram} />
        <span className="flex-1">
          <span className="block font-display font-semibold text-xl sm:text-2xl text-paper">
            {text.heading}
          </span>
          {dates && <span className="block font-mono text-xs text-muted2 mt-1">{dates}</span>}
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
          {(role || structure.org || structure.orgLink || location) && (
            <p className="text-[17px] text-body leading-relaxed">
              {role}
              {role && (structure.org || structure.orgLink) && ' · '}
              {structure.orgLink ? (
                <a
                  href={structure.orgLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime hover:text-paper transition-colors"
                >
                  {structure.orgLink.label}
                </a>
              ) : (
                structure.org
              )}
              {location && ` · ${location}`}
            </p>
          )}

          {statusNote && (
            <span className="inline-flex items-center self-start font-mono text-xs uppercase tracking-wider text-lime border border-[rgba(199,255,101,.45)] bg-[rgba(199,255,101,.06)] rounded-full px-3 py-1.5">
              {statusNote}
            </span>
          )}

          {whatIDid && (
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-muted2 mb-2">
                {t.cvPage.whatIDidLabel}
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5 text-[17px] text-body leading-relaxed">
                {whatIDid.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          )}

          {teachingRolesText && structure.teachingOrgOrder && (
            <ul className="flex flex-col gap-4">
              {structure.teachingOrgOrder.map((orgKey) => {
                const roleText = teachingRolesText[orgKey as keyof typeof teachingRolesText];
                const orgName = structure.teachingOrgs?.[orgKey];
                return (
                  <li key={orgKey}>
                    <p className="font-display font-medium text-paper">
                      {orgName} <span className="font-mono text-xs text-muted2">{roleText.dates}</span>
                    </p>
                    <p className="text-[17px] text-body leading-relaxed">{roleText.detail}</p>
                  </li>
                );
              })}
            </ul>
          )}

          {subjects && (
            <p className="font-mono text-xs uppercase tracking-wider text-muted2">
              {t.cvPage.subjectsLabel}: {subjects}
            </p>
          )}

          {structure.evidenceProjectTitles && (
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-muted2 mb-2">
                {evidenceLabel}
              </p>
              <ul className="flex flex-col gap-2">
                {structure.evidenceProjectTitles.map((title) => {
                  const liveUrl = liveUrlForTitle(title);
                  return (
                    <li key={title} className="flex flex-wrap items-baseline gap-3">
                      <span className="text-[17px] text-paper">{title}</span>
                      {liveUrl && (
                        <a
                          href={liveUrl}
                          className="inline-flex items-center gap-1 font-display text-sm text-lime hover:text-paper transition-colors"
                        >
                          {t.work.liveDemo} <span aria-hidden="true">→</span>
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
              {evidenceNote && <p className="text-sm text-muted mt-2">{evidenceNote}</p>}
            </div>
          )}

          {extraLine && <p className="text-sm text-muted">{extraLine}</p>}
        </div>
      </div>
    </div>
  );
}

export default function CareerTimeline() {
  const { t } = useLanguage();
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
          {t.cvPage.timelineLabel}
        </p>
        <p className="text-sm text-muted mb-4">{t.cvPage.timelineHint}</p>
        <div className="flex flex-wrap gap-3 print:hidden">
          {timelineStructure.map((entry) => {
            const isSelected = selectedStage === entry.id;
            const text = t.cvPage.timeline[entry.id];
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
                {text.stageLabel}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between mb-2 print:hidden">
        <h2 className="font-display font-semibold text-2xl text-paper">{t.cvPage.timelineHeading}</h2>
        <button
          type="button"
          onClick={toggleAll}
          className="font-mono text-xs uppercase tracking-wider text-muted hover:text-paper transition-colors min-h-[44px] px-2"
        >
          {allOpen ? t.cvPage.collapse : t.cvPage.expandAll}
        </button>
      </div>

      <div>
        {timelineStructure.map((entry) => (
          <AccordionPanel
            key={entry.id}
            structure={entry}
            text={t.cvPage.timeline[entry.id]}
            t={t}
            isOpen={openIds.has(entry.id)}
            onToggle={() => togglePanel(entry.id)}
          />
        ))}
      </div>
    </div>
  );
}
