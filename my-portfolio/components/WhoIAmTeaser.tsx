import Link from 'next/link';
import Reveal from './Reveal';

export default function WhoIAmTeaser() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-t border-hairline">
      <Reveal className="max-w-2xl">
        <p className="font-mono uppercase text-xs tracking-wider text-muted2 mb-6">
          (02) Who I am
        </p>
        <p className="font-display text-2xl sm:text-3xl text-paper leading-snug mb-4">
          I spent ten years teaching in some of France&apos;s most prestigious
          universities and business schools.
        </p>
        <p className="text-body text-base sm:text-lg leading-relaxed mb-6">
          Today I build web applications, bringing the same organisation,
          leadership and curiosity to code.
        </p>
        <Link
          href="/cv"
          className="font-mono text-xs uppercase tracking-wider text-lime hover:text-paper transition-colors inline-flex items-center gap-1"
        >
          My CV <span aria-hidden="true">→</span>
        </Link>
      </Reveal>
    </section>
  );
}
