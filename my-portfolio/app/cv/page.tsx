import type { Metadata } from 'next';
import CvPageContent from '@/components/cv/CvPageContent';

export const metadata: Metadata = {
  title: 'CV — Joshua Rose',
  description:
    "Joshua Rose's CV: profile, career timeline, strengths and the technical skills demonstrated across his projects.",
};

export default function CvPage() {
  return <CvPageContent />;
}
