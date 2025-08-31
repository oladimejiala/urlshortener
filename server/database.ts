import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@shared/schema';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create Postgres.js client
const client = postgres(databaseUrl, { ssl: 'require' });

// Create Drizzle ORM instance
export const db = drizzle(client, { schema });
