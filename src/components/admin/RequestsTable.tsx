import Link from 'next/link';
import { formatBaht, formatDate, formatDateTime, timeWindowLabels } from '@/lib/formatters';
import type { ServiceRequestRecord } from '@/lib/repositories';
import {
  paymentStatusLabels,
  paymentStatusStyles,
  requestStatusLabels,
  requestStatusStyles,
} from '@/lib/status';

export function RequestsTable({ requests }: { requests: ServiceRequestRecord[] }) {
  if (requests.length === 0) {
    return (
      <div className="rounded-lg border border-border-line bg-surface p-8 text-sm text-muted">
        No service requests yet. New website submissions will appear here.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border-line">
      <table className="w-full text-sm">
        <thead className="border-b border-border-line bg-cream">
          <tr>
            {['Reference', 'Service', 'Customer', 'Preferred time', 'Status', 'Payment', 'Quote', 'Created'].map((heading) => (
              <th key={heading} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-line">
          {requests.map((request) => (
            <tr key={request.id} className="bg-surface transition-colors hover:bg-cream/60">
              <td className="px-4 py-3">
                <Link href={`/admin/requests/${request.id}`} className="font-mono text-xs font-semibold text-ink hover:text-gold">
                  {request.id}
                </Link>
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-medium text-ink">{request.serviceName}</td>
              <td className="px-4 py-3">
                <p className="font-medium text-ink">{request.customerName}</p>
                <p className="text-xs text-muted">{request.phone}</p>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-muted">
                {formatDate(request.preferredDate)}<br />
                <span className="text-xs">{timeWindowLabels[request.timeWindow]}</span>
              </td>
              <td className="px-4 py-3">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${requestStatusStyles[request.status]}`}>
                  {requestStatusLabels[request.status]}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${paymentStatusStyles[request.paymentStatus]}`}>
                  {paymentStatusLabels[request.paymentStatus]}
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-semibold text-ink">{formatBaht(request.quoteAmountBaht)}</td>
              <td className="whitespace-nowrap px-4 py-3 text-xs text-muted">{formatDateTime(request.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
