import Link from 'next/link';
import { 
  MapPin, 
  PhoneCall, 
  MessageCircle, 
  Clock, 
  CheckCircle2, 
  Car, 
  Mail, 
  ShieldCheck, 
  ArrowRight,
  Building2,
  Navigation
} from 'lucide-react';
import { BRANCHES, COMPANY_INFO } from '@/data/branches';

export default function BranchesPage() {
  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
            Campus Locations &amp; Facilities
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            DriveTech Academy Campuses
          </h1>
          <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
            Visit our training facilities in person for timetable consultation or contact your nearest campus admissions desk directly. Both campuses feature dedicated classrooms, computerized theory test terminals, and private off-road maneuvering tracks.
          </p>
        </div>

        {/* Branch Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {BRANCHES.map((branch) => (
            <div 
              key={branch.id} 
              id={branch.slug}
              className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col justify-between"
            >
              <div className="space-y-5">
                
                {/* Branch Header */}
                <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                      Campus Location
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 mt-1">
                      {branch.name}
                    </h2>
                  </div>
                  <span className="shrink-0 px-2.5 py-0.5 rounded text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200">
                    Open Mon–Sat
                  </span>
                </div>

                {/* Coordinates */}
                <div className="space-y-3 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Physical Address</div>
                      <p className="text-slate-600 mt-0.5">{branch.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Navigation className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Transit &amp; Parking</div>
                      <p className="text-slate-600 mt-0.5">{branch.transitNotes}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Operating Hours</div>
                      <p className="text-slate-600 mt-0.5">{branch.openingHours}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <PhoneCall className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Campus Admissions Telephone</div>
                      <a href={`tel:${branch.phone}`} className="text-blue-900 font-bold hover:underline mt-0.5 block">
                        {branch.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Campus Facilities */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    On-Site Training Amenities
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-600">
                    {branch.facilities.map((fac, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                        <span>{fac}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${branch.phone}`}
                  className="inline-flex items-center justify-center gap-2 py-2 px-4 rounded border border-slate-300 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call {branch.phone}</span>
                </a>

                <a
                  href={branch.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-2 px-4 rounded bg-emerald-700 hover:bg-emerald-800 text-xs font-bold text-white transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Central Admissions Contact Panel */}
        <div className="bg-slate-900 text-white rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold">Need Enrolment Advice or Schedule Clarification?</h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Our central admissions coordinators answer program queries, discuss corporate fleet training requirements, or assist with your application.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              href="/apply"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded bg-amber-400 hover:bg-amber-300 font-bold text-slate-950 text-xs transition-colors"
            >
              <span>Enrol Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href={`mailto:${COMPANY_INFO.primaryEmail}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-medium transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{COMPANY_INFO.primaryEmail}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
