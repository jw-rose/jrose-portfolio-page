import ContactForm from '@/components/ContactForm';
import Link from 'next/link';
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaClock, FaFileDownload } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-medium text-gray-900 dark:text-[#F1F5F9] mb-4">
          Let's work together
        </h1>
        <p className="text-gray-600 dark:text-[#94A3B8] text-lg max-w-2xl mx-auto">
          Have a project in mind? I'd love to hear about it. Get in touch and let's make it happen.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        <div className="space-y-5">
          {/* Email */}
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#06B6D4]/20 rounded-lg flex items-center justify-center">
                <FaEnvelope className="text-[#06B6D4] text-xl" />
              </div>
              <div>
                <div className="text-gray-600 dark:text-[#94A3B8] text-xs mb-1">Email</div>
                <div className="text-gray-900 dark:text-[#F1F5F9] text-sm font-medium">your@email.com</div>
              </div>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#06B6D4]/20 rounded-lg flex items-center justify-center">
                <FaLinkedin className="text-[#06B6D4] text-xl" />
              </div>
              <div className="flex-1">
                <div className="text-gray-600 dark:text-[#94A3B8] text-xs mb-1">LinkedIn</div>
                <Link
                  href="https://www.linkedin.com/in/josh-rose-4b715b32/"
                  target="_blank"
                  className="text-[#06B6D4] text-sm font-medium hover:text-[#0891b2] transition-colors"
                >
                  linkedin.com/in/josh-rose
                </Link>
              </div>
            </div>
          </div>

          {/* CV Download */}
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#06B6D4]/20 rounded-lg flex items-center justify-center">
                <FaFileDownload className="text-[#06B6D4] text-xl" />
              </div>
              <div className="flex-1">
                <div className="text-gray-600 dark:text-[#94A3B8] text-xs mb-2">Resume</div>
                <a 
                  href="/Joshua-Rose-cv.pdf"
                  download
                  className="block bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/30 px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#06B6D4]/30 transition-colors text-center"
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#06B6D4]/20 rounded-lg flex items-center justify-center">
                <FaMapMarkerAlt className="text-[#06B6D4] text-xl" />
              </div>
              <div>
                <div className="text-gray-600 dark:text-[#94A3B8] text-xs mb-1">Location</div>
                <div className="text-gray-900 dark:text-[#F1F5F9] text-sm font-medium">Saint-Denis, France</div>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <FaClock className="text-green-500 dark:text-green-400 text-xl" />
              </div>
              <div>
                <div className="text-gray-600 dark:text-[#94A3B8] text-xs mb-1">Availability</div>
                <div className="text-green-600 dark:text-green-400 text-sm font-medium">Open to work</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="text-center mt-16">
        <p className="text-gray-600 dark:text-[#94A3B8] text-sm mb-4">Connect with me</p>
        <div className="flex justify-center gap-6">
          <Link
            href="https://www.linkedin.com/in/josh-rose-4b715b32/"
            target="_blank"
            className="w-12 h-12 bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg flex items-center justify-center text-gray-600 dark:text-[#94A3B8] hover:text-[#06B6D4] hover:border-[#06B6D4]/50 transition-all"
          >
            <FaLinkedin className="text-2xl" />
          </Link>
          <Link
            href="https://github.com/jw-rose"
            target="_blank"
            className="w-12 h-12 bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg flex items-center justify-center text-gray-600 dark:text-[#94A3B8] hover:text-[#06B6D4] hover:border-[#06B6D4]/50 transition-all"
          >
            <FaGithub className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
}