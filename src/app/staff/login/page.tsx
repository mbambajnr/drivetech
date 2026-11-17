'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Car, AlertCircle, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';

export default function StaffLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/staff/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Invalid credentials');
      } else {
        router.push('/staff');
        router.refresh();
      }
    } catch (err) {
      setError('Unable to authenticate. Please verify network connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoAdmin = () => {
    setEmail('admin@drivetech.com');
    setPassword('DriveTech2026!');
  };

  const fillDemoStaff = () => {
    setEmail('sarah.jenkins@drivetech.com');
    setPassword('DriveTech2026!');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        
        {/* Brand & Heading */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-36 h-20 flex items-center justify-center mb-1">
            <Image 
              src="/images/logo.svg" 
              alt="DriveTech Logo" 
              width={160} 
              height={80} 
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Staff Workspace Access
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Authorised DriveTech branch coordinators and administrators
          </p>
        </div>

        {/* Demo Credentials Helper Pill Box */}
        <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 space-y-2 text-xs text-blue-900">
          <div className="flex items-center gap-1.5 font-bold text-blue-950">
            <KeyRound className="w-4 h-4 text-blue-600" />
            <span>Demo Testing Credentials (Pre-seeded):</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={fillDemoAdmin}
              className="px-2.5 py-1 rounded-lg bg-white border border-blue-200 hover:bg-blue-100 font-semibold text-blue-800 transition-colors"
            >
              Fill: Admin (Operations)
            </button>
            <button
              type="button"
              onClick={fillDemoStaff}
              className="px-2.5 py-1 rounded-lg bg-white border border-blue-200 hover:bg-blue-100 font-semibold text-blue-800 transition-colors"
            >
              Fill: Sarah (Admissions)
            </button>
          </div>
          <div className="text-[11px] text-blue-700">
            Password: <code className="bg-blue-100 px-1 py-0.5 rounded font-mono font-bold">DriveTech2026!</code>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="staffEmail" className="block text-xs font-bold text-slate-800 mb-1.5">
                Staff Email Address
              </label>
              <input
                id="staffEmail"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@drivetech.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
              />
            </div>

            <div>
              <label htmlFor="staffPassword" className="block text-xs font-bold text-slate-800 mb-1.5">
                Staff Password
              </label>
              <input
                id="staffPassword"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-600 shadow-md transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center border-t border-slate-100">
            <Link href="/" className="text-xs text-slate-500 hover:text-blue-600">
              ← Return to DriveTech Public Site
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

