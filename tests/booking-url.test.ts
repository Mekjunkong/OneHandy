import { describe, expect, it } from 'vitest';
import { getSafeBookingUrl, SAFE_BOOKING_PARAMS } from '@/lib/booking-url';

describe('booking URLs', () => {
  it('only allows step and service parameters', () => {
    expect(SAFE_BOOKING_PARAMS).toEqual(['step', 'service']);

    const url = getSafeBookingUrl(3, 'ac-cleaning');
    const params = new URLSearchParams(url.split('?')[1]);

    expect([...params.keys()]).toEqual(['step', 'service']);
    expect(url).toBe('/book?step=3&service=ac-cleaning');
  });

  it('does not include private customer fields', () => {
    const url = getSafeBookingUrl(4, 'plumbing');

    expect(url).not.toContain('name');
    expect(url).not.toContain('phone');
    expect(url).not.toContain('email');
    expect(url).not.toContain('address');
    expect(url).not.toContain('notes');
  });
});
