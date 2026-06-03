import { afterEach, describe, expect, it } from 'vitest';
import {
  createAdminSessionToken,
  verifyAdminPassword,
  verifyAdminSessionToken,
} from '@/lib/admin-auth';

const originalEnv = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnv };
});

describe('admin auth', () => {
  it('verifies configured admin password', () => {
    process.env.ADMIN_PASSWORD = 'correct horse battery staple';
    process.env.ADMIN_SESSION_SECRET = 'session-secret';

    expect(verifyAdminPassword('correct horse battery staple')).toBe(true);
    expect(verifyAdminPassword('wrong')).toBe(false);
  });

  it('creates and verifies a signed session token', () => {
    process.env.ADMIN_PASSWORD = 'admin-password';
    process.env.ADMIN_SESSION_SECRET = 'session-secret';

    const token = createAdminSessionToken();

    expect(verifyAdminSessionToken(token)).toBe(true);
    expect(verifyAdminSessionToken(`${token.slice(0, -3)}abc`)).toBe(false);
  });
});
