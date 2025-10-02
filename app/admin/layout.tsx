import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Pines VA',
  description: 'Admin dashboard for managing Pines Virtual Assistant Services',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-poppins">
      {children}
    </div>
  );
}
