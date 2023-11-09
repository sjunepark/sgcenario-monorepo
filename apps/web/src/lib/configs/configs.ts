import type { Options } from 'overlayscrollbars';

type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends Record<string, unknown> ? DeepPartial<T[P]> : T[P];
};

export const scrollbarStyle: DeepPartial<Options> = {
	scrollbars: {
		theme: 'os-theme-dark',
		autoHide: 'scroll',
		autoHideSuspend: true,
		autoHideDelay: 500
	}
};
