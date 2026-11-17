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
  FileCheck,
  ShieldCheck,
  Check
} from 'lucide-react';
import { LICENSING_SERVICES } from '@/data/courses';
import { BRANCHES, COMPANY_INFO } from '@/data/branches';

export default function LicensingAssistancePage() {
  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
            Advisory &amp; Compliance Services
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Driver Licensing Assistance &amp; Advisory Desk
          </h1>
          <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
            Navigating statutory licensing bureau requirements can be complex. DriveTech provides document readiness audits, procedural compliance checks, and theoretical test coaching for first-time applicants, endorsements, and expatriate licence conversions.
          </p>
        </div>

        {/* Mandatory Statutory Notice (PRD Section 7.1 FR-PUB-004 & FR-LIC-002) */}
        <div className="bg-amber-50 rounded-lg border-2 border-amber-300 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded bg-amber-600 text-white flex items-center justify-center shrink-0 font-bold mt-0.5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-amber-900">
                Official Regulatory Boundary Notice
              </div>
              <blockquote className="text-sm font-bold text-amber-950 italic border-l-4 border-amber-500 pl-3">
                “Submitting this request starts DriveTech’s follow-up process. Licence approval and issuance remain subject to the requirements and decisions of the relevant authority.”
              </blockquote>
              <p className="text-xs text-amber-900 leading-relaxed pt-1">
                DriveTech Academy is an accredited private driver training institution. We do not issue government driver licences, provisional permits, conduct statutory examiner road tests, or waive licensing authority regulations. All official permissions and credentials remain strictly under the jurisdiction of the national licensing bureau.
              </p>
            </div>
          </div>
        </div>

        {/* Services We Provide */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xl font-bold text-slate-900">
              Assistance &amp; Advisory Scope
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select an area below where our compliance officers can assist your preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LICENSING_SERVICES.map((service) => (
              <div 
                key={service.id} 
                className="bg-white rounded-lg border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:border-slate-400 transition-colors"
              >
                <div className="space-y-3.5">
                  <div className="w-8 h-8 rounded bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  
                  <h3 className="text-base font-bold text-slate-900">
                    {service.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {service.summary}
                  </p>
                  
                  <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-700">
                    <div>
                      <strong className="text-slate-900">Eligibility:</strong> {service.eligibility}
                    </div>
                    <div>
                      <strong className="text-slate-900">Advisory Fee:</strong> {service.feeGuidance}
                    </div>
                    <div>
                      <strong className="text-slate-900">Review Timeline:</strong> {service.turnaround}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href={`/licensing-assistance/request?service=${service.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded bg-blue-800 hover:bg-blue-900 text-xs font-bold text-white transition-colors"
                  >
                    <span>Request Assistance</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Guidance */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg font-bold text-slate-900">
              The Advisory &amp; Submission Procedure
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              How our licensing coordinators support your application file.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-slate-600">
            <div className="space-y-1.5 p-4 rounded bg-slate-50 border border-slate-100">
              <span className="font-bold text-blue-900 uppercase">Phase 1</span>
              <div className="font-bold text-slate-900 text-sm">Submit Online Request</div>
              <p>Provide your current licence status, foreign permit country (if converting), and target category.</p>
            </div>

            <div className="space-y-1.5 p-4 rounded bg-slate-50 border border-slate-100">
              <span className="font-bold text-blue-900 uppercase">Phase 2</span>
              <div className="font-bold text-slate-900 text-sm">Prerequisite Audit</div>
              <p>Coordinator verifies national authority prerequisites, medical examination requirements, and required forms.</p>
            </div>

            <div className="space-y-1.5 p-4 rounded bg-slate-50 border border-slate-100">
              <span className="font-bold text-blue-900 uppercase">Phase 3</span>
              <div className="font-bold text-slate-900 text-sm">File Compilation</div>
              <p>We compile and review your dossier (certified translations, identification, eye test, application forms).</p>
            </div>

            <div className="space-y-1.5 p-4 rounded bg-slate-50 border border-slate-100">
              <span className="font-bold text-blue-900 uppercase">Phase 4</span>
              <div className="font-bold text-slate-900 text-sm">Bureau Lodgement</div>
              <p>You present your verified, complete file to the official licensing department with zero documentation errors.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
