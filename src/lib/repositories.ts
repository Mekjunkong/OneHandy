import type { PoolClient } from 'pg';
import { query, withTransaction } from './db';
import { createServiceRequestReference, createTechnicianApplicationReference } from './references';
import { getServiceBySlug } from './services';
import type { PaymentStatus, RequestStatus, TechnicianApplicationStatus } from './status';
import type {
  ServiceRequestInput,
  ServiceRequestUpdateInput,
  TechnicianApplicationInput,
  TechnicianApplicationUpdateInput,
} from './validation';

type ServiceRequestRow = {
  id: string;
  created_at: Date;
  updated_at: Date;
  service_slug: string;
  service_name: string;
  property_type: string;
  address: string;
  unit: string | null;
  access_notes: string | null;
  ac_units: number;
  preferred_date: string;
  time_window: string;
  customer_name: string;
  phone: string;
  email: string;
  notes: string | null;
  status: RequestStatus;
  quote_amount_baht: number | null;
  quote_notes: string | null;
  payment_status: PaymentStatus;
  technician_name: string | null;
  internal_notes: string | null;
  source: string;
};

type ServiceRequestEventRow = {
  id: string;
  request_id: string;
  event_type: string;
  status_from: RequestStatus | null;
  status_to: RequestStatus | null;
  note: string | null;
  actor: string;
  created_at: Date;
};

type TechnicianApplicationRow = {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  phone: string;
  whatsapp: string;
  years_experience: number;
  service_slugs: string[];
  tools: string | null;
  previous_work: string | null;
  consent_background_check: boolean;
  status: TechnicianApplicationStatus;
  internal_notes: string | null;
};

type N8nEventLogRow = {
  id: string;
  created_at: Date;
  delivered_at: Date | null;
  event_type: string;
  object_type: string;
  object_id: string;
  payload: Record<string, unknown>;
  delivery_status: 'pending' | 'sent' | 'failed' | 'skipped';
  response_status: number | null;
  response_body: string | null;
  attempts: number;
  error_message: string | null;
};

export interface ServiceRequestRecord {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  serviceSlug: string;
  serviceName: string;
  propertyType: string;
  address: string;
  unit: string;
  accessNotes: string;
  acUnits: number;
  preferredDate: string;
  timeWindow: string;
  customerName: string;
  phone: string;
  email: string;
  notes: string;
  status: RequestStatus;
  quoteAmountBaht: number | null;
  quoteNotes: string;
  paymentStatus: PaymentStatus;
  technicianName: string;
  internalNotes: string;
  source: string;
}

export interface ServiceRequestEventRecord {
  id: string;
  requestId: string;
  eventType: string;
  statusFrom: RequestStatus | null;
  statusTo: RequestStatus | null;
  note: string;
  actor: string;
  createdAt: Date;
}

export interface TechnicianApplicationRecord {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  phone: string;
  whatsapp: string;
  yearsExperience: number;
  serviceSlugs: string[];
  serviceNames: string[];
  tools: string;
  previousWork: string;
  consentBackgroundCheck: boolean;
  status: TechnicianApplicationStatus;
  internalNotes: string;
}

export interface N8nEventLogRecord {
  id: string;
  createdAt: Date;
  deliveredAt: Date | null;
  eventType: string;
  objectType: string;
  objectId: string;
  payload: Record<string, unknown>;
  deliveryStatus: 'pending' | 'sent' | 'failed' | 'skipped';
  responseStatus: number | null;
  responseBody: string;
  attempts: number;
  errorMessage: string;
}

function mapServiceRequest(row: ServiceRequestRow): ServiceRequestRecord {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    serviceSlug: row.service_slug,
    serviceName: row.service_name,
    propertyType: row.property_type,
    address: row.address,
    unit: row.unit || '',
    accessNotes: row.access_notes || '',
    acUnits: row.ac_units,
    preferredDate: row.preferred_date,
    timeWindow: row.time_window,
    customerName: row.customer_name,
    phone: row.phone,
    email: row.email,
    notes: row.notes || '',
    status: row.status,
    quoteAmountBaht: row.quote_amount_baht,
    quoteNotes: row.quote_notes || '',
    paymentStatus: row.payment_status,
    technicianName: row.technician_name || '',
    internalNotes: row.internal_notes || '',
    source: row.source,
  };
}

function mapServiceRequestEvent(row: ServiceRequestEventRow): ServiceRequestEventRecord {
  return {
    id: row.id,
    requestId: row.request_id,
    eventType: row.event_type,
    statusFrom: row.status_from,
    statusTo: row.status_to,
    note: row.note || '',
    actor: row.actor,
    createdAt: row.created_at,
  };
}

