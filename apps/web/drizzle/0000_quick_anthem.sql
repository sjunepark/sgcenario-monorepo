CREATE SCHEMA "business";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "business"."script_blocks" (
	"id" serial NOT NULL,
	"user_id" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "business"."user_keys" (
	"id" varchar(255) NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"hashed_password" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "business"."user_sessions" (
	"id" varchar(128) NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"active_expires" bigint NOT NULL,
	"idle_expires" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "business"."users" (
	"id" varchar(15) NOT NULL,
	"user_name" varchar(255),
	"email" varchar(255)
);
