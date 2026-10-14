'use client';

import Link from 'next/link';
import Reveal from './Reveal';
import { useLanguage } from './LanguageProvider';

export default function WhoIAmTeaser() {
  const { t } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-t border-hairline">
      <Reveal className="max-w-2xl">
        <p className="font-mono uppercase text-xs tracking-wider text-muted2 mb-6">
          {t.whoIAm.eyebrow}
        </p>
        <p className="font-display text-2xl sm:text-3xl text-paper leading-snug mb-4">
          {t.whoIAm.heading}
        </p>
        <p className="text-body text-base sm:text-lg leading-relaxed mb-6">{t.whoIAm.body}</p>
        <Link
          href="/cv"
          className="font-mono text-xs uppercase tracking-wider text-lime hover:text-paper transition-colors inline-flex items-center gap-1"
        >
          {t.whoIAm.cvLink} <span aria-hidden="true">→</span>
        </Link>
      </Reveal>
    </section>
  );
}
