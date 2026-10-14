'use client';

import { useLanguage } from './LanguageProvider';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span className="font-display font-semibold text-lg text-paper">
            J<span className="text-lime">.</span>ROSE
          </span>
          <span className="font-mono text-xs text-muted2">© {currentYear} Joshua Rose</span>
        </div>

        <div className="flex items-center gap-6 font-mono text-sm text-muted">
          <a
            href="https://github.com/jw-rose"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center hover:text-paper transition-colors"
          >
            {t.footer.github} <span aria-hidden="true" className="ml-1">↗</span>
          </a>
          <a
            href="https://www.linkedin.com/in/josh-rose-4b715b32/"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center hover:text-paper transition-colors"
          >
            {t.footer.linkedin} <span aria-hidden="true" className="ml-1">↗</span>
          </a>
          <a
            href="https://www.devjrose.com/CV-Joshua-Rose-FR.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center text-lime hover:text-paper transition-colors"
          >
            {t.footer.cv} <span aria-hidden="true" className="ml-1">→</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
