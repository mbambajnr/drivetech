import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { db } from './db';

const SESSION_COOKIE_NAME = 'drivetech_staff_session';

export interface StaffSession {
  userId: string;
  email: string;
  fullName: string;
  role: string;
}

export async function createSession(email: string, passwordPlain: string): Promise<{ success: boolean; error?: string; user?: StaffSession }> {
  const staff = db.getStaffUserByEmail(email);
  if (!staff) {
    return { success: false, error: 'Invalid email or password' };
  }

  const isValid = bcrypt.compareSync(passwordPlain, staff.passwordHash);
  if (!isValid) {
    return { success: false, error: 'Invalid email or password' };
  }

  const sessionData: StaffSession = {
    userId: staff.id,
    email: staff.email,
    fullName: staff.fullName,
    role: staff.role
  };

  const cookieStore = await cookies();
  const sessionToken = Buffer.from(JSON.stringify(sessionData)).toString('base64');
  
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 // 24 hours
  });

  return { success: true, user: sessionData };
}

export async function getSession(): Promise<StaffSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const session: StaffSession = JSON.parse(decoded);
    return session;
  } catch (err) {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
