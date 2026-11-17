import { Course } from '@/types';

export interface CourseWithDetails extends Course {
  fleetVehicle: string;
  practicalHours: string;
  theoryHours: string;
  syllabusModules: Array<{
    title: string;
    description: string;
  }>;
}

export const COURSES: CourseWithDetails[] = [
  {
    id: 'course-car-standard',
    slug: 'standard-car-driving',
    name: 'Standard Light Vehicle Driving (Class B)',
    category: 'driving',
    categoryLabel: 'Class B Certification',
    shortSummary: 'Structured beginner-to-licensed practical driving syllabus for manual and automatic passenger vehicles.',
    detailedDescription: 'Comprehensive driver education aligned with national transport authority testing standards. Covers dual-pedal vehicle handling, urban junction navigation, multi-lane roundabouts, highway merging, emergency braking, and official mock test assessment.',
    requirements: [
      'Minimum age 18 years on date of induction',
      'Valid national identification card or international passport',
      'Basic eyesight examination clearance (conducted at campus induction)'
    ],
    duration: '4 to 6 weeks (Flexible 2-hour morning or afternoon sessions)',
    feeGuidance: '$380 - $480 (Includes workbook, mock exam, and vehicle use for mock test)',
    fleetVehicle: 'Toyota Corolla / Yaris (Fitted with certified dual-control brake & clutch pedals)',
    practicalHours: '20 hours behind-the-wheel',
    theoryHours: '10 hours highway code & hazard awareness',
    packageInclusions: [
      '1-on-1 instruction with licensed Department of Transport certified instructor',
      'Dedicated dual-control training vehicle access with comprehensive academy insurance',
      'Official Highway Code study manual and digital practice question bank',
      'Pre-licensing assessment driving test with written feedback report',
      'Official DriveTech Certificate of Course Completion'
    ],
    syllabusModules: [
      {
        title: 'Module 1: Vehicle Cockpit & Mechanical Checks',
        description: 'Pre-drive vehicle walkaround, fluid checks, mirror adjustment, blind-spot awareness, and clutch bite-point control.'
      },
      {
        title: 'Module 2: Low-Speed Maneuvering & Parking',
        description: 'Parallel parking, 3-point turns, bay reversing, hill starts without rolling, and tight-space maneuvering.'
      },
      {
        title: 'Module 3: Urban Traffic, Junctions & Roundabouts',
        description: 'Priority rules, pedestrian crossings, lane discipline on multi-lane roundabouts, and defensive hazard perception.'
      },
      {
        title: 'Module 4: Highway Driving & Official Mock Test',
        description: 'Speed control, emergency stop from 60 km/h, dual-carriageway merging, and a full 45-minute simulated test.'
      }
    ],
    availableBranchIds: ['branch-central', 'branch-west'],
    expectedNextStep: 'Our admissions desk will contact you within 24 hours to match your preferred days with an available instructor.',
    popular: true
  },
  {
    id: 'course-defensive-driving',
    slug: 'defensive-driving-mastery',
    name: 'Defensive Driving & Refresher Course',
    category: 'driving',
    categoryLabel: 'Advanced Driver Training',
    shortSummary: 'High-level risk mitigation, emergency collision avoidance, and confidence rebuilding for licensed drivers.',
    detailedDescription: 'Tailored for corporate fleet drivers, licensed drivers returning to the road after an absence, or drivers seeking advanced vehicle dynamics control in adverse weather and high-density traffic.',
    requirements: [
      'Hold a valid national or provisional driver licence',
      'Minimum 1 year since initial licence grant recommended'
    ],
    duration: '1 to 2 weeks (Intensive 2-day weekend or 4-evening weekday format)',
    feeGuidance: '$220 - $280 (Corporate fleet discounts available on request)',
    fleetVehicle: 'Dual-control sedan or client’s corporate fleet vehicles',
    practicalHours: '8 hours advanced on-road & skidpad exercise',
    theoryHours: '4 hours crash causality & situational risk management',
    packageInclusions: [
      'Instructor-led baseline driving habit audit and risk assessment',
      'Advanced emergency braking on wet surfaces and skid recovery techniques',
      'Night-time navigation, highway overtaking, and mirror scanning drills',
      'Corporate Fleet Safety Competency Report'
    ],
    syllabusModules: [
      {
        title: 'Module 1: Driver Risk Profiling & Posture',
        description: 'Ergonomic seating, situational awareness, fatigue management, and spatial reaction buffers.'
      },
      {
        title: 'Module 2: Dynamic Braking & Traction Recovery',
        description: 'ABS-assisted threshold braking, hydroplaning control, and split-traction stopping.'
      },
      {
        title: 'Module 3: High-Speed Hazard Evasion',
        description: 'Obstacle swerve-and-recover maneuvers on proving ground, blind-corner risk anticipation, and highway merging.'
      }
    ],
    availableBranchIds: ['branch-central', 'branch-west'],
    expectedNextStep: 'Our training coordinator will arrange an initial 45-minute skills evaluation session.',
    popular: false
  },
  {
    id: 'course-motorcycle-rider',
    slug: 'beginner-motorcycle-training',
    name: 'Beginner Motorcycle Riding (Class A)',
    category: 'motorcycle',
    categoryLabel: 'Class A Certification',
    shortSummary: 'Closed-track balance, clutch control, emergency braking, and street survival strategies for new riders.',
    detailedDescription: 'Step-by-step motorcycle education conducted on our private paved practice pad before progressing to supervised street rides. Designed to build genuine mechanical confidence and road survival habits.',
    requirements: [
      'Minimum age 18 years',
      'Sturdy closed footwear (boots recommended) and heavy denim or protective trousers',
      'Basic balance and two-wheel bicycle riding proficiency'
    ],
    duration: '2 to 3 weeks (15 hours dedicated track & on-road mentoring)',
    feeGuidance: '$240 - $310 (Includes loan of helmet, gloves, and safety vest)',
    fleetVehicle: 'Yamaha YBR 125 / Honda CB125F (Lightweight training motorcycles with crash bars)',
    practicalHours: '12 hours closed-pad & street riding',
    theoryHours: '3 hours rider safety & road positioning',
    packageInclusions: [
      'Full use of academy-maintained 125cc training motorcycle with engine protection bars',
      'DOT/ECE-approved full-face safety helmet, armored gloves, and hi-vis reflective vest',
      'Closed-circuit maneuver drills (figure-8, cone slalom, emergency stop from 30 km/h)',
      'Radio-connected instructor intercom for on-road coaching sessions',
      'DriveTech Motorcycle Handling Certificate'
    ],
    syllabusModules: [
      {
        title: 'Module 1: Machine Controls & Balance Pad',
        description: 'Friction zone clutch control, throttle moderation, foot brake vs front brake balance, and paddle-walking.'
      },
      {
        title: 'Module 2: Low-Speed Maneuvers & Slalom',
        description: 'U-turns within marked boundaries, figure-eight loops, emergency stops, and counterweight balance.'
      },
      {
        title: 'Module 3: Counter-Steering & Street Riding',
        description: 'Push-steering at speeds above 20 km/h, road positioning for visibility, blind spots, and junction scanning.'
      }
    ],
    availableBranchIds: ['branch-central', 'branch-west'],
    expectedNextStep: 'A coordinator will reach out to check your protective gear sizing and book your pad orientation.',
    popular: true
  },
  {
    id: 'course-excavator-operator',
    slug: 'excavator-operator-training',
    name: 'Hydraulic Excavator Operator Certification',
    category: 'heavy-equipment',
    categoryLabel: 'Heavy Machinery (Class C)',
    shortSummary: 'Commercial earthmoving, trenching, hydraulic control precision, and job-site safety certification.',
    detailedDescription: 'Intensive vocational qualification for construction, civil works, and quarry operations. Conducted in our private heavy equipment proving yard on full-size hydraulic excavators under master plant instructors.',
    requirements: [
      'Minimum age 18 years',
      'Physical fitness clearance for heavy machinery operation',
      'Steel-toe work boots and site-ready workwear'
    ],
    duration: '3 to 4 weeks (Includes 25 hours practical seat time)',
    feeGuidance: '$680 - $880 (Payment schedules available for self-funded trainees)',
    fleetVehicle: 'Caterpillar 320D / Komatsu PC200 (20-Ton Hydraulic Crawler Excavators)',
    practicalHours: '25 hours individual operator cabin seat time',
    theoryHours: '10 hours ground mechanics, hydraulic systems & OSHA site safety',
    packageInclusions: [
      'Direct hands-on seat time operating 20-ton crawler hydraulic excavators in our training yard',
      'Pre-operational inspection checklist protocol (track tension, fluid levels, pin wear)',
      'Trenching to specified grade, slope stabilization, benching, and dump truck loading',
      'Job-site safety protocols, banksman ground signals, and underground utility avoidance',
      'DriveTech Heavy Plant Operator Competency Card'
    ],
    syllabusModules: [
      {
        title: 'Module 1: Walkaround Inspection & Cabin Induction',
        description: 'Hydraulic safety lockouts, daily fluids audit, gauge monitoring, and joystick coordination.'
      },
      {
        title: 'Module 2: Trenching, Leveling & Grade Control',
        description: 'Digging flat-bottom utility trenches, managing spoil piles, and benching stable working platforms.'
      },
      {
        title: 'Module 3: Truck Loading & Slope Maneuvering',
        description: 'Safe swing angles, loading haul trucks, ascending/descending 25% inclines, and track maintenance.'
      }
    ],
    availableBranchIds: ['branch-central'],
    expectedNextStep: 'Our heavy machinery supervisor will contact you to review yard schedule availability.',
    popular: true
  },
  {
    id: 'course-forklift-operator',
    slug: 'forklift-operator-training',
    name: 'Counterbalance Forklift Operator Training',
    category: 'heavy-equipment',
    categoryLabel: 'Logistics & Warehousing',
    shortSummary: 'Warehouse pallet handling, high-bay racking, load center physics, and OSHA compliance certification.',
    detailedDescription: 'Essential commercial qualification for logistics hubs, manufacturing warehouses, and container freight stations. Covers center-of-gravity dynamics, narrow-aisle transit, ramp handling, and daily safety checklists.',
    requirements: [
      'Minimum age 18 years',
      'Valid national identification document',
      'Standard physical mobility and vision'
    ],
    duration: '1 to 2 weeks (Fast-track 3-day corporate option or 2-week standard course)',
    feeGuidance: '$290 - $390 (Corporate group rates on request)',
    fleetVehicle: 'Toyota 8-Series 2.5-Ton Counterbalance Forklift (Dual-fuel LPG/Diesel)',
    practicalHours: '12 hours warehouse floor operations',
    theoryHours: '4 hours stability triangle, load calculation & safety regulations',
    packageInclusions: [
      'Extensive practical floor time driving 2.5-ton counterbalance warehouse forklifts',
      'High-bay stacking and destacking drills with loaded wooden pallets',
      'Load capacity plate interpretation and stability triangle physics training',
      'LPG cylinder swap safety procedures and battery charging protocols',
      'DriveTech Forklift Operator Qualification Card upon practical assessment pass'
    ],
    syllabusModules: [
      {
        title: 'Module 1: Machine Controls & Stability Triangle',
        description: 'Mast tilt, fork carriage side-shift, load centers, and tip-over prevention principles.'
      },
      {
        title: 'Module 2: High-Bay Racking & Narrow Aisles',
        description: 'Picking and placing pallets at 4-meter heights, forward visibility with bulky loads, and pedestrian safety.'
      },
      {
        title: 'Module 3: Ramp Transit & Practical Assessment',
        description: 'Ascending/descending ramps with loaded forks forward/rearward, and official 30-minute timed obstacle course test.'
      }
    ],
    availableBranchIds: ['branch-central', 'branch-west'],
    expectedNextStep: 'Logistics lead will reach out to confirm your simulator and floor training timetable.',
    popular: false
  }
];

