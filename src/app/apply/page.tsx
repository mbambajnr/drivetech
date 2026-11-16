'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  CheckCircle2, 
  AlertCircle, 
  Car, 
  Clock, 
  MapPin, 
  PhoneCall, 
  MessageCircle, 
  ArrowRight, 
  ShieldCheck, 
  Send,
  Copy,
  Check
} from 'lucide-react';
import { COURSES } from '@/data/courses';
import { BRANCHES, COMPANY_INFO } from '@/data/branches';

function ApplyForm() {
  const searchParams = useSearchParams();
  const preselectedCourse = searchParams.get('course') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    selectedServiceId: preselectedCourse || (COURSES[0]?.id ?? ''),
    preferredBranchId: BRANCHES[0]?.id ?? '',
    desiredStartPeriod: 'Next available start period',
    customerMessage: '',
    consentAcknowledged: false,
    _hp_website: '' // Honeypot field
  });

  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedCourse) {
      const match = COURSES.find((c) => c.id === preselectedCourse || c.slug === preselectedCourse);
      if (match) {
        setFormData((prev) => ({ ...prev, selectedServiceId: match.id }));
      }
    }
  }, [preselectedCourse]);

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
      errs.selectedServiceId = 'Please select a training program.';
    }
    if (!formData.preferredBranchId) {
      errs.preferredBranchId = 'Please select your preferred branch location.';
    }
    if (!formData.consentAcknowledged) {
      errs.consentAcknowledged = 'Consent is required to allow our admissions team to contact you.';
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
          type: 'training',
          ...formData
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        if (data.errors) {
          setClientErrors(data.errors);
        } else {
          setServerError(data.error || 'Unable to submit your application. Please try again.');
        }
      } else {
        setSubmittedRef(data.referenceNumber);
      }
    } catch (err) {
      setServerError('Network connection issue. Please verify your connection or call us directly.');
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

  // SUCCESS CONFIRMATION STATE (FR-FORM-004)
  if (submittedRef) {
    const selectedCourseObj = COURSES.find((c) => c.id === formData.selectedServiceId);
    const selectedBranchObj = BRANCHES.find((b) => b.id === formData.preferredBranchId);

    return (
      <div className="py-12 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white p-8 sm:p-10 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-400/20 text-emerald-300 border-2 border-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Training Application Received!
            </h1>
            <p className="text-sm text-blue-100 max-w-lg mx-auto">
              Thank you, <strong>{formData.fullName}</strong>. Your enquiry has been routed to the admissions coordinator at {selectedBranchObj?.name || 'DriveTech'}.
            </p>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            
            {/* Reference Number Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Application Reference Number
                </span>
                <span className="text-xl sm:text-2xl font-mono font-black text-blue-700 tracking-wider">
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

            {/* What Happens Next Timeline */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">
                What Happens Next
              </h2>
              <div className="space-y-4 border-l-2 border-blue-200 pl-4 ml-2 text-sm text-slate-700">
                <div className="space-y-1">
                  <div className="font-bold text-slate-900">1. Verification & Scheduling Check</div>
                  <p className="text-xs text-slate-600">
                    Our team reviews instructor availability for <strong>{selectedCourseObj?.name}</strong> matching your requested start period.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-slate-900">2. Direct Contact Within 24 Hours</div>
                  <p className="text-xs text-slate-600">
                    A coordinator will contact you at <strong>{formData.phone}</strong> via telephone or WhatsApp to confirm timetable options.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-slate-900">3. Campus Induction & Enrolment</div>
                  <p className="text-xs text-slate-600">
                    You visit {selectedBranchObj?.name} for in-person document verification and course kickoff.
                  </p>
                </div>
              </div>
            </div>

            {/* Application Summary Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <div><strong>Selected Course:</strong> {selectedCourseObj?.name}</div>
              <div><strong>Branch:</strong> {selectedBranchObj?.name}</div>
              <div><strong>Contact Phone:</strong> {formData.phone}</div>
              {formData.email && <div><strong>Email:</strong> {formData.email}</div>}
              <div><strong>Desired Timing:</strong> {formData.desiredStartPeriod}</div>
            </div>

            {/* Important Disclaimer Reminder */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
              <strong>Notice:</strong> This submission initiates your enquiry and does not guarantee an immediate seat or replace official statutory licensing authority requirements.
            </div>

            {/* Immediate Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="flex-1 text-center py-3 px-4 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Return to Homepage
              </Link>
              <a
                href={`${selectedBranchObj?.whatsappLink || COMPANY_INFO.generalWhatsApp}&text=${encodeURIComponent(`Hello, I just submitted an application with reference ${submittedRef}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message Campus on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ACTIVE APPLICATION FORM (FR-FORM-001 - 003)
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            Online Training Application
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Apply for Training at DriveTech
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Submit your information below to register your interest. Our admissions team will review course schedules and contact you to finalize enrolment.
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
            
            {/* Honeypot field for bot spam detection */}
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

            {/* Section 1: Course and Branch */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-600" />
                <span>1. Select Program & Campus</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Course Selection */}
                <div>
                  <label htmlFor="selectedServiceId" className="block text-xs font-bold text-slate-800 mb-1.5">
                    Training Program <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="selectedServiceId"
                    value={formData.selectedServiceId}
                    onChange={(e) => setFormData({ ...formData, selectedServiceId: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 ${
                      clientErrors.selectedServiceId ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
                    }`}
                  >
                    {COURSES.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name} ({course.categoryLabel})
                      </option>
                    ))}
                  </select>
                  {clientErrors.selectedServiceId && (
                    <p className="mt-1 text-xs text-rose-600">{clientErrors.selectedServiceId}</p>
                  )}
                </div>

                {/* Branch Selection */}
                <div>
                  <label htmlFor="preferredBranchId" className="block text-xs font-bold text-slate-800 mb-1.5">
                    Preferred Campus <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="preferredBranchId"
                    value={formData.preferredBranchId}
                    onChange={(e) => setFormData({ ...formData, preferredBranchId: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 ${
                      clientErrors.preferredBranchId ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
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
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span>2. Applicant Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-xs font-bold text-slate-800 mb-1.5">
                    Full Legal Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="e.g. Alexander Wright"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                      clientErrors.fullName ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
                    }`}
                  />
                  {clientErrors.fullName && (
                    <p className="mt-1 text-xs text-rose-600">{clientErrors.fullName}</p>
                  )}
                </div>

                {/* Telephone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-slate-800 mb-1.5">
                    Contact Phone Number (Call / WhatsApp) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="e.g. +1 555-014-9921"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                      clientErrors.phone ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
                    }`}
                  />
                  <p className="mt-1 text-[11px] text-slate-500">Used by admissions to reach out regarding schedule slots.</p>
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
                    placeholder="e.g. alexander@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                      clientErrors.email ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-blue-100 focus:border-blue-600'
                    }`}
                  />
                  {clientErrors.email && (
                    <p className="mt-1 text-xs text-rose-600">{clientErrors.email}</p>
                  )}
                </div>

                {/* Desired Start Period */}
                <div className="sm:col-span-2">
                  <label htmlFor="desiredStartPeriod" className="block text-xs font-bold text-slate-800 mb-1.5">
                    Desired Training Start Period
                  </label>
                  <select
                    id="desiredStartPeriod"
                    value={formData.desiredStartPeriod}
                    onChange={(e) => setFormData({ ...formData, desiredStartPeriod: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
                  >
                    <option value="Next available start period">Next available start period (Earliest)</option>
                    <option value="Within the next 2 weeks">Within the next 2 weeks</option>
                    <option value="Next calendar month">Next calendar month</option>
                    <option value="Weekend sessions only">Weekend sessions only</option>
                    <option value="Flexible / Just enquiring">Flexible / Just enquiring</option>
                  </select>
                </div>

                {/* Optional Message */}
                <div className="sm:col-span-2">
                  <label htmlFor="customerMessage" className="block text-xs font-bold text-slate-800 mb-1.5">
                    Additional Notes or Prior Driving Experience <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="customerMessage"
                    rows={3}
                    placeholder="Tell us about any previous driving lessons, target test dates, or scheduling preferences..."
                    value={formData.customerMessage}
                    onChange={(e) => setFormData({ ...formData, customerMessage: e.target.value })}
                    maxLength={500}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Consent Acknowledgement */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consentAcknowledged}
                  onChange={(e) => setFormData({ ...formData, consentAcknowledged: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-1 shrink-0"
                />
                <span className="text-xs text-slate-700 leading-relaxed">
                  I consent to DriveTech storing my contact details and contacting me via phone, SMS, or WhatsApp regarding this training application. I understand that submitting this enquiry does not require upfront payment and does not guarantee a licence. <span className="text-rose-500">*</span>
                </span>
              </label>
              {clientErrors.consentAcknowledged && (
                <p className="text-xs text-rose-600 font-medium pl-7">{clientErrors.consentAcknowledged}</p>
              )}
            </div>

            {/* Submit Action (FR-FORM-006: disable while processing) */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Transmitting Application...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Application for Follow-up</span>
                  </>
                )}
              </button>
              <p className="text-center text-xs text-slate-500 mt-3">
                Need urgent assistance? Call our admissions desk directly at {COMPANY_INFO.centralPhone}.
              </p>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-500">Loading application form...</div>}>
      <ApplyForm />
    </Suspense>
  );
}
