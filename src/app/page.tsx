import Link from 'next/link';
import { 
  Car, 
  Bike, 
  HardHat, 
  ShieldCheck, 
  Clock, 
  Award, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  MessageCircle,
  PhoneCall,
  Users
} from 'lucide-react';
import { COURSES, LICENSING_SERVICES } from '@/data/courses';
import { BRANCHES, COMPANY_INFO } from '@/data/branches';

export default function HomePage() {
  const popularCourses = COURSES.filter((c) => c.popular);

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 text-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wide uppercase">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Accredited Professional Academy</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Master the Road & Machinery with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Confidence</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
                From passenger car driving and motorcycle mastery to heavy hydraulic excavator certification. Learn with certified instructors, modern dual-control fleets, and structured curriculum.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-400/20 transition-all transform hover:-translate-y-0.5"
                >
                  <span>Apply for Training Online</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/licensing-assistance"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700 transition-colors"
                >
                  <FileText className="w-5 h-5 text-blue-400" />
                  <span>Licensing Assistance</span>
                </Link>

                <a
                  href={COMPANY_INFO.generalWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-sm font-semibold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-800/80 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <span className="sm:hidden lg:inline">WhatsApp Us</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
                  <div className="text-xs text-slate-400 font-medium">Dual-Control Fleets</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">2</div>
                  <div className="text-xs text-slate-400 font-medium">Metro Campuses</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">24h</div>
                  <div className="text-xs text-slate-400 font-medium">Rapid Follow-up</div>
                </div>
              </div>
            </div>

            {/* Quick Category Showcase Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/70 backdrop-blur-md border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Core Training Programs</span>
                  <span className="text-xs text-blue-400 font-semibold">Available for Enrolment</span>
                </div>

                <div className="space-y-3">
                  <Link 
                    href="/courses#driving" 
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-700/80 border border-slate-700/60 transition-all group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                        <Car className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-blue-300">Light Vehicle Driving (Class B)</div>
                        <div className="text-xs text-slate-400">Beginner & Refresher options</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link 
                    href="/courses#motorcycle" 
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-700/80 border border-slate-700/60 transition-all group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <Bike className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-emerald-300">Motorcycle Riding (Class A)</div>
                        <div className="text-xs text-slate-400">Track balance & road navigation</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link 
                    href="/courses#heavy-equipment" 
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-700/80 border border-slate-700/60 transition-all group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                        <HardHat className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-amber-300">Excavator & Forklift Training</div>
                        <div className="text-xs text-slate-400">Heavy equipment operator badges</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="pt-2 text-center">
                  <Link href="/courses" className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1">
                    Explore detailed curriculum & pricing fees →
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Training Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Our Training Disciplines</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tailored Courses for Every Driving Ambition
          </h3>
          <p className="mt-3 text-slate-600 text-base">
            Choose your learning path. Each program combines theoretical safety rigor with comprehensive practical machine control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Driving */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Car className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Passenger Car Driving</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Standard beginner courses (Class B) with dual-pedal vehicles, plus advanced defensive driving programs for corporate and private drivers.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Manual and Automatic transmissions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Highway and city traffic navigation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Comprehensive mock road exams</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link href="/courses#driving" className="text-sm font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
                View Courses <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/apply?course=course-car-standard" className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100">
                Apply Now
              </Link>
            </div>
          </div>

          {/* Card 2: Motorcycle */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Bike className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Motorcycle Riding</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hands-on training for Class A licences covering balance, low-speed clutch coordination, emergency braking, and hazard perception.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Closed-circuit practice pad</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Helmets and protective gear included</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Road traffic positioning skills</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link href="/courses#motorcycle" className="text-sm font-bold text-emerald-600 hover:text-emerald-800 inline-flex items-center gap-1">
                View Courses <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/apply?course=course-motorcycle-rider" className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                Apply Now
              </Link>
            </div>
          </div>

          {/* Card 3: Heavy Equipment */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <HardHat className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Heavy Equipment Machinery</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Professional certification for hydraulic excavators and industrial counterbalance forklifts for construction and logistics.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Real machine yard operating hours</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Trenching, stacking and load balance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Job-ready operator qualification badges</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link href="/courses#heavy-equipment" className="text-sm font-bold text-amber-600 hover:text-amber-800 inline-flex items-center gap-1">
                View Courses <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/apply?course=course-excavator-operator" className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100">
                Apply Now
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Popular Courses */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">Featured Programs</h2>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Popular Enrolments</h3>
            </div>
            <Link href="/courses" className="text-sm font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
              Browse all 5 published courses →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-blue-300 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 uppercase tracking-wide">
                      {course.categoryLabel}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {course.duration.split('(')[0]}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    {course.name}
                  </h4>
                  <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                    {course.shortSummary}
                  </p>
                  <div className="bg-slate-50 p-3 rounded-lg mb-4">
                    <div className="text-[11px] text-slate-500 font-medium">Estimated Fee Guidance</div>
                    <div className="text-sm font-bold text-slate-900">{course.feeGuidance}</div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="flex-1 text-center py-2 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/apply?course=${course.id}`}
                    className="flex-1 text-center py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition-colors"
                  >
                    Apply Online
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Licensing Assistance Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-blue-900/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold tracking-wide">
                <FileText className="w-3.5 h-3.5" />
                <span>Licensing Process Guidance</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Need Help Navigating Your Driver Licence Application?
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                DriveTech provides expert paperwork review, theory test preparation, and procedural advisory for first-time licence applicants, endorsements, and foreign licence conversions.
              </p>

              {/* Legal Disclaimer Box */}
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-amber-300">Notice: </span>
                {COMPANY_INFO.authorityDisclaimer}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                href="/licensing-assistance"
                className="w-full text-center py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white text-sm shadow transition-colors"
              >
                Learn How We Assist
              </Link>
              <Link
                href="/licensing-assistance/request"
                className="w-full text-center py-3.5 px-6 rounded-xl bg-white hover:bg-slate-100 font-bold text-slate-900 text-sm transition-colors"
              >
                Request Assistance Online
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose DriveTech */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">The DriveTech Advantage</h2>
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Built for Real-World Competence
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-2">Certified Instructors</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every instructor is vetted, government-certified, and trained in modern defensive teaching methodologies.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-2">Flexible Schedules</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Early morning, afternoon, and Saturday session slots designed around your work and personal commitments.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-2">Dedicated Safety Track</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Private practice grounds for motorcycle balancing and heavy machinery maneuvering before entering traffic.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-2">Direct Staff Support</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enquiry follow-ups handled by dedicated branch coordinators via phone or WhatsApp within 24 business hours.
            </p>
          </div>
        </div>
      </section>

      {/* Campus Locations & Instant Contact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Metropolitan Branches</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Visit or Call Your Nearest Campus
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Drop by for in-person consultation or chat directly with our admissions desk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BRANCHES.map((b) => (
              <div key={b.id} className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                  <h4 className="text-lg font-bold text-white">{b.name}</h4>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
                    Open Mon - Sat
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{b.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{b.openingHours}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={`tel:${b.phone}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call {b.phone}</span>
                  </a>

                  <a
                    href={b.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Campus</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/branches" className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1">
              View complete branch service availability & directions →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
