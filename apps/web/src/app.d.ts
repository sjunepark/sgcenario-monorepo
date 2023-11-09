// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="lucia" />
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('lucia').AuthRequest;
		}
		// interface PageData {}
		// interface Platform {}
	}

	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		/* eslint-disable @typescript-eslint/ban-types */
		type DatabaseUserAttributes = {
			// Has to match database column name
			user_name: string | null;
			email: string | null;
		};
		/* eslint-disable @typescript-eslint/ban-types */
		type DatabaseSessionAttributes = {};
	}
}

export {};
