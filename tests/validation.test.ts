import { describe, expect, it } from 'vitest';
import {
  getMinBookingDate,
  serviceRequestSchema,
  technicianApplicationSchema,
} from '@/lib/validation';

describe('service request validation', () => {
  it('accepts the minimum valid request shape', () => {
    const parsed = serviceRequestSchema.parse({
      service: 'ac-cleaning',
      propertyType: 'condo',
      address: '15 Nimman Road, Chiang Mai',
      acUnits: 2,
      date: getMinBookingDate(),
      timeWindow: 'morning',
      name: 'Alex Owner',
      phone: '+66 80 000 0000',
      email: 'alex@example.com',
    });

    expect(parsed.service).toBe('ac-cleaning');
    expect(parsed.acUnits).toBe(2);
    expect(parsed.notes).toBe('');
  });

  it('rejects unknown services and invalid contact details', () => {
    const result = serviceRequestSchema.safeParse({
      service: 'moving',
      propertyType: 'condo',
      address: '15 Nimman Road, Chiang Mai',
      date: getMinBookingDate(),
      timeWindow: 'morning',
      name: 'A',
      phone: 'abc',
      email: 'not-email',
    });

    expect(result.success).toBe(false);
  });
});

describe('technician application validation', () => {
  it('requires at least one service and consent', () => {
    const result = technicianApplicationSchema.safeParse({
      name: 'Somchai',
      phone: '+66 80 000 0000',
      whatsapp: '+66 80 000 0000',
      yearsExperience: 8,
      serviceSlugs: [],
      consentBackgroundCheck: false,
    });

    expect(result.success).toBe(false);
  });
});
