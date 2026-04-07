import ContactForm from '@/components/ContactForm';
import Link from 'next/link';
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaClock, FaFileDownload } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 dark:text-white mb-4">
          Let's work together
        </h1>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto px-4">
          Have a project in mind? I'd love to hear about it. Get in touch and let's make it happen.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        <div className="space-y-4 sm:space-y-5">
          {/* Contact info cards */}
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#06B6D4]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaEnvelope className="text-[#06B6D4] text-xl" />
              </div>
              <div className="min-w-0">
                <div className="text-gray-600 dark:text-gray-400 text-xs mb-1">Email</div>
                <div className="text-gray-900 dark:text-white text-sm font-medium truncate">
                  josh@devjrose.com
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#06B6D4]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaLinkedin className="text-[#06B6D4] text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-gray-600 dark:text-gray-400 text-xs mb-1">LinkedIn</div>
                <Link
                  href="https://www.linkedin.com/in/josh-rose-4b715b32/"
                  target="_blank"
                  className="text-[#06B6D4] text-sm font-medium hover:text-[#0891b2] transition-colors truncate block"
                >
                  linkedin.com/in/josh-rose
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#06B6D4]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaFileDownload className="text-[#06B6D4] text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-gray-600 dark:text-gray-400 text-xs mb-2">Resume</div>
                <a 
                  href="/CV-Joshua-Rose-FR.pdf"
                  download
                  className="block bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/30 px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#06B6D4]/30 transition-colors text-center"
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#06B6D4]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt className="text-[#06B6D4] text-xl" />
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400 text-xs mb-1">Location</div>
                <div className="text-gray-900 dark:text-white text-sm font-medium">
                  Saint-Denis, France
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaClock className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400 text-xs mb-1">Availability</div>
                <div className="text-green-600 dark:text-green-400 text-sm font-medium">
                  Open to work
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="text-center mt-12 sm:mt-16">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Connect with me</p>
        <div className="flex justify-center gap-6">
          <Link
            href="https://www.linkedin.com/in/josh-rose-4b715b32/"
            target="_blank"
            className="w-12 h-12 bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#06B6D4] hover:border-[#06B6D4]/50 transition-all"
          >
            <FaLinkedin className="text-2xl" />
          </Link>
          <Link
            href="https://github.com/jw-rose"
            target="_blank"
            className="w-12 h-12 bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#06B6D4] hover:border-[#06B6D4]/50 transition-all"
          >
            <FaGithub className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
}