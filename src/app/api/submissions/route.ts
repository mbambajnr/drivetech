import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { COURSES, LICENSING_SERVICES } from '@/data/courses';
import { BRANCHES } from '@/data/branches';
import { generateReferenceNumber } from '@/lib/utils';
import { SubmissionType } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Bot Honeypot Protection
    if (body._hp_website && body._hp_website.trim() !== '') {
      // Silently reject bot submission
      return NextResponse.json({ success: true, referenceNumber: 'DT-SPAM-BLOCKED' }, { status: 200 });
    }

    const type: SubmissionType = body.type;
    if (type !== 'training' && type !== 'licensing') {
      return NextResponse.json({ success: false, error: 'Invalid submission type.' }, { status: 400 });
    }

    const fullName = (body.fullName || '').trim();
    const phone = (body.phone || '').trim();
    const email = (body.email || '').trim();
    const selectedServiceId = (body.selectedServiceId || '').trim();
    const preferredBranchId = (body.preferredBranchId || '').trim();
    const desiredStartPeriod = (body.desiredStartPeriod || '').trim();
    const customerMessage = (body.customerMessage || '').trim();
    const consentAcknowledged = Boolean(body.consentAcknowledged);
    const authorityDisclaimerAcknowledged = Boolean(body.authorityDisclaimerAcknowledged);

    // Validation
    const errors: Record<string, string> = {};

    if (!fullName || fullName.length < 2) {
      errors.fullName = 'Please enter your full legal name (at least 2 characters).';
    } else if (fullName.length > 100) {
      errors.fullName = 'Full name must not exceed 100 characters.';
    }

    if (!phone || phone.length < 6) {
      errors.phone = 'Please provide a valid contact telephone number.';
    } else if (phone.length > 30) {
      errors.phone = 'Phone number is too long.';
    }

    if (email && email.length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = 'Please provide a valid email address, or leave it blank.';
      }
    }

    if (!selectedServiceId) {
      errors.selectedServiceId = 'Please select a course or service.';
    }

    if (!preferredBranchId) {
      errors.preferredBranchId = 'Please select your preferred branch location.';
    }

    if (!consentAcknowledged) {
      errors.consentAcknowledged = 'You must acknowledge consent for DriveTech to contact you.';
    }

    if (type === 'licensing' && !authorityDisclaimerAcknowledged) {
      errors.authorityDisclaimerAcknowledged = 'You must acknowledge the official authority disclaimer.';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 422 });
    }

    // Resolve service name and branch name from catalogue
    let selectedServiceName = selectedServiceId;
    if (type === 'training') {
      const course = COURSES.find((c) => c.id === selectedServiceId);
      if (course) selectedServiceName = course.name;
    } else {
      const lic = LICENSING_SERVICES.find((l) => l.id === selectedServiceId);
      if (lic) selectedServiceName = lic.name;
    }

    let preferredBranchName = preferredBranchId;
    const branch = BRANCHES.find((b) => b.id === preferredBranchId);
    if (branch) preferredBranchName = branch.name;

    // Generate unique reference number
    const referenceNumber = generateReferenceNumber(type);

    // Save submission to database
    const newSubmission = db.createSubmission({
      referenceNumber,
      type,
      status: 'new',
      fullName,
      phone,
      email: email || undefined,
      selectedServiceId,
      selectedServiceName,
      preferredBranchId,
      preferredBranchName,
      desiredStartPeriod: desiredStartPeriod || undefined,
      customerMessage: customerMessage || undefined,
      consentAcknowledged,
      authorityDisclaimerAcknowledged: type === 'licensing' ? authorityDisclaimerAcknowledged : undefined
    });

    return NextResponse.json({
      success: true,
      referenceNumber,
      submission: newSubmission
    });

  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected system error occurred while saving your request. Please try again or contact us directly by telephone.' 
      },
      { status: 500 }
    );
  }
}

