import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

const ADMIN_COOKIE = 'onehandy_admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 12;

function base64url(value: string) {
  return Buffer.from(value).toString('base64url');
}

function fromBase64url(value: string) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD?.trim() || process.env.ADMIN_PIN?.trim() || '';
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET?.trim() || getAdminPassword();
}

function signPayload(payload: string) {
  const secret = getSessionSecret();

  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET or ADMIN_PASSWORD is required for admin sessions.');
  }

  return createHmac('sha256', secret).update(payload).digest('base64url');
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) return false;

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function verifyAdminPassword(password: string) {
  const configuredPassword = getAdminPassword();

  if (!configuredPassword) return false;

  return safeEqual(password, configuredPassword);
}

export function createAdminSessionToken() {
  const now = Math.floor(Date.now() / 1000);
  const payload = base64url(JSON.stringify({ iat: now, exp: now + SESSION_TTL_SECONDS }));
  const signature = signPayload(payload);

  return `${payload}.${signature}`;
}

export function verifyAdminSessionToken(token?: string) {
  if (!token) return false;

  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expectedSignature = signPayload(payload);
  if (!safeEqual(signature, expectedSignature)) return false;

  try {
    const parsed = JSON.parse(fromBase64url(payload)) as { exp?: number };
    return typeof parsed.exp === 'number' && parsed.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;

  return verifyAdminSessionToken(token);
}

export async function requireAdminSession() {
  const authenticated = await getAdminSession();

  if (!authenticated) {
    redirect('/admin/login');
  }
}

export function isAdminRequest(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const bearer = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
  const apiToken = process.env.ADMIN_API_TOKEN?.trim();

  return verifyAdminSessionToken(token) || Boolean(apiToken && bearer && safeEqual(bearer, apiToken));
}

export function setAdminSessionCookie(response: NextResponse) {
  response.cookies.set(ADMIN_COOKIE, createAdminSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set(ADMIN_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
}

export function isAdminConfigured() {
  return Boolean(getAdminPassword() && getSessionSecret());
}
