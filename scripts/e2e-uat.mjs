import assert from 'assert';

const BASE_URL = 'http://localhost:3005';

console.log('========================================================');
console.log('  DRIVETECH PLATFORM — END-TO-END UAT INTEGRATION SUITE ');
console.log('========================================================\n');

let passed = 0;
let failed = 0;

async function check(name, testFn) {
  try {
    await testFn();
    console.log(`  ✓ [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ [FAIL] ${name}`);
    console.error(`    Error: ${err.message}`);
    failed++;
  }
}

async function runAll() {
  // 1. Home page check
  await check('UAT-01: Public Home page renders with 200 OK and DriveTech branding', async () => {
    const res = await fetch(`${BASE_URL}/`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();
    assert(html.includes('DriveTech'), 'Home page contains DriveTech');
    assert(html.includes('Apply for Training'), 'Home page contains CTA');
    assert(html.includes('WhatsApp'), 'Home page contains WhatsApp button');
  });

  // 2. Courses catalogue
  await check('UAT-02: Courses catalogue displays driving and motorcycle courses', async () => {
    const res = await fetch(`${BASE_URL}/courses`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();
    assert(html.includes('Light Vehicle Driving'), 'Contains light vehicle driving');
    assert(html.includes('Motorcycle Riding'), 'Contains motorcycle riding');
  });

  // 3. Heavy equipment page
  await check('UAT-03: Heavy equipment courses (Excavator, Forklift) render with curriculum', async () => {
    const res = await fetch(`${BASE_URL}/courses/excavator-operator-training`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();
    assert(html.includes('Hydraulic Excavator'), 'Contains Excavator title');
    assert(html.includes('Enrolment &amp; Entry Requirements') || html.includes('Requirements'), 'Contains Requirements');
    assert(html.includes('What is Included in This Package') || html.includes('Package'), 'Contains Inclusions');
  });

  // 4. Form validation with missing fields (UAT-04)
  await check('UAT-04: API rejects incomplete training application with validation errors', async () => {
    const res = await fetch(`${BASE_URL}/api/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'training',
        fullName: '', // empty name
        phone: '', // empty phone
        consentAcknowledged: false
      })
    });
    assert.strictEqual(res.status, 422, 'Should return 422 Unprocessable Entity');
    const data = await res.json();
    assert.strictEqual(data.success, false);
    assert(data.errors.fullName, 'Errors object has fullName');
    assert(data.errors.phone, 'Errors object has phone');
  });

  // 5. Successful training form submission (UAT-05)
  let createdTrnRef = '';
  let createdTrnId = '';
  await check('UAT-05: Valid training form submission returns reference code (DT-TRN-...)', async () => {
    const res = await fetch(`${BASE_URL}/api/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'training',
        fullName: 'Marcus Vance',
        phone: '+1 555-019-8833',
        email: 'marcus.vance@example.com',
        selectedServiceId: 'course-car-standard',
        preferredBranchId: 'branch-central',
        desiredStartPeriod: 'Next available start period',
        customerMessage: 'First time learner seeking manual car lessons.',
        consentAcknowledged: true
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert(data.referenceNumber.startsWith('DT-TRN-'), 'Ref code starts with DT-TRN-');
    createdTrnRef = data.referenceNumber;
    createdTrnId = data.submission.id;
  });

  // 6. Licensing assistance request with disclaimer (UAT-06)
  let createdLicId = '';
  await check('UAT-06: Licensing assistance request requires authority disclaimer and stores successfully', async () => {
    // Attempt without disclaimer
    const failedRes = await fetch(`${BASE_URL}/api/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'licensing',
        fullName: 'Kofi Mensah',
        phone: '+1 555-017-4499',
        selectedServiceId: 'lic-new-driver',
        preferredBranchId: 'branch-central',
        consentAcknowledged: true,
        authorityDisclaimerAcknowledged: false // Missing disclaimer!
      })
    });
    assert.strictEqual(failedRes.status, 422);

    // Now submit with disclaimer acknowledged
    const successRes = await fetch(`${BASE_URL}/api/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'licensing',
        fullName: 'Kofi Mensah',
        phone: '+1 555-017-4499',
        email: 'kofi.m@example.com',
        selectedServiceId: 'lic-new-driver',
        preferredBranchId: 'branch-central',
        customerMessage: 'Seeking guidance on theory test prerequisites.',
        consentAcknowledged: true,
        authorityDisclaimerAcknowledged: true
      })
    });
    assert.strictEqual(successRes.status, 200);
    const data = await successRes.json();
    assert.strictEqual(data.success, true);
    assert(data.referenceNumber.startsWith('DT-LIC-'));
    createdLicId = data.submission.id;
  });

  // 7. Branches and contact channels (UAT-07 & UAT-08)
  await check('UAT-07 & 08: Branches page renders with direct phone and WhatsApp links', async () => {
    const res = await fetch(`${BASE_URL}/branches`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();
    assert(html.includes('tel:'), 'Contains tel: dial action');
    assert(html.includes('https://wa.me/'), 'Contains https://wa.me/ WhatsApp link');
  });

  // 8. Unauthenticated staff access check (UAT-09)
  await check('UAT-09: Unauthenticated request to /staff is blocked and redirects to /staff/login', async () => {
    const res = await fetch(`${BASE_URL}/staff`, { redirect: 'manual' });
    // In Next.js, redirect() returns 307 or 302
    assert(res.status === 307 || res.status === 302, `Redirect status was ${res.status}`);
    const location = res.headers.get('location');
    assert(location && location.includes('/staff/login'), 'Redirected to /staff/login');
  });

  // 9. Staff authentication and session creation
  let authCookie = '';
  await check('UAT-10 (Auth): Staff can authenticate with credentials to receive session cookie', async () => {
    const res = await fetch(`${BASE_URL}/api/staff/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@drivetech.com',
        password: 'DriveTech2026!'
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.user.email, 'admin@drivetech.com');

    const setCookie = res.headers.get('set-cookie');
    assert(setCookie && setCookie.includes('drivetech_staff_session'), 'Session cookie was set');
    authCookie = setCookie.split(';')[0];
  });

  // 10. Status workflow transition New -> Contacted (UAT-11)
  await check('UAT-11: Staff updates application status to "contacted" and audit log records transition', async () => {
    assert(createdTrnId, 'Training submission ID must exist');
    const res = await fetch(`${BASE_URL}/api/staff/submissions/${createdTrnId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': authCookie
      },
      body: JSON.stringify({ status: 'contacted' })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.submission.status, 'contacted');
    assert(data.auditLogs.some(l => l.toStatus === 'contacted'), 'Audit entry recorded for contacted');
  });

  // 11. Internal notes addition (FR-STAFF-005)
  await check('FR-STAFF-005: Staff can add internal follow-up note to submission', async () => {
    const res = await fetch(`${BASE_URL}/api/staff/submissions/${createdTrnId}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': authCookie
      },
      body: JSON.stringify({
        noteText: 'Called Marcus at 10:15 AM. Confirmed availability for Central Campus morning class.'
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert(data.notes.some(n => n.noteText.includes('Called Marcus')), 'Note recorded in thread');
  });

  // 12. Status workflow transition Contacted -> Completed (UAT-12)
  await check('UAT-12: Staff updates application status to "completed" and status persists', async () => {
    const res = await fetch(`${BASE_URL}/api/staff/submissions/${createdTrnId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': authCookie
      },
      body: JSON.stringify({ status: 'completed' })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.submission.status, 'completed');
  });

  // 13. Spam honeypot rejection (UAT-13)
  await check('UAT-13: Spam honeypot silently blocks bot automated submissions', async () => {
    const res = await fetch(`${BASE_URL}/api/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'training',
        fullName: 'Spam Bot 3000',
        phone: '+1 555-000-0000',
        _hp_website: 'https://malicious-spam-domain.com' // Bot filled honeypot!
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.referenceNumber, 'DT-SPAM-BLOCKED');
  });

  console.log('\n========================================================');
  console.log(`  E2E TEST SUMMARY: ${passed} PASSED, ${failed} FAILED (${Math.round((passed / (passed + failed)) * 100)}%)`);
  console.log('========================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runAll().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});

