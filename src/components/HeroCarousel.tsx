'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Car, 
  HardHat, 
  Bike, 
  FileText, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  Award,
  Pause,
  Play
} from 'lucide-react';
import { COMPANY_INFO } from '@/data/branches';

interface SlideData {
  id: string;
  badge: string;
  badgeIcon: React.ElementType;
  badgeColor: string;
  heading: string;
  highlightText: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  highlights: string[];
  gradientTheme: string;
}

const SLIDES: SlideData[] = [
  {
    id: 'slide-car',
    badge: 'Dual-Control Safety Fleet',
    badgeIcon: Car,
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
    heading: 'Master the Road with Certified',
    highlightText: 'Defensive Driving Instructors',
    description: 'Complete beginner and refresher courses with personalized 1-on-1 coaching, mock test simulations, and flexible morning or afternoon schedules.',
    primaryCtaText: 'Apply for Training Online',
    primaryCtaLink: '/apply?course=course-car-standard',
    secondaryCtaText: 'Explore Car Syllabus',
    secondaryCtaLink: '/courses#driving',
    highlights: ['100% Dual-Control Cars', 'Mock Test Simulations', 'Weekend Options'],
    gradientTheme: 'from-blue-950 via-slate-900 to-slate-950'
  },
  {
    id: 'slide-heavy',
    badge: 'Heavy Machinery Yard & Certification',
    badgeIcon: HardHat,
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    heading: 'Commercial Operator Badges for',
    highlightText: 'Hydraulic Excavator & Forklift',
    description: 'Direct seat time on hydraulic excavators and industrial counterbalance forklifts. Master trenching, load stability, and job-site safety protocols.',
    primaryCtaText: 'Apply for Heavy Machinery',
    primaryCtaLink: '/apply?course=course-excavator-operator',
    secondaryCtaText: 'View Machine Programs',
    secondaryCtaLink: '/courses#heavy-equipment',
    highlights: ['Direct Cabin Seat Time', 'Trenching & Load Physics', 'Operator Competency Card'],
    gradientTheme: 'from-amber-950 via-slate-900 to-slate-950'
  },
  {
    id: 'slide-moto',
    badge: 'Dedicated Motorcycle Track',
    badgeIcon: Bike,
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    heading: 'Closed-Circuit Balance to Confident',
    highlightText: 'Highway Motorcycle Riding',
    description: 'From zero experience to confident rider. Learn clutch synchronization, slalom balance, emergency braking, and defensive traffic positioning.',
    primaryCtaText: 'Enrol in Motorcycle Track',
    primaryCtaLink: '/apply?course=course-motorcycle-rider',
    secondaryCtaText: 'View Rider Syllabus',
    secondaryCtaLink: '/courses#motorcycle',
    highlights: ['Helmets & Gear Included', 'Private Closed Track', 'Class A Certification'],
    gradientTheme: 'from-emerald-950 via-slate-900 to-slate-950'
  },
  {
    id: 'slide-licensing',
    badge: 'Regulatory Advisory Desk',
    badgeIcon: FileText,
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
    heading: 'Expert Paperwork & Preparation for',
    highlightText: 'Official Driver Licensing',
    description: 'Advisory guidance for new applicants, renewals, category endorsements, and foreign licence conversions. Complete document audit before bureau submission.',
    primaryCtaText: 'Request Licensing Assistance',
    primaryCtaLink: '/licensing-assistance/request',
    secondaryCtaText: 'How Assistance Works',
    secondaryCtaLink: '/licensing-assistance',
    highlights: ['Document Readiness Audit', 'Conversion Advisory', 'Clear Legal Transparency'],
    gradientTheme: 'from-slate-950 via-blue-950 to-slate-950'
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [announcement, setAnnouncement] = useState('');
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = SLIDES.length;

  const goToSlide = useCallback((index: number) => {
    let target = index;
    if (target < 0) target = totalSlides - 1;
    if (target >= totalSlides) target = 0;
    setCurrentSlide(target);
    setAnnouncement(`Slide ${target + 1} of ${totalSlides}: ${SLIDES[target].heading} ${SLIDES[target].highlightText}`);

    // Native scroll-snap align
    if (trackRef.current) {
      const slideElements = trackRef.current.children;
      if (slideElements[target]) {
        (slideElements[target] as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  // Autoplay functionality with pause on hover/focus
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, nextSlide]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  };

  return (
    <section 
      className="relative overflow-hidden bg-slate-950 text-white select-none"
      aria-roledescription="carousel"
      aria-label="DriveTech Academy Featured Programs"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      onFocus={() => setIsPlaying(false)}
      onBlur={() => setIsPlaying(true)}
      onKeyDown={handleKeyDown}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Screen Reader Live Region */}
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>

      {/* Controls: Previous and Next Buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pointer-events-none">
        <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex items-center justify-between">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white border border-slate-700/80 shadow-xl backdrop-blur-sm transition-all transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-blue-400 focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white border border-slate-700/80 shadow-xl backdrop-blur-sm transition-all transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-blue-400 focus:outline-none"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* Carousel Track with CSS Scroll-Snap (overscroll-behavior-x: contain) */}
      <div
        ref={trackRef}
        role="group"
        aria-label="Slides"
        tabIndex={0}
        className="flex overflow-x-hidden scroll-smooth snap-x snap-mandatory focus:outline-none"
        style={{ overscrollBehaviorX: 'contain' }}
      >
        {SLIDES.map((slide, index) => {
          const BadgeIcon = slide.badgeIcon;
          const isActive = index === currentSlide;

          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${totalSlides}`}
              className={`flex-none w-full min-h-[540px] sm:min-h-[580px] lg:min-h-[620px] snap-center flex items-center bg-gradient-to-br ${slide.gradientTheme} transition-opacity duration-500`}
            >
              <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-16 sm:py-20 lg:py-28 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  
                  {/* Slide Content */}
                  <div className="lg:col-span-8 space-y-6 text-left">
                    
                    {/* Badge */}
                    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold tracking-wide uppercase shadow-sm ${slide.badgeColor}`}>
                      <BadgeIcon className="w-4 h-4 shrink-0" />
                      <span>{slide.badge}</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                      {slide.heading}{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-amber-300">
                        {slide.highlightText}
                      </span>
                    </h1>

                    {/* Description */}
                    <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                      {slide.description}
                    </p>

                    {/* Highlights Tags */}
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {slide.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-700/60 text-xs font-medium text-slate-200">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action CTAs */}
                    <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                      <Link
                        href={slide.primaryCtaLink}
                        className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-400/20 transition-all transform hover:-translate-y-0.5"
                      >
                        <span>{slide.primaryCtaText}</span>
                        <ArrowRight className="w-5 h-5" />
                      </Link>

                      <Link
                        href={slide.secondaryCtaLink}
                        className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700 transition-colors"
                      >
                        <span>{slide.secondaryCtaText}</span>
                      </Link>
                    </div>

                  </div>

                  {/* Feature Highlights Glass Card */}
                  <div className="lg:col-span-4 hidden lg:block">
                    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/80 rounded-3xl p-7 shadow-2xl space-y-5">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-400">DriveTech Standard</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                          Verified Program
                        </span>
                      </div>

                      <div className="space-y-4 text-xs text-slate-300">
                        <div className="flex items-start gap-3">
                          <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-white">Rapid Response</div>
                            <div className="text-slate-400">Direct coordinator call or WhatsApp in &lt;24h.</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Award className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-white">Certified Instructors</div>
                            <div className="text-slate-400">Vetted master trainers and industry safety badges.</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-white">Transparent Fees</div>
                            <div className="text-slate-400">Zero hidden costs or upfront commitment needed to apply.</div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800">
                        <a
                          href={COMPANY_INFO.generalWhatsApp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white text-xs inline-flex items-center justify-center gap-2 transition-colors"
                        >
                          <span>Ask Admissions on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Carousel Bottom Navigation: Markers & Autoplay Pause Button */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-2 flex items-center justify-between border-t border-slate-800/80">
        
        {/* Markers navigation */}
        <nav className="flex items-center gap-2.5" aria-label="Carousel slide navigation">
          {SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}: ${slide.heading}`}
                aria-current={isActive ? 'true' : undefined}
                className={`transition-all duration-300 rounded-full focus-visible:ring-2 focus-visible:ring-blue-400 focus:outline-none ${
                  isActive
                    ? 'w-10 h-3 bg-amber-400 ring-2 ring-amber-300'
                    : 'w-3 h-3 bg-slate-700 hover:bg-slate-500'
                }`}
                style={{ minWidth: '24px', minHeight: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <span className={`block rounded-full transition-all ${
                  isActive ? 'w-8 h-2 bg-amber-400' : 'w-2 h-2 bg-slate-400'
                }`} />
              </button>
            );
          })}
        </nav>

        {/* Counter and Play/Pause control */}
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="font-mono font-bold text-slate-300">
            0{currentSlide + 1} / 0{totalSlides}
          </span>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause carousel auto-rotation' : 'Play carousel auto-rotation'}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>

    </section>
  );
}
