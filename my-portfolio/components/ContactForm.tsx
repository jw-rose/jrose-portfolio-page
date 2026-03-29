'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl p-8">
      <h3 className="text-gray-900 dark:text-[#F1F5F9] text-xl font-medium mb-6">Send me a message</h3>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-600 dark:text-[#94A3B8] text-xs mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className="w-full bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-[#F1F5F9] px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-[#06B6D4] transition-colors placeholder-gray-500 dark:placeholder-[#64748B]"
          />
        </div>

        <div>
          <label className="block text-gray-600 dark:text-[#94A3B8] text-xs mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className="w-full bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-[#F1F5F9] px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-[#06B6D4] transition-colors placeholder-gray-500 dark:placeholder-[#64748B]"
          />
        </div>

        <div>
          <label className="block text-gray-600 dark:text-[#94A3B8] text-xs mb-2">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Project inquiry"
            className="w-full bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-[#F1F5F9] px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-[#06B6D4] transition-colors placeholder-gray-500 dark:placeholder-[#64748B]"
          />
        </div>

        <div>
          <label className="block text-gray-600 dark:text-[#94A3B8] text-xs mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Tell me about your project..."
            className="w-full bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-[#F1F5F9] px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-[#06B6D4] transition-colors resize-none placeholder-gray-500 dark:placeholder-[#64748B]"
          />
        </div>

        {status === 'success' && (
          <div className="bg-green-500/20 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg text-sm">
            Message sent successfully! I'll get back to you soon.
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-500/20 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
            Failed to send message. Please try again.
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-[#06B6D4] text-white dark:text-[#0F172A] py-3.5 rounded-lg font-medium hover:bg-[#0891b2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Sending...' : 'Send Message →'}
        </button>
      </form>
    </div>
  );
}