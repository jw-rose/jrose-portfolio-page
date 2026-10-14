'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { name: t.nav.portfolio, path: '/' },
    { name: t.nav.cv, path: '/cv' },
    { name: t.nav.contact, path: '/contact' },
  ];

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const menu = menuRef.current;
    const focusableElements = menu?.querySelectorAll<HTMLElement>(
      'a, button'
    );
    const first = focusableElements?.[0];
    const last = focusableElements?.[focusableElements.length - 1];
    first?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleButtonRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && first && last) {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-ink/95 backdrop-blur-md">
      <nav
        aria-label={t.nav.primaryLabel}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20"
      >
        <Link
          href="/"
          className="font-display font-semibold text-lg sm:text-xl tracking-tight text-paper whitespace-nowrap"
        >
          Dev J<span className="text-lime">.</span>Rose
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                aria-current={isActive ? 'page' : undefined}
                className={`font-body text-sm transition-colors ${
                  isActive ? 'text-paper' : 'text-muted hover:text-paper'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <LanguageToggle />
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-lime px-4 py-2 text-sm font-medium text-ink transition-all hover:gap-3 focus-visible:gap-3"
          >
            {t.nav.letsTalk} <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          ref={toggleButtonRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden flex items-center justify-center w-11 h-11 text-paper"
        >
          {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </nav>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.mobileNavLabel}
          className="md:hidden fixed inset-0 top-16 sm:top-20 z-40 bg-ink flex flex-col justify-between overflow-y-auto"
        >
          <div className="flex flex-col px-6 py-8 gap-6">
            <LanguageToggle className="self-start" />
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={closeMenu}
                  aria-current={isActive ? 'page' : undefined}
                  className={`font-display text-2xl py-2 min-h-[44px] flex items-center ${
                    isActive ? 'text-paper' : 'text-muted hover:text-paper'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-lime px-5 py-3 min-h-[44px] text-sm font-medium text-ink"
            >
              {t.nav.letsTalk} <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="flex items-center gap-6 px-6 py-8 border-t border-hairline">
            <a
              href="https://github.com/jw-rose"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="inline-flex items-center gap-2 text-muted hover:text-paper text-sm min-h-[44px]"
            >
              <FaGithub className="text-lg" /> {t.nav.github} <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://www.linkedin.com/in/josh-rose-4b715b32/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="inline-flex items-center gap-2 text-muted hover:text-paper text-sm min-h-[44px]"
            >
              <FaLinkedin className="text-lg" /> {t.nav.linkedin} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
