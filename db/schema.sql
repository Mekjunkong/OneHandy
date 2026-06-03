CREATE TABLE IF NOT EXISTS service_requests (
  id text PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  service_slug text NOT NULL,
  service_name text NOT NULL,
  property_type text NOT NULL,
  address text NOT NULL,
  unit text,
  access_notes text,
  ac_units integer NOT NULL DEFAULT 1 CHECK (ac_units BETWEEN 1 AND 20),
  preferred_date date NOT NULL,
  time_window text NOT NULL,
  customer_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'triage', 'quoted', 'scheduled', 'in_progress', 'completed', 'cancelled')),
  quote_amount_baht integer CHECK (quote_amount_baht IS NULL OR quote_amount_baht >= 0),
  quote_notes text,
  payment_status text NOT NULL DEFAULT 'not_required' CHECK (payment_status IN ('not_required', 'pending_promptpay', 'paid_promptpay', 'paid_cash')),
  technician_name text,
  internal_notes text,
  source text NOT NULL DEFAULT 'website'
);

CREATE INDEX IF NOT EXISTS service_requests_created_at_idx ON service_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS service_requests_status_idx ON service_requests (status);
CREATE INDEX IF NOT EXISTS service_requests_payment_status_idx ON service_requests (payment_status);

CREATE TABLE IF NOT EXISTS service_request_events (
  id bigserial PRIMARY KEY,
  request_id text NOT NULL REFERENCES service_requests(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  status_from text,
  status_to text,
  note text,
  actor text NOT NULL DEFAULT 'system',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS service_request_events_request_id_idx ON service_request_events (request_id, created_at DESC);

CREATE TABLE IF NOT EXISTS technician_applications (
  id text PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  phone text NOT NULL,
  whatsapp text NOT NULL,
  years_experience integer NOT NULL CHECK (years_experience BETWEEN 0 AND 60),
  service_slugs text[] NOT NULL DEFAULT '{}',
  tools text,
  previous_work text,
  consent_background_check boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'approved', 'rejected')),
  internal_notes text
);

CREATE INDEX IF NOT EXISTS technician_applications_created_at_idx ON technician_applications (created_at DESC);
CREATE INDEX IF NOT EXISTS technician_applications_status_idx ON technician_applications (status);

CREATE TABLE IF NOT EXISTS n8n_event_logs (
  id bigserial PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  delivered_at timestamptz,
  event_type text NOT NULL,
  object_type text NOT NULL,
  object_id text NOT NULL,
  payload jsonb NOT NULL,
  delivery_status text NOT NULL DEFAULT 'pending' CHECK (delivery_status IN ('pending', 'sent', 'failed', 'skipped')),
  response_status integer,
  response_body text,
  attempts integer NOT NULL DEFAULT 0,
  error_message text
);

CREATE INDEX IF NOT EXISTS n8n_event_logs_status_idx ON n8n_event_logs (delivery_status, created_at DESC);
CREATE INDEX IF NOT EXISTS n8n_event_logs_object_idx ON n8n_event_logs (object_type, object_id);
