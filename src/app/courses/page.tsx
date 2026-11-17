'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Car, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  MapPin, 
  Check,
  BookOpen
} from 'lucide-react';
import { COURSES } from '@/data/courses';
import { BRANCHES } from '@/data/branches';

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCourses = COURSES.filter((course) => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = 
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
            Curriculum &amp; Fee Schedule
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Approved Training Programs &amp; Certification
          </h1>
          <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
            All courses follow certified training syllabi aligned with national transport authority standards. Review curriculum hours, fleet vehicles, and tuition fees below.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white p-3 sm:p-4 rounded-lg border border-slate-200 shadow-sm">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'All Programs (5)' },
              { id: 'driving', label: 'Class B Passenger Cars' },
              { id: 'motorcycle', label: 'Class A Motorcycle' },
              { id: 'heavy-equipment', label: 'Heavy Machinery & Forklift' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                  selectedCategory === tab.id
                    ? 'bg-blue-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses, vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-800"
            />
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const availableBranches = BRANCHES.filter((b) => course.availableBranchIds.includes(b.id));

            return (
              <div
                key={course.id}
                className="bg-white rounded-lg border border-slate-200 shadow-sm hover:border-slate-400 transition-colors flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5 space-y-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                      {course.categoryLabel}
                    </span>
                    <span className="text-slate-500 font-medium text-[11px]">
                      {course.duration.split('(')[0]}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    <Link href={`/courses/${course.slug}`} className="hover:text-blue-900">
                      {course.name}
                    </Link>
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {course.shortSummary}
                  </p>

                  <div className="pt-2 border-t border-slate-100 text-xs text-slate-700 space-y-1">
                    <div><strong>Fleet:</strong> {course.fleetVehicle.split('(')[0]}</div>
                    <div><strong>Hours:</strong> {course.practicalHours} behind-the-wheel</div>
                    <div><strong>Campuses:</strong> {availableBranches.map((b) => b.name.replace('DriveTech ', '')).join(', ')}</div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded border border-slate-100 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Tuition Fee Guidance</span>
                    <span className="font-bold text-slate-900 text-sm">{course.feeGuidance.split('(')[0]}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="flex-1 text-center py-2 px-3 rounded border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-white transition-colors"
                  >
                    View Syllabus
                  </Link>
                  <Link
                    href={`/apply?course=${course.id}`}
                    className="flex-1 text-center py-2 px-3 rounded bg-blue-800 hover:bg-blue-900 text-xs font-bold text-white transition-colors"
                  >
                    Apply Online
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Regulatory Note */}
        <div className="p-4 rounded bg-slate-100 border border-slate-200 text-xs text-slate-600 leading-relaxed">
          <strong>Notice Regarding Tuition &amp; Official Statutory Fees:</strong> Course fees shown above cover all instructional hours, vehicle usage, workbook materials, and academy mock evaluations. Official statutory licensing bureau permit and testing fees are established by government authorities and are paid directly to the licensing department.
        </div>

      </div>
    </div>
  );
}
