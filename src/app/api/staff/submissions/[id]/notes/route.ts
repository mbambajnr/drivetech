import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, context: RouteContext) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  const noteText = (body.noteText || '').trim();

  if (!noteText) {
    return NextResponse.json({ success: false, error: 'Note text cannot be empty' }, { status: 400 });
  }

  const submission = db.getSubmissionById(id);
  if (!submission) {
    return NextResponse.json({ success: false, error: 'Submission not found' }, { status: 404 });
  }

  const newNote = db.addSubmissionNote(
    submission.id,
    session.fullName || session.email,
    noteText
  );

  const allNotes = db.getSubmissionNotes(submission.id);

  return NextResponse.json({
    success: true,
    note: newNote,
    notes: allNotes
  });
}

