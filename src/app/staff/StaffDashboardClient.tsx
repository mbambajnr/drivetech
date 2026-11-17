'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Lock, 
  LogOut, 
  Inbox, 
  Clock, 
  CheckCircle2, 
  PhoneCall, 
  MessageCircle, 
  Search, 
  Filter, 
  FileText, 
  Car, 
  Calendar, 
  MapPin, 
  User, 
  X, 
  Send, 
  AlertCircle,
  History,
  ShieldCheck,
  RefreshCw,
  ChevronDown
} from 'lucide-react';
import { Submission, SubmissionNote, StatusAuditEntry, SubmissionStatus } from '@/types';
import { formatDate, timeAgo } from '@/lib/utils';
import { BRANCHES } from '@/data/branches';

interface ClientProps {
  user: {
    userId: string;
    email: string;
    fullName: string;
    role: string;
  };
  initialSubmissions: Submission[];
  initialStats: {
    total: number;
    newCount: number;
    contactedCount: number;
    completedCount: number;
    trainingCount: number;
    licensingCount: number;
  };
}

export default function StaffDashboardClient({ user, initialSubmissions, initialStats }: ClientProps) {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
  const [stats, setStats] = useState(initialStats);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [branchFilter, setBranchFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Selected Submission for Modal / Detail Drawer
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);
  const [selectedNotes, setSelectedNotes] = useState<SubmissionNote[]>([]);
  const [selectedAudit, setSelectedAudit] = useState<StatusAuditEntry[]>([]);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch('/api/staff/logout', { method: 'POST' });
      router.push('/staff/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Open detail modal
  const openDetail = async (sub: Submission) => {
    setSelectedSub(sub);
    setIsLoadingDetail(true);
    try {
      const res = await fetch(`/api/staff/submissions/${sub.id}`);
      const data = await res.json();
      if (data.success) {
        setSelectedNotes(data.notes || []);
        setSelectedAudit(data.auditLogs || []);
      }
    } catch (err) {
      console.error('Failed to load submission details', err);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  // Status transition update handler
  const updateStatus = async (newStatus: SubmissionStatus) => {
    if (!selectedSub || selectedSub.status === newStatus) return;

    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/staff/submissions/${selectedSub.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await res.json();
      if (data.success && data.submission) {
        const updated = data.submission as Submission;
        setSelectedSub(updated);
        setSelectedAudit(data.auditLogs || []);

        // Update in main list
        setSubmissions((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));

        // Recalculate stats
        setStats((prev) => {
          const oldStatus = selectedSub.status;
          return {
            ...prev,
            newCount: oldStatus === 'new' ? prev.newCount - 1 : newStatus === 'new' ? prev.newCount + 1 : prev.newCount,
            contactedCount: oldStatus === 'contacted' ? prev.contactedCount - 1 : newStatus === 'contacted' ? prev.contactedCount + 1 : prev.contactedCount,
            completedCount: oldStatus === 'completed' ? prev.completedCount - 1 : newStatus === 'completed' ? prev.completedCount + 1 : prev.completedCount,
          };
        });
      }
    } catch (err) {
      console.error('Status update failed', err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Add internal note handler
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub || !newNoteText.trim()) return;

    setIsAddingNote(true);
    try {
      const res = await fetch(`/api/staff/submissions/${selectedSub.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteText: newNoteText })
      });

      const data = await res.json();
      if (data.success && data.notes) {
        setSelectedNotes(data.notes);
        setNewNoteText('');
      }
    } catch (err) {
      console.error('Failed to add note', err);
    } finally {
      setIsAddingNote(false);
    }
  };

  // Filter and sort submissions
  const filteredSubmissions = submissions
    .filter((sub) => {
      const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
      const matchesType = typeFilter === 'all' || sub.type === typeFilter;
      const matchesBranch = branchFilter === 'all' || sub.preferredBranchId === branchFilter;
      
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        !searchQuery ||
        sub.fullName.toLowerCase().includes(q) ||
        sub.phone.toLowerCase().includes(q) ||
        (sub.email && sub.email.toLowerCase().includes(q)) ||
        sub.referenceNumber.toLowerCase().includes(q) ||
        sub.selectedServiceName.toLowerCase().includes(q);

      return matchesStatus && matchesType && matchesBranch && matchesSearch;
    })
    .sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
    });

  return (
    <div className="py-8 sm:py-12 bg-slate-100/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow">
              <Lock className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  DriveTech Staff Workspace
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Logged in as <strong>{user.fullName}</strong> ({user.email})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Public Site ↗
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Metric Counter Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
              <span>Total Pipeline</span>
              <Inbox className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">{stats.total}</div>
            <div className="text-[11px] text-slate-500 font-medium">
              {stats.trainingCount} Training · {stats.licensingCount} Licensing
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-amber-700 text-xs font-bold uppercase tracking-wider">
              <span>New (Uncontacted)</span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-600">{stats.newCount}</div>
            <div className="text-[11px] text-amber-800 font-medium">
              Awaiting initial staff outreach
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-blue-200/80 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-blue-700 text-xs font-bold uppercase tracking-wider">
              <span>In Follow-Up</span>
              <Clock className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-blue-600">{stats.contactedCount}</div>
            <div className="text-[11px] text-blue-800 font-medium">
              Contacted / Scheduling in progress
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-200/80 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <span>Completed</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">{stats.completedCount}</div>
            <div className="text-[11px] text-emerald-800 font-medium">
              Enrolled or closed
            </div>
          </div>

        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, phone, email, reference code (DT-...)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
              />
            </div>

            {/* Sort Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium shrink-0">Sort:</span>
              <button
                onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                {sortOrder === 'newest' ? 'Newest First ↓' : 'Oldest First ↑'}
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 text-xs">
            
            {/* Status Tabs */}
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-500 uppercase mr-1">Status:</span>
              {['all', 'new', 'contacted', 'completed'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-lg capitalize font-bold transition-all ${
                    statusFilter === st
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            {/* Type Tabs */}
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-500 uppercase mr-1">Type:</span>
              {[
                { id: 'all', label: 'All' },
                { id: 'training', label: 'Training' },
                { id: 'licensing', label: 'Licensing' }
              ].map((tp) => (
                <button
                  key={tp.id}
                  onClick={() => setTypeFilter(tp.id)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    typeFilter === tp.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tp.label}
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            {/* Branch Filter */}
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-500 uppercase mr-1">Branch:</span>
              <select
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
                className="px-2 py-1 rounded-lg bg-slate-100 border-none font-semibold text-slate-700 text-xs focus:ring-1 focus:ring-slate-400"
              >
                <option value="all">All Branches</option>
                {BRANCHES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name.replace('DriveTech ', '')}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Submissions Table / Cards */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Submissions Queue ({filteredSubmissions.length})
            </h2>
            <span className="text-xs text-slate-400">
              Showing matching enquiries
            </span>
          </div>

          {filteredSubmissions.length === 0 ? (
            <div className="py-16 text-center text-slate-500 text-xs sm:text-sm space-y-2">
              <p>No submissions found matching the selected filters.</p>
              <button
                onClick={() => { setSearchQuery(''); setStatusFilter('all'); setTypeFilter('all'); setBranchFilter('all'); }}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Reference</th>
                    <th className="py-3 px-4">Applicant</th>
                    <th className="py-3 px-4">Requested Service</th>
                    <th className="py-3 px-4">Branch</th>
                    <th className="py-3 px-4">Age / Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSubmissions.map((sub) => {
                    return (
                      <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors group">
                        
                        {/* Status Pill */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {sub.status === 'new' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900 border border-amber-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              <span>New</span>
                            </span>
                          )}
                          {sub.status === 'contacted' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-blue-100 text-blue-900 border border-blue-200">
                              <Clock className="w-3 h-3 text-blue-600" />
                              <span>Contacted</span>
                            </span>
                          )}
                          {sub.status === 'completed' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-900 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Completed</span>
                            </span>
                          )}
                        </td>

                        {/* Reference & Type */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="font-mono font-bold text-slate-900">
                            {sub.referenceNumber}
                          </div>
                          <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded ${
                            sub.type === 'training' ? 'text-blue-700 bg-blue-50' : 'text-amber-700 bg-amber-50'
                          }`}>
                            {sub.type}
                          </span>
                        </td>

                        {/* Applicant Name & Phone */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 text-sm">
                            {sub.fullName}
                          </div>
                          <div className="flex items-center gap-2 text-slate-500 text-xs">
                            <a 
                              href={`tel:${sub.phone}`} 
                              className="text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                            >
                              <PhoneCall className="w-3 h-3" />
                              <span>{sub.phone}</span>
                            </a>
                            {sub.email && (
                              <span className="truncate max-w-[140px] text-slate-400">· {sub.email}</span>
                            )}
                          </div>
                        </td>

                        {/* Service Name */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900 line-clamp-1 max-w-[220px]">
                            {sub.selectedServiceName}
                          </div>
                          {sub.desiredStartPeriod && (
                            <div className="text-[11px] text-slate-500">
                              Timing: {sub.desiredStartPeriod}
                            </div>
                          )}
                        </td>

                        {/* Branch */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-slate-600">
                          {sub.preferredBranchName.replace('DriveTech ', '')}
                        </td>

                        {/* Age / Date */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="font-semibold text-slate-900">
                            {timeAgo(sub.createdAt)}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {formatDate(sub.createdAt).split(',')[0]}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={`https://wa.me/${sub.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${sub.fullName}, this is DriveTech Admissions regarding your enquiry (${sub.referenceNumber}).`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>

                            <button
                              onClick={() => openDetail(sub)}
                              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs transition-colors shadow-sm"
                            >
                              Manage
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>

        {/* DETAIL DRAWER / MODAL (FR-STAFF-003, 004, 005, 006) */}
        {selectedSub && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
              
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50 rounded-t-3xl">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {selectedSub.referenceNumber}
                    </span>
                    <span className="text-xs font-bold uppercase text-slate-500">
                      {selectedSub.type} Enquiry
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    {selectedSub.fullName}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedSub(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                
                {/* 1. Status Workflow Controls (FR-STAFF-004) */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Update Workflow Status
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      disabled={isUpdatingStatus}
                      onClick={() => updateStatus('new')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedSub.status === 'new'
                          ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-300'
                          : 'bg-white text-slate-700 border border-slate-300 hover:bg-amber-50'
                      }`}
                    >
                      New (Received)
                    </button>

                    <button
                      type="button"
                      disabled={isUpdatingStatus}
                      onClick={() => updateStatus('contacted')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedSub.status === 'contacted'
                          ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                          : 'bg-white text-slate-700 border border-slate-300 hover:bg-blue-50'
                      }`}
                    >
                      Contacted (In Follow-up)
                    </button>

                    <button
                      type="button"
                      disabled={isUpdatingStatus}
                      onClick={() => updateStatus('completed')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedSub.status === 'completed'
                          ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                          : 'bg-white text-slate-700 border border-slate-300 hover:bg-emerald-50'
                      }`}
                    >
                      Completed (Closed)
                    </button>
                  </div>
                </div>

                {/* 2. Applicant & Service Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="text-slate-400 font-semibold uppercase">Contact Telephone</div>
                    <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                      <a href={`tel:${selectedSub.phone}`} className="text-blue-600 hover:underline">
                        {selectedSub.phone}
                      </a>
                      <a
                        href={`https://wa.me/${selectedSub.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:underline font-bold text-xs"
                      >
                        WhatsApp →
                      </a>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="text-slate-400 font-semibold uppercase">Email Address</div>
                    <div className="font-bold text-slate-900 text-sm">
                      {selectedSub.email || 'Not provided by applicant'}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="text-slate-400 font-semibold uppercase">Program / Service</div>
                    <div className="font-bold text-slate-900 text-sm">
                      {selectedSub.selectedServiceName}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="text-slate-400 font-semibold uppercase">Preferred Branch</div>
                    <div className="font-bold text-slate-900 text-sm">
                      {selectedSub.preferredBranchName}
                    </div>
                  </div>
                </div>

                {selectedSub.desiredStartPeriod && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="font-bold text-slate-700">Requested Timing: </span>
                    <span className="text-slate-900">{selectedSub.desiredStartPeriod}</span>
                  </div>
                )}

                {selectedSub.customerMessage && (
                  <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-xs space-y-1">
                    <div className="font-bold text-blue-900 uppercase">Customer Message / Experience:</div>
                    <p className="text-slate-700 whitespace-pre-wrap">{selectedSub.customerMessage}</p>
                  </div>
                )}

                {/* 3. Follow-up Internal Notes (FR-STAFF-005) */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Internal Staff Follow-up Notes</span>
                  </h4>

                  <form onSubmit={handleAddNote} className="space-y-2">
                    <textarea
                      rows={2}
                      placeholder="Add an internal follow-up note (e.g. called customer, sent syllabus, confirmed slot)..."
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isAddingNote || !newNoteText.trim()}
                        className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Save Note</span>
                      </button>
                    </div>
                  </form>

                  {/* Notes thread */}
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedNotes.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">No staff notes recorded yet.</p>
                    ) : (
                      selectedNotes.map((note) => (
                        <div key={note.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                          <div className="flex items-center justify-between text-slate-500 font-semibold text-[11px]">
                            <span className="text-slate-800">{note.authorName}</span>
                            <span>{formatDate(note.createdAt)}</span>
                          </div>
                          <p className="text-slate-700">{note.noteText}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* 4. Status Audit Trail (FR-STAFF-006) */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <History className="w-4 h-4 text-slate-500" />
                    <span>Status History Audit Trail</span>
                  </h4>

                  <div className="space-y-1.5 max-h-36 overflow-y-auto text-xs text-slate-600">
                    {selectedAudit.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">Initial submission received at {formatDate(selectedSub.createdAt)}.</p>
                    ) : (
                      selectedAudit.map((log) => (
                        <div key={log.id} className="flex items-center justify-between py-1 border-b border-slate-100 text-[11px]">
                          <span>
                            Status changed to <strong className="uppercase">{log.toStatus}</strong> by {log.changedBy}
                          </span>
                          <span className="text-slate-400">{formatDate(log.changedAt)}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 rounded-b-3xl flex justify-end">
                <button
                  onClick={() => setSelectedSub(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
                >
                  Done
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

