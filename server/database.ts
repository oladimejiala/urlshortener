import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '@shared/schema';

// Get database URL from environment variables
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create Neon client
const sql = neon(databaseUrl);

// Create Drizzle ORM instance
export const db = drizzle(sql, { schema });

// Export for use in other files
export { sql };
