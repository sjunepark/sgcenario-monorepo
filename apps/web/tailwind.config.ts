import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['global-container'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'Noto Sans Kr', 'Roboto', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [
		forms({
			strategy: 'class'
		}),
		typography
	]
} satisfies Config;
