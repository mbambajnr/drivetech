import { Course } from '@/types';

export const COURSES: Course[] = [
  {
    id: 'course-car-standard',
    slug: 'standard-car-driving',
    name: 'Standard Light Vehicle Driving (Class B)',
    category: 'driving',
    categoryLabel: 'Driving Training',
    shortSummary: 'Comprehensive beginner and intermediate training for manual and automatic passenger vehicles.',
    detailedDescription: 'Designed for beginners and partially trained drivers seeking practical on-road proficiency, road sign mastery, and hazard perception. Covers vehicle control, highway navigation, defensive driving techniques, and mock testing.',
    requirements: [
      'Minimum age 18 years',
      'Valid national identification document or passport',
      'Basic vision and physical suitability check'
    ],
    duration: '4 to 6 weeks (Flexible morning & afternoon sessions)',
    feeGuidance: '$350 - $480 (Payment options discussed during consultation)',
    packageInclusions: [
      'Dual-control training vehicle access with certified instructor',
      '20 hours of hands-on behind-the-wheel instruction',
      'Highway code, theory study handbook and practice question bank',
      'Pre-test road evaluation and mock driving test',
      'Official DriveTech training certificate upon successful completion'
    ],
    availableBranchIds: ['branch-central', 'branch-west'],
    expectedNextStep: 'DriveTech staff will contact you via phone or WhatsApp within 24 hours to confirm schedule availability and nearest branch induction.',
    popular: true
  },
  {
    id: 'course-defensive-driving',
    slug: 'defensive-driving-mastery',
    name: 'Defensive Driving & Refresher Course',
    category: 'driving',
    categoryLabel: 'Driving Training',
    shortSummary: 'Advanced hazard awareness, collision avoidance, and confidence building for licensed drivers.',
    detailedDescription: 'Ideal for licensed drivers who have not driven in some time, drivers adjusting to new road environments, or corporate fleets prioritizing safety. Focuses on spatial judgment, wet weather control, and preemptive road hazard response.',
    requirements: [
      'Hold a valid driver licence or provisional permit',
      'Minimum 1 year since initial licence grant recommended'
    ],
    duration: '1 to 2 weeks (Accelerated weekend or weekday formats)',
    feeGuidance: '$180 - $250',
    packageInclusions: [
      'Instructor-led road risk assessment',
      'Advanced emergency braking and skid recovery practice',
      'City night driving and highway merging techniques',
      'Fleet safety assessment score report'
    ],
    availableBranchIds: ['branch-central', 'branch-west'],
    expectedNextStep: 'A coordinator will reach out to schedule an initial 1-hour skills evaluation.',
    popular: false
  },
  {
    id: 'course-motorcycle-rider',
    slug: 'beginner-motorcycle-training',
    name: 'Beginner Motorcycle Riding (Class A)',
    category: 'motorcycle',
    categoryLabel: 'Motorcycle Training',
    shortSummary: 'Complete motorcycle handling, balancing, clutch control, and road safety training.',
    detailedDescription: 'From complete novice to confident rider. Covers low-speed maneuverability, gear shifting, obstacle avoidance, pillion safety, and traffic survival strategies under the supervision of seasoned motorcycle instructors.',
    requirements: [
      'Minimum age 18 years',
      'Appropriate sturdy boots and long trousers for training sessions',
      'Basic balance and bicycle riding ability'
    ],
    duration: '2 to 3 weeks (15 hours practical track & road)',
    feeGuidance: '$220 - $300',
    packageInclusions: [
      'Use of training motorcycle (standard 125cc - 150cc models)',
      'Department-approved safety helmet and reflective protective gear',
      'Closed-circuit maneuver mastery (slalom, figure-eight, hill starts)',
      'Road navigation and lane positioning mentoring',
      'End-of-course rider competence certificate'
    ],
    availableBranchIds: ['branch-central', 'branch-west'],
    expectedNextStep: 'Staff will confirm your protective gear sizing and available track orientation slots.',
    popular: true
  },
  {
    id: 'course-excavator-operator',
    slug: 'excavator-operator-training',
    name: 'Hydraulic Excavator Operator Certification',
    category: 'heavy-equipment',
    categoryLabel: 'Heavy Equipment Training',
    shortSummary: 'Professional heavy machinery training covering earthmoving, trenching, safety, and maintenance.',
    detailedDescription: 'Industry-standard training program for commercial earthmoving operators. Includes cabin orientation, hydraulic control coordination, trench digging, slope stabilization, load handling, and daily maintenance inspection routines.',
    requirements: [
      'Minimum age 18 years',
      'Physical fitness clearance for heavy machinery operation',
      'Steel-toe safety footwear (PPE)'
    ],
    duration: '3 to 4 weeks (Includes practical yard operation & simulation)',
    feeGuidance: '$650 - $850',
    packageInclusions: [
      'Direct seat time on hydraulic excavator under 1-on-1 master trainer supervision',
      'Pre-operation safety walkaround and fluid diagnostics protocol',
      'Trenching, benching, stockpiling, and truck loading procedures',
      'Site safety, ground signals, and hazard zone protocols',
      'DriveTech Heavy Machinery Operator Competency Badge'
    ],
    availableBranchIds: ['branch-central'],
    expectedNextStep: 'Heavy equipment coordinator will contact you to review yard schedule and safety footwear requirements.',
    popular: true
  },
  {
    id: 'course-forklift-operator',
    slug: 'forklift-operator-training',
    name: 'Counterbalance Forklift Operator Training',
    category: 'heavy-equipment',
    categoryLabel: 'Heavy Equipment Training',
    shortSummary: 'Warehouse and industrial forklift safety, maneuvering, pallet stacking, and load dynamics.',
    detailedDescription: 'Comprehensive training tailored for logistics hubs, distribution centers, and manufacturing plants. Learn stability triangle physics, high-rack stacking, narrow aisle navigation, ramp transit, and daily safety checklists.',
    requirements: [
      'Minimum age 18 years',
      'Valid national ID or passport',
      'Standard physical mobility'
    ],
    duration: '1 to 2 weeks (Accelerated options available)',
    feeGuidance: '$280 - $380',
    packageInclusions: [
      'Practical operation of counterbalance warehouse forklifts',
      'High-bay stacking and destacking techniques',
      'Load capacity chart interpretation and stability physics',
      'Fuel/battery charging safety and maintenance',
      'Operator qualification card upon passing practical and theory exam'
    ],
    availableBranchIds: ['branch-central', 'branch-west'],
    expectedNextStep: 'Logistics training lead will follow up with available simulator and yard dates.',
    popular: false
  }
];

export const LICENSING_SERVICES = [
  {
    id: 'lic-new-driver',
    name: 'New Driver Licence Application Guidance',
    summary: 'Guidance through official licensing paperwork, theoretical test readiness, and practical test scheduling with authorities.',
    eligibility: 'Citizens and legal residents meeting national minimum age requirements.',
    feeGuidance: 'Consultation assistance fee starts from $45 (official authority statutory fees paid directly to licensing bureau).'
  },
  {
    id: 'lic-renewal-endorsement',
    name: 'Licence Renewal & Category Endorsement Assistance',
    summary: 'Assistance for renewing expired licences or adding commercial/heavy machinery endorsements to existing licences.',
    eligibility: 'Existing licence holders with clear driving records.',
    feeGuidance: 'Assistance fee starts from $35.'
  },
  {
    id: 'lic-international-conversion',
    name: 'Foreign / International Licence Conversion Support',
    summary: 'Document verification assistance, translation requirements guidance, and conversion submission advisory.',
    eligibility: 'Holders of valid foreign driver licences residing legally in the country.',
    feeGuidance: 'Consultation fee starting at $60.'
  }
];

