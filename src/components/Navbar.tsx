'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ShieldCheck, 
  Car, 
  PhoneCall, 
  FileText, 
  MapPin, 
  Lock,
  MessageCircle
} from 'lucide-react';
import { COMPANY_INFO } from '@/data/branches';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isStaffSection = pathname.startsWith('/staff');

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Training Courses', href: '/courses' },
    { name: 'Licensing Assistance', href: '/licensing-assistance' },
    { name: 'Branches & Contact', href: '/branches' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Official Logo (SVG) */}
          <Link href="/" className="flex items-center group py-1" aria-label="DriveTech Home">
            <div className="relative h-12 w-32 sm:h-14 sm:w-36 flex items-center">
              <Image 
                src="/images/logo.svg" 
                alt="DriveTech Official Logo" 
                width={160} 
                height={80} 
                className="object-contain w-full h-full transform group-hover:scale-105 transition-transform"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive 
                      ? 'text-blue-700 bg-blue-50 font-bold' 
                      : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={COMPANY_INFO.generalWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with DriveTech on WhatsApp"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              <span>WhatsApp</span>
            </a>

            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-600/30 transition-all hover:shadow-md"
            >
              Apply for Training
            </Link>

            <Link
              href="/staff"
              className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
                isStaffSection
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
              }`}
              title="Staff Dashboard"
            >
              <Lock className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/apply"
              className="px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700"
            >
              Apply
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="space-y-1 mb-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-semibold ${
                  pathname === link.href ? 'text-blue-700 bg-blue-50 font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <a
              href={COMPANY_INFO.generalWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              Chat on WhatsApp
            </a>

            <Link
              href="/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow"
            >
              Apply for Training
            </Link>

            <Link
              href="/licensing-assistance/request"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
            >
              Request Licensing Assistance
            </Link>

            <Link
              href="/staff"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              <Lock className="w-3.5 h-3.5" />
              Staff Dashboard Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

