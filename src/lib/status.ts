export const requestStatuses = [
  'new',
  'triage',
  'quoted',
  'scheduled',
  'in_progress',
  'completed',
  'cancelled',
] as const;

export type RequestStatus = (typeof requestStatuses)[number];

export const paymentStatuses = [
  'not_required',
  'pending_promptpay',
  'paid_promptpay',
  'paid_cash',
] as const;

export type PaymentStatus = (typeof paymentStatuses)[number];

export const technicianApplicationStatuses = [
  'new',
  'reviewing',
  'approved',
  'rejected',
] as const;

export type TechnicianApplicationStatus = (typeof technicianApplicationStatuses)[number];

export const requestStatusLabels: Record<RequestStatus, string> = {
  new: 'New',
  triage: 'Triage',
  quoted: 'Quoted',
  scheduled: 'Scheduled',
  in_progress: 'In progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const paymentStatusLabels: Record<PaymentStatus, string> = {
  not_required: 'Not required',
  pending_promptpay: 'Pending PromptPay',
  paid_promptpay: 'Paid by PromptPay',
  paid_cash: 'Paid cash',
};

export const technicianApplicationStatusLabels: Record<TechnicianApplicationStatus, string> = {
  new: 'New',
  reviewing: 'Reviewing',
  approved: 'Approved',
  rejected: 'Rejected',
};

export const requestStatusStyles: Record<RequestStatus, string> = {
  new: 'bg-gray-100 text-gray-700',
  triage: 'bg-blue-50 text-blue-700',
  quoted: 'bg-violet-50 text-violet-700',
  scheduled: 'bg-sky-50 text-sky-700',
  in_progress: 'bg-amber-50 text-amber-700',
  completed: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-700',
};

export const paymentStatusStyles: Record<PaymentStatus, string> = {
  not_required: 'bg-gray-100 text-gray-700',
  pending_promptpay: 'bg-amber-50 text-amber-700',
  paid_promptpay: 'bg-green-50 text-green-700',
  paid_cash: 'bg-green-50 text-green-700',
};
