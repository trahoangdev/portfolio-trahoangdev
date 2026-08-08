import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Resume of Tra Hoang Trong, software engineer and product builder.',
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
