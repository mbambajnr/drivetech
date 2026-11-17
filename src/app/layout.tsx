import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'DriveTech Digital Platform — Professional Driver & Equipment Training',
  description: 'Explore certified driving, motorcycle, and heavy equipment courses, licensing assistance, and branch admissions at DriveTech.',
  keywords: 'driving school, motorcycle lessons, excavator training, forklift certification, driver license assistance'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

