'use client';

import { profileFactKeys, strengthKeys } from '@/lib/cvData';
import CareerTimeline from './CareerTimeline';
import TechnicalProfile from './TechnicalProfile';
import PrintButton from './PrintButton';
import { useLanguage } from '../LanguageProvider';

export default function CvPageContent() {
  const { t } = useLanguage();

  return (
    <div className="cv-print-page bg-ink text-paper">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-24 pb-16 sm:pb-20">
        <p className="font-mono uppercase text-xs sm:text-sm tracking-wider text-muted2 flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-lime" aria-hidden="true" />
          {t.cvPage.eyebrow}
        </p>

        <h1 className="font-display font-semibold text-paper text-[clamp(2.5rem,6vw,6rem)] leading-[0.95] tracking-[-0.05em] mb-6 max-w-3xl">
          {t.cvPage.heading}
          <span className="text-lime">.</span>
        </h1>

        <p className="font-body text-body text-base sm:text-lg leading-relaxed max-w-[540px] mb-8">
          {t.cvPage.paragraph}
        </p>

        <div className="flex flex-wrap gap-4 print:hidden">
          <a
            href="/CV-Joshua-Rose-FR.pdf"
            download
            className="inline-flex flex-col items-start gap-0.5 rounded-full bg-lime px-6 py-2.5 min-h-[44px] text-ink transition-all"
          >
            <span className="text-sm font-medium">{t.cvPage.downloadCv}</span>
            <span className="font-mono text-[11px] text-ink/70">{t.cvPage.downloadCvSub}</span>
          </a>
          <PrintButton />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-hairline">
        <p className="font-mono uppercase text-xs tracking-wider text-muted2 mb-6">
          {t.cvPage.profileLabel}
        </p>
        <dl className="border border-hairline rounded-[20px] grid grid-cols-1 sm:grid-cols-2 overflow-hidden">
          {profileFactKeys.map((key) => (
            <div key={key} className="px-6 py-5 border-b border-hairline">
              <dt className="font-mono text-xs uppercase tracking-wider text-muted2 mb-1">
                {t.cvPage.profileFacts[`${key}Label`]}
              </dt>
              <dd className="text-[17px] text-paper">{t.cvPage.profileFacts[`${key}Value`]}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-hairline">
        <CareerTimeline />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-hairline">
        <p className="font-mono uppercase text-xs tracking-wider text-muted2 mb-10">
          {t.cvPage.strengthsLabel}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {strengthKeys.map((key, index) => {
            const strength = t.cvPage.strengths[key];
            return (
              <div key={key}>
                <span className="font-mono text-xs text-lime">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display font-semibold text-lg text-paper mt-2 mb-2">
                  {strength.title}
                </h3>
                <p className="text-[17px] text-muted leading-relaxed">{strength.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-hairline">
        <p className="font-mono uppercase text-xs tracking-wider text-muted2 mb-6">
          {t.cvPage.technicalProfileLabel}
        </p>
        <TechnicalProfile />
      </section>
    </div>
  );
}
