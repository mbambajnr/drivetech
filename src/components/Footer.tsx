import Link from 'next/link';
import { Car, PhoneCall, Mail, MapPin, ShieldAlert, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO, BRANCHES } from '@/data/branches';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Institutional Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-blue-800 text-white flex items-center justify-center font-bold">
                <Car className="w-4 h-4" />
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                DRIVETECH <span className="text-slate-400 font-normal text-xs uppercase tracking-wider block">Vocational Academy</span>
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              {COMPANY_INFO.legalName} is an accredited vocational institution dedicated to passenger vehicle driver training, commercial motorcycle instruction, and heavy plant equipment certification.
            </p>

            <div className="pt-1 text-[11px] text-slate-400 space-y-1">
              <div><strong>Accreditation:</strong> {COMPANY_INFO.accreditationNumber}</div>
              <div><strong>Operating Days:</strong> Monday through Saturday</div>
            </div>
          </div>

          {/* Col 2: Approved Programs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Approved Programs
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/courses/standard-car-driving" className="hover:text-white transition-colors">
                  Standard Light Vehicle Driving (Class B)
                </Link>
              </li>
              <li>
                <Link href="/courses/defensive-driving-mastery" className="hover:text-white transition-colors">
                  Defensive Driving &amp; Refresher Course
                </Link>
              </li>
              <li>
                <Link href="/courses/beginner-motorcycle-training" className="hover:text-white transition-colors">
                  Beginner Motorcycle Riding (Class A)
                </Link>
              </li>
              <li>
                <Link href="/courses/excavator-operator-training" className="hover:text-white transition-colors">
                  Hydraulic Excavator Certification (Class C)
                </Link>
              </li>
              <li>
                <Link href="/courses/forklift-operator-training" className="hover:text-white transition-colors">
                  Counterbalance Forklift Operator Training
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-amber-400 hover:underline font-semibold block pt-1">
                  View Complete Fee Schedule &amp; Syllabus →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Licensing & Enrolment */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Licensing &amp; Intake
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/licensing-assistance" className="hover:text-white transition-colors">
                  Licensing Advisory Desk Overview
                </Link>
              </li>
              <li>
                <Link href="/licensing-assistance/request" className="hover:text-white transition-colors">
                  Request Licensing Assistance Form
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-white transition-colors">
                  Online Training Intake Application
                </Link>
              </li>
              <li>
                <Link href="/branches" className="hover:text-white transition-colors">
                  Campus Facilities &amp; Directions
                </Link>
              </li>
              <li>
                <Link href="/staff" className="hover:text-white transition-colors">
                  Staff Operations Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Contact Coordinates */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Admissions Contacts
            </h4>
            <div className="space-y-3 text-slate-300">
              <div className="space-y-1">
                <div className="text-white font-semibold">Central Training Academy</div>
                <div className="text-slate-400 text-[11px]">{BRANCHES[0].address}</div>
                <div className="text-amber-400 font-mono text-[11px]">Tel: {BRANCHES[0].phone}</div>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-800">
                <div className="text-white font-semibold">West City Logistics Campus</div>
                <div className="text-slate-400 text-[11px]">{BRANCHES[1].address}</div>
                <div className="text-amber-400 font-mono text-[11px]">Tel: {BRANCHES[1].phone}</div>
              </div>

              <div className="pt-2">
                <a
                  href={COMPANY_INFO.generalWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[11px] font-semibold hover:bg-emerald-900"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct WhatsApp Admissions</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Official Statutory Regulatory Notice Banner */}
        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 leading-relaxed space-y-1.5">
          <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-[11px]">
            <ShieldCheck className="w-4 h-4" />
            <span>Statutory Legal Notice &amp; Regulatory Jurisdiction</span>
          </div>
          <p className="text-[11px]">
            {COMPANY_INFO.authorityDisclaimer}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-3">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Prepared for DriveTech by Bali-Can Limited</span>
            <span>·</span>
            <Link href="/staff" className="hover:text-slate-300">
              Staff Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
