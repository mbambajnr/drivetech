import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Car, 
  Bike, 
  HardHat, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  FileCheck, 
  ShieldAlert, 
  PhoneCall, 
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { COURSES } from '@/data/courses';
import { BRANCHES, COMPANY_INFO } from '@/data/branches';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COURSES.map((course) => ({
    slug: course.slug
  }));
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  const availableBranches = BRANCHES.filter((b) => course.availableBranchIds.includes(b.id));

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/courses" className="hover:text-blue-600">Courses</Link>
          <span>/</span>
          <span className="text-slate-900 truncate">{course.name}</span>
        </nav>

        {/* Hero Course Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide">
              {course.categoryLabel}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              {course.name}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {course.detailedDescription}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase">Course Duration</div>
                  <div className="text-sm font-bold text-slate-900">{course.duration}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase">Offered At Campuses</div>
                  <div className="text-sm font-bold text-slate-900">
                    {availableBranches.map((b) => b.name.replace('DriveTech ', '')).join(' & ')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Quick-Apply Widget */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-6 shadow-lg space-y-5">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Fee Guidance</span>
                <div className="text-2xl font-black text-slate-900 mt-1">{course.feeGuidance}</div>
                <p className="text-[11px] text-slate-500 mt-1">Flexible payment plans and corporate invoicing available.</p>
              </div>

              <div className="space-y-2.5 pt-2">
                <Link
                  href={`/apply?course=${course.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-white text-sm shadow-md transition-colors"
                >
                  <span>Apply for This Course</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`${COMPANY_INFO.generalWhatsApp}?text=${encodeURIComponent(`Hello DriveTech, I am interested in applying for ${course.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold text-emerald-800 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Enquire via WhatsApp</span>
                </a>
              </div>

              <div className="border-t border-slate-100 pt-4 text-xs text-slate-500 space-y-1">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zero upfront payment required to apply</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Personal coordinator assigned within 24h</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Detailed Sections: Inclusions, Requirements, What Happens Next */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-8">
            
            {/* Package Inclusions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-600" />
                <span>What is Included in This Package</span>
              </h2>
              <ul className="grid grid-cols-1 gap-3 pt-2">
                {course.packageInclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Entry Requirements */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Enrolment & Entry Requirements</span>
              </h2>
              <ul className="space-y-3 pt-2">
                {course.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Expected Next Step */}
            <div className="bg-blue-50/70 rounded-2xl border border-blue-100 p-6 sm:p-8 space-y-3">
              <h2 className="text-lg font-bold text-blue-950 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <span>What Happens After You Apply</span>
              </h2>
              <p className="text-sm text-blue-900 leading-relaxed">
                {course.expectedNextStep}
              </p>
            </div>

            {/* Regulatory Disclaimer (FR-PUB-003 acceptance criteria) */}
            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3.5 text-xs text-amber-900 leading-relaxed">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Licence & Admission Notice: </span>
                DriveTech provides certified instruction and preparation. Admission is subject to age and medical suitability verification. Completion of this course prepares the learner for practical competency but does not constitute an automatic grant of an official government driver licence, which remains governed by statutory authority testing and regulations.
              </div>
            </div>

          </div>

          {/* Sidebar Campus Information */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold uppercase tracking-wider text-blue-400">
                Available Campus Locations
              </h3>
              <div className="space-y-4 text-xs text-slate-300">
                {availableBranches.map((branch) => (
                  <div key={branch.id} className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-2">
                    <div className="font-bold text-white text-sm">{branch.name}</div>
                    <p className="text-slate-400">{branch.address}</p>
                    <div className="pt-1 flex items-center justify-between text-blue-400 font-semibold">
                      <a href={`tel:${branch.phone}`} className="hover:underline flex items-center gap-1">
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>
                      <a href={branch.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1 text-emerald-400">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
