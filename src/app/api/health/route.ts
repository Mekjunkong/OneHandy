import { NextResponse } from 'next/server';
import { isDatabaseConfigured, query } from '@/lib/db';

export async function GET() {
  const checks = {
    app: true,
    databaseConfigured: isDatabaseConfigured(),
    databaseReachable: false,
    n8nConfigured: Boolean(process.env.N8N_WEBHOOK_URL && process.env.N8N_WEBHOOK_SECRET),
  };

  if (checks.databaseConfigured) {
    try {
      await query('SELECT 1');
      checks.databaseReachable = true;
    } catch {
      checks.databaseReachable = false;
    }
  }

  const healthy = checks.app && checks.databaseReachable;

  return NextResponse.json(
    {
      status: healthy ? 'ok' : 'degraded',
      checks,
    },
    { status: healthy ? 200 : 503 }
  );
}
