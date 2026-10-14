'use client';

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { en, type Dictionary } from '@/locales/en';
import { fr } from '@/locales/fr';

export type Lang = 'en' | 'fr';

const STORAGE_KEY = 'devjrose-lang';

const dictionaries: Record<Lang, Dictionary> = { en, fr };

function isLang(value: unknown): value is Lang {
  return value === 'en' || value === 'fr';
}

// Module-level external store for the active language. Reading/writing
// localStorage and navigator.language must stay out of render (SSR has
// neither), so the language lives in a tiny external store that
// useSyncExternalStore subscribes to — React serves `getServerSnapshot`
// ('en') during SSR and the initial client hydration pass (matching exactly,
// no hydration mismatch), then swaps to the real `getSnapshot` value right
// after mount, before paint.
let cachedLang: Lang | null = null;
const listeners = new Set<() => void>();

function computeInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    // localStorage unavailable (private mode, disabled, etc.) — fall through.
  }

  if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('fr')) {
    return 'fr';
  }

  return 'en';
}

function getSnapshot(): Lang {
  if (cachedLang === null) {
    cachedLang = computeInitialLang();
  }
  return cachedLang;
}

function getServerSnapshot(): Lang {
  return 'en';
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

function commitLang(next: Lang) {
  cachedLang = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Ignore write failures (private mode, storage disabled, quota, etc.).
  }
  listeners.forEach((listener) => listener());
}

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useLayoutEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    commitLang(next);
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: dictionaries[lang] }),
    [lang, setLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
