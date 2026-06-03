export function AdminNotice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border-line bg-surface p-6">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <div className="mt-2 text-sm leading-6 text-muted">{children}</div>
    </div>
  );
}
