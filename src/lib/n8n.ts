import { createHmac } from 'crypto';
import {
  createN8nEventLog,
  listRetryableN8nEventLogs,
  updateN8nEventLogDelivery,
  type N8nEventLogRecord,
} from './repositories';

export interface N8nPayload {
  eventType: string;
  objectType: string;
  objectId: string;
  occurredAt: string;
  data: Record<string, unknown>;
}

export function signN8nPayload(body: string, secret: string) {
  return createHmac('sha256', secret).update(body).digest('hex');
}

function getN8nConfig() {
  return {
    webhookUrl: process.env.N8N_WEBHOOK_URL?.trim() || '',
    secret: process.env.N8N_WEBHOOK_SECRET?.trim() || '',
  };
}

function truncateBody(body: string) {
  return body.length > 2000 ? `${body.slice(0, 2000)}...` : body;
}

async function deliverLog(log: N8nEventLogRecord) {
  const { webhookUrl, secret } = getN8nConfig();

  if (!webhookUrl) {
    return updateN8nEventLogDelivery(log.id, {
      deliveryStatus: 'skipped',
      errorMessage: 'N8N_WEBHOOK_URL is not configured.',
    });
  }

  if (!secret) {
    return updateN8nEventLogDelivery(log.id, {
      deliveryStatus: 'skipped',
      errorMessage: 'N8N_WEBHOOK_SECRET is not configured.',
    });
  }

  const body = JSON.stringify(log.payload);
  const signature = signN8nPayload(body, secret);

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-OneHandy-Signature': `sha256=${signature}`,
        'X-OneHandy-Event': log.eventType,
      },
      body,
      signal: AbortSignal.timeout(Number(process.env.N8N_WEBHOOK_TIMEOUT_MS || 5000)),
    });
    const responseBody = truncateBody(await response.text());

    return updateN8nEventLogDelivery(log.id, {
      deliveryStatus: response.ok ? 'sent' : 'failed',
      responseStatus: response.status,
      responseBody,
      errorMessage: response.ok ? null : `n8n returned HTTP ${response.status}.`,
      deliveredAt: response.ok ? new Date() : null,
    });
  } catch (error) {
    return updateN8nEventLogDelivery(log.id, {
      deliveryStatus: 'failed',
      errorMessage: error instanceof Error ? error.message : 'Unknown n8n delivery error.',
    });
  }
}

export async function emitN8nEvent(args: {
  eventType: string;
  objectType: string;
  objectId: string;
  data: Record<string, unknown>;
}) {
  const payload: N8nPayload = {
    eventType: args.eventType,
    objectType: args.objectType,
    objectId: args.objectId,
    occurredAt: new Date().toISOString(),
    data: args.data,
  };

  const log = await createN8nEventLog({
    eventType: args.eventType,
    objectType: args.objectType,
    objectId: args.objectId,
    payload: payload as unknown as Record<string, unknown>,
  });

  return deliverLog(log);
}

export async function retryN8nEvents(limit = 25) {
  const logs = await listRetryableN8nEventLogs(limit);
  const results: N8nEventLogRecord[] = [];

  for (const log of logs) {
    results.push(await deliverLog(log));
  }

  return results;
}
