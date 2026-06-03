import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { jsonError, serverError, zodError } from '@/lib/api';
import { isDatabaseConfigured } from '@/lib/db';
import { emitN8nEvent } from '@/lib/n8n';
import { createTechnicianApplication } from '@/lib/repositories';
import { technicianApplicationSchema } from '@/lib/validation';

export async function POST(request: NextRequest) {
  if (!isDatabaseConfigured()) {
    return jsonError('Technician applications are unavailable until DATABASE_URL is configured.', 503);
  }

  try {
    const body = await request.json();
    const input = technicianApplicationSchema.parse(body);
    const record = await createTechnicianApplication(input);

    await emitN8nEvent({
      eventType: 'technician_application.created',
      objectType: 'technician_application',
      objectId: record.id,
      data: {
        id: record.id,
        name: record.name,
        phone: record.phone,
        whatsapp: record.whatsapp,
        yearsExperience: record.yearsExperience,
        serviceNames: record.serviceNames,
      },
    });

    return NextResponse.json({
      success: true,
      application: {
        id: record.id,
        status: record.status,
      },
    }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) return zodError(error);
    return serverError(error);
  }
}
