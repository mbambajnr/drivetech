import fs from 'fs';
import path from 'path';
import { Submission, SubmissionNote, StatusAuditEntry, SubmissionStatus, SubmissionType } from '@/types';
import bcrypt from 'bcryptjs';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'drivetech_store.json');

interface DatabaseStore {
  submissions: Submission[];
  notes: SubmissionNote[];
  auditLogs: StatusAuditEntry[];
  staffUsers: Array<{
    id: string;
    email: string;
    passwordHash: string;
    fullName: string;
    role: string;
    createdAt: string;
  }>;
}

function ensureDataStore(): DatabaseStore {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    // Seed initial staff user: admin@drivetech.com / DriveTech2026!
    const defaultPasswordHash = bcrypt.hashSync('DriveTech2026!', 10);
    const initialStore: DatabaseStore = {
      submissions: [
        {
          id: 'sub-sample-01',
          referenceNumber: 'DT-TRN-20261116-A1B2',
          type: 'training',
          status: 'new',
          fullName: 'Alexander Wright',
          phone: '+1 555-014-9921',
          email: 'alex.wright@example.com',
          selectedServiceId: 'course-car-standard',
          selectedServiceName: 'Standard Light Vehicle Driving (Class B)',
          preferredBranchId: 'branch-central',
          preferredBranchName: 'DriveTech Central Training Academy',
          desiredStartPeriod: 'Within next 2 weeks',
          customerMessage: 'Looking for morning weekend sessions to prepare for license exam.',
          consentAcknowledged: true,
          createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 2).toISOString()
        },
        {
          id: 'sub-sample-02',
          referenceNumber: 'DT-LIC-20261116-K9P3',
          type: 'licensing',
          status: 'contacted',
          fullName: 'Fatima Al-Mansoor',
          phone: '+1 555-018-4412',
          email: 'fatima.m@example.com',
          selectedServiceId: 'lic-international-conversion',
          selectedServiceName: 'Foreign / International Licence Conversion Support',
          preferredBranchId: 'branch-west',
          preferredBranchName: 'DriveTech West City Campus',
          customerMessage: 'Relocated recently. Need assistance converting GCC driver license.',
          consentAcknowledged: true,
          authorityDisclaimerAcknowledged: true,
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 18).toISOString()
        }
      ],
      notes: [
        {
          id: 'note-01',
          submissionId: 'sub-sample-02',
          authorName: 'Sarah Jenkins (Admissions)',
          noteText: 'Called Fatima via phone. Sent translation guideline checklist via WhatsApp. Waiting for her document copies.',
          createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
        }
      ],
      auditLogs: [
        {
          id: 'audit-01',
          submissionId: 'sub-sample-02',
          fromStatus: 'new',
          toStatus: 'contacted',
          changedBy: 'Sarah Jenkins',
          changedAt: new Date(Date.now() - 3600000 * 18).toISOString()
        }
      ],
      staffUsers: [
        {
          id: 'staff-admin-01',
          email: 'admin@drivetech.com',
          passwordHash: defaultPasswordHash,
          fullName: 'DriveTech Operations Lead',
          role: 'admin',
          createdAt: new Date().toISOString()
        },
        {
          id: 'staff-member-02',
          email: 'sarah.jenkins@drivetech.com',
          passwordHash: defaultPasswordHash,
          fullName: 'Sarah Jenkins',
          role: 'staff',
          createdAt: new Date().toISOString()
        }
      ]
    };

    fs.writeFileSync(DB_FILE, JSON.stringify(initialStore, null, 2), 'utf8');
    return initialStore;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading DB_FILE, creating fresh store', e);
    return {
      submissions: [],
      notes: [],
      auditLogs: [],
      staffUsers: []
    };
  }
}

function saveStore(store: DatabaseStore) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(store, null, 2), 'utf8');
}

export const db = {
  getSubmissions(filter?: { status?: string; type?: string; branchId?: string; search?: string }): Submission[] {
    const store = ensureDataStore();
    let results = [...store.submissions];

    if (filter?.status && filter.status !== 'all') {
      results = results.filter((s) => s.status === filter.status);
    }
    if (filter?.type && filter.type !== 'all') {
      results = results.filter((s) => s.type === filter.type);
    }
    if (filter?.branchId && filter.branchId !== 'all') {
      results = results.filter((s) => s.preferredBranchId === filter.branchId);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      results = results.filter(
        (s) =>
          s.fullName.toLowerCase().includes(q) ||
          s.phone.toLowerCase().includes(q) ||
          (s.email && s.email.toLowerCase().includes(q)) ||
          s.referenceNumber.toLowerCase().includes(q) ||
          s.selectedServiceName.toLowerCase().includes(q)
      );
    }

    // Sort newest first
    return results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getSubmissionById(id: string): Submission | null {
    const store = ensureDataStore();
    return store.submissions.find((s) => s.id === id || s.referenceNumber === id) || null;
  },

  createSubmission(submission: Omit<Submission, 'id' | 'createdAt' | 'updatedAt'>): Submission {
    const store = ensureDataStore();
    const id = `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const newRecord: Submission = {
      ...submission,
      id,
      createdAt: now,
      updatedAt: now
    };

    store.submissions.unshift(newRecord);
    saveStore(store);
    return newRecord;
  },

  updateSubmissionStatus(id: string, newStatus: SubmissionStatus, updatedBy: string): Submission | null {
    const store = ensureDataStore();
    const index = store.submissions.findIndex((s) => s.id === id);
    if (index === -1) return null;

    const current = store.submissions[index];
    const prevStatus = current.status;

    if (prevStatus !== newStatus) {
      current.status = newStatus;
      current.updatedAt = new Date().toISOString();

      // Record audit log entry
      store.auditLogs.unshift({
        id: `audit-${Date.now()}`,
        submissionId: id,
        fromStatus: prevStatus,
        toStatus: newStatus,
        changedBy: updatedBy,
        changedAt: new Date().toISOString()
      });

      saveStore(store);
    }

    return current;
  },

  addSubmissionNote(submissionId: string, authorName: string, noteText: string): SubmissionNote {
    const store = ensureDataStore();
    const newNote: SubmissionNote = {
      id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      submissionId,
      authorName,
      noteText,
      createdAt: new Date().toISOString()
    };

    store.notes.unshift(newNote);
    saveStore(store);
    return newNote;
  },

  getSubmissionNotes(submissionId: string): SubmissionNote[] {
    const store = ensureDataStore();
    return store.notes
      .filter((n) => n.submissionId === submissionId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getStatusAuditLogs(submissionId: string): StatusAuditEntry[] {
    const store = ensureDataStore();
    return store.auditLogs
      .filter((l) => l.submissionId === submissionId)
      .sort((a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime());
  },

  getStats() {
    const store = ensureDataStore();
    const total = store.submissions.length;
    const newCount = store.submissions.filter((s) => s.status === 'new').length;
    const contactedCount = store.submissions.filter((s) => s.status === 'contacted').length;
    const completedCount = store.submissions.filter((s) => s.status === 'completed').length;
    const trainingCount = store.submissions.filter((s) => s.type === 'training').length;
    const licensingCount = store.submissions.filter((s) => s.type === 'licensing').length;

    return {
      total,
      newCount,
      contactedCount,
      completedCount,
      trainingCount,
      licensingCount
    };
  },

  getStaffUserByEmail(email: string) {
    const store = ensureDataStore();
    return store.staffUsers.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  }
};

