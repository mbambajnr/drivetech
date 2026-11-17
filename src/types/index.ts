export interface Course {
  id: string;
  slug: string;
  name: string;
  category: 'driving' | 'motorcycle' | 'heavy-equipment';
  categoryLabel: string;
  shortSummary: string;
  detailedDescription: string;
  requirements: string[];
  duration: string;
  feeGuidance: string;
  packageInclusions: string[];
  availableBranchIds: string[];
  expectedNextStep: string;
  popular?: boolean;
}

export interface Branch {
  id: string;
  name: string;
  slug: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  whatsappLink: string;
  openingHours: string;
  servicesOffered: string[];
}

export type SubmissionType = 'training' | 'licensing';
export type SubmissionStatus = 'new' | 'contacted' | 'completed';

export interface Submission {
  id: string;
  referenceNumber: string;
  type: SubmissionType;
  status: SubmissionStatus;
  fullName: string;
  phone: string;
  email?: string;
  selectedServiceId: string;
  selectedServiceName: string;
  preferredBranchId: string;
  preferredBranchName: string;
  desiredStartPeriod?: string;
  customerMessage?: string;
  consentAcknowledged: boolean;
  authorityDisclaimerAcknowledged?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubmissionNote {
  id: string;
  submissionId: string;
  authorName: string;
  noteText: string;
  createdAt: string;
}

export interface StatusAuditEntry {
  id: string;
  submissionId: string;
  fromStatus: SubmissionStatus;
  toStatus: SubmissionStatus;
  changedBy: string;
  changedAt: string;
}