function mapTechnicianApplication(row: TechnicianApplicationRow): TechnicianApplicationRecord {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    name: row.name,
    phone: row.phone,
    whatsapp: row.whatsapp,
    yearsExperience: row.years_experience,
    serviceSlugs: row.service_slugs,
    serviceNames: row.service_slugs.map((slug) => getServiceBySlug(slug)?.name || slug),
    tools: row.tools || '',
    previousWork: row.previous_work || '',
    consentBackgroundCheck: row.consent_background_check,
    status: row.status,
    internalNotes: row.internal_notes || '',
  };
}

function mapN8nEventLog(row: N8nEventLogRow): N8nEventLogRecord {
  return {
    id: row.id,
    createdAt: row.created_at,
    deliveredAt: row.delivered_at,
    eventType: row.event_type,
    objectType: row.object_type,
    objectId: row.object_id,
    payload: row.payload,
    deliveryStatus: row.delivery_status,
    responseStatus: row.response_status,
    responseBody: row.response_body || '',
    attempts: row.attempts,
    errorMessage: row.error_message || '',
  };
}

async function insertServiceRequestEvent(
  client: PoolClient,
  requestId: string,
  eventType: string,
  statusFrom: RequestStatus | null,
  statusTo: RequestStatus | null,
  note: string,
  actor = 'system'
) {
  await client.query(
    `INSERT INTO service_request_events (request_id, event_type, status_from, status_to, note, actor)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [requestId, eventType, statusFrom, statusTo, note || null, actor]
  );
}

export async function createServiceRequest(input: ServiceRequestInput) {
  const id = createServiceRequestReference();
  const service = getServiceBySlug(input.service);

  if (!service) {
    throw new Error(`Unknown service slug: ${input.service}`);
  }

  return withTransaction(async (client) => {
    const result = await client.query<ServiceRequestRow>(
      `INSERT INTO service_requests (
        id, service_slug, service_name, property_type, address, unit, access_notes,
        ac_units, preferred_date, time_window, customer_name, phone, email, notes
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::date, $10, $11, $12, $13, $14)
      RETURNING *`,
      [
        id,
        input.service,
        service.name,
        input.propertyType,
        input.address,
        input.unit || null,
        input.accessNotes || null,
        input.acUnits,
        input.date,
        input.timeWindow,
        input.name,
        input.phone,
        input.email,
        input.notes || null,
      ]
    );

    await insertServiceRequestEvent(
      client,
      id,
      'service_request.created',
      null,
      'new',
      'Customer submitted request through website.'
    );

    return mapServiceRequest(result.rows[0]);
  });
}

export async function listServiceRequests(limit = 100) {
  const result = await query<ServiceRequestRow>(
    `SELECT * FROM service_requests ORDER BY created_at DESC LIMIT $1`,
    [limit]
  );

  return result.rows.map(mapServiceRequest);
}

export async function getServiceRequest(id: string) {
  const result = await query<ServiceRequestRow>(
    `SELECT * FROM service_requests WHERE id = $1`,
    [id]
  );

  return result.rows[0] ? mapServiceRequest(result.rows[0]) : null;
}

export async function listServiceRequestEvents(requestId: string) {
  const result = await query<ServiceRequestEventRow>(
    `SELECT * FROM service_request_events WHERE request_id = $1 ORDER BY created_at DESC`,
    [requestId]
  );

  return result.rows.map(mapServiceRequestEvent);
}

export async function updateServiceRequest(
  id: string,
  patch: ServiceRequestUpdateInput,
  actor = 'admin'
) {
  const current = await getServiceRequest(id);
  if (!current) return null;

  const values: unknown[] = [];
  const assignments: string[] = [];

  function setColumn(column: string, value: unknown) {
    values.push(value === '' ? null : value);
    assignments.push(`${column} = $${values.length}`);
  }

  if (patch.status !== undefined) setColumn('status', patch.status);
  if (patch.paymentStatus !== undefined) setColumn('payment_status', patch.paymentStatus);
  if (patch.quoteAmountBaht !== undefined) setColumn('quote_amount_baht', patch.quoteAmountBaht);
  if (patch.quoteNotes !== undefined) setColumn('quote_notes', patch.quoteNotes);
  if (patch.technicianName !== undefined) setColumn('technician_name', patch.technicianName);
  if (patch.internalNotes !== undefined) setColumn('internal_notes', patch.internalNotes);

  if (assignments.length === 0) return current;

  values.push(id);

  return withTransaction(async (client) => {
    const result = await client.query<ServiceRequestRow>(
      `UPDATE service_requests
       SET ${assignments.join(', ')}, updated_at = now()
       WHERE id = $${values.length}
       RETURNING *`,
      values
    );

    const updated = mapServiceRequest(result.rows[0]);

    if (patch.status && patch.status !== current.status) {
      await insertServiceRequestEvent(
        client,
        id,
        'service_request.status_changed',
        current.status,
        patch.status,
        `Status changed from ${current.status} to ${patch.status}.`,
        actor
      );
    }

    if (patch.paymentStatus && patch.paymentStatus !== current.paymentStatus) {
      await insertServiceRequestEvent(
        client,
        id,
        'service_request.payment_changed',
        current.status,
        updated.status,
        `Payment status changed from ${current.paymentStatus} to ${patch.paymentStatus}.`,
        actor
      );
    }

    return updated;
  });
}

export async function createTechnicianApplication(input: TechnicianApplicationInput) {
  const id = createTechnicianApplicationReference();

  const result = await query<TechnicianApplicationRow>(
    `INSERT INTO technician_applications (
      id, name, phone, whatsapp, years_experience, service_slugs, tools,
      previous_work, consent_background_check
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`,
    [
      id,
      input.name,
      input.phone,
      input.whatsapp,
      input.yearsExperience,
      input.serviceSlugs,
      input.tools || null,
      input.previousWork || null,
      input.consentBackgroundCheck,
    ]
  );

  return mapTechnicianApplication(result.rows[0]);
}

export async function listTechnicianApplications(limit = 100) {
  const result = await query<TechnicianApplicationRow>(
    `SELECT * FROM technician_applications ORDER BY created_at DESC LIMIT $1`,
    [limit]
  );

  return result.rows.map(mapTechnicianApplication);
}

export async function getTechnicianApplication(id: string) {
  const result = await query<TechnicianApplicationRow>(
    `SELECT * FROM technician_applications WHERE id = $1`,
    [id]
  );

  return result.rows[0] ? mapTechnicianApplication(result.rows[0]) : null;
}

export async function updateTechnicianApplication(
  id: string,
  patch: TechnicianApplicationUpdateInput
) {
  const values: unknown[] = [];
  const assignments: string[] = [];

  function setColumn(column: string, value: unknown) {
    values.push(value === '' ? null : value);
    assignments.push(`${column} = $${values.length}`);
  }

  if (patch.status !== undefined) setColumn('status', patch.status);
  if (patch.internalNotes !== undefined) setColumn('internal_notes', patch.internalNotes);

  if (assignments.length === 0) return getTechnicianApplication(id);

  values.push(id);

  const result = await query<TechnicianApplicationRow>(
    `UPDATE technician_applications
     SET ${assignments.join(', ')}, updated_at = now()
     WHERE id = $${values.length}
     RETURNING *`,
    values
  );

  return result.rows[0] ? mapTechnicianApplication(result.rows[0]) : null;
}

export async function createN8nEventLog(args: {
  eventType: string;
  objectType: string;
  objectId: string;
  payload: Record<string, unknown>;
  deliveryStatus?: N8nEventLogRecord['deliveryStatus'];
  errorMessage?: string;
}) {
  const result = await query<N8nEventLogRow>(
    `INSERT INTO n8n_event_logs (event_type, object_type, object_id, payload, delivery_status, error_message)
     VALUES ($1, $2, $3, $4::jsonb, $5, $6)
     RETURNING *`,
    [
      args.eventType,
      args.objectType,
      args.objectId,
      JSON.stringify(args.payload),
      args.deliveryStatus || 'pending',
      args.errorMessage || null,
    ]
  );

  return mapN8nEventLog(result.rows[0]);
}

export async function updateN8nEventLogDelivery(
  id: string,
  patch: {
    deliveryStatus: N8nEventLogRecord['deliveryStatus'];
    responseStatus?: number | null;
    responseBody?: string | null;
    errorMessage?: string | null;
    deliveredAt?: Date | null;
  }
) {
  const result = await query<N8nEventLogRow>(
    `UPDATE n8n_event_logs
     SET delivery_status = $2,
         response_status = $3,
         response_body = $4,
         error_message = $5,
         delivered_at = $6,
         attempts = attempts + 1
     WHERE id = $1
     RETURNING *`,
    [
      id,
      patch.deliveryStatus,
      patch.responseStatus ?? null,
      patch.responseBody ?? null,
      patch.errorMessage ?? null,
      patch.deliveredAt ?? null,
    ]
  );

  return mapN8nEventLog(result.rows[0]);
}

export async function listRetryableN8nEventLogs(limit = 25) {
  const result = await query<N8nEventLogRow>(
    `SELECT * FROM n8n_event_logs
     WHERE delivery_status IN ('failed', 'pending')
     ORDER BY created_at ASC
     LIMIT $1`,
    [limit]
  );

  return result.rows.map(mapN8nEventLog);
}

export async function listRecentN8nEventLogs(limit = 20) {
  const result = await query<N8nEventLogRow>(
    `SELECT * FROM n8n_event_logs ORDER BY created_at DESC LIMIT $1`,
    [limit]
  );

  return result.rows.map(mapN8nEventLog);
}
