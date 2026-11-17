import Link from 'next/link';
import { 
  Car, 
  Bike, 
  HardHat, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  MessageCircle,
  PhoneCall,
  Calendar,
  AlertCircle,
  Building2,
  Award,
  ChevronRight
} from 'lucide-react';
import { COURSES, LICENSING_SERVICES } from '@/data/courses';
import { BRANCHES, COMPANY_INFO } from '@/data/branches';

export default function HomePage() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section — Grounded, Authoritative & Institutional */}
      <section className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold tracking-wide uppercase">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Accredited Vocational Driver Academy · Lic. {COMPANY_INFO.accreditationNumber}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Vocational Driver Training & Heavy Machinery Certification
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                DriveTech Academy provides hands-on, syllabus-certified instruction for passenger vehicle drivers, commercial motorcyclists, and heavy plant machinery operators. Training is conducted on private closed proving grounds and dual-control vehicle fleets across Central Metropolis and West City campuses.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-sm transition-colors"
                >
                  <span>Enrol / Apply for Training</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                >
                  <span>View Course Fees &amp; Syllabus</span>
                </Link>

                <a
                  href={COMPANY_INFO.generalWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Admissions</span>
                </a>
              </div>

              {/* Real Operational Facts */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800 text-xs">
                <div>
                  <div className="text-slate-400 font-medium">Training Fleet</div>
                  <div className="text-sm font-bold text-white mt-0.5">Dual-Pedal Fitted</div>
                </div>
                <div>
                  <div className="text-slate-400 font-medium">Proving Ground</div>
                  <div className="text-sm font-bold text-white mt-0.5">4-Acre Closed Track</div>
                </div>
                <div>
                  <div className="text-slate-400 font-medium">Intake Periods</div>
                  <div className="text-sm font-bold text-white mt-0.5">Weekly Rolling Starts</div>
                </div>
                <div>
                  <div className="text-slate-400 font-medium">Campuses</div>
                  <div className="text-sm font-bold text-amber-400 mt-0.5">Central &amp; West City</div>
                </div>
              </div>

            </div>

            {/* Practical Quick Course Directory Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-6 shadow-xl space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Current Intake Programs
                    </h3>
                    <p className="text-[11px] text-slate-400">Class schedules open for enrolment</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    Enrolling Now
                  </span>
                </div>

                <div className="space-y-2.5">
                  {COURSES.slice(0, 4).map((c) => (
                    <Link
                      key={c.id}
                      href={`/courses/${c.slug}`}
                      className="block p-3 rounded-lg bg-slate-900/90 hover:bg-slate-700/80 border border-slate-700 transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                            {c.name}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {c.duration.split('(')[0].trim()} · {c.feeGuidance.split('(')[0].trim()}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>Flexible morning &amp; weekend slots</span>
                  <Link href="/courses" className="text-amber-400 hover:underline font-semibold">
                    All 5 Programs →
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Program Matrix / Comprehensive Course Specification */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="border-b border-slate-200 pb-5 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block mb-1">
              Curriculum &amp; Fee Schedule
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Approved Vocational Courses
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            All programs include structured behind-the-wheel instruction, theory materials, and pre-test examination assessments.
          </p>
        </div>

        {/* Structured Spec Table for Desktop & Cards for Mobile */}
        <div className="hidden lg:block bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-4 px-5">Course / Program</th>
                <th className="py-4 px-4">Training Vehicle / Plant</th>
                <th className="py-4 px-4">Practical Hours</th>
                <th className="py-4 px-4">Duration</th>
                <th className="py-4 px-4">Tuition Fee Guidance</th>
                <th className="py-4 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {COURSES.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-5">
                    <Link href={`/courses/${course.slug}`} className="font-bold text-slate-900 hover:text-blue-800 text-sm block">
                      {course.name}
                    </Link>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {course.categoryLabel}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-700 font-medium">
                    {course.fleetVehicle.split('(')[0]}
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-900">
                    {course.practicalHours}
                  </td>
                  <td className="py-4 px-4 text-slate-600">
                    {course.duration.split('(')[0]}
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-900">
                    {course.feeGuidance.split('(')[0]}
                  </td>
                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/courses/${course.slug}`}
                        className="px-3 py-1.5 rounded border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        Syllabus
                      </Link>
                      <Link
                        href={`/apply?course=${course.id}`}
                        className="px-3 py-1.5 rounded bg-blue-800 hover:bg-blue-900 text-xs font-bold text-white transition-colors"
                      >
                        Apply
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Course Cards */}
        <div className="lg:hidden space-y-4">
          {COURSES.map((course) => (
            <div key={course.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                    {course.categoryLabel}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    {course.name}
                  </h3>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-100">
                <div><strong>Fleet:</strong> {course.fleetVehicle}</div>
                <div><strong>Hours:</strong> {course.practicalHours} practical + {course.theoryHours}</div>
                <div><strong>Duration:</strong> {course.duration}</div>
                <div><strong>Fee:</strong> {course.feeGuidance}</div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <Link
                  href={`/courses/${course.slug}`}
                  className="flex-1 text-center py-2 px-3 rounded border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  View Details
                </Link>
                <Link
                  href={`/apply?course=${course.id}`}
                  className="flex-1 text-center py-2 px-3 rounded bg-blue-800 text-xs font-bold text-white"
                >
                  Apply Online
                </Link>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Official Statutory Regulatory Notice Board */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 rounded-xl border border-amber-300 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded bg-amber-600 text-white flex items-center justify-center shrink-0 font-bold mt-0.5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-900">
                  Official Statutory Notice
                </span>
                <span className="text-xs text-amber-800">·</span>
                <span className="text-xs text-amber-800 font-medium">Licensing Bureau Compliance</span>
              </div>
              <h3 className="text-lg font-bold text-amber-950">
                Academy Certification &amp; Government Licensing Boundary
              </h3>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                DriveTech Academy operates as an accredited private vocational training center. We provide professional driver education, machine operator certification, and procedural guidance. Official driver licences, theoretical test permits, and final practical road examiner tests are administered and issued strictly by the relevant national government licensing bureau. Submitting an application on this platform initiates DriveTech’s internal training intake and does not guarantee an immediate licence.
              </p>
              <div className="pt-2">
                <Link 
                  href="/licensing-assistance"
                  className="text-xs font-bold text-amber-950 underline hover:text-amber-800 inline-flex items-center gap-1"
                >
                  Read our full licensing assistance advisory guide →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Realistic 4-Step Enrolment Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="border-b border-slate-200 pb-5 mb-8">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block mb-1">
            Intake Procedure
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            How to Enrol at DriveTech
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-blue-800 uppercase tracking-wider">Step 1</div>
            <h3 className="text-base font-bold text-slate-900">Submit Application</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete our simple online form specifying your desired course, campus location, and timetable preference. Zero upfront payment required.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-blue-800 uppercase tracking-wider">Step 2</div>
            <h3 className="text-base font-bold text-slate-900">Admissions Call</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our campus admissions coordinator contacts you within 24 business hours to match your schedule with an available instructor and answer questions.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-blue-800 uppercase tracking-wider">Step 3</div>
            <h3 className="text-base font-bold text-slate-900">Campus Induction</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Visit your assigned campus for a quick document verification, eyesight check, workbook issuance, and vehicle orientation.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-blue-800 uppercase tracking-wider">Step 4</div>
            <h3 className="text-base font-bold text-slate-900">Practical Training</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Begin hands-on driving on our closed track and urban roads, culminating in a complete mock driving test and competence certificate.
            </p>
          </div>

        </div>

      </section>

      {/* Campus Locations & Direct Admissions Access */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="border-b border-slate-200 pb-5 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block mb-1">
              Campus Facilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Training Grounds &amp; Admissions Desks
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Both locations offer dedicated classrooms, computerized highway code terminals, and direct student parking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {BRANCHES.map((b) => (
            <div key={b.id} className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{b.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{b.transitNotes}</p>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    Open Mon–Sat
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span><strong>Address:</strong> {b.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span><strong>Hours:</strong> {b.openingHours}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-2">
                    Campus Facilities on Site
                  </div>
                  <div className="grid grid-cols-1 gap-1 text-xs text-slate-600">
                    {b.facilities.map((fac, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                        <span>{fac}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${b.phone}`}
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded border border-slate-300 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call {b.phone}</span>
                </a>

                <a
                  href={b.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-emerald-700 hover:bg-emerald-800 text-xs font-bold text-white transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
}
