export function formatBaht(amount: number | null | undefined) {
  if (amount === null || amount === undefined) return 'To confirm';

  return `฿${amount.toLocaleString('en-US')}`;
}

export function formatDateTime(value: Date | string) {
  const date = typeof value === 'string' ? new Date(value) : value;

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Bangkok',
  }).format(date);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeZone: 'Asia/Bangkok',
  }).format(new Date(`${value}T12:00:00+07:00`));
}

export const timeWindowLabels: Record<string, string> = {
  morning: 'Morning (8-12)',
  afternoon: 'Afternoon (12-17)',
  evening: 'Evening (17-20)',
};
