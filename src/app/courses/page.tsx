'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Car, 
  Bike, 
  HardHat, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  MapPin, 
  FileText 
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
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            Training Academy Catalogue
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Professional Driving & Equipment Courses
          </h1>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Certified courses designed to prepare you for safe, legal, and competent road and heavy machinery operation. Select a program to review curriculum details and submit an enquiry.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Courses' },
              { id: 'driving', label: 'Driving (Class B)' },
              { id: 'motorcycle', label: 'Motorcycle (Class A)' },
              { id: 'heavy-equipment', label: 'Heavy Equipment' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
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
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-sm">No courses match your search criteria.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-3 text-xs font-bold text-blue-600 hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => {
              const availableBranches = BRANCHES.filter((b) => course.availableBranchIds.includes(b.id));

              return (
                <div
                  key={course.id}
                  id={course.category}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-6 space-y-4">
                    {/* Header Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 uppercase tracking-wide">
                        {course.categoryLabel}
                      </span>
                      {course.popular && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase tracking-wide">
                          Popular
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      <Link href={`/courses/${course.slug}`}>
                        {course.name}
                      </Link>
                    </h3>

                    {/* Short Summary */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {course.shortSummary}
                    </p>

                    {/* Key Details Pill Box */}
                    <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                        <span><strong>Duration:</strong> {course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>Campuses:</strong> {availableBranches.map((b) => b.name.replace('DriveTech ', '')).join(', ')}</span>
                      </div>
                    </div>

                    {/* Fee guidance box */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Fee Guidance</div>
                      <div className="text-sm font-bold text-slate-900">{course.feeGuidance}</div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="flex-1 text-center py-2.5 px-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white hover:text-blue-700 transition-colors"
                    >
                      View Syllabus
                    </Link>
                    <Link
                      href={`/apply?course=${course.id}`}
                      className="flex-1 text-center py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-sm transition-colors"
                    >
                      Apply Online
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Course Disclaimers Note */}
        <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-500 border border-slate-200">
          <strong>Important Information:</strong> All fees, course schedules, and package inclusions published above represent current guidance. Course start dates and final schedules are confirmed during your branch follow-up consultation. Training completion does not constitute an automatic grant of a driver licence, which remains governed by statutory licensing authorities.
        </div>

      </div>
    </div>
  );
}

