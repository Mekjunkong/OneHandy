import { NextRequest, NextResponse } from 'next/server';
import { jsonError } from '@/lib/api';
import { isAdminConfigured, setAdminSessionCookie, verifyAdminPassword } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  if (!isAdminConfigured()) {
    return jsonError('Admin login is unavailable until ADMIN_PASSWORD and ADMIN_SESSION_SECRET are configured.', 503);
  }

  const body = await request.json().catch(() => null) as { password?: string } | null;
  const password = body?.password || '';

  if (!verifyAdminPassword(password)) {
    return jsonError('Incorrect admin password.', 401);
  }

  const response = NextResponse.json({ success: true });
  setAdminSessionCookie(response);
  return response;
}
