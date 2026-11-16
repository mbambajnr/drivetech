import { NextResponse } from 'next/server';
import { createSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
    }

    const result = await createSession(email, password);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error || 'Authentication failed' }, { status: 401 });
    }

    return NextResponse.json({ success: true, user: result.user });
  } catch (err) {
    console.error('Staff login error:', err);
    return NextResponse.json({ success: false, error: 'Internal login error' }, { status: 500 });
  }
}
