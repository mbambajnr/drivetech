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
  ArrowRight 
} from 'lucide-react';
import { BRANCHES, COMPANY_INFO } from '@/data/branches';

export default function BranchesPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            Campuses & Contact
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Our Branches & Support Channels
          </h1>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Visit our training facilities in person or contact your closest branch directly. Each campus features dedicated classroom amenities, simulator setups, and private maneuvering tracks.
          </p>
        </div>

        {/* Branch Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {BRANCHES.map((branch) => (
            <div 
              key={branch.id} 
              id={branch.slug}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div className="p-7 sm:p-8 space-y-6">
                
                {/* Branch Header */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                      Metro Campus Location
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 mt-1">
                      {branch.name}
                    </h2>
                  </div>
                  <span className="shrink-0 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    Active Branch
                  </span>
                </div>

                {/* Contact Coordinates */}
                <div className="space-y-3.5 text-sm text-slate-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">Campus Address</div>
                      <p className="text-slate-600 text-xs sm:text-sm mt-0.5">{branch.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">Operating Hours</div>
                      <p className="text-slate-600 text-xs sm:text-sm mt-0.5">{branch.openingHours}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <PhoneCall className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">Direct Telephone Desk</div>
                      <a 
                        href={`tel:${branch.phone}`}
                        className="text-blue-600 hover:text-blue-800 font-bold text-sm mt-0.5 inline-block"
                      >
                        {branch.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Services available at this branch */}
                <div className="pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Courses Offered at this Campus
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {branch.servicesOffered.map((service, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${branch.phone}`}
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Admissions</span>
                </a>

                <a
                  href={branch.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Central Admissions Hotline Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Have Questions or Need Guidance?</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Our central admissions coordinators are on standby during operational hours to answer course requirements, pricing schedules, or assist with your application.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              href="/apply"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 font-bold text-slate-950 text-xs sm:text-sm transition-colors"
            >
              <span>Apply Online</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`mailto:${COMPANY_INFO.primaryEmail}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>{COMPANY_INFO.primaryEmail}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

