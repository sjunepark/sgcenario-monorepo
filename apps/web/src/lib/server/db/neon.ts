import { NEON_DB_URL } from '$env/static/private';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const queryClient = postgres(NEON_DB_URL, {
	connection: {
		search_path: 'business'
	}
});
export const db: PostgresJsDatabase = drizzle(queryClient);
