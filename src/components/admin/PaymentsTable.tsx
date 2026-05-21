import { mockPayments, PaymentStatus } from '@/lib/mock-data';

const STATUS_STYLES: Record<PaymentStatus, string> = {
  pending: 'bg-amber-50 text-amber-700',
  paid: 'bg-green-50 text-green-700',
  refunded: 'bg-red-50 text-red-600',
};

export function PaymentsTable() {
  const totalRevenue = mockPayments.filter((p) => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalFees = mockPayments.filter((p) => p.status === 'paid').reduce((sum, p) => sum + p.platformFee, 0);
  const pending = mockPayments.filter((p) => p.status === 'pending').reduce((sum, p) => sum + p.net, 0);

  return (
    <div>
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Revenue', value: `฿${totalRevenue.toLocaleString()}`, sub: 'Paid jobs' },
          { label: 'Platform Fees', value: `฿${totalFees.toLocaleString()}`, sub: '15% of revenue' },
          { label: 'Pending Payouts', value: `฿${pending.toLocaleString()}`, sub: 'Awaiting completion' },
        ].map((card) => (
          <div key={card.label} className="bg-surface border border-border-line rounded-lg p-5">
            <p className="text-xs font-semibold tracking-wide uppercase text-muted mb-1">{card.label}</p>
            <p className="text-2xl font-semibold text-ink">{card.value}</p>
            <p className="text-xs text-muted mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-border-line">
        <table className="w-full text-sm">
          <thead className="bg-cream border-b border-border-line">
            <tr>
              {['Booking ID', 'Customer', 'Amount', 'Platform Fee', 'Net', 'Status'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold tracking-wide uppercase text-muted whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-line">
            {mockPayments.map((p) => (
              <tr key={p.bookingId} className="bg-surface hover:bg-cream/50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-muted">{p.bookingId}</td>
                <td className="px-4 py-3 text-ink">{p.customer}</td>
                <td className="px-4 py-3 font-semibold text-ink">฿{p.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-muted">฿{p.platformFee.toLocaleString()}</td>
                <td className="px-4 py-3 font-semibold text-ink">฿{p.net.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[p.status]}`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
