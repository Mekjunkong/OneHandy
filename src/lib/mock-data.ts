export type JobStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'refunded';

export interface Job {
  id: string;
  service: string;
  customer: string;
  address: string;
  date: string;
  status: JobStatus;
  technician: string | null;
  amount: number;
}

export interface Technician {
  id: string;
  name: string;
  services: string[];
  status: 'active' | 'inactive';
  jobsCompleted: number;
  rating: number;
}

export interface Payment {
  bookingId: string;
  customer: string;
  amount: number;
  platformFee: number;
  net: number;
  status: PaymentStatus;
}

export const mockTechnicians: Technician[] = [
  { id: 'T001', name: 'Somchai K.', services: ['AC Cleaning', 'Electrical'], status: 'active', jobsCompleted: 48, rating: 4.9 },
  { id: 'T002', name: 'Niran P.', services: ['Plumbing', 'Emergency'], status: 'active', jobsCompleted: 62, rating: 4.8 },
  { id: 'T003', name: 'Wirat S.', services: ['Gardening', 'Property Care'], status: 'active', jobsCompleted: 35, rating: 4.7 },
  { id: 'T004', name: 'Prasert L.', services: ['Roof Repair', 'Electrical'], status: 'active', jobsCompleted: 29, rating: 4.8 },
  { id: 'T005', name: 'Chaiya M.', services: ['AC Cleaning', 'Plumbing', 'Emergency'], status: 'inactive', jobsCompleted: 17, rating: 4.6 },
];

export const mockJobs: Job[] = [
  { id: 'JOB-001', service: 'AC Cleaning', customer: 'David Chen', address: '15/4 Nimman Rd, Suite 8', date: '2026-05-22', status: 'confirmed', technician: 'Somchai K.', amount: 1600 },
  { id: 'JOB-002', service: 'Plumbing', customer: 'Sarah Mitchell', address: 'Baan Suan Villa, Hang Dong', date: '2026-05-22', status: 'in_progress', technician: 'Niran P.', amount: 1800 },
  { id: 'JOB-003', service: 'Emergency Callout', customer: 'Mark Hoffman', address: '22 Santitham Lane 3', date: '2026-05-21', status: 'completed', technician: 'Chaiya M.', amount: 950 },
  { id: 'JOB-004', service: 'Electrical', customer: 'Yuki Tanaka', address: 'The Peak Condo, Unit 12A', date: '2026-05-23', status: 'pending', technician: null, amount: 1200 },
  { id: 'JOB-005', service: 'Gardening', customer: 'Emma Larsson', address: '88 Doi Saket Road', date: '2026-05-24', status: 'pending', technician: null, amount: 800 },
  { id: 'JOB-006', service: 'Roof Repair', customer: 'Tom Bradley', address: '3/1 Canal Road, Suthep', date: '2026-05-25', status: 'confirmed', technician: 'Prasert L.', amount: 4500 },
  { id: 'JOB-007', service: 'Property Care', customer: 'Lisa Hofer', address: 'Baan Rim Doi, Unit 7', date: '2026-05-01', status: 'completed', technician: 'Wirat S.', amount: 2800 },
  { id: 'JOB-008', service: 'AC Cleaning', customer: 'James Park', address: 'Nimman House, Apt 204', date: '2026-05-20', status: 'completed', technician: 'Somchai K.', amount: 2400 },
  { id: 'JOB-009', service: 'Plumbing', customer: 'Anna Kowalski', address: '7 Moonmuang Road', date: '2026-05-19', status: 'cancelled', technician: null, amount: 1200 },
  { id: 'JOB-010', service: 'Electrical', customer: 'Robert Kim', address: 'Sky View Tower, Level 5', date: '2026-05-26', status: 'pending', technician: null, amount: 1500 },
];

export const mockPayments: Payment[] = mockJobs.map((job) => ({
  bookingId: job.id,
  customer: job.customer,
  amount: job.amount,
  platformFee: Math.round(job.amount * 0.15),
  net: Math.round(job.amount * 0.85),
  status: job.status === 'completed' ? 'paid' : job.status === 'cancelled' ? 'refunded' : 'pending',
}));
