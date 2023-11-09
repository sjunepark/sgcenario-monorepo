import { dev } from '$app/environment';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { queryClient } from '$lib/server/db/neon';
import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql';
import { github } from '@lucia-auth/oauth/providers';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: postgresAdapter(queryClient, {
		user: 'users',
		session: 'user_sessions',
		key: 'user_keys'
	}),
	getUserAttributes: (user) => {
		return {
			userName: user.user_name,
			email: user.email
		};
	}
});

export const githubAuth = github(auth, {
	clientId: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET
});

export type Auth = typeof auth;
