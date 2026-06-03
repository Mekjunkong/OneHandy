import { createHmac } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { signN8nPayload } from '@/lib/n8n';

describe('n8n signatures', () => {
  it('uses sha256 hmac over the exact JSON body', () => {
    const body = JSON.stringify({ eventType: 'service_request.created', objectId: 'OH-CNX-1' });
    const secret = 'n8n-secret';
    const expected = createHmac('sha256', secret).update(body).digest('hex');

    expect(signN8nPayload(body, secret)).toBe(expected);
  });
});
