import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="text-center py-20 px-4">
      <h1 className="text-5xl md:text-6xl font-medium text-gray-900 dark:text-[#F1F5F9] mb-4 animate-fade-in">
        Hi, I'm Joshua Rose 👋
      </h1>
      <h2 className="text-3xl md:text-4xl font-medium mb-6 animate-slide-up">
        <span className="bg-linear-to-r from-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">
          Full Stack Web Developer
        </span>
      </h2>
      <p className="text-gray-600 dark:text-[#94A3B8] text-lg max-w-2xl mx-auto mb-8 leading-relaxed animate-slide-up">
        Crafting modern web experiences with JavaScript, React, Node.js, and Next.js. 
        Turning ideas into elegant, scalable solutions.
      </p>
      <div className="flex gap-4 justify-center animate-slide-up">
        <Link
          href="#projects"
          className="bg-[#06B6D4] text-white dark:text-[#0F172A] px-6 py-3 rounded-lg font-medium hover:bg-[#0891b2] transition-colors"
        >
          View Projects ↓
        </Link>
        <Link
          href="/contact"
          className="bg-gray-200 dark:bg-transparent text-gray-900 dark:text-[#F1F5F9] border border-gray-300 dark:border-white/20 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:border-white/40 transition-colors"
        >
          Contact Me →
        </Link>
      </div>
    </section>
  );
}