import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { jsonError, serverError, zodError } from '@/lib/api';
import { isDatabaseConfigured } from '@/lib/db';
import { emitN8nEvent } from '@/lib/n8n';
import { createServiceRequest } from '@/lib/repositories';
import { serviceRequestSchema } from '@/lib/validation';

export async function POST(request: NextRequest) {
  if (!isDatabaseConfigured()) {
    return jsonError('Service requests are unavailable until DATABASE_URL is configured.', 503);
  }

  try {
    const body = await request.json();
    const input = serviceRequestSchema.parse(body);
    const record = await createServiceRequest(input);

    await emitN8nEvent({
      eventType: 'service_request.created',
      objectType: 'service_request',
      objectId: record.id,
      data: {
        id: record.id,
        serviceName: record.serviceName,
        serviceSlug: record.serviceSlug,
        preferredDate: record.preferredDate,
        timeWindow: record.timeWindow,
        propertyType: record.propertyType,
        area: record.address,
        customerName: record.customerName,
        phone: record.phone,
        email: record.email,
        notes: record.notes,
      },
    });

    return NextResponse.json({
      success: true,
      request: {
        id: record.id,
        serviceName: record.serviceName,
        status: record.status,
      },
    }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) return zodError(error);
    return serverError(error);
  }
}
