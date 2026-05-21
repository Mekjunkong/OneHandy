'use client';

import { useState } from 'react';
import { mockJobs, mockTechnicians, Job, JobStatus } from '@/lib/mock-data';

const STATUS_STYLES: Record<JobStatus, string> = {
  pending: 'bg-gray-100 text-gray-600',
  confirmed: 'bg-blue-50 text-blue-700',
  in_progress: 'bg-amber-50 text-amber-700',
  completed: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-600',
};

export function JobsTable() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  const filtered = jobs.filter((j) => {
    if (statusFilter !== 'all' && j.status !== statusFilter) return false;
    if (serviceFilter !== 'all' && j.service !== serviceFilter) return false;
    return true;
  });

  const services = [...new Set(mockJobs.map((j) => j.service))];

  const assignTechnician = (jobId: string, tech: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, technician: tech || null } : j))
    );
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 px-3 border border-border-line rounded-sm text-sm bg-surface focus:outline-none focus:border-gold"
        >
          <option value="all">All Statuses</option>
          {['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'].map((s) => (
            <option key={s} value={s}>{s.replace('_', ' ')}</option>
          ))}
        </select>
        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          className="h-9 px-3 border border-border-line rounded-sm text-sm bg-surface focus:outline-none focus:border-gold"
        >
          <option value="all">All Services</option>
          {services.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <span className="ml-auto text-xs text-muted self-center">{filtered.length} jobs</span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border-line">
        <table className="w-full text-sm">
          <thead className="bg-cream border-b border-border-line">
            <tr>
              {['ID', 'Service', 'Customer', 'Address', 'Date', 'Status', 'Technician', 'Amount'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold tracking-wide uppercase text-muted whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-line">
            {filtered.map((job) => (
              <tr key={job.id} className="bg-surface hover:bg-cream/50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-muted">{job.id}</td>
                <td className="px-4 py-3 font-medium text-ink whitespace-nowrap">{job.service}</td>
                <td className="px-4 py-3 text-ink">{job.customer}</td>
                <td className="px-4 py-3 text-muted max-w-40 truncate">{job.address}</td>
                <td className="px-4 py-3 text-muted whitespace-nowrap">{job.date}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[job.status]}`}>
                    {job.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={job.technician || ''}
                    onChange={(e) => assignTechnician(job.id, e.target.value)}
                    className="h-7 px-2 border border-border-line rounded-sm text-xs bg-surface focus:outline-none focus:border-gold min-w-28"
                  >
                    <option value="">Unassigned</option>
                    {mockTechnicians.filter((t) => t.status === 'active').map((t) => (
                      <option key={t.id} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 font-semibold text-ink">฿{job.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
