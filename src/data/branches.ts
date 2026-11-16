import { Branch } from '@/types';

export const BRANCHES: Branch[] = [
  {
    id: 'branch-central',
    name: 'DriveTech Central Training Academy',
    slug: 'central-academy',
    address: '12 Commercial Way, Central District, Metropolis',
    phone: '+1 (555) 019-2831',
    whatsappNumber: '+15550192831',
    whatsappLink: 'https://wa.me/15550192831?text=Hello%20DriveTech,%20I%20would%20like%20to%20enquire%20about%20training%20courses',
    openingHours: 'Mon - Fri: 8:00 AM - 5:30 PM | Sat: 8:30 AM - 2:00 PM | Sun: Closed',
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
    address: '45 Industrial Park Boulevard, West Metropolitan Hub',
    phone: '+1 (555) 019-2832',
    whatsappNumber: '+15550192832',
    whatsappLink: 'https://wa.me/15550192832?text=Hello%20DriveTech%20West,%20I%20am%20interested%20in%20courses%20at%20West%20Campus',
    openingHours: 'Mon - Fri: 8:30 AM - 5:00 PM | Sat: 9:00 AM - 1:00 PM | Sun: Closed',
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
  name: 'DriveTech',
  tagline: 'Professional Driver & Heavy Machinery Academy',
  primaryEmail: 'admissions@drivetech-academy.com',
  generalWhatsApp: 'https://wa.me/15550192831',
  centralPhone: '+1 (555) 019-2831',
  supportHours: 'Monday - Saturday: 8:00 AM - 5:30 PM',
  authorityDisclaimer: 'Submitting an enquiry or assistance request starts DriveTech’s internal review and follow-up process. DriveTech is an accredited private vocational academy and does not represent the government licensing authority. Final licence approval, testing certification, and licence issuance remain strictly subject to the statutory criteria, decisions, and fees of the official national licensing authority.'
};
