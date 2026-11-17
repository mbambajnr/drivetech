import { Branch } from '@/types';

export interface BranchWithDetails extends Branch {
  transitNotes: string;
  facilities: string[];
}

export const BRANCHES: BranchWithDetails[] = [
  {
    id: 'branch-central',
    name: 'DriveTech Central Training Academy',
    slug: 'central-academy',
    address: '12 Commercial Way, Central District, Metropolis (Opposite South Gate Transit Hub)',
    phone: '+1 (555) 019-2831',
    whatsappNumber: '+15550192831',
    whatsappLink: 'https://wa.me/15550192831?text=Hello%20DriveTech%20Central,%20I%20would%20like%20to%20enquire%20about%20training%20courses',
    openingHours: 'Mon - Fri: 8:00 AM - 5:30 PM | Sat: 8:30 AM - 2:00 PM | Sun: Closed',
    transitNotes: '2 minutes walk from Metropolis Central Metro Station. Free student on-site parking available.',
    facilities: [
      '4-Acre Paved Closed Maneuvering Proving Ground',
      'Heavy Equipment Earthmoving & Trenching Yard',
      'Air-Conditioned Theory Testing & Simulator Lab (16 Terminals)',
      'Dual-Control Fleet Maintenance Bay',
      'Student Study Lounge & Free Wi-Fi'
    ],
    servicesOffered: [
      'Standard Light Vehicle Driving (Class B)',
      'Defensive Driving & Refresher Course',
      'Beginner Motorcycle Riding (Class A)',
      'Hydraulic Excavator Operator Certification',
      'Counterbalance Forklift Operator Training',
      'Licensing Advisory & Assistance Desk'
    ]
  },
  {
    id: 'branch-west',
    name: 'DriveTech West City Campus',
    slug: 'west-campus',
    address: '45 Industrial Park Boulevard, Building 4, West Logistics Hub',
    phone: '+1 (555) 019-2832',
    whatsappNumber: '+15550192832',
    whatsappLink: 'https://wa.me/15550192832?text=Hello%20DriveTech%20West,%20I%20am%20interested%20in%20courses%20at%20West%20Campus',
    openingHours: 'Mon - Fri: 8:30 AM - 5:00 PM | Sat: 9:00 AM - 1:00 PM | Sun: Closed',
    transitNotes: 'Directly off Highway 102 (Exit 14). Bus route 44 stops at entrance.',
    facilities: [
      'Dedicated Warehouse Forklift High-Bay Stacking Facility',
      'Motorcycle Balance & Slalom Track',
      'Computerized Highway Code Learning Center',
      'Customer Consultation & Registration Suites'
    ],
    servicesOffered: [
      'Standard Light Vehicle Driving (Class B)',
      'Defensive Driving & Refresher Course',
      'Beginner Motorcycle Riding (Class A)',
      'Counterbalance Forklift Operator Training',
      'Licensing Advisory & Assistance Desk'
    ]
  }
];

export const COMPANY_INFO = {
  name: 'DriveTech Academy',
  legalName: 'DriveTech Vocational Training & Logistics Academy Ltd.',
  accreditationNumber: 'NTA-VTC-2024-0892',
  tagline: 'Certified Driver Education & Heavy Equipment Certification',
  primaryEmail: 'admissions@drivetech-academy.com',
  generalWhatsApp: 'https://wa.me/15550192831',
  centralPhone: '+1 (555) 019-2831',
  supportHours: 'Monday - Friday: 8:00 AM - 5:30 PM | Saturday: 8:30 AM - 2:00 PM',
  authorityDisclaimer: 'Statutory Notice: DriveTech Academy is an accredited private vocational training institution (Accreditation No. NTA-VTC-2024-0892). DriveTech prepares trainees for competency and licensing requirements. All official driver licences, provisional permits, and statutory driving tests are administered and issued exclusively by the National Licensing Bureau. Submitting an application through this platform initiates DriveTech’s internal training and advisory service only.'
};
