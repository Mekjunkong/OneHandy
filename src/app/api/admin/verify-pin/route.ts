import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const adminPin = process.env.ADMIN_PIN?.trim();

  if (!adminPin) {
    return NextResponse.json(
      {
        success: false,
        message: 'Admin PIN is not configured. Phase 1 admin uses a local PIN gate only, not production authentication.',
      },
      { status: 503 }
    );
  }

  const { pin } = await req.json();
  return NextResponse.json({ success: typeof pin === 'string' && pin === adminPin });
}
