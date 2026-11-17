'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ShieldAlert, 
  PhoneCall, 
  MessageCircle, 
  ArrowRight, 
  Send,
  Copy,
  Check,
  ShieldCheck
} from 'lucide-react';
import { LICENSING_SERVICES } from '@/data/courses';
import { BRANCHES, COMPANY_INFO } from '@/data/branches';

function LicensingRequestForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    selectedServiceId: preselectedService || (LICENSING_SERVICES[0]?.id ?? ''),
    preferredBranchId: BRANCHES[0]?.id ?? '',
    customerMessage: '',
    consentAcknowledged: false,
    authorityDisclaimerAcknowledged: false,
    _hp_website: ''
  });

  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      const match = LICENSING_SERVICES.find((s) => s.id === preselectedService);
      if (match) {
        setFormData((prev) => ({ ...prev, selectedServiceId: match.id }));
      }
    }
  }, [preselectedService]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full legal name.';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 6) {
      errs.phone = 'Please enter a valid telephone contact number.';
    }
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = 'Please enter a valid email address or leave blank.';
      }
    }
    if (!formData.selectedServiceId) {
      errs.selectedServiceId = 'Please select a licensing assistance service.';
    }
    if (!formData.preferredBranchId) {
      errs.preferredBranchId = 'Please select your preferred branch location.';
    }
    if (!formData.authorityDisclaimerAcknowledged) {
      errs.authorityDisclaimerAcknowledged = 'You must acknowledge the official authority disclaimer before submitting.';
    }
    if (!formData.consentAcknowledged) {
      errs.consentAcknowledged = 'Consent is required to allow our licensing coordinator to contact you.';
    }
    setClientErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'licensing',
          ...formData
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        if (data.errors) {
          setClientErrors(data.errors);
        } else {
          setServerError(data.error || 'Unable to submit your request. Please try again.');
        }
      } else {
        setSubmittedRef(data.referenceNumber);
      }
    } catch (err) {
      setServerError('Network error occurred. Please verify your connection or contact us by telephone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyRefToClipboard = () => {
    if (submittedRef) {
      navigator.clipboard.writeText(submittedRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // SUCCESS CONFIRMATION STATE (FR-LIC-003 & FR-FORM-004)
  if (submittedRef) {
    const selectedServiceObj = LICENSING_SERVICES.find((s) => s.id === formData.selectedServiceId);
    const selectedBranchObj = BRANCHES.find((b) => b.id === formData.preferredBranchId);

    return (
      <div className="py-12 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-lg border border-slate-300 shadow-sm overflow-hidden">
          
          <div className="bg-slate-900 text-white p-6 sm:p-8 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-amber-600 text-white flex items-center justify-center font-bold">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
                  Advisory Request Logged
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  Licensing Guidance Request Received
                </h1>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6 text-xs text-slate-700">
            
            {/* Reference Number Box */}
            <div className="bg-slate-50 border border-slate-300 rounded p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Enquiry Reference Docket
                </span>
                <span className="text-xl font-mono font-black text-amber-900 tracking-wider">
                  {submittedRef}
                </span>
              </div>
              <button
                type="button"
                onClick={copyRefToClipboard}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Reference</span>
                  </>
                )}
              </button>
            </div>

            {/* Request Summary Box */}
            <div className="border border-slate-200 rounded p-4 bg-white space-y-2">
              <div className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-1.5">
                Licensing Request Summary
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div><strong>Requester:</strong> {formData.fullName}</div>
                <div><strong>Telephone:</strong> {formData.phone}</div>
                <div><strong>Advisory Service:</strong> {selectedServiceObj?.name}</div>
                <div><strong>Campus:</strong> {selectedBranchObj?.name}</div>
                {formData.email && <div><strong>Email:</strong> {formData.email}</div>}
              </div>
            </div>

            {/* Follow-up Procedure */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Advisory Procedure Timeline
              </h2>
              <div className="space-y-3 border-l-2 border-slate-300 pl-4 text-xs text-slate-600">
                <div>
                  <div className="font-bold text-slate-900">1. Prerequisite &amp; Bureau Compliance Audit</div>
                  <p>Our licensing officer audits authority rules and document checklists for <strong>{selectedServiceObj?.name}</strong>.</p>
                </div>
                <div>
                  <div className="font-bold text-slate-900">2. Consultation Call Within 24 Business Hours</div>
                  <p>We contact you at <strong>{formData.phone}</strong> to guide you through required forms, medical certificates, or translation needs.</p>
                </div>
                <div>
                  <div className="font-bold text-slate-900">3. Bureau Lodgement File Preparation</div>
                  <p>We prepare a complete, error-free file ready for direct submission to the official government licensing bureau.</p>
                </div>
              </div>
            </div>

            {/* Statutory Disclaimer Box */}
            <div className="p-3.5 rounded bg-amber-50 border border-amber-300 text-amber-950 text-[11px] leading-relaxed space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                <span>Statutory Authority Reminder</span>
              </div>
              <p>
                DriveTech Academy is an accredited advisory and training institution. All official driver licences, test results, and final credentials remain strictly subject to the statutory criteria and decisions of the official national licensing authority.
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="flex-1 text-center py-2.5 px-4 rounded border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Return to Academy Home
              </Link>
              <a
                href={`${selectedBranchObj?.whatsappLink || COMPANY_INFO.generalWhatsApp}&text=${encodeURIComponent(`Hello DriveTech Licensing Desk, I submitted an assistance request under reference ${submittedRef}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 px-4 rounded bg-emerald-700 hover:bg-emerald-800 text-xs font-bold text-white shadow-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message Licensing Desk on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ACTIVE REQUEST FORM
  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Header */}
        <div className="space-y-2 border-b border-slate-200 pb-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            Licensing Advisory Intake
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Request Licensing Assistance
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Submit your information below to speak with an advisory specialist. We assist with paperwork readiness, bilateral conversions, and theoretical preparation.
          </p>
        </div>

        {/* Server Error Alert */}
        {serverError && (
          <div className="p-3 rounded bg-rose-50 border border-rose-300 text-xs text-rose-800 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Submission Blocked</div>
              <div>{serverError}</div>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            
            {/* Honeypot field */}
            <input
              type="text"
              name="_hp_website"
              value={formData._hp_website}
              onChange={(e) => setFormData({ ...formData, _hp_website: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            {/* Section 1: Service and Campus */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-900" />
                <span>1. Service Category &amp; Location</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="selectedServiceId" className="block text-xs font-bold text-slate-800 mb-1">
                    Assistance Program <span className="text-rose-600">*</span>
                  </label>
                  <select
                    id="selectedServiceId"
                    value={formData.selectedServiceId}
                    onChange={(e) => setFormData({ ...formData, selectedServiceId: e.target.value })}
                    className={`w-full px-3 py-2 rounded border text-xs sm:text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-900 ${
                      clientErrors.selectedServiceId ? 'border-rose-400' : 'border-slate-300'
                    }`}
                  >
                    {LICENSING_SERVICES.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                  {clientErrors.selectedServiceId && (
                    <p className="mt-1 text-[11px] text-rose-600">{clientErrors.selectedServiceId}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="preferredBranchId" className="block text-xs font-bold text-slate-800 mb-1">
                    Nearest Campus <span className="text-rose-600">*</span>
                  </label>
                  <select
                    id="preferredBranchId"
                    value={formData.preferredBranchId}
                    onChange={(e) => setFormData({ ...formData, preferredBranchId: e.target.value })}
                    className={`w-full px-3 py-2 rounded border text-xs sm:text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-900 ${
                      clientErrors.preferredBranchId ? 'border-rose-400' : 'border-slate-300'
                    }`}
                  >
                    {BRANCHES.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                  {clientErrors.preferredBranchId && (
                    <p className="mt-1 text-[11px] text-rose-600">{clientErrors.preferredBranchId}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Requester Details */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-900" />
                <span>2. Requester Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-xs font-bold text-slate-800 mb-1">
                    Full Legal Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="e.g. Fatima Al-Mansoor"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full px-3 py-2 rounded border text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-900 ${
                      clientErrors.fullName ? 'border-rose-400' : 'border-slate-300'
                    }`}
                  />
                  {clientErrors.fullName && (
                    <p className="mt-1 text-[11px] text-rose-600">{clientErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-slate-800 mb-1">
                    Contact Phone (Call / WhatsApp) <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="e.g. +1 555-018-4412"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3 py-2 rounded border text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-900 ${
                      clientErrors.phone ? 'border-rose-400' : 'border-slate-300'
                    }`}
                  />
                  {clientErrors.phone && (
                    <p className="mt-1 text-[11px] text-rose-600">{clientErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-800 mb-1">
                    Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g. fatima@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 py-2 rounded border text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-900 ${
                      clientErrors.email ? 'border-rose-400' : 'border-slate-300'
                    }`}
                  />
                  {clientErrors.email && (
                    <p className="mt-1 text-[11px] text-rose-600">{clientErrors.email}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="customerMessage" className="block text-xs font-bold text-slate-800 mb-1">
                    Licence Context, Foreign Country or Renewal Notes <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="customerMessage"
                    rows={2}
                    placeholder="Describe your current license status, country of foreign permit (if converting), or endorsement questions..."
                    value={formData.customerMessage}
                    onChange={(e) => setFormData({ ...formData, customerMessage: e.target.value })}
                    maxLength={500}
                    className="w-full px-3 py-2 rounded border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-900"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Official Authority Disclaimer Acknowledgement (Mandated by FR-LIC-002) */}
            <div className="p-4 rounded bg-amber-50 border border-amber-300 space-y-3">
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                  Mandatory Statutory Notice
                </div>
                <blockquote className="text-xs font-bold text-amber-950 italic border-l-2 border-amber-500 pl-2">
                  “Submitting this request starts DriveTech’s follow-up process. Licence approval and issuance remain subject to the requirements and decisions of the relevant authority.”
                </blockquote>
              </div>

              <div className="pt-2 border-t border-amber-200">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.authorityDisclaimerAcknowledged}
                    onChange={(e) => setFormData({ ...formData, authorityDisclaimerAcknowledged: e.target.checked })}
                    className="w-4 h-4 rounded border-amber-400 text-amber-900 focus:ring-amber-900 mt-0.5 shrink-0"
                  />
                  <span className="text-[11px] text-amber-950 leading-relaxed font-semibold">
                    I acknowledge that DriveTech is an advisory and training service, and that official driver licence approval, test results, and final issuance remain strictly under the jurisdiction of the national licensing authority. <span className="text-rose-600">*</span>
                  </span>
                </label>
                {clientErrors.authorityDisclaimerAcknowledged && (
                  <p className="text-[11px] text-rose-600 font-medium pl-6 mt-1">{clientErrors.authorityDisclaimerAcknowledged}</p>
                )}
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consentAcknowledged}
                  onChange={(e) => setFormData({ ...formData, consentAcknowledged: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-blue-900 focus:ring-blue-900 mt-0.5 shrink-0"
                />
                <span className="text-[11px] text-slate-700 leading-relaxed">
                  I consent to DriveTech Academy storing my contact details and contacting me regarding this licensing guidance request. <span className="text-rose-600">*</span>
                </span>
              </label>
              {clientErrors.consentAcknowledged && (
                <p className="text-[11px] text-rose-600 font-medium pl-6">{clientErrors.consentAcknowledged}</p>
              )}
            </div>

            {/* Submit Action */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 shadow transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Transmitting Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Licensing Assistance Request</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}

export default function LicensingRequestPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-slate-500">Loading form...</div>}>
      <LicensingRequestForm />
    </Suspense>
  );
}
