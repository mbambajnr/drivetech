import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { SubmissionStatus } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const submission = db.getSubmissionById(id);

  if (!submission) {
    return NextResponse.json({ success: false, error: 'Submission not found' }, { status: 404 });
  }

  const notes = db.getSubmissionNotes(submission.id);
  const auditLogs = db.getStatusAuditLogs(submission.id);

  return NextResponse.json({
    success: true,
    submission,
    notes,
    auditLogs
  });
}

export async function PATCH(request: Request, context: RouteContext) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  const newStatus: SubmissionStatus = body.status;

  if (!['new', 'contacted', 'completed'].includes(newStatus)) {
    return NextResponse.json({ success: false, error: 'Invalid status value' }, { status: 400 });
  }

  const updated = db.updateSubmissionStatus(id, newStatus, session.fullName || session.email);
  if (!updated) {
    return NextResponse.json({ success: false, error: 'Submission not found' }, { status: 404 });
  }

  const auditLogs = db.getStatusAuditLogs(id);

  return NextResponse.json({
    success: true,
    submission: updated,
    auditLogs
  });
}

