import { bigint, pgSchema, serial, varchar } from 'drizzle-orm/pg-core';

export const business = pgSchema('business');

export const users = business.table('users', {
	id: varchar('id', { length: 15 }).notNull(),
	userName: varchar('user_name', { length: 255 }),
	email: varchar('email', { length: 255 })
});

export const userKeys = business.table('user_keys', {
	id: varchar('id', { length: 255 }).notNull(),
	userId: varchar('user_id', { length: 15 }).notNull(),
	hashedPassword: varchar('hashed_password', { length: 255 })
});

export const userSessions = business.table('user_sessions', {
	id: varchar('id', { length: 128 }).notNull(),
	userId: varchar('user_id', { length: 15 }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	activeExpires: bigint('active_expires', { mode: 'number' }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	idleExpires: bigint('idle_expires', { mode: 'number' }).notNull()
});

export const scriptBlocks = business.table('script_blocks', {
	id: serial('id').notNull(),
	userId: varchar('user_id')
});
