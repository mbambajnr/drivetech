import Link from 'next/link';
import { Car, PhoneCall, Mail, MapPin, ShieldAlert, MessageCircle } from 'lucide-react';
import { COMPANY_INFO, BRANCHES } from '@/data/branches';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Drive<span className="text-blue-400">Tech</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Certified driver training, motorcycle handling, and heavy equipment machinery certification academy across multiple metropolitan branches.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={COMPANY_INFO.generalWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                WhatsApp Admissions
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Training Courses
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/courses#driving" className="hover:text-blue-400 transition-colors">
                  Light Vehicle Driving (Class B)
                </Link>
              </li>
              <li>
                <Link href="/courses#driving" className="hover:text-blue-400 transition-colors">
                  Defensive Driving & Refresher
                </Link>
              </li>
              <li>
                <Link href="/courses#motorcycle" className="hover:text-blue-400 transition-colors">
                  Motorcycle Riding (Class A)
                </Link>
              </li>
              <li>
                <Link href="/courses#heavy-equipment" className="hover:text-blue-400 transition-colors">
                  Hydraulic Excavator Certification
                </Link>
              </li>
              <li>
                <Link href="/courses#heavy-equipment" className="hover:text-blue-400 transition-colors">
                  Forklift Operator Training
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-blue-400 hover:underline font-semibold block pt-1">
                  View All Courses →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Assistance & Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Licensing & Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/licensing-assistance" className="hover:text-blue-400 transition-colors">
                  Licensing Guidance Overview
                </Link>
              </li>
              <li>
                <Link href="/licensing-assistance/request" className="hover:text-blue-400 transition-colors">
                  Request Licensing Assistance
                </Link>
              </li>
              <li>
                <Link href="/branches" className="hover:text-blue-400 transition-colors">
                  Campus Locations & Hours
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-blue-400 transition-colors">
                  Online Training Application
                </Link>
              </li>
              <li>
                <Link href="/staff" className="text-slate-400 hover:text-white transition-colors">
                  Staff Workspace Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Central Branch Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Central Branch
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{BRANCHES[0].address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${BRANCHES[0].phone}`} className="hover:text-blue-400 transition-colors">
                  {BRANCHES[0].phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{COMPANY_INFO.primaryEmail}</span>
              </div>
              <p className="text-xs text-slate-400 pt-1">
                {BRANCHES[0].openingHours}
              </p>
            </div>
          </div>

        </div>

        {/* Regulatory Disclaimer Banner (Mandated by PRD Section 7.3) */}
        <div className="my-8 p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-amber-300">Official Authority & Regulatory Disclaimer: </span>
            {COMPANY_INFO.authorityDisclaimer}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} DriveTech Academy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Prepared for DriveTech by Bali-Can Limited</span>
            <Link href="/staff" className="hover:text-slate-300 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
