import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/50 dark:bg-white/5 border-t border-gray-200 dark:border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-500 dark:text-[#64748B] text-sm mb-3">
            © {currentYear} | Built with Next.js and Tailwind CSS
          </p>
          <div className="flex justify-center gap-6">
            <Link
              href="https://www.linkedin.com/in/josh-rose-4b715b32/"
              target="_blank"
              className="text-gray-600 dark:text-[#94A3B8] hover:text-[#06B6D4] transition-colors text-sm"
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/jw-rose"
              target="_blank"
              className="text-gray-600 dark:text-[#94A3B8] hover:text-[#06B6D4] transition-colors text-sm"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}