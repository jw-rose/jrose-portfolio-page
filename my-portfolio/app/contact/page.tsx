import type { Metadata } from 'next';
import ContactPageContent from '@/components/ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact — Joshua Rose',
  description:
    "Get in touch with Joshua Rose about products, projects, or opportunities to build together.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
