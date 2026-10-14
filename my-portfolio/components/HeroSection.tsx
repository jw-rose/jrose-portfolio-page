import Image from 'next/image';
import Link from 'next/link';
import Reveal from './Reveal';

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-24 pb-16 sm:pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal className="hero-text-col">
          <p className="font-mono uppercase text-xs sm:text-sm tracking-wider text-muted2 flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-lime" aria-hidden="true" />
            Full stack developer · France
          </p>

          <h1 className="hero-heading font-display font-semibold text-paper mb-6">
            <span className="block whitespace-nowrap">
              I&apos;m Josh<span className="text-lime">.</span>
            </span>{' '}
            <span className="block whitespace-nowrap text-muted">I build digital</span>{' '}
            <span className="block whitespace-nowrap">
              experiences<span className="text-lime">.</span>
            </span>
          </h1>

          <p className="font-body text-body text-base sm:text-lg leading-relaxed max-w-[540px] mb-8">
            I&apos;m a full stack developer building modern web applications where
            clear interfaces meet solid engineering. Before code, I spent ten
            years teaching in French universities and business schools, which
            taught me to make complex things easy to understand.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 min-h-[44px] text-sm font-medium text-ink transition-all hover:gap-3 focus-visible:gap-3"
            >
              Explore my work <span aria-hidden="true">↓</span>
            </Link>
            <Link
              href="/cv"
              className="group inline-flex items-center gap-2 rounded-full border border-hairline px-6 py-3 min-h-[44px] text-sm font-medium text-paper transition-all hover:gap-3 focus-visible:gap-3 hover:border-paper/30"
            >
              View my CV <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>

        <Reveal className="relative mx-auto w-full max-w-sm">
          <div
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-full rounded-b-arch border border-lime/60"
            aria-hidden="true"
          />
          <div className="relative aspect-[4/5.2] rounded-t-full rounded-b-arch overflow-hidden border border-hairline bg-gradient-dark">
            <Image
              src="/images/profilePic.png"
              alt="Joshua Rose"
              fill
              sizes="(min-width: 1024px) 384px, 90vw"
              className="object-cover"
              priority
            />
            <span className="absolute bottom-4 left-4 font-mono text-xs bg-ink/80 backdrop-blur-sm border border-hairline rounded-full px-3 py-1.5 text-paper">
              Joshua Rose
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
