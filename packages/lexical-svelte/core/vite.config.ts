import { sveltekit } from '@sveltejs/kit/vite';
import { defineProject } from 'vitest/config';

export default defineProject({
	plugins: [sveltekit()],
	test: {
		name: '@lexical-svelte/core:unit',
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./scripts/setupTest.ts']
	}
});
