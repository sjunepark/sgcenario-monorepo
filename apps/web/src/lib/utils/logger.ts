import { dev } from '$app/environment';
import pino from 'pino';
import type { Action } from 'svelte/action';

const logLevel = dev ? 'trace' : 'info';

const pinoConfig = {
	browser: {
		asObject: true
	},
	level: logLevel
};

export const logger = pino(pinoConfig);

export const mountLogger: Action = (node) => {
	if (node.dataset) {
		logger.debug({ ...node.dataset }, 'Mounted');
	}

	return {
		destroy() {
			logger.debug(node, 'Unmounted');
		}
	};
};
