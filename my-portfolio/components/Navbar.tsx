'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaDownload } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white/50 dark:bg-white/5 backdrop-blur-md border-b border-gray-200 dark:border-white/10 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="text-[#06B6D4] font-medium text-lg hover:text-[#0891b2] transition-colors"
          >
            JoshuaRose.dev
          </Link>
          
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm transition-colors ${
                  pathname === item.path
                    ? 'text-gray-900 dark:text-[#F1F5F9] opacity-90'
                    : 'text-gray-600 dark:text-[#94A3B8] hover:text-gray-900 dark:hover:text-[#F1F5F9]'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Theme Toggle */}
            <ThemeToggle />

            <a 
              href="/Joshua-Rose-cv.pdf"
              download
              className="bg-[#06B6D4] text-white dark:text-[#0F172A] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0891b2] transition-colors flex items-center gap-2"
            >
              <FaDownload className="text-xs" />
              Download CV
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}