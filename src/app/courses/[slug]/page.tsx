import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Car, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  FileCheck, 
  ShieldAlert, 
  PhoneCall, 
  MessageCircle,
  HelpCircle,
  Award,
  BookOpen,
  Wrench,
  Check
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
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-blue-900">Home</Link>
          <span>/</span>
          <Link href="/courses" className="hover:text-blue-900">Courses</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate">{course.name}</span>
        </nav>

        {/* Course Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
                {course.categoryLabel}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                {course.name}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {course.detailedDescription}
              </p>

              {/* Course Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 font-medium block">Training Fleet</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{course.fleetVehicle.split('(')[0]}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Behind the Wheel</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{course.practicalHours}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Course Duration</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{course.duration.split('(')[0]}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Available Campuses</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">
                    {availableBranches.map((b) => b.name.replace('DriveTech ', '')).join(' & ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Enrolment Box */}
            <div className="lg:col-span-4 bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Tuition Fee Guidance
                </span>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  {course.feeGuidance.split('(')[0]}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Zero upfront payment required to submit online application.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href={`/apply?course=${course.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded bg-blue-800 hover:bg-blue-900 font-bold text-white text-xs sm:text-sm shadow-sm transition-colors"
                >
                  <span>Apply for This Course</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`${COMPANY_INFO.generalWhatsApp}?text=${encodeURIComponent(`Hello DriveTech, I am enquiring about ${course.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-white hover:bg-slate-100 border border-slate-300 text-xs font-bold text-slate-800 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Enquire via WhatsApp</span>
                </a>
              </div>

              <div className="border-t border-slate-200 pt-3 text-[11px] text-slate-500 space-y-1">
                <div>✓ 1-on-1 certified instructor time</div>
                <div>✓ Includes pre-test evaluation &amp; handbook</div>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Syllabus & Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-8">
            
            {/* Structured Syllabus Modules */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <BookOpen className="w-5 h-5 text-blue-800" />
                <h2 className="text-lg font-bold text-slate-900">
                  Curriculum &amp; Training Modules
                </h2>
              </div>

              <div className="space-y-4">
                {course.syllabusModules?.map((mod, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">
                      {mod.title}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <FileCheck className="w-5 h-5 text-blue-800" />
                <h2 className="text-lg font-bold text-slate-900">
                  What is Included in This Tuition Package
                </h2>
              </div>
              <ul className="space-y-2.5 pt-1 text-xs sm:text-sm text-slate-700">
                {course.packageInclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Entry Requirements */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-slate-700" />
                <h2 className="text-lg font-bold text-slate-900">
                  Prerequisites &amp; Enrolment Requirements
                </h2>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {course.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regulatory Disclaimer (Mandated by PRD FR-PUB-003) */}
            <div className="p-5 rounded-lg bg-amber-50 border border-amber-300 text-xs text-amber-950 leading-relaxed space-y-1">
              <div className="font-bold flex items-center gap-2 text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                <span>Statutory Authority Reminder</span>
              </div>
              <p>
                DriveTech Academy provides certified vocational training and testing preparation. Official driver licences, permits, and official road tests are conducted and issued strictly by the relevant national government licensing authority.
              </p>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
                Offered at These Campuses
              </h3>
              <div className="space-y-3">
                {availableBranches.map((branch) => (
                  <div key={branch.id} className="p-3 rounded bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="font-bold text-slate-900">{branch.name}</div>
                    <p className="text-slate-500 text-[11px]">{branch.address}</p>
                    <div className="pt-1 flex items-center justify-between text-blue-800 font-semibold text-[11px]">
                      <a href={`tel:${branch.phone}`} className="hover:underline">
                        Call {branch.phone}
                      </a>
                      <a href={branch.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                        WhatsApp Desk →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-xl p-6 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Have Schedule Questions?
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Contact our admissions officers directly to check instructor availability for morning, evening, or weekend sessions.
              </p>
              <div className="pt-2">
                <a
                  href={`tel:${COMPANY_INFO.centralPhone}`}
                  className="w-full text-center py-2 px-3 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-white block"
                >
                  Call Admissions: {COMPANY_INFO.centralPhone}
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
