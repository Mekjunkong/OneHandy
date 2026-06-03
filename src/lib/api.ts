import { ZodError } from 'zod';
import { NextResponse } from 'next/server';

export function jsonError(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ success: false, message, details }, { status });
}

export function zodError(error: ZodError) {
  return jsonError(
    'Please check the highlighted fields and try again.',
    422,
    error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }))
  );
}

export function serverError(error: unknown) {
  return jsonError(
    error instanceof Error ? error.message : 'Unexpected server error.',
    500
  );
}
