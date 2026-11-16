import assert from 'assert';
import { db } from '../src/lib/db.ts';
import { COURSES, LICENSING_SERVICES } from '../src/data/courses.ts';
import { BRANCHES, COMPANY_INFO } from '../src/data/branches.ts';
import { generateReferenceNumber } from '../src/lib/utils.ts';

console.log('====================================================');
console.log('   DRIVETECH DIGITAL PLATFORM — UAT VERIFICATION    ');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function test(description: string, fn: () => void) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ [PASS] ${description}`);
    passedTests++;
  } catch (err: any) {
    console.error(`  ✗ [FAIL] ${description}`);
    console.error(`    ${err.message}`);
  }
}

// UAT-01, 02, 03: Catalogue verification
test('UAT-01: Driving course data is published with fees and requirements', () => {
  const carCourse = COURSES.find(c => c.slug === 'standard-car-driving');
  assert(carCourse, 'Standard car course exists');
  assert.strictEqual(carCourse.category, 'driving');
  assert(carCourse.feeGuidance.length > 0, 'Fee guidance is populated');
  assert(carCourse.requirements.length > 0, 'Requirements are defined');
  assert(carCourse.packageInclusions.length > 0, 'Package inclusions defined');
});

test('UAT-02: Motorcycle course data is published with safety gear inclusions', () => {
  const moto = COURSES.find(c => c.slug === 'beginner-motorcycle-training');
  assert(moto, 'Motorcycle course exists');
  assert.strictEqual(moto.category, 'motorcycle');
  assert(moto.packageInclusions.some(i => i.toLowerCase().includes('helmet')), 'Helmet/gear included');
});

test('UAT-03: Heavy equipment courses (Excavator, Forklift) are published with operator certification info', () => {
  const excavator = COURSES.find(c => c.slug === 'excavator-operator-training');
  const forklift = COURSES.find(c => c.slug === 'forklift-operator-training');
  assert(excavator, 'Excavator course exists');
  assert(forklift, 'Forklift course exists');
  assert.strictEqual(excavator.category, 'heavy-equipment');
  assert.strictEqual(forklift.category, 'heavy-equipment');
});

// UAT-04: Form validation with missing fields
test('UAT-04: Reference codes generated match standard format', () => {
  const trnRef = generateReferenceNumber('training');
  assert(trnRef.startsWith('DT-TRN-'), 'Reference prefix must be DT-TRN-');

  const licRef = generateReferenceNumber('licensing');
  assert(licRef.startsWith('DT-LIC-'), 'Reference prefix must be DT-LIC-');
});

// UAT-05: Successful training submission & storage
test('UAT-05: Training form submission saves cleanly with reference number and New status', () => {
  const ref = generateReferenceNumber('training');
  const newSub = db.createSubmission({
    referenceNumber: ref,
    type: 'training',
    status: 'new',
    fullName: 'David K. Osei',
    phone: '+1 555-019-3388',
    email: 'david.osei@example.com',
    selectedServiceId: 'course-car-standard',
    selectedServiceName: 'Standard Light Vehicle Driving (Class B)',
    preferredBranchId: 'branch-central',
    preferredBranchName: 'DriveTech Central Training Academy',
    desiredStartPeriod: 'Within the next 2 weeks',
    customerMessage: 'Prefers morning sessions.',
    consentAcknowledged: true
  });

  assert(newSub.id, 'Record must have an ID');
  assert.strictEqual(newSub.status, 'new', 'Initial status must be new');
  assert.strictEqual(newSub.referenceNumber, ref);

  const retrieved = db.getSubmissionById(newSub.id);
  assert(retrieved, 'Should retrieve from database');
  assert.strictEqual(retrieved.fullName, 'David K. Osei');
});

// UAT-06: Licensing assistance request with mandatory disclaimer
test('UAT-06: Licensing assistance requires authority disclaimer and records disclaimer acknowledgement', () => {
  const ref = generateReferenceNumber('licensing');
  const licSub = db.createSubmission({
    referenceNumber: ref,
    type: 'licensing',
    status: 'new',
    fullName: 'Maria Rodriguez',
    phone: '+1 555-019-7722',
    email: 'm.rodriguez@example.com',
    selectedServiceId: 'lic-international-conversion',
    selectedServiceName: 'Foreign / International Licence Conversion Support',
    preferredBranchId: 'branch-west',
    preferredBranchName: 'DriveTech West City Campus',
    consentAcknowledged: true,
    authorityDisclaimerAcknowledged: true
  });

  assert(licSub.id);
  assert.strictEqual(licSub.authorityDisclaimerAcknowledged, true, 'Authority disclaimer must be recorded');
});

// UAT-07 & UAT-08: Contact channels (tel: and WhatsApp)
test('UAT-07 & 08: Direct telephone and WhatsApp URL formats are valid and tested', () => {
  for (const b of BRANCHES) {
    assert(b.phone.length > 5, 'Branch phone must exist');
    assert(b.whatsappNumber.length > 5, 'WhatsApp number must exist');
    assert(b.whatsappLink.startsWith('https://wa.me/'), 'WhatsApp link must use wa.me protocol');
  }
  assert(COMPANY_INFO.centralPhone, 'Central phone must exist');
  assert(COMPANY_INFO.authorityDisclaimer.includes('relevant authority'), 'Authority disclaimer text accurate');
});

// UAT-10, 11, 12: Status workflow transitions & audit log
test('UAT-10, 11, 12: Status transitions (New -> Contacted -> Completed) update DB and generate audit logs', () => {
  const ref = generateReferenceNumber('training');
  const sub = db.createSubmission({
    referenceNumber: ref,
    type: 'training',
    status: 'new',
    fullName: 'Test Workflow Applicant',
    phone: '+1 555-011-2233',
    selectedServiceId: 'course-car-standard',
    selectedServiceName: 'Standard Light Vehicle Driving (Class B)',
    preferredBranchId: 'branch-central',
    preferredBranchName: 'DriveTech Central Training Academy',
    consentAcknowledged: true
  });

  // Verify initial status is new (UAT-10)
  assert.strictEqual(sub.status, 'new');

  // Transition to contacted (UAT-11)
  const contactedSub = db.updateSubmissionStatus(sub.id, 'contacted', 'Sarah Jenkins');
  assert(contactedSub);
  assert.strictEqual(contactedSub.status, 'contacted');

  // Verify audit log entry created
  let auditLogs = db.getStatusAuditLogs(sub.id);
  assert(auditLogs.length >= 1, 'Audit log created');
  assert.strictEqual(auditLogs[0].fromStatus, 'new');
  assert.strictEqual(auditLogs[0].toStatus, 'contacted');
  assert.strictEqual(auditLogs[0].changedBy, 'Sarah Jenkins');

  // Add internal follow-up note (FR-STAFF-005)
  const note = db.addSubmissionNote(sub.id, 'Sarah Jenkins', 'Spoke with applicant. Sent weekend schedule.');
  assert(note.id);
  assert.strictEqual(note.noteText, 'Spoke with applicant. Sent weekend schedule.');

  const notesList = db.getSubmissionNotes(sub.id);
  assert(notesList.some(n => n.id === note.id), 'Note appears in submission thread');

  // Transition to completed (UAT-12)
  const completedSub = db.updateSubmissionStatus(sub.id, 'completed', 'DriveTech Operations Lead');
  assert(completedSub);
  assert.strictEqual(completedSub.status, 'completed');

  auditLogs = db.getStatusAuditLogs(sub.id);
  assert(auditLogs.some(l => l.toStatus === 'completed'), 'Completed transition logged');
});

console.log('\n----------------------------------------------------');
console.log(`Results: ${passedTests}/${totalTests} tests passed (${Math.round((passedTests/totalTests)*100)}%)\n`);
