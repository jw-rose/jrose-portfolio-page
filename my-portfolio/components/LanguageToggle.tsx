'use client';

import { useLanguage } from './LanguageProvider';

interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({ className = '' }: LanguageToggleProps) {
  const { lang, setLang, t } = useLanguage();

  function optionClass(isActive: boolean) {
    return `min-w-[44px] min-h-[44px] px-3 inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider rounded-full transition-colors ${
      isActive ? 'bg-lime text-ink' : 'text-muted hover:text-paper'
    }`;
  }

  return (
    <div
      role="group"
      aria-label={t.languageToggle.groupLabel}
      className={`inline-flex items-center gap-1 rounded-full border border-hairline p-1 ${className}`}
    >
      <button
        type="button"
        lang="en"
        aria-pressed={lang === 'en'}
        aria-label={t.languageToggle.switchToEnglish}
        onClick={() => setLang('en')}
        className={optionClass(lang === 'en')}
      >
        EN
      </button>
      <button
        type="button"
        lang="fr"
        aria-pressed={lang === 'fr'}
        aria-label={t.languageToggle.switchToFrench}
        onClick={() => setLang('fr')}
        className={optionClass(lang === 'fr')}
      >
        FR
      </button>
    </div>
  );
}
