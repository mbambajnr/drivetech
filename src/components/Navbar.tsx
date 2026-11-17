'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Car, 
  PhoneCall, 
  Clock, 
  Lock, 
  MessageCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { COMPANY_INFO } from '@/data/branches';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isStaffSection = pathname.startsWith('/staff');

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Training Courses', href: '/courses' },
    { name: 'Licensing Guidance', href: '/licensing-assistance' },
    { name: 'Campuses & Contact', href: '/branches' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      
      {/* Top Utility Bar (Human, Institutional feel) */}
      <div className="hidden lg:block bg-slate-900 text-slate-300 border-b border-slate-800 text-[11px] py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Accreditation No. {COMPANY_INFO.accreditationNumber}</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Metropolis Central & West Logistics Campuses</span>
          </div>

          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Hours: Mon–Sat 8:00 AM – 5:30 PM</span>
            </span>
            <span className="text-slate-600">|</span>
            <a 
              href={`tel:${COMPANY_INFO.centralPhone}`} 
              className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Admissions: {COMPANY_INFO.centralPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Academy Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-blue-900 text-white flex items-center justify-center font-extrabold shadow-sm border border-blue-800 group-hover:bg-blue-800 transition-colors">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-slate-900 leading-none">
                DRIVE<span className="text-blue-700">TECH</span>
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                Vocational Academy
              </div>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-md text-sm font-semibold transition-colors ${
                    isActive 
                      ? 'text-blue-900 bg-slate-100 font-bold border-b-2 border-blue-700 rounded-b-none' 
                      : 'text-slate-700 hover:text-blue-900 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={COMPANY_INFO.generalWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Desk</span>
            </a>

            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-bold text-white bg-blue-800 hover:bg-blue-900 shadow-sm transition-all"
            >
              Enrol / Apply Online
            </Link>

            <Link
              href="/staff"
              className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
                isStaffSection
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'text-slate-400 hover:text-slate-800 hover:bg-slate-100 border-slate-200'
              }`}
              title="Staff Operations Workspace"
            >
              <Lock className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/apply"
              className="px-3 py-1.5 rounded-md text-xs font-bold text-white bg-blue-800"
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl space-y-4">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-semibold ${
                  pathname === link.href ? 'text-blue-900 bg-slate-100 font-bold' : 'text-slate-800 hover:bg-slate-50'
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
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300"
            >
              <MessageCircle className="w-4 h-4 text-emerald-700" />
              Chat on WhatsApp
            </a>

            <Link
              href="/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-2.5 px-4 rounded-lg text-sm font-bold text-white bg-blue-800"
            >
              Apply for Training
            </Link>

            <Link
              href="/licensing-assistance/request"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-slate-800 bg-slate-100"
            >
              Request Licensing Guidance
            </Link>

            <Link
              href="/staff"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg text-xs font-semibold text-slate-500"
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
