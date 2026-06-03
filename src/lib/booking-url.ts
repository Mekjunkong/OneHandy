export const BOOKING_DRAFT_KEY = 'onehandy_booking_draft';
export const LAST_REQUEST_REF_KEY = 'onehandy_last_request_ref';
export const SAFE_BOOKING_PARAMS = ['step', 'service'] as const;

const [STEP_PARAM, SERVICE_PARAM] = SAFE_BOOKING_PARAMS;

export function getSafeBookingUrl(step: number, service: string) {
  const params = new URLSearchParams();
  params.set(STEP_PARAM, String(step));
  if (service) params.set(SERVICE_PARAM, service);

  return `/book?${params.toString()}`;
}

export function getSafeBookingSearch(step: number, service: string) {
  const params = new URLSearchParams(getSafeBookingUrl(step, service).split('?')[1]);

  return params.toString();
}
