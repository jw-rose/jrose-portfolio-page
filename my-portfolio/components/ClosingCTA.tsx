import Link from 'next/link';
import Reveal from './Reveal';

export default function ClosingCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-t border-hairline text-center">
      <Reveal className="flex flex-col items-center gap-8">
        <h2 className="font-display font-semibold text-paper text-3xl sm:text-5xl max-w-2xl">
          Let&apos;s build something good.
        </h2>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3.5 min-h-[44px] text-sm font-medium text-ink transition-all hover:gap-3 focus-visible:gap-3"
        >
          Get in touch <span aria-hidden="true">→</span>
        </Link>
      </Reveal>
    </section>
  );
}
