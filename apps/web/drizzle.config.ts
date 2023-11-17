import { config } from 'dotenv';
import type { Config } from 'drizzle-kit';
config();

export default {
	schema: './drizzle/schema.ts',
	out: './drizzle',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.NEON_DB_URL
	},
	schemaFilter: ['business']
} satisfies Config;
