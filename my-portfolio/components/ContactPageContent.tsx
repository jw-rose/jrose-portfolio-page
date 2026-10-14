'use client';

import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import { useLanguage } from '@/components/LanguageProvider';
import {
  CONTACT_EMAIL,
  GITHUB_HANDLE,
  GITHUB_URL,
  LINKEDIN_HANDLE,
  LINKEDIN_URL,
} from '@/lib/contactConfig';

export default function ContactPageContent() {
  const { t } = useLanguage();

  const elsewhere = [
    { label: t.nav.github, handle: GITHUB_HANDLE, href: GITHUB_URL },
    { label: t.nav.linkedin, handle: LINKEDIN_HANDLE, href: LINKEDIN_URL },
  ];

  return (
    <div className="bg-ink text-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 flex flex-col gap-[clamp(48px,6vw,96px)]">
        <Reveal className="contact-heading-col flex flex-col gap-7">
          <p className="font-mono uppercase text-xs tracking-[0.06em] text-muted2">
            {t.contactPage.eyebrow}
          </p>

          <h1 className="contact-heading font-display font-semibold text-paper">
            {t.contactPage.heading}
            <span className="text-lime">?</span>
          </h1>

          <p className="font-body text-body text-[clamp(17px,1.4vw,20px)] leading-[1.55] max-w-[560px]">
            {t.contactPage.paragraph}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-3 hover:gap-5 focus-visible:gap-5 transition-all h-[60px] px-[30px] rounded-full bg-lime font-display font-semibold text-[17px] text-ink"
            >
              {t.contactPage.emailMe} <span aria-hidden="true">→</span>
            </a>
            <span className="font-mono text-[13px] text-lime border border-dashed border-[rgba(199,255,101,0.45)] rounded-[6px] px-3 py-[6px]">
              {CONTACT_EMAIL}
            </span>
          </div>
        </Reveal>

        <Reveal className="flex flex-wrap gap-[clamp(40px,6vw,96px)]">
          <div className="flex-1 basis-[360px]">
            <p className="font-mono uppercase text-[11px] tracking-[0.06em] text-muted2 mb-3">
              {t.contactPage.elsewhere}
            </p>
            <div>
              {elsewhere.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-[22px] border-t border-[rgba(245,245,240,0.12)] transition-[padding] duration-300 hover:pl-3 focus-visible:pl-3"
                >
                  <span className="font-display font-medium text-[clamp(26px,2.6vw,38px)] tracking-[-0.03em] text-paper transition-colors duration-300 group-hover:text-lime group-focus-visible:text-lime">
                    {item.label}
                  </span>
                  <span className="font-mono text-[13px] text-muted2 whitespace-nowrap">
                    {item.handle} <span aria-hidden="true">↗</span>
                  </span>
                </a>
              ))}
              <div className="border-t border-[rgba(245,245,240,0.12)]" />
            </div>
          </div>

          <div className="flex-1 basis-[420px]">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
