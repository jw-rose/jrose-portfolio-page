'use client';

import { useRef, useState } from 'react';
import { CONTACT_EMAIL } from '@/lib/contactConfig';
import { useLanguage } from './LanguageProvider';
import type { Dictionary } from '@/locales/en';

interface FormData {
  name: string;
  email: string;
  message: string;
  company: string; // honeypot — real users never fill this
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const initialFormData: FormData = { name: '', email: '', message: '', company: '' };

type Status = 'idle' | 'sending' | 'success' | 'error';

function validate(data: FormData, errorMessages: Dictionary['contactForm']['errors']): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = errorMessages.name;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email.trim())) {
    errors.email = errorMessages.email;
  }

  if (data.message.trim().length < 10) {
    errors.message = errorMessages.message;
  }

  return errors;
}

const fieldBaseClass =
  'w-full bg-transparent border-0 border-b text-paper text-[18px] py-[10px] outline-none transition-colors placeholder:text-muted2 focus:border-lime';

function fieldBorderClass(hasError: boolean) {
  return hasError ? 'border-[oklch(0.78_0.14_35)]' : 'border-hairline';
}

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(formData, t.contactForm.errors);
    setErrors(validationErrors);

    if (validationErrors.name) {
      nameRef.current?.focus();
      return;
    }
    if (validationErrors.email) {
      emailRef.current?.focus();
      return;
    }
    if (validationErrors.message) {
      messageRef.current?.focus();
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData(initialFormData);
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="flex-1 basis-[420px] rounded-arch border border-hairline bg-[#141414] p-[clamp(24px,3vw,40px)]">
      <h2 className="font-display font-semibold text-[22px] text-paper mb-[22px]">
        {t.contactForm.heading}
      </h2>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[22px]">
        {/* Honeypot — hidden from sighted users, left empty by real visitors */}
        <div
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
          aria-hidden="true"
        >
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="contact-name"
            className="block font-mono text-[11px] uppercase tracking-[0.06em] text-muted2 mb-2"
          >
            {t.contactForm.nameLabel}
          </label>
          <input
            ref={nameRef}
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={80}
            placeholder={t.contactForm.namePlaceholder}
            value={formData.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className={`${fieldBaseClass} ${fieldBorderClass(Boolean(errors.name))}`}
          />
          {errors.name && (
            <p id="contact-name-error" role="alert" className="mt-2 text-sm text-[oklch(0.88_0.08_35)]">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block font-mono text-[11px] uppercase tracking-[0.06em] text-muted2 mb-2"
          >
            {t.contactForm.emailLabel}
          </label>
          <input
            ref={emailRef}
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={120}
            placeholder={t.contactForm.emailPlaceholder}
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={`${fieldBaseClass} ${fieldBorderClass(Boolean(errors.email))}`}
          />
          {errors.email && (
            <p id="contact-email-error" role="alert" className="mt-2 text-sm text-[oklch(0.88_0.08_35)]">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="block font-mono text-[11px] uppercase tracking-[0.06em] text-muted2 mb-2"
          >
            {t.contactForm.messageLabel}
          </label>
          <textarea
            ref={messageRef}
            id="contact-message"
            name="message"
            rows={4}
            maxLength={2000}
            placeholder={t.contactForm.messagePlaceholder}
            value={formData.message}
            onChange={handleChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            className={`${fieldBaseClass} ${fieldBorderClass(Boolean(errors.message))} resize-y`}
          />
          {errors.message && (
            <p id="contact-message-error" role="alert" className="mt-2 text-sm text-[oklch(0.88_0.08_35)]">
              {errors.message}
            </p>
          )}
        </div>

        {status === 'success' && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-[14px] border border-[rgba(199,255,101,0.4)] bg-[rgba(199,255,101,0.08)] px-4 py-3 text-sm text-[#E4FFB4]"
          >
            {t.contactForm.successMessage}
          </div>
        )}

        {status === 'error' && (
          <div
            role="alert"
            className="rounded-[14px] border border-[oklch(0.78_0.14_35/0.4)] bg-[oklch(0.78_0.14_35/0.08)] px-4 py-3 text-sm text-[oklch(0.88_0.08_35)]"
          >
            {t.contactForm.errorMessagePrefix}{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-paper">
              {CONTACT_EMAIL}
            </a>
            .
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          aria-busy={status === 'sending'}
          className="inline-flex items-center justify-center gap-2 h-[52px] px-6 self-start rounded-full bg-lime font-display font-semibold text-[16px] text-ink transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? t.contactForm.sending : (
            <>
              {t.contactForm.submit} <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
