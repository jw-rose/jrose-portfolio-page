import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="text-center py-12 sm:py-16 md:py-20 px-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-gray-900 dark:text-white mb-4 animate-fade-in">
        Hi, I'm Joshua Rose 👋
      </h1>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-4 sm:mb-6 animate-slide-up">
        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Full Stack Web Developer
        </span>
      </h2>
      <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed animate-slide-up px-4">
        Crafting modern web experiences with JavaScript, React, Node.js, and Next.js. 
        Turning ideas into elegant, scalable solutions.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up px-4">
        <Link
          href="#projects"
          className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          View Projects ↓
        </Link>
        <Link
          href="/contact"
          className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          Contact Me →
        </Link>
      </div>
    </section>
  );
}