import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { jsonError, serverError } from '@/lib/api';
import { isDatabaseConfigured } from '@/lib/db';
import { retryN8nEvents } from '@/lib/n8n';

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) return jsonError('Admin authentication required.', 401);
  if (!isDatabaseConfigured()) return jsonError('n8n event retry is unavailable until DATABASE_URL is configured.', 503);

  try {
    const results = await retryN8nEvents();
    return NextResponse.json({ success: true, retried: results.length, results });
  } catch (error) {
    return serverError(error);
  }
}
