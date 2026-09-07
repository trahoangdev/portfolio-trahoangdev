import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Resume',
  description: 'Resume of Tra Hoang Trong, software engineer and product builder.',
  path: '/resume',
});

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
