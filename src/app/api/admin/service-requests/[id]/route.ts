import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { isAdminRequest } from '@/lib/admin-auth';
import { jsonError, serverError, zodError } from '@/lib/api';
import { isDatabaseConfigured } from '@/lib/db';
import { emitN8nEvent } from '@/lib/n8n';
import { getServiceRequest, updateServiceRequest } from '@/lib/repositories';
import { serviceRequestUpdateSchema } from '@/lib/validation';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  if (!isAdminRequest(request)) return jsonError('Admin authentication required.', 401);
  if (!isDatabaseConfigured()) return jsonError('Service requests are unavailable until DATABASE_URL is configured.', 503);

  const { id } = await context.params;
  const record = await getServiceRequest(id);
  if (!record) return jsonError('Service request not found.', 404);

  return NextResponse.json({ success: true, request: record });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  if (!isAdminRequest(request)) return jsonError('Admin authentication required.', 401);
  if (!isDatabaseConfigured()) return jsonError('Service requests are unavailable until DATABASE_URL is configured.', 503);

  try {
    const { id } = await context.params;
    const body = await request.json();
    const patch = serviceRequestUpdateSchema.parse(body);
    const record = await updateServiceRequest(id, patch, 'admin');

    if (!record) return jsonError('Service request not found.', 404);

    await emitN8nEvent({
      eventType: 'service_request.updated',
      objectType: 'service_request',
      objectId: record.id,
      data: {
        id: record.id,
        status: record.status,
        paymentStatus: record.paymentStatus,
        quoteAmountBaht: record.quoteAmountBaht,
        technicianName: record.technicianName,
        serviceName: record.serviceName,
        preferredDate: record.preferredDate,
      },
    });

    return NextResponse.json({ success: true, request: record });
  } catch (error) {
    if (error instanceof ZodError) return zodError(error);
    return serverError(error);
  }
}
