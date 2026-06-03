import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { isAdminRequest } from '@/lib/admin-auth';
import { jsonError, serverError, zodError } from '@/lib/api';
import { isDatabaseConfigured } from '@/lib/db';
import { emitN8nEvent } from '@/lib/n8n';
import { getTechnicianApplication, updateTechnicianApplication } from '@/lib/repositories';
import { technicianApplicationUpdateSchema } from '@/lib/validation';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  if (!isAdminRequest(request)) return jsonError('Admin authentication required.', 401);
  if (!isDatabaseConfigured()) return jsonError('Technician applications are unavailable until DATABASE_URL is configured.', 503);

  const { id } = await context.params;
  const record = await getTechnicianApplication(id);
  if (!record) return jsonError('Technician application not found.', 404);

  return NextResponse.json({ success: true, application: record });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  if (!isAdminRequest(request)) return jsonError('Admin authentication required.', 401);
  if (!isDatabaseConfigured()) return jsonError('Technician applications are unavailable until DATABASE_URL is configured.', 503);

  try {
    const { id } = await context.params;
    const body = await request.json();
    const patch = technicianApplicationUpdateSchema.parse(body);
    const record = await updateTechnicianApplication(id, patch);

    if (!record) return jsonError('Technician application not found.', 404);

    await emitN8nEvent({
      eventType: 'technician_application.updated',
      objectType: 'technician_application',
      objectId: record.id,
      data: {
        id: record.id,
        status: record.status,
        name: record.name,
        serviceNames: record.serviceNames,
      },
    });

    return NextResponse.json({ success: true, application: record });
  } catch (error) {
    if (error instanceof ZodError) return zodError(error);
    return serverError(error);
  }
}
