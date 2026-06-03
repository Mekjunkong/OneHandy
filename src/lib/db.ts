import { Pool, type PoolClient, type QueryResultRow } from 'pg';

type OneHandyGlobal = typeof globalThis & {
  __onehandyPgPool?: Pool;
};

function getConnectionString() {
  return process.env.DATABASE_URL?.trim() || '';
}

export function isDatabaseConfigured() {
  return Boolean(getConnectionString());
}

function createPool() {
  const connectionString = getConnectionString();

  if (!connectionString) {
    throw new Error('DATABASE_URL is not configured.');
  }

  return new Pool({
    connectionString,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    max: Number(process.env.DATABASE_POOL_MAX || 5),
  });
}

export function getPool() {
  const globalRef = globalThis as OneHandyGlobal;

  if (!globalRef.__onehandyPgPool) {
    globalRef.__onehandyPgPool = createPool();
  }

  return globalRef.__onehandyPgPool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(text: string, params: unknown[] = []) {
  return getPool().query<T>(text, params);
}

export async function withTransaction<T>(callback: (client: PoolClient) => Promise<T>) {
  const client = await getPool().connect();

  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
