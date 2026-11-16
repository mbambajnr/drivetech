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
  Check
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
      setServerError('Network error occurred. Please verify your connection or call us directly.');
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
      <div className="py-12 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-8 sm:p-10 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-white/20 text-white border-2 border-white mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Licensing Assistance Request Received!
            </h1>
            <p className="text-sm text-amber-100 max-w-lg mx-auto">
              Thank you, <strong>{formData.fullName}</strong>. Your enquiry for {selectedServiceObj?.name} has been assigned to our licensing guidance team.
            </p>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            
            {/* Reference Number Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Enquiry Reference Code
                </span>
                <span className="text-xl sm:text-2xl font-mono font-black text-amber-700 tracking-wider">
                  {submittedRef}
                </span>
              </div>
              <button
                type="button"
                onClick={copyRefToClipboard}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Expected Follow-up */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">
                What Happens Next
              </h2>
              <div className="space-y-4 border-l-2 border-amber-300 pl-4 ml-2 text-sm text-slate-700">
                <div className="space-y-1">
                  <div className="font-bold text-slate-900">1. Prerequisite Review</div>
                  <p className="text-xs text-slate-600">
                    A compliance officer verifies the latest requirements and forms for <strong>{selectedServiceObj?.name}</strong>.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-slate-900">2. Consultation Call Within 24h</div>
                  <p className="text-xs text-slate-600">
                    We will call you at <strong>{formData.phone}</strong> or reach out on WhatsApp to guide you through your document requirements.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-slate-900">3. Document Audit & Bureau Submission</div>
                  <p className="text-xs text-slate-600">
                    We assist you in preparing a fully compliant file for submission to the government licensing bureau.
                  </p>
                </div>
              </div>
            </div>

            {/* Regulatory Disclaimer (Mandated by FR-LIC-002 & FR-LIC-003) */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 leading-relaxed space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                <span>Statutory Authority Reminder</span>
              </div>
              <p>
                Submitting this request starts DriveTech’s internal review and follow-up process. Licence approval, test results, and final issuance remain strictly subject to the statutory criteria, decisions, and fees of the official national licensing authority.
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="flex-1 text-center py-3 px-4 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Return to Homepage
              </Link>
              <a
                href={`${selectedBranchObj?.whatsappLink || COMPANY_INFO.generalWhatsApp}&text=${encodeURIComponent(`Hello, I requested licensing assistance under reference ${submittedRef}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Follow up via WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ACTIVE REQUEST FORM
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            Licensing Advisory Service
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Request Licensing Assistance
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Submit your information below to speak with an advisory specialist. We assist with paperwork, test readiness, and procedures.
          </p>
        </div>

        {/* Error Alert */}
        {serverError && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-800 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Submission Failed</div>
              <div>{serverError}</div>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-10">
          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            
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
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600" />
                <span>1. Service Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Service Selection */}
                <div>
                  <label htmlFor="selectedServiceId" className="block text-xs font-bold text-slate-800 mb-1.5">
                    Assistance Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="selectedServiceId"
                    value={formData.selectedServiceId}
                    onChange={(e) => setFormData({ ...formData, selectedServiceId: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 ${
                      clientErrors.selectedServiceId ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-amber-100 focus:border-amber-600'
                    }`}
                  >
                    {LICENSING_SERVICES.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                  {clientErrors.selectedServiceId && (
                    <p className="mt-1 text-xs text-rose-600">{clientErrors.selectedServiceId}</p>
                  )}
                </div>

                {/* Campus Selection */}
                <div>
                  <label htmlFor="preferredBranchId" className="block text-xs font-bold text-slate-800 mb-1.5">
                    Nearest Campus <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="preferredBranchId"
                    value={formData.preferredBranchId}
                    onChange={(e) => setFormData({ ...formData, preferredBranchId: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 ${
                      clientErrors.preferredBranchId ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-amber-100 focus:border-amber-600'
                    }`}
                  >
                    {BRANCHES.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                  {clientErrors.preferredBranchId && (
                    <p className="mt-1 text-xs text-rose-600">{clientErrors.preferredBranchId}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Contact Details */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                <span>2. Requester Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-xs font-bold text-slate-800 mb-1.5">
                    Requester Legal Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="e.g. Fatima Al-Mansoor"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                      clientErrors.fullName ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-amber-100 focus:border-amber-600'
                    }`}
                  />
                  {clientErrors.fullName && (
                    <p className="mt-1 text-xs text-rose-600">{clientErrors.fullName}</p>
                  )}
                </div>

                {/* Telephone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-slate-800 mb-1.5">
                    Telephone Number (Call / WhatsApp) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="e.g. +1 555-018-4412"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                      clientErrors.phone ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-amber-100 focus:border-amber-600'
                    }`}
                  />
                  {clientErrors.phone && (
                    <p className="mt-1 text-xs text-rose-600">{clientErrors.phone}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-800 mb-1.5">
                    Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g. fatima@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                      clientErrors.email ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-amber-100 focus:border-amber-600'
                    }`}
                  />
                  {clientErrors.email && (
                    <p className="mt-1 text-xs text-rose-600">{clientErrors.email}</p>
                  )}
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label htmlFor="customerMessage" className="block text-xs font-bold text-slate-800 mb-1.5">
                    Current Licence Context & Questions <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="customerMessage"
                    rows={3}
                    placeholder="Describe your current license status, country of foreign permit (if converting), or endorsement questions..."
                    value={formData.customerMessage}
                    onChange={(e) => setFormData({ ...formData, customerMessage: e.target.value })}
                    maxLength={500}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-100 focus:border-amber-600"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Prominent Regulatory Disclaimer & Mandatory Checkbox (FR-LIC-002) */}
            <div className="p-5 rounded-2xl bg-amber-50/90 border-2 border-amber-300 space-y-4">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    Mandatory Official Authority Disclaimer
                  </h3>
                  <blockquote className="text-xs font-bold text-amber-950 italic">
                    “Submitting this request starts DriveTech’s follow-up process. Licence approval and issuance remain subject to the requirements and decisions of the relevant authority.”
                  </blockquote>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.authorityDisclaimerAcknowledged}
                    onChange={(e) => setFormData({ ...formData, authorityDisclaimerAcknowledged: e.target.checked })}
                    className="w-4 h-4 rounded border-amber-400 text-amber-700 focus:ring-amber-500 mt-1 shrink-0"
                  />
                  <span className="text-xs text-amber-950 leading-relaxed font-semibold">
                    I acknowledge that DriveTech is an advisory service and that final licence issuance and approval remain strictly under official government authority jurisdiction. <span className="text-rose-600">*</span>
                  </span>
                </label>
                {clientErrors.authorityDisclaimerAcknowledged && (
                  <p className="text-xs text-rose-600 font-medium pl-7 mt-1">{clientErrors.authorityDisclaimerAcknowledged}</p>
                )}
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consentAcknowledged}
                  onChange={(e) => setFormData({ ...formData, consentAcknowledged: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-1 shrink-0"
                />
                <span className="text-xs text-slate-700 leading-relaxed">
                  I consent to DriveTech storing my contact details and contacting me regarding this licensing assistance enquiry. <span className="text-rose-500">*</span>
                </span>
              </label>
              {clientErrors.consentAcknowledged && (
                <p className="text-xs text-rose-600 font-medium pl-7">{clientErrors.consentAcknowledged}</p>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl text-base font-bold text-white bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
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
    <Suspense fallback={<div className="py-20 text-center text-slate-500">Loading request form...</div>}>
      <LicensingRequestForm />
    </Suspense>
  );
}
