import { mockTechnicians } from '@/lib/mock-data';
import { Star } from 'lucide-react';

export function TechniciansTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border-line">
      <table className="w-full text-sm">
        <thead className="bg-cream border-b border-border-line">
          <tr>
            {['ID', 'Name', 'Services', 'Status', 'Completed Requests', 'Rating'].map((h) => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold tracking-wide uppercase text-muted whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-line">
          {mockTechnicians.map((tech) => (
            <tr key={tech.id} className="bg-surface hover:bg-cream/50 transition-colors">
              <td className="px-4 py-3 font-mono text-xs text-muted">{tech.id}</td>
              <td className="px-4 py-3 font-medium text-ink">{tech.name}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {tech.services.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-cream border border-border-line rounded-full text-xs text-muted">
                      {s}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  tech.status === 'active'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {tech.status}
                </span>
              </td>
              <td className="px-4 py-3 font-semibold text-ink">{tech.jobsCompleted}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-gold fill-gold" />
                  <span className="font-medium text-ink">{tech.rating.toFixed(1)}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
