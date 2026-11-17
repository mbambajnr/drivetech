import Link from 'next/link';
import { 
  FileText, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  Clock, 
  MapPin, 
  PhoneCall, 
  MessageCircle,
  FileCheck
} from 'lucide-react';
import { LICENSING_SERVICES } from '@/data/courses';
import { BRANCHES, COMPANY_INFO } from '@/data/branches';

export default function LicensingAssistancePage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            Licensing Advisory & Guidance Desk
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Official Licensing Assistance & Advisory
          </h1>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Navigating statutory licensing requirements can be complex. DriveTech provides dedicated administrative support, document readiness audits, and procedural guidance for prospective and current drivers.
          </p>
        </div>

        {/* Mandatory Authority Disclaimer (FR-PUB-004 & FR-LIC-002) */}
        <div className="bg-amber-50 rounded-2xl border-2 border-amber-300/80 p-6 sm:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-amber-950">
                Important Regulatory Notice & Disclaimer
              </h2>
              <blockquote className="text-sm font-semibold text-amber-900 italic border-l-4 border-amber-500 pl-3">
                “Submitting this request starts DriveTech’s follow-up process. Licence approval and issuance remain subject to the requirements and decisions of the relevant authority.”
              </blockquote>
              <p className="text-xs text-amber-800 leading-relaxed pt-1">
                DriveTech is an independent vocational training and advisory institution. We do not issue government licences, grant driving permits, conduct statutory driving examiner tests, or override authority regulations. Our services are strictly educational and advisory in nature.
              </p>
            </div>
          </div>
        </div>

        {/* Services We Provide */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-bold text-slate-900">
              Assistance Services Available
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select an area where our admissions and compliance team can support your preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LICENSING_SERVICES.map((service, idx) => (
              <div 
                key={service.id} 
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:border-blue-300 transition-colors"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {service.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {service.summary}
                  </p>
                  
                  <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-700">
                    <div>
                      <strong className="text-slate-900">Eligibility:</strong> {service.eligibility}
                    </div>
                    <div>
                      <strong className="text-slate-900">Fee Guidance:</strong> {service.feeGuidance}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href={`/licensing-assistance/request?service=${service.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition-colors"
                  >
                    <span>Request Assistance</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Assistance Journey */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
          <div className="max-w-2xl mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Our Process</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">How the Assistance Process Works</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="text-xs font-extrabold text-blue-400">STEP 1</div>
              <h4 className="text-base font-bold text-white">Submit Request</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fill out our brief online request form detailing your current license status and requirement.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="text-xs font-extrabold text-blue-400">STEP 2</div>
              <h4 className="text-base font-bold text-white">Advisory Call</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                A DriveTech coordinator contacts you within 24 hours to review eligibility and authority prerequisites.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="text-xs font-extrabold text-blue-400">STEP 3</div>
              <h4 className="text-base font-bold text-white">Document Checklist</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Receive a customized checklist of forms, medical certificates, and translation requirements needed by the bureau.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="text-xs font-extrabold text-blue-400">STEP 4</div>
              <h4 className="text-base font-bold text-white">Bureau Submission</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Complete and submit your file directly with the official licensing department with full readiness.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Questions before requesting? Speak to our licensing advisor directly.
            </div>
            <div className="flex items-center gap-3">
              <a
                href={COMPANY_INFO.generalWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Desk</span>
              </a>
              <Link
                href="/licensing-assistance/request"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold inline-flex items-center gap-2"
              >
                <span>Request Online</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

