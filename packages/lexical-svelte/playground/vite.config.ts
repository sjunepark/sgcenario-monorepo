import { sveltekit } from '@sveltejs/kit/vite';
import { defineProject } from 'vitest/config';

export default defineProject({
	plugins: [sveltekit()],
	test: {
		name: '@lexical-svelte/playground:unit',
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./scripts/setupTest.ts']
	}
});
