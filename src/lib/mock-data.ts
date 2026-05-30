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

// Phase 1 admin uses explicitly fake sample data only. Do not treat these as real
// customer, technician, or payment records.
export const mockTechnicians: Technician[] = [
  { id: 'T001', name: 'Mock Technician A', services: ['AC Cleaning', 'Electrical'], status: 'active', jobsCompleted: 48, rating: 4.9 },
  { id: 'T002', name: 'Mock Technician B', services: ['Plumbing', 'Emergency'], status: 'active', jobsCompleted: 62, rating: 4.8 },
  { id: 'T003', name: 'Mock Technician C', services: ['Gardening', 'Property Care'], status: 'active', jobsCompleted: 35, rating: 4.7 },
  { id: 'T004', name: 'Mock Technician D', services: ['Roof Repair', 'Electrical'], status: 'active', jobsCompleted: 29, rating: 4.8 },
  { id: 'T005', name: 'Mock Technician E', services: ['AC Cleaning', 'Plumbing', 'Emergency'], status: 'inactive', jobsCompleted: 17, rating: 4.6 },
];

export const mockJobs: Job[] = [
  { id: 'MOCK-JOB-001', service: 'AC Cleaning', customer: 'Mock Customer 001', address: 'Mock Chiang Mai Area 001', date: '2026-05-22', status: 'confirmed', technician: 'Mock Technician A', amount: 1600 },
  { id: 'MOCK-JOB-002', service: 'Plumbing', customer: 'Mock Customer 002', address: 'Mock Chiang Mai Area 002', date: '2026-05-22', status: 'in_progress', technician: 'Mock Technician B', amount: 1800 },
  { id: 'MOCK-JOB-003', service: 'Emergency Callout', customer: 'Mock Customer 003', address: 'Mock Chiang Mai Area 003', date: '2026-05-21', status: 'completed', technician: 'Mock Technician E', amount: 950 },
  { id: 'MOCK-JOB-004', service: 'Electrical', customer: 'Mock Customer 004', address: 'Mock Chiang Mai Area 004', date: '2026-05-23', status: 'pending', technician: null, amount: 1200 },
  { id: 'MOCK-JOB-005', service: 'Gardening', customer: 'Mock Customer 005', address: 'Mock Chiang Mai Area 005', date: '2026-05-24', status: 'pending', technician: null, amount: 800 },
  { id: 'MOCK-JOB-006', service: 'Roof Repair', customer: 'Mock Customer 006', address: 'Mock Chiang Mai Area 006', date: '2026-05-25', status: 'confirmed', technician: 'Mock Technician D', amount: 4500 },
  { id: 'MOCK-JOB-007', service: 'Property Care', customer: 'Mock Customer 007', address: 'Mock Chiang Mai Area 007', date: '2026-05-01', status: 'completed', technician: 'Mock Technician C', amount: 2800 },
  { id: 'MOCK-JOB-008', service: 'AC Cleaning', customer: 'Mock Customer 008', address: 'Mock Chiang Mai Area 008', date: '2026-05-20', status: 'completed', technician: 'Mock Technician A', amount: 2400 },
  { id: 'MOCK-JOB-009', service: 'Plumbing', customer: 'Mock Customer 009', address: 'Mock Chiang Mai Area 009', date: '2026-05-19', status: 'cancelled', technician: null, amount: 1200 },
  { id: 'MOCK-JOB-010', service: 'Electrical', customer: 'Mock Customer 010', address: 'Mock Chiang Mai Area 010', date: '2026-05-26', status: 'pending', technician: null, amount: 1500 },
];

export const mockPayments: Payment[] = mockJobs.map((job) => ({
  bookingId: job.id,
  customer: job.customer,
  amount: job.amount,
  platformFee: Math.round(job.amount * 0.15),
  net: Math.round(job.amount * 0.85),
  status: job.status === 'completed' ? 'paid' : job.status === 'cancelled' ? 'refunded' : 'pending',
}));
