import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import StaffDashboardClient from './StaffDashboardClient';

export default async function StaffPage() {
  const session = await getSession();

  if (!session) {
    redirect('/staff/login');
  }

  const initialSubmissions = db.getSubmissions();
  const initialStats = db.getStats();

  return (
    <StaffDashboardClient
      user={session}
      initialSubmissions={initialSubmissions}
      initialStats={initialStats}
    />
  );
}

