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
  Check,
  Building2,
  FileText
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
    desiredStartPeriod: 'Next available start period (Earliest)',
    customerMessage: '',
    consentAcknowledged: false,
    _hp_website: ''
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
      setServerError('Network error. Please verify your connection or contact our admissions desk by phone.');
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
      <div className="py-12 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-lg border border-slate-300 shadow-sm overflow-hidden">
          
          <div className="bg-slate-900 text-white p-6 sm:p-8 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                  Application Logged Successfully
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  Training Enrolment Request Received
                </h1>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6 text-xs text-slate-700">
            
            {/* Reference Number Box */}
            <div className="bg-slate-50 border border-slate-300 rounded p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Enrolment Reference Docket
                </span>
                <span className="text-xl font-mono font-black text-blue-900 tracking-wider">
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

            {/* Application Summary Box */}
            <div className="border border-slate-200 rounded p-4 bg-white space-y-2">
              <div className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-1.5">
                Intake Submission Summary
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div><strong>Trainee Name:</strong> {formData.fullName}</div>
                <div><strong>Contact Phone:</strong> {formData.phone}</div>
                <div><strong>Enrolled Program:</strong> {selectedCourseObj?.name}</div>
                <div><strong>Campus:</strong> {selectedBranchObj?.name}</div>
                <div><strong>Preferred Timing:</strong> {formData.desiredStartPeriod}</div>
                {formData.email && <div><strong>Email:</strong> {formData.email}</div>}
              </div>
            </div>

            {/* What Happens Next Timeline */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Intake Follow-Up Procedure
              </h2>
              <div className="space-y-3 border-l-2 border-slate-300 pl-4 text-xs text-slate-600">
                <div>
                  <div className="font-bold text-slate-900">1. Instructor &amp; Schedule Audit</div>
                  <p>Admissions matches instructor availability against your requested timetable.</p>
                </div>
                <div>
                  <div className="font-bold text-slate-900">2. Admissions Call Within 24 Business Hours</div>
                  <p>Our coordinator calls you at <strong>{formData.phone}</strong> or reaches out on WhatsApp to confirm your class schedule.</p>
                </div>
                <div>
                  <div className="font-bold text-slate-900">3. Campus Induction</div>
                  <p>You visit {selectedBranchObj?.name} to verify identification and begin behind-the-wheel instruction.</p>
                </div>
              </div>
            </div>

            {/* Regulatory Notice */}
            <div className="p-3.5 rounded bg-amber-50 border border-amber-300 text-amber-950 text-[11px] leading-relaxed">
              <strong>Statutory Reminder:</strong> Submitting this enrolment enquiry initiates academy intake and scheduling. It does not require payment at this stage and does not replace official national licensing bureau statutory requirements.
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
                href={`${selectedBranchObj?.whatsappLink || COMPANY_INFO.generalWhatsApp}&text=${encodeURIComponent(`Hello DriveTech Admissions, I just submitted an application under reference ${submittedRef}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 px-4 rounded bg-emerald-700 hover:bg-emerald-800 text-xs font-bold text-white shadow-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message Admissions Desk on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ACTIVE ENROLMENT FORM
  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Header */}
        <div className="space-y-2 border-b border-slate-200 pb-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            Intake Enrolment Form
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            DriveTech Academy Application
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Submit your training preferences below. Zero deposit required. An admissions coordinator will follow up within 24 business hours to confirm your timetable.
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

            {/* Section 1: Course and Branch */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-100 flex items-center gap-2">
                <Car className="w-4 h-4 text-blue-900" />
                <span>1. Select Program &amp; Campus</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="selectedServiceId" className="block text-xs font-bold text-slate-800 mb-1">
                    Training Program <span className="text-rose-600">*</span>
                  </label>
                  <select
                    id="selectedServiceId"
                    value={formData.selectedServiceId}
                    onChange={(e) => setFormData({ ...formData, selectedServiceId: e.target.value })}
                    className={`w-full px-3 py-2 rounded border text-xs sm:text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-900 ${
                      clientErrors.selectedServiceId ? 'border-rose-400' : 'border-slate-300'
                    }`}
                  >
                    {COURSES.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name} ({course.categoryLabel})
                      </option>
                    ))}
                  </select>
                  {clientErrors.selectedServiceId && (
                    <p className="mt-1 text-[11px] text-rose-600">{clientErrors.selectedServiceId}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="preferredBranchId" className="block text-xs font-bold text-slate-800 mb-1">
                    Campus Location <span className="text-rose-600">*</span>
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

            {/* Section 2: Trainee Contact Information */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-900" />
                <span>2. Trainee Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-xs font-bold text-slate-800 mb-1">
                    Full Legal Name (as on National ID / Passport) <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="e.g. Alexander Wright"
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
                    Direct Contact Telephone (Call / WhatsApp) <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="e.g. +1 555-014-9921"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3 py-2 rounded border text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-900 ${
                      clientErrors.phone ? 'border-rose-400' : 'border-slate-300'
                    }`}
                  />
                  <p className="mt-1 text-[10px] text-slate-500">Used by admissions to confirm your training schedule.</p>
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
                    placeholder="e.g. alexander@example.com"
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
                  <label htmlFor="desiredStartPeriod" className="block text-xs font-bold text-slate-800 mb-1">
                    Requested Start Period
                  </label>
                  <select
                    id="desiredStartPeriod"
                    value={formData.desiredStartPeriod}
                    onChange={(e) => setFormData({ ...formData, desiredStartPeriod: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                  >
                    <option value="Next available start period (Earliest)">Next available start period (Earliest)</option>
                    <option value="Within the next 2 weeks">Within the next 2 weeks</option>
                    <option value="Next calendar month">Next calendar month</option>
                    <option value="Weekend sessions only (Saturday)">Weekend sessions only (Saturday)</option>
                    <option value="Flexible / Just enquiring">Flexible / Just enquiring</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="customerMessage" className="block text-xs font-bold text-slate-800 mb-1">
                    Previous Driving Experience or Special Scheduling Notes <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="customerMessage"
                    rows={2}
                    placeholder="Mention any prior driving lessons, transmission preference (manual/automatic), or target completion date..."
                    value={formData.customerMessage}
                    onChange={(e) => setFormData({ ...formData, customerMessage: e.target.value })}
                    maxLength={500}
                    className="w-full px-3 py-2 rounded border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-900"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Statutory Consent */}
            <div className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consentAcknowledged}
                  onChange={(e) => setFormData({ ...formData, consentAcknowledged: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-blue-900 focus:ring-blue-900 mt-0.5 shrink-0"
                />
                <span className="text-[11px] text-slate-700 leading-relaxed">
                  I consent to DriveTech Academy storing my contact details and contacting me regarding this application. I understand that submitting this enquiry does not require an upfront deposit and does not guarantee an immediate licence. <span className="text-rose-600">*</span>
                </span>
              </label>
              {clientErrors.consentAcknowledged && (
                <p className="text-[11px] text-rose-600 font-medium pl-6">{clientErrors.consentAcknowledged}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded text-xs sm:text-sm font-bold text-white bg-blue-900 hover:bg-blue-800 disabled:bg-slate-400 shadow transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Submitting Application to Admissions...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Application for Follow-up</span>
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

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-slate-500">Loading enrolment form...</div>}>
      <ApplyForm />
    </Suspense>
  );
}