export const LICENSING_SERVICES = [
  {
    id: 'lic-new-driver',
    name: 'New Driver Licence Advisory & File Preparation',
    summary: 'Procedural guidance, application file readiness check, and theoretical test coaching for first-time licence applicants.',
    eligibility: 'Citizens and legal residents meeting national minimum age requirements (18 years for Class B).',
    feeGuidance: 'Advisory review fee from $45 (official licensing bureau statutory fees are paid directly to the government department).',
    turnaround: 'File audit completed within 2 business days'
  },
  {
    id: 'lic-renewal-endorsement',
    name: 'Licence Renewal & Heavy Machinery Endorsement Support',
    summary: 'Assistance for renewing expired credentials, updating medical fitness records, or adding commercial/heavy machinery endorsements.',
    eligibility: 'Existing licence holders with clear driving records.',
    feeGuidance: 'Consultation assistance fee from $35.',
    turnaround: '1-to-1 consultation within 24 hours'
  },
  {
    id: 'lic-international-conversion',
    name: 'Foreign Driver Licence Conversion Advisory',
    summary: 'Document audit, certified translation prerequisites, bilateral reciprocity verification, and submission guidance for expatriates.',
    eligibility: 'Holders of valid foreign driver licences residing legally within the country.',
    feeGuidance: 'Comprehensive file preparation fee from $65.',
    turnaround: 'Detailed procedural audit within 48 hours'
  }
];
