'use client';

import { useLanguage } from './LanguageProvider';

export default function SkipToContentLink() {
  const { t } = useLanguage();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-lime focus:px-4 focus:py-2 focus:text-ink focus:font-medium"
    >
      {t.skipToContent}
    </a>
  );
}
